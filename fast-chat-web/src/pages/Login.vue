<script setup lang="ts">
import { chatStore } from '../store/chat';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';

const chat = chatStore();
const router = useRouter();
let userInfo = reactive({
	userId: '',
	userName: ''
});
function goChat() {
	chat.setUserInfo(userInfo);
	router.push({
		path: '/weclome'
	});
}
</script>
<template>
	<div class="weclome">
		<a-input v-model:value="userInfo.userId" placeholder="请输入账号id" />
		<a-input v-model:value="userInfo.userName" placeholder="请输入账号名称" />
		<a-button @click="goChat">进入聊天室</a-button>
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
