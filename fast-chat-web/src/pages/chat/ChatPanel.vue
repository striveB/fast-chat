<script lang="ts" setup>
import { message as aMessage } from 'ant-design-vue';
import { ref, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { chatStore } from '../../store/chat';
import MsgWindow from './MsgWindow.vue';
const route = useRoute();
const chat = chatStore();
let content = ref('');
let sending = ref(false);
let msgEl = ref<HTMLElement>();

let friendId = route.params.fCode as string;
//首次进入聊天界面时创建房间
if (friendId) {
	chat.createRoom(friendId);
}
function send() {
	if (sending.value) {
		return;
	}
	sending.value = true;
	let message: Message = {
		userId: chat.userInfo?.userId || '',
		friendId,
		content: content.value
	};
	content.value = '';
	chat.socket.emit('chatMessage', message, (res: ReqBody) => {
		let { code, msg } = res;
		if (code != 200) {
			aMessage.error(msg);
		}
		sending.value = false;
	});
}
onBeforeUnmount(() => {
	chat.messages = [];
});
</script>
<template>
	<div class="chatPanel">
		<div class="messages" ref="msgEl" id="msgEl">
			<MsgWindow :messages="chat.messages" :friend="chat.chatFriend" />
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
		overflow-y: auto;
		overflow-x: hidden;
	}
	.footer {
		.msgSend {
			display: flex;
		}
	}
}
</style>
