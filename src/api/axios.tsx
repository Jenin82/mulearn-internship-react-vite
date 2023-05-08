import axios from "axios";

const baseURL = 'https://mulearn-internship-task-production.up.railway.app/api/'

export const axiosGlobal = axios.create({
	baseURL,
	// headers: {Authorization: `Bearer ${authToken.access}`}
	headers: { 'Content-Type': 'application/json' },
})
export default axiosGlobal

export const axiosPrivate = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
});