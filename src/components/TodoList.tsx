import {useState} from "react"

interface item {
	id: number;
	text: string;
	completed: boolean;
}

export const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<item[]>([
		{id: 1, text:"Test 1", completed: false},
		{id: 2, text:"Test 2", completed: true},
	])

	const [input, setInput] = useState<string>("")

	const handleToggle = (id: number) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) {
					return {...todo, completed: !todo.completed}
				}
				return todo
			})
		)
	}

	const handleSubmit = () => {
		const newTodo: item = {id: Date.now(), completed: false, text: input} 
		setTodos([...todos, newTodo])
	}

	return (
		<div className="main-container">
			<h1>Todo List</h1>
			<input type="text" placeholder=" Add a new Todo" onChange={(e)=> setInput(e.target.value)} />
			<button onClick={handleSubmit} >Add Todo</button>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id} onClick={()=> handleToggle(todo.id)} style={{textDecoration: todo.completed ? "line-through" : "none"}} >{todo.text}</li>
				))}
			</ul>
		</div>
	)
}
