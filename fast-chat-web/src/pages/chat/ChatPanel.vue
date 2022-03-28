<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const socket = window.io('http://localhost:3002');
socket.on('connect', function () {
	console.log('Connected');
	socket.emit('juns', 'jun233s发来的消息', (response: any) =>
		console.log('juns:', response)
	);
});
socket.on('events', function (data: any) {
	console.log('event', data);
});
socket.on('exception', function (data: any) {
	console.log('event', data);
});
socket.on('disconnect', function () {
	console.log('Disconnected');
});
</script>
<template>
	<div class="chatpanel">
		<h1>聊天面板{{ route.params.fCode }}</h1>
	</div>
</template>
