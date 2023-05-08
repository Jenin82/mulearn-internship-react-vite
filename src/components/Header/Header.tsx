import { AxiosError } from 'axios';
import { axiosPrivate } from '../../api/axios';
import styles from './header.module.css';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TODO_URL = 'todo/'

export function Header({ handleAddTask }:any) {

	const notify2 = () => toast.success('Success', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	const notify3 = () => toast.error('Failed to add new TODOs', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	const notify5 = () => toast.error('Session Expired, login', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	const {auth}:any = useAuth();
  const [title, setTitle] = useState('');

	let navigate = useNavigate();

  function handleSubmit(event:any) {
    event.preventDefault();
		console.log(auth.accessToken)
		const postTodo = async () => {
			try {
				const response = await axiosPrivate.post(TODO_URL,
					{
						'title': title
					},
					{
						headers: { 
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization': 'Bearer ' + auth.accessToken
						}
					}
				);

				console.log(response)
				handleAddTask(title);
				notify2();
			} 
			catch (err: unknown) {
				const error = err as AxiosError;
				if (error.response?.status === 401){
					notify5();
					localStorage.clear();
					setTimeout(() => {
						navigate("/login");
					}, 3000);
				}
				else if (error?.response) {
					console.log(error.response)
					notify3();
				}
			}
		}
		postTodo();
    setTitle('');
  }

  function onChangeTitle(event:any) {
    setTitle(event.target.value);
  }

	const {setAuth}:any = useAuth();

	function handleLogout(event:any) {
    event.preventDefault();
		localStorage.clear()
		setAuth({})
		navigate('/login')
	}

  return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.header}>
				<div className={styles.headerText}>
					<h1 className={styles.Text}>TODO</h1>
					<button className={styles.logout} onClick={handleLogout}>Logout</button>
				</div>
				<form onSubmit={handleSubmit} className={styles.newTaskForm}> 
					<input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} />
				</form>
			</header>
			<ToastContainer />
		</div>
  )
}