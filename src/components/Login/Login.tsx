import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LOCAL_STORAGE_KEY1 = 'todo:register';

interface user {
	id: number;
	username: string;
	password: string;
}

export const Login = () => {
	const [users, setUsers] = useState<user[]>([])

	function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY1);
    if(saved) {
      setUsers(JSON.parse(saved));
    }
  }

	useEffect(() => {
    loadSavedTasks();
  }, [])

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	
	function onChangeUsername(event: React.ChangeEvent<HTMLInputElement> & {
		target: HTMLFormElement
	}) {
    setUser(event.target.value);
  }
  
	function onChangePassword(event: React.ChangeEvent<HTMLInputElement> & {
		target: HTMLFormElement
	}) {
    setPass(event.target.value);
  }

	let navigate = useNavigate();

	const notify = () => toast.error('Invalid Username or Password', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	var flag: boolean = true;

	function handleSubmit(event: React.FormEvent<HTMLFormElement> & {
		target: HTMLFormElement
	}) {
		event.preventDefault()
		if(users.map(u => {
      if(u.username === user && u.password === pass) {
				console.log("login successful")
				flag = false;
				navigate("/todo");
      }
    }))
		if(flag) {
			notify();
		}
  }

	return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.loginContainer}>
				<div className={styles.wrapper}>
					<div className={styles.title}>
						Login
					</div>
					<form onSubmit={handleSubmit} className={styles.formLogin}>
						<div className={styles.field}>
							<input className={styles.loginInput} type="text" onChange={onChangeUsername} value={user} required />
							<label>Username</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="password" onChange={onChangePassword} value={pass} required />
							<label>Password</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="submit" value="Login" />
						</div>
						<ToastContainer />
						<div className={styles.signup_link}>
							Not a user? <a className={styles.anchorlogin} href="/register">Signup now</a>
						</div>
					</form>
				</div>
			</header>
		</div>
	)
}
