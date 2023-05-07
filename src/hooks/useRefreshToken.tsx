import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth }:any = useAuth();
		const auth = localStorage.getItem('refresh');
		console.log(auth);
    const refresh = async () => {
        const response = await axiosPrivate.get('token/refresh/', {
        });
        setAuth((prev: any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access);
            return { ...prev, accessToken: response.data.access }
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;