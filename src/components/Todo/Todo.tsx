import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Tasks } from "../Tasks/Tasks";

const LOCAL_STORAGE_KEY = 'todo:tasks';

interface item {
	id: number;
	title: string;
	isCompleted: boolean;
}

function Todo() {
  const [tasks, setTasks] = useState<item[]>([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks: any) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function addTask(taskTitle:string) {
    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }]);
  }

  function deleteTaskById(taskId:number) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }


  function toggleTaskCompletedById(taskId:number) {
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