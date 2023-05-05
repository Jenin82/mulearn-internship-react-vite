import {useEffect, useState} from "react"
import styles from './register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	const [pass1, setPass1] = useState('');

	const resetForm = () => {
    setUser("")
    setPass("")
    setPass1("")
  }

	const notify1 = () => toast.error('Username already exists, try another one.', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});
	
		const notify2 = () => toast.success('Registed successfully, Login to continue.', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});
		
		const notify3 = () => toast.error('Passwords don\'t match', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	var flag: boolean = false;

  function handleSubmit(event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) {
    event.preventDefault();
		if(users.map(u => {
      if(u.username === user) {
				flag = true;
      }
    }))
		if(flag) {
			notify1();
		}
		else {
			if(pass === pass1) {
				notify2();
				addUser(user, pass);
			}
			else {
				notify3();
			}
		}
		resetForm();
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
	function onChangePassword1(event: React.ChangeEvent<HTMLInputElement> & {target: HTMLFormElement}) {
    setPass1(event.target.value);
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
							<input className={styles.loginInput} type="password" onChange={onChangePassword1} value={pass1} required />
							<label>Confirm Password</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="submit" value="Register" />
						</div>
						<div className={styles.signup_link}>
							Already a user? <a className={styles.anchorlogin} href="/login">Login here</a>
						</div>
						<ToastContainer />
					</form>
				</div>
			</header>
		</div>
  )
}