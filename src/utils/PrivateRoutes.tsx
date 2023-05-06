import { Outlet, Navigate } from "react-router-dom";
import {getAccessToken} from '../utils/Auth';

export const PrivateRoutes = () => {
	var auth:boolean = false
	if(getAccessToken() !== null) {
		auth = true
	}
	console.log(auth);
return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}

