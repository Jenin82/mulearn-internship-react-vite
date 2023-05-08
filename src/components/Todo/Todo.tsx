import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Tasks } from "../Tasks/Tasks";
import { axiosPrivate } from "../../api/axios";
import useAuth from '../../hooks/useAuth';
import { AxiosError } from "axios";
import { toast } from "react-toastify";


const TODO_URL = 'todo/'

interface item {
	id: string;
	title: string;
	isCompleted: boolean;
}

function Todo() {

	const notify0 = () => toast.success('Success', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});
	
	const notify1 = () => toast.error('Failed to Update status of TODO', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	const notify2 = () => toast.error('Failed to delete TODO', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	const notify3 = () => toast.error('Failed to load TODOs', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	const notify4 = () => toast.error('No Server Response', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

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
					notify4();
				} 
				else {
					console.log('Get Todo Failed');
					console.log(error.response);
					notify3();
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
			notify0();
		} 
		catch (err: unknown) {
			const error = err as AxiosError;
			if (!error?.response) {
				console.log('No Server Response');
				notify4();
			} 
			else {
				console.log('PUT Todo Failed');
				console.log(error.response);
				notify2();
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
			notify0();
		} 
		catch (err: unknown) {
			const error = err as AxiosError;
			if (!error?.response) {
					console.log('No Server Response');
					notify4();
				}
				else {
					console.log('PUT Todo Failed');
					console.log(error.response);
					notify1();
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