import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth }:any = useAuth();
    const refresh = async () => {
        const response = await axiosPrivate.get('token/refresh/', {
					headers: { "Content-Type": 'multipart/form-data'}
        });
        setAuth((prev: any) => {
            console.log(prev);
            console.log(response.data.access);
            return { ...prev, accessToken: response.data.access, refreshToken: response.data.refresh}
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;