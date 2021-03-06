import { requestSuccess, responseSuccess } from './interceptors';
import axios, { AxiosInstance } from 'axios';

const request: AxiosInstance = axios.create({
	timeout: 5000,
	baseURL: '/api'
});

request.interceptors.request.use(requestSuccess);
request.interceptors.response.use(responseSuccess);

export default request;
