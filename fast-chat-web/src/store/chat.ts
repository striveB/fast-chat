import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import { io, Socket } from 'socket.io-client';
import { findMessages } from '../services/apis/user';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
import cookie from 'js-cookie';
interface chatState {
	socket: Socket | null;
	messages: Message[];
	userInfo: User | null;
	friends: User[];
	chatFriend: User | undefined | null;
	[key: string]: any;
}
export const chatStore = defineStore('chatStore', {
	state(): chatState {
		return {
			socket: null,
			messages: [],
			userInfo: null,
			friends: [],
			chatFriend: null,
			router: useRouter()
		};
	},
	actions: {
		connectSocket(userInfo: User | null) {
			if (userInfo) {
				localStorage.setItem('userInfo', JSON.stringify(userInfo));
			}
			this.userInfo =
				JSON.parse(localStorage.getItem('userInfo') || '') || this.userInfo;
			const socket: Socket = io('', {
				query: {
					userId: this.userInfo?.userId
				},
				reconnection: true
			});
			socket.on('connect', async () => {
				console.log('连接成功');
				this.socket = socket;
			});
			//获取用户所有好友
			socket.on('friends', async (res: any) => {
				const { code, msg, data: friends } = res;
				if (code === 200) {
					console.log('获取所有好友：', friends);
					this.friends = friends;
				} else {
					message.error(msg);
				}
			});

			socket.on('chatMessage', async (res: any) => {
				const { code, data: message } = res;
				if (code === 200) {
					this.messages.push(message);
					this.scrollToBottom();
				}
			});

			socket.on('disconnect', async () => {
				console.log('断开了连接...');
			});
		},
		createRoom(friendId: string) {
			//进入聊天界面后建立好友聊天房间
			this.socket.emit(
				'createFriendRoom',
				{
					userId: this.userInfo?.userId,
					friendId
				},
				(res: any) => {
					const { code, msg } = res;
					if (code === 200) {
						// aMessage.info(msg);
					} else {
						message.error(msg);
					}
				}
			);
			//获取与好友的消息
			findMessages({ userId: this.userInfo?.userId as string, friendId }).then(
				(res: any) => {
					console.log(res);
					const { code, data: messages } = res;
					if (code === 200) {
						this.messages = messages;
						this.scrollToBottom();
						this.findChatFriend(friendId);
					}
				}
			);
		},
		//获取正在聊天的好友信息
		findChatFriend(friendId: string) {
			this.chatFriend = this.friends.find(fr => fr.userId == friendId);
			if (!this.chatFriend) {
				this.router.push('/');
			}
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
			cookie.set('token', '');
			localStorage.removeItem('userInfo');
		},
		scrollToBottom() {
			nextTick(() => {
				const msgEl = document.getElementById('msgEl');
				msgEl?.scrollTo(0, msgEl?.scrollHeight);
			});
		}
	}
});
