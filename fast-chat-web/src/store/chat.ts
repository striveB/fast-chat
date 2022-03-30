import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
interface chatState {
	socket: Socket | null;
	msg: string;
}
export const chatStore = defineStore('chatStore', {
	state(): chatState {
		return {
			socket: null,
			msg: ''
		};
	},
	actions: {
		connectSocket() {
			const socket: Socket = io('', {
				query: {
					userId: '123'
				}
				// reconnection: true
			});
			socket.on('connect', async () => {
				console.log('连接成功');
				// 获取聊天室所需所有信息
				socket.emit('chatData', { name: 'jun233s' });
				this.socket = socket;
			});
			socket.on('msg', async (data: { msg: '' }) => {
				this.msg = data.msg;
				console.log(data);
			});

			socket.on('disconnect', async () => {
				console.log('断开了连接...');
			});
		}
	}
});
