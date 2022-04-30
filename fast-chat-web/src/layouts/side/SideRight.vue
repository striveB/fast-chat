<script setup lang="ts">
import Contact from '@/components/contact.vue';
import { chatStore } from '../../store/chat';
const chat = chatStore();
</script>
<template>
	<div class="sideRight">
		<Contact v-if="chat.userInfo" />
	</div>
</template>
<style lang="less" scoped>
.sideRight {
}
</style>
