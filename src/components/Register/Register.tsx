import {useEffect, useState} from "react"
import {useNavigate } from 'react-router-dom'
import styles from './register.module.css';


const LOCAL_STORAGE_KEY1 = 'todo:register';

interface user {
	id: number;
	username: string;
	password: string;
}

type newUser = (
  user
  | {
      id: `${string}-${string}-${string}-${string}-${string}`;
      username: string;
      password: string;
    }
)[];

export const Register: React.FC = () => {
	const [users, setUsers] = useState<newUser>([])

	function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY1);
    if(saved) {
      setUsers(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newUsers: newUser) {
    setUsers(newUsers);
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(newUsers));
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])


	function addUser(userName:string, userPass:string) {
		const newUsers = [...users, {
      id: crypto.randomUUID(),
      username: userName,
      password: userPass
    }]
    setTasksAndSave(newUsers);
  }

	let navigate = useNavigate();

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement> & {
		target: HTMLFormElement
	}) {
    event.preventDefault();
		navigate("/login");
    addUser(user, pass);
    setUser('');
  }

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

  return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.loginContainer}>
				<div className={styles.wrapper}>
					<div className={styles.title}>
						Register
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
							<input className={styles.loginInput} type="password" required />
							<label>Confirm Password</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="submit" value="Login" />
						</div>
						<div className={styles.signup_link}>
							Already a user? <a className={styles.anchorlogin} href="/login">Login here</a>
						</div>
					</form>
				</div>
			</header>
		</div>
  )
}