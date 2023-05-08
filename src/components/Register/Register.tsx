import {useState} from "react"
import styles from './register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from "axios";
import axiosGlobal from "../../api/axios";
import { useNavigate } from 'react-router-dom';

const REGISTER_URL = 'register/';
export const Register: React.FC = () => {

	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	const [pass1, setPass1] = useState('');



	const notify1 = () => toast.error('Username already exists, try another one.', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});
	
		const notify2 = () => toast.success('Registed successfully, Login to continue.', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});
		
		const notify3 = () => toast.error('Passwords don\'t match', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

		const notify4 = () => toast.error('No Server Response', {
		position: "bottom-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		});

	let navigate = useNavigate();
	
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> & {target: HTMLFormElement}) => {
    event.preventDefault();
		if(pass === pass1) {
			try {
					const response = await axiosGlobal.post(REGISTER_URL,
							JSON.stringify({ username: user, password: pass }),
							{
									headers: { 'Content-Type': 'application/json' },
							}
					);
					console.log(response);
					console.log(response?.data);
					console.log(JSON.stringify(response))
					setUser('');
					setPass('');
					setPass1('');
					notify2();
					setTimeout(() => {
						navigate("/login");
					}, 3000);

			} 
			catch (err: unknown) {
				const error = err as AxiosError;
				if (!error?.response) {
					console.log('No Server Response');
					notify4();
				}
				else {
					console.log('Registration Failed')
					console.log(error.response)
					notify1();
				}
			}
		}
		else {
			notify3();
		}
	}

  function onChangeUsername(event: React.ChangeEvent<HTMLInputElement> & {
		target: HTMLFormElement
	}) {
    setUser(event.target.value);
  }
  
	function onChangePassword(event: React.ChangeEvent<HTMLInputElement> & {
		target: HTMLFormElement
	}) {
    setPass(event.target.value);
  }
	function onChangePassword1(event: React.ChangeEvent<HTMLInputElement> & {target: HTMLFormElement}) {
    setPass1(event.target.value);
  }

  return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.loginContainer}>
				<div className={styles.wrapper}>
					<div className={styles.title}>
						Register
					</div>
					<form onSubmit={handleSubmit} className={styles.formLogin}>
						<div className={styles.field}>
							<input className={styles.loginInput} type="text" onChange={onChangeUsername} value={user} required />
							<label>Username</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="password" onChange={onChangePassword} value={pass} required />
							<label>Password</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="password" onChange={onChangePassword1} value={pass1} required />
							<label>Confirm Password</label>
						</div>
						<div className={styles.field}>
							<input className={styles.loginInput} type="submit" value="Register" />
						</div>
						<div className={styles.signup_link}>
							Already a user? <a className={styles.anchorlogin} href="/login">Login here</a>
						</div>
						<ToastContainer />
					</form>
				</div>
			</header>
		</div>
  )
}