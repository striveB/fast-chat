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
	<div class="sideLeft">
		<div class="userInfo" v-if="chat.userInfo">
			<h1 class="userName">{{ chat.userInfo.userName }}</h1>
			<a-button style="width: 100%" @click="logout()">退出登录</a-button>
		</div>
	</div>
</template>
<style lang="less" scoped>
.sideLeft {
	.userName {
		text-align: center;
	}
}
</style>
