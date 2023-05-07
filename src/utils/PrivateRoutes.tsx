import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
	var auth:boolean = false
	return (
    !auth ? <Outlet/> : <Navigate to='/login'/>
  )
}

