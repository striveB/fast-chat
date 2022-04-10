import request from '../index';
interface loginParams {
	userName: string;
	userPassword: string;
}
//登录
export async function login(params: loginParams): Promise<void> {
	return await request.post('/auth/login', params);
}
//注册
export async function register(params: loginParams): Promise<void> {
	return await request.post('/auth/register', params);
}
//获取与好友的信息
export async function findMessages(params: {
	userId: string;
	friendId: string;
}): Promise<void> {
	return await request.get('/message', { params });
}

//获取所有好友
export async function findFriends(params: { userId: string }): Promise<void> {
	return await request.get('user/friends', { params });
}
