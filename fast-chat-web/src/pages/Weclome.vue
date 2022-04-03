<script lang="ts" setup>
import { chatStore } from '../store/chat';
const chat = chatStore();
// if (!chat.socket) {
// 	//连接socket
// 	chat.connectSocket();
// }
</script>
<template>
	<div class="weclome">
		<h1>晚上好！{{ chat.userInfo?.userName }}💦</h1>
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
