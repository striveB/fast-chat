import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const requestSuccess = (
	request: AxiosRequestConfig
): AxiosRequestConfig => {
	return request;
};

export const requestFail = (error: AxiosRequestConfig): Promise<never> => {
	return Promise.reject(error);
};

export const responseSuccess = (response: AxiosResponse): AxiosResponse => {
	return response.data;
};

export const responseFail = (error: AxiosResponse): Promise<never> => {
	return Promise.reject(error);
};
