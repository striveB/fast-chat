<script lang="ts" setup>
import { chatStore } from '../../store/chat';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();
const chat = chatStore();
function logout() {
	chat.logout();
	router.push('/');
	message.info('退出登录！');
}
</script>
<template>
	<div class="sideLeft" v-if="chat.userInfo">
		<div class="userInfo">
			<a-avatar :size="64" icon="user" :src="chat.userInfo.avatar" />
			<h1 class="userName">{{ chat.userInfo.userName }}</h1>
		</div>
		<a-button style="width: 100%" @click="logout()">退出登录</a-button>
	</div>
</template>
<style lang="less" scoped>
h1 {
	margin-bottom: 0;
}
.sideLeft {
	.userInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0;
		/deep/ .ant-avatar {
			cursor: pointer;
			img {
				transition: 0.5s;
			}
			&:hover {
				img {
					transform: scale(1.3) rotate(-360deg * 2);
				}
			}
		}
	}
}
</style>
