import {useEffect, useState} from "react"
import {useNavigate } from 'react-router-dom'

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

  function handleSubmit(event:any) {
    event.preventDefault();
		navigate("/login");
    addUser(user, pass);
    setUser('');
  }

  function onChangeUsername(event:any) {
    setUser(event.target.value);
  }
  
	function onChangePassword(event:any) {
    setPass(event.target.value);
  }

  return (
    <header className={''}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={''}>
        <input placeholder="Enter a username" type="text" onChange={onChangeUsername} value={user} />
        <input placeholder="Enter your Password" type="password" onChange={onChangePassword} value={pass} />
        <input placeholder="Confirm your Password" type="password" />
        <button>Register</button>
      </form>
    </header>
  )
}