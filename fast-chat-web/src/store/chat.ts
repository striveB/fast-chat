import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
interface chatState {
	socket: Socket | null;
	messages: Message[];
	userInfo: User | null;
	friends: string[];
}
export const chatStore = defineStore('chatStore', {
	state(): chatState {
		return {
			socket: null,
			messages: [],
			userInfo: null,
			friends: []
		};
	},
	actions: {
		connectSocket(userInfo: User) {
			if (userInfo) {
				localStorage.setItem('userInfo', JSON.stringify(userInfo));
			}
			this.userInfo =
				JSON.parse(localStorage.getItem('userInfo')!) || this.userInfo;
			const socket: Socket = io('', {
				query: {
					userId: this.userInfo?.userId
				},
				reconnection: true
			});
			socket.on('connect', async () => {
				console.log('连接成功');
				// 获取聊天室所需所有信息
				// socket.emit('chatData', { name: 'jun233s' });
				this.socket = socket;
			});
			//实时获取在线人数
			socket.on('online', async (userIds: string[]) => {
				console.log('获取到在线用户：', userIds);
				this.friends = userIds;
			});

			socket.on('chatMessage', async (msg: Message) => {
				this.messages.push(msg);
				console.log(msg);
			});

			socket.on('disconnect', async () => {
				console.log('断开了连接...');
			});
		},
		//登录成功后设置用户信息
		setUserInfo(userInfo: User) {
			this.userInfo = userInfo;
		},
		//推出登录
		logout() {
			this.userInfo = null;
			this.friends = [];
			this.socket.disconnect();
			this.socket = null;
			localStorage.removeItem('userInfo');
		}
	}
});
