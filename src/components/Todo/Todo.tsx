import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Tasks } from "../Tasks/Tasks";
import { getAccessToken} from "../../utils/Auth";
import { endpoints, fetchWrapper } from "../../utils/Api";

const LOCAL_STORAGE_KEY = 'todo:tasks';

interface item {
	id: string;
	title: string;
	isCompleted: boolean;
}

function Todo() {
	const accessToken:string = getAccessToken();

	useEffect(() => {
		getTodo();
	}, []);
	

	const getTodo = async () =>{
		const response = await fetchWrapper(endpoints.todo, {
      method: 'GET',
      headers: { 
				'Content-Type': 'application/json',
				'Authorization':'Bearer ' + accessToken,
			}
    });
    if (response.ok) {
      const todoData = await response.json();
			setTasks(todoData);
			console.log(todoData);
			console.log(todoData[0].title);
			console.log("Get successful")
		
    }
		else{
			console.log("Get failed: " + response)
		}
  }

  const [tasks, setTasks] = useState<item[]>([]);

  function setTasksAndSave(newTasks: item[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle:string) {
		const nTask = [...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }]
    setTasksAndSave(nTask);
  }

  function deleteTaskById(taskId:string) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }


  function toggleTaskCompletedById(taskId:string) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
		<>
			<Header handleAddTask={addTask} />
			<Tasks
				tasks={tasks}
				onDelete={deleteTaskById}
				onComplete={toggleTaskCompletedById}
			/>
		</>
  )
}

export default Todo