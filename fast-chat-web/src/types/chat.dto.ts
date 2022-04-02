declare module 'socket.io-client';
interface ReqBody {
	code: number;
	msg: string;
	data: string;
}
interface Message {
	userId: string;
	friendId: string;
	content: string;
}
interface User {
	userId: string;
	userName: string;
}
