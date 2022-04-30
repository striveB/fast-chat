<script setup lang="ts">
import { settingStore } from './store/setting';
import { enquireScreen } from './utils/util.js';
import { chatStore } from './store/chat';
const setting = settingStore();
const chat = chatStore();
if (!chat.socket && localStorage.getItem('userInfo')) {
	//连接socket
	chat.connectSocket(null);
}
//检测是否为移动端
enquireScreen((is: boolean) => setting.toMobile(is));
</script>
<template>
	<router-view></router-view>
</template>

<style></style>
