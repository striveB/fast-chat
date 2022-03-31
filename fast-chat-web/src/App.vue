<script setup lang="ts">
import { settingStore } from './store/setting';
import { enquireScreen } from './utils/util.js';
import { chatStore } from './store/chat';
const setting = settingStore();
const chat = chatStore();
//断开socket连接
// window.addEventListener('unload', () => chat.socket?.disconnected);
//检测是否为移动端
enquireScreen((is: boolean) => setting.toMobile(is));
</script>
<template>
	<router-view></router-view>
</template>

<style></style>
