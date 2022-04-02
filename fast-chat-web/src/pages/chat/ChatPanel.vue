<script lang="ts" setup>
import { message as aMessage } from 'ant-design-vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { chatStore } from '../../store/chat';
import MsgWindow from './MsgWindow.vue';
const route = useRoute();
const chat = chatStore();
let content = ref('');
let sending = ref(false);
function send() {
	if (sending.value) {
		return;
	}
	sending.value = true;
	let message: Message = {
		userId: chat.userInfo?.userId || '',
		friendId: route.params.fCode + '',
		content: content.value
	};
	chat.messages.push(message);
	content.value = '';
	chat.socket.emit('chatMessage', message, (res: ReqBody) => {
		let { code, msg } = res;
		if (code == 200) {
			aMessage.info(msg);
		} else {
			aMessage.error(msg);
		}
		sending.value = false;
	});
}
</script>
<template>
	<div class="chatPanel">
		<div class="messages">
			<msg-window :messages="chat.messages"></msg-window>
		</div>
		<div class="footer">
			<div class="msgSend">
				<a-input v-model:value="content" />
				<a-button @click="send" :disabled="sending">{{
					sending ? '发送中...' : '发送'
				}}</a-button>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.chatPanel {
	height: 100%;
	display: flex;
	flex-direction: column;
	.messages {
		flex: 1;
	}
	.footer {
		.msgSend {
			display: flex;
		}
	}
}
</style>
