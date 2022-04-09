import { AxiosRequestConfig, AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export const requestSuccess = (
	request: AxiosRequestConfig
): AxiosRequestConfig => {
	request.headers.token = cookie.get('token');
	return request;
};

export const requestFail = (error: AxiosRequestConfig): Promise<never> => {
	return Promise.reject(error);
};

export const responseSuccess = (response: AxiosResponse): AxiosResponse => {
	const result = response.data;
	const { code, msg } = result;
	if (code === 401) {
		message.warning(msg);
	}
	return result;
};

export const responseFail = (error: AxiosResponse): Promise<never> => {
	return Promise.reject(error);
};
