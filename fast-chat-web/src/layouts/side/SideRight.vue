<script setup lang="ts">
import { chatStore } from '../../store/chat';
import { useRouter } from 'vue-router';
const chat = chatStore();
const router = useRouter();
function toChat(userId: string) {
	router.push(`/chat-panel/${userId}`);
	chat.createRoom(userId);
}
</script>
<template>
	<div class="sideRight">
		<h3>🤞 好友列表</h3>
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
	h3 {
		text-align: center;
		border-bottom: 1px solid @primary-color-3;
		padding-bottom: 10px;
		font-weight: bold;
	}
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
