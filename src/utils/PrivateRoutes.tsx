import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from '../utils/Auth';

export const PrivateRoutes = () => {
	const { token } = useAuth();
return (
    !token ? <Outlet/> : <Navigate to='/login'/>
  )
}

