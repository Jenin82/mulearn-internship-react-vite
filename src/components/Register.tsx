import {useState} from "react"
import {useNavigate } from 'react-router-dom'


interface user {
	username: string;
	password: string;
}

export const Register: React.FC = () => {
	const [users, setUsers] = useState<user[]>([
		{username:"jenin", password: "123"},
		{username:"alan", password: "123"},
	])

	const [input1, setInput1] = useState<string>("")
	const [input2, setInput2] = useState<string>("")

	let navigate = useNavigate();

	const handleSubmit = () => {
		const newUser: user = {username: input1, password: input2} 
		setUsers([...users, newUser])
		console.log(newUser.username)
		console.log(newUser.password)
	}

	return (
    <div className="main-container">
      <h1>Register</h1>
      <form
        action=""
        id="register"
        name="register"
        onSubmit={() => {
          navigate("/");
        }}
      >
        <input
          type="text"
          id="register"
          name="register"
          placeholder=" Username"
          form="register"
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="password"
          placeholder=" Password"
          form="register"
          onChange={(e) => setInput2(e.target.value)}
        />
        <button form="register" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}


