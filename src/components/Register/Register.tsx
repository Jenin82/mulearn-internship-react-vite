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
    <header className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<div className={styles.headerText}>
					<h1 className={styles.Text}>Register</h1>
			</div>
			<div className={styles.form_container} >
				<form onSubmit={handleSubmit} className={styles.form1}>
					<input className={styles.input1} placeholder=" Enter a username" type="text" onChange={onChangeUsername} value={user} />
					<input className={styles.input1} placeholder=" Enter your Password" type="password" onChange={onChangePassword} value={pass} />
					<input className={styles.input1} placeholder=" Confirm your Password" type="password" />
					<button className={styles.btnReg}>Register</button>
				</form>
			</div>
    </header>
  )
}