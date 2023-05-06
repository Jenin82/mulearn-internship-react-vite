import { Register } from "./components/Register/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Login } from "./components/Login/Login";
import Todo from "./components/Todo/Todo";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route element={<PrivateRoutes/>}>
						<Route path='/' element={<Todo/>} />
						<Route path='/todo' element={<Todo/>} />
					</Route>
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</AuthProvider>
		</Router>
  )
}

export default App