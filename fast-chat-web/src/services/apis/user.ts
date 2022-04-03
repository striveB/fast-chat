import request from '../index';
export async function login(params: {
	userName: string;
	userPassword: string;
}): Promise<void> {
	return await request.get('/user/login', { params });
}
