import { Register } from "./components/Register/Register";
import { Route, Navigate, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Login } from "./components/Login/Login";
import Todo from "./components/Todo/Todo";
import { PrivateRoutes } from "./utils/PrivateRoutes";

function App() {
  return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes/>}>
					<Route path='/' element={<Todo/>} />
					<Route path='/todo' element={<Todo/>} />
        </Route>
				{/* <Route path='/todo' element={authUser? <Todo/>: <Navigate to="/login" />} /> */}
				<Route path='/register' element={<Register />} />
				{/* <Route path="/" element={authUser? <Navigate to="/todo" />: <Navigate to="/login" />}></Route> */}
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>
  )
}

export default App