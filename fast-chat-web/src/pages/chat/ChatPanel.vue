<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { chatStore } from '../../store/chat';
const route = useRoute();
const chat = chatStore();
chat.connectSocket();
let context = ref('');
const messages = ref([]);
function send() {
	console.log(context.value, messages.value);
}
</script>
<template>
	<div class="chatpanel">
		<h1>聊天面板{{ route.params.fCode + chat.msg }}</h1>
		<ul>
			<li v-for="(msg, index) in messages" :key="index">{{ msg.context }}</li>
		</ul>
		<input v-model="context" />
		<button @click="send">发送</button>
	</div>
</template>
