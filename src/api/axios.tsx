import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/'

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