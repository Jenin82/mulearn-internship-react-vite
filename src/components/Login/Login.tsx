import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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


	function handleSubmit(event: React.FormEvent<HTMLFormElement> & {
		target: HTMLFormElement
	}) {
		event.preventDefault()
		users.map(u => {
      if(u.username === user && u.password === pass) {
				console.log("login successful")
				navigate("/todo");
      }
    })
  }

	return (
		<header className={''}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={''}>
        <input placeholder="Enter a username" type="text" onChange={onChangeUsername} value={user} />
        <input placeholder="Enter your Password" type="password" onChange={onChangePassword} value={pass} />
        <button>Login</button>
      </form>
    </header>
	)
}
