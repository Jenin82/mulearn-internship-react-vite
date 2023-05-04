import { Register } from "./components/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Todo from "./components/Todo";
import { Login } from "./components/Login";

function App() {
  return (
		<Router>
			<Routes>
				<Route path='/todo' element={<Todo />} />
				<Route path='/' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
  )
}

export default App