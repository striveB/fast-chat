import request from '../index';
//登录
export async function login(params: {
	userName: string;
	userPassword: string;
}): Promise<void> {
	return await request.get('/user/login', { params });
}
//获取与好友的信息
export async function findMessages(params: {
	userId: string;
	friendId: string;
}): Promise<void> {
	return await request.get('/message', { params });
}
