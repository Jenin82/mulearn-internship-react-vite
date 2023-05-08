import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const access = localStorage.getItem("access");

const RequireAuth = () => {
	const {auth}:any = useAuth()
	//auth.accessToken = access
	const location = useLocation()
	let a = (auth.accessToken? true : false) || (access? true : false)
	return (
		a
			? <Outlet />
			: <Navigate to="/login" state={{ from: location }} replace />
	)
}

export default RequireAuth
