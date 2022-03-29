<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const socket = window.io('http://localhost:3002');

let context = ref('');
const messages = reactive<any[]>([]);
socket.on('connect', function () {
	console.log('Connected');
});
function send() {
	socket.emit('juns', context.value);
}
socket.on('juns', function (res: any) {
	messages.push(res);
});
</script>
<template>
	<div class="chatpanel">
		<h1>聊天面板{{ route.params.fCode }}</h1>
		<ul>
			<li v-for="(msg, index) in messages" :key="index">{{ msg.context }}</li>
		</ul>
		<input v-model="context" />
		<button @click="send">发送</button>
	</div>
</template>
