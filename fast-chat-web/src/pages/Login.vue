<script setup lang="ts">
import { chatStore } from '../store/chat';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { login, register } from '../services/apis/user';
import { message } from 'ant-design-vue';
import { settingStore } from '../store/setting';
import cookie from 'js-cookie';
const setting = settingStore();
const submitType = ref('login');
const chat = chatStore();
const router = useRouter();
const buttonText = ref('进入聊天室');
const logining = ref(false);
let loginParams = reactive({
	userName: '',
	userPassword: ''
});
function changeType(key: string) {
	submitType.value = key;
	if (key === 'login') {
		buttonText.value = '进入聊天室';
	} else if (key === 'register') {
		buttonText.value = '注册';
	}
}
function submit() {
	logining.value = true;
	if (submitType.value === 'login') {
		toLogin();
	} else if (submitType.value === 'register') {
		toRegister();
	}
}
function toLogin() {
	login(loginParams).then((res: any) => {
		toSystem(res);
	});
}
//注册
function toRegister() {
	register(loginParams).then((res: any) => {
		toSystem(res);
	});
}

//进入系统
function toSystem(res: any) {
	let { code, msg, data = {} } = res;
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
	logining.value = false;
}
</script>
<template>
	<div class="login">
		<a-tabs @change="changeType">
			<a-tab-pane key="login">
				<template #tab> 登录 </template>
			</a-tab-pane>
			<a-tab-pane key="register">
				<template #tab> 注册 </template>
			</a-tab-pane>
		</a-tabs>
		<div class="subForm" :class="{ isMobile: setting.isMobile }">
			<a-input
				v-model:value="loginParams.userName"
				placeholder="请输入账号名称"
			/>
			<a-input
				v-model:value="loginParams.userPassword"
				placeholder="请输入密码"
			/>
			<a-button @click="submit" :loading="logining">{{ buttonText }}</a-button>
		</div>
	</div>
</template>
<style lang="less" scoped>
.login {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.subForm {
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		input {
			margin: 5px 0;
			text-align: center;
		}
		&.isMobile {
			width: 100%;
		}
	}
}
</style>
