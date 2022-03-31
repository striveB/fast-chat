<script lang="ts" setup>
import { message as aMessage } from 'ant-design-vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { chatStore } from '../../store/chat';
const route = useRoute();
const chat = chatStore();
let context = ref('');
function send() {
	let message: Message = {
		userId: chat.userInfo?.userId || '',
		friendId: route.params.fCode + '',
		context: context.value
	};
	chat.socket.emit('chatMessage', message, (res: string) => {
		aMessage.info(res);
	});
}
</script>
<template>
	<div class="chatPanel">
		<div class="messages">
			<ul>
				<transition-group name="fade">
					<li v-for="(msg, index) in chat.messages" :key="index">
						{{ msg.context }}
					</li>
				</transition-group>
			</ul>
		</div>
		<div class="footer">
			<div class="tools"></div>
			<div class="msgSend">
				<a-input v-model="context" />
				<a-button @click="send">发送</a-button>
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
