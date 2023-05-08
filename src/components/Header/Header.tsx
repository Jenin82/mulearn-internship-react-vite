import { AxiosError } from 'axios';
import { axiosPrivate } from '../../api/axios';
import styles from './header.module.css';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const TODO_URL = 'todo/'

export function Header({ handleAddTask }:any) {

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

	const {auth}:any = useAuth();
  const [title, setTitle] = useState('');

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
				notify0();
			} 
			catch (err: unknown) {
				const error = err as AxiosError;
				if (error?.response) {
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

  return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.header}>
				<div className={styles.headerText}>
					<h1 className={styles.Text}>TODO</h1>
				</div>
				<form onSubmit={handleSubmit} className={styles.newTaskForm}> 
					<input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} />
				</form>
			</header>
		</div>
  )
}