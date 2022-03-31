declare module 'socket.io-client';
interface Message {
	userId: string;
	friendId: string;
	context: string;
}
interface User {
	userId: string;
	userName: string;
}
