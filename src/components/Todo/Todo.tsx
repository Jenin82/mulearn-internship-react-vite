import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Tasks } from "../Tasks/Tasks";
import { axiosPrivate } from "../../api/axios";
import useAuth from '../../hooks/useAuth';
import { AxiosError } from "axios";


const TODO_URL = 'todo/'

interface item {
	id: string;
	title: string;
	isCompleted: boolean;
}

function Todo() {
	
	const [tasks, setTasks] = useState<item[]>([]);
	const {auth}:any = useAuth();


	const getTodo = async () => {
		try {
			const response = await axiosPrivate.get(TODO_URL,
					{
						headers: { 
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + auth.accessToken
						}
					}
			);
			const todo:any = (response?.data)
			console.log(todo)
			setTasks(todo);
			console.log(Array.isArray(todo))
		
		} 
		catch (err: unknown) {
			const error = err as AxiosError;
			if (!error?.response) {
					console.log('No Server Response');
			} else if (error.response?.status === 401) {
					console.log(error.response);
			} else {
					console.log('Get Todo Failed');
			}
		}
	}

	useEffect(() => {
		getTodo();
	}, []);


	const deleteTodo = async (taskId:string) => {
		try {
			const response = await axiosPrivate.delete('todo/' + taskId + '/',
					{ 
						headers: { 
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': 'Bearer ' + auth.accessToken
						}
					}
			);
			const todo:any = (response?.data)
			console.log(todo)
		} 
		catch (err: unknown) {
			const error = err as AxiosError;
			if (!error?.response) {
					console.log('No Server Response');
			} else if (error.response?.status === 401) {
					console.log(error.response);
			} else {
					console.log('PUT Todo Failed');
			}
		}
		getTodo();
	}


  function deleteTaskById(taskId:string) {
    deleteTodo(taskId);
  }



	const putTodo = async (taskId:string) => {
		try {
			const response = await axiosPrivate.put('todo/' + taskId + '/',
					{},
					{ 
						headers: { 
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': 'Bearer ' + auth.accessToken
						}
					}
			);
			const todo:any = (response?.data)
			console.log(todo)
		} 
		catch (err: unknown) {
			const error = err as AxiosError;
			if (!error?.response) {
					console.log('No Server Response');
			} else if (error.response?.status === 401) {
					console.log(error.response);
			} else {
					console.log('PUT Todo Failed');
			}
		}
		getTodo();
	}

  function toggleTaskCompletedById(taskId:string) {
    putTodo(taskId);
  }

  return (
		<>
			<Header handleAddTask={getTodo} />
			{tasks && tasks.length > 0 && <Tasks
				tasks={tasks}
				onDelete={deleteTaskById}
				onComplete={toggleTaskCompletedById}
			/>}
		</>
  )
}

export default Todo