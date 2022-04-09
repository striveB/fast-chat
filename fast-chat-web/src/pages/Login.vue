<script setup lang="ts">
import { chatStore } from '../store/chat';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { login } from '../services/apis/user';
import { message } from 'ant-design-vue';
import cookie from 'js-cookie';

const chat = chatStore();
const router = useRouter();
let loginParams = reactive({
	userName: '',
	userPassword: ''
});

function toLogin() {
	login(loginParams).then((res: any) => {
		let { code, msg, data } = res;
		let { user, token } = data;
		if (code === 200) {
			message.success(msg);
			chat.connectSocket(user);
			cookie.set('token', token);
			router.push({
				path: '/weclome'
			});
		} else {
			message.error(msg);
		}
	});
}
</script>
<template>
	<div class="weclome">
		<a-input
			v-model:value="loginParams.userName"
			placeholder="请输入账号名称"
		/>
		<a-input
			v-model:value="loginParams.userPassword"
			placeholder="请输入密码"
		/>
		<a-button @click="toLogin">进入聊天室</a-button>
	</div>
</template>
<style lang="less" scoped>
.weclome {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	input {
		text-align: center;
	}
}
</style>
