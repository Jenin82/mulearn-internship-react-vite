import { Register } from "./components/Register/Register";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import Todo from "./components/Todo/Todo";
import { Login } from "./components/Login/Login";

function App() {
  return (
		<Router>
			<Routes>
				<Route path='/todo' element={<Todo />} />
				<Route path='/register' element={<Register />} />
				<Route path="/" element={<Navigate to="/login" />}></Route>
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
  )
}

export default App