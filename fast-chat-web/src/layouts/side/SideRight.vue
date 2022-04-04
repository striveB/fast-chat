<script setup lang="ts">
import { chatStore } from '../../store/chat';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const chat = chatStore();
const router = useRouter();
function toChat(userId: string) {
	router.push(`/chat-panel/${userId}`);
	createRoom(userId);
}
function createRoom(friendId: string) {
	//进入聊天界面后建立好友聊天房间
	chat.socket.emit(
		'createFriendRoom',
		{
			userId: chat?.userInfo?.userId,
			friendId
		},
		(res: any) => {
			let { code, msg } = res;
			if (code === 200) {
				// aMessage.info(msg);
			} else {
				message.error(msg);
			}
			console.log(res);
		}
	);
}
</script>
<template>
	<div class="sideRight">
		<ul class="friedGroup">
			<li
				class="friend"
				v-for="(user, index) in chat.friends"
				:key="index"
				@click="toChat(user.userId)"
			>
				<a-avatar icon="F" :src="user.avatar"></a-avatar>
				{{ user.userName }}
			</li>
		</ul>
	</div>
</template>
<style lang="less" scoped>
.sideRight {
	.friedGroup {
		.friend {
			cursor: pointer;
			padding: 5px;
			border-radius: 5px;
			font-weight: bold;
			border-bottom: 1px solid @primary-color-2;
			transition: all 0.3s;
			color: @primary-color-7;
			&:hover {
				background-color: @primary-color-2;
				color: black;
			}
		}
	}
}
</style>
