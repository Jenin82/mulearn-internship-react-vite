import styles from './login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState} from 'react';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axiosGlobal from '../../api/axios';

const LOGIN_URL = 'token/';


export const Login = () => {
	const {setAuth}:any = useAuth();
	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');

	const location = useLocation()
	const from = location.state?.from?.pathname || '/'
	
	function onChangeUsername(event: React.ChangeEvent<HTMLInputElement> & {target: HTMLFormElement}) {
    setUser(event.target.value);
  }
  
	function onChangePassword(event: React.ChangeEvent<HTMLInputElement> & {target: HTMLFormElement}) {
    setPass(event.target.value);
  }

	let navigate = useNavigate();

	const notify = () => toast.error('Invalid Username or Password', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});


	const handleSubmit = async (event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) =>{
		event.preventDefault();
		try {
			const response = await axiosGlobal.post(LOGIN_URL,
					JSON.stringify({ username: user, password: pass }),
					// {
					// 		headers: { 'Content-Type': 'application/json' },
					// 		withCredentials: true
					// }
			);
			console.log(JSON.stringify(response?.data));
			const accessToken = response?.data?.access;
			setAuth({ user, pass, accessToken });
			setUser('');
			setPass('');
			console.log("login successful")
			navigate(from, {replace: true});
		} 
		catch (err: unknown) {
			const error = err as AxiosError;
			if (!error?.response) {
					console.log('No Server Response');
			} else if (error.response?.status === 400) {
					console.log('Missing Username or Password');
			} else if (error.response?.status === 401) {
					console.log('Unauthorized');
			} else {
					console.log('Login Failed');
			}
			notify();
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.loginContainer}>
				<div className={styles.wrapper}>
					<div className={styles.title}>
						Login
					</div>
					<form onSubmit={handleSubmit} className={styles.formLogin}>
						<div className={styles.field}>
							<input className={styles.loginInput} type="text" name="user" onChange={onChangeUsername} value={user} required />
							<label>Username</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="password" name="pass" onChange={onChangePassword} value={pass} required />
							<label>Password</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="submit" value="Login" />
						</div>
						<ToastContainer />
						<div className={styles.signup_link}>
							Not a user? <a className={styles.anchorlogin} href="/register">Signup now</a>
						</div>
					</form>
				</div>
			</header>
		</div>
	)
}
