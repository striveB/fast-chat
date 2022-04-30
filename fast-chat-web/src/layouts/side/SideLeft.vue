<script lang="ts" setup>
import UserSetting from '@/components/UserSetting.vue';
import { chatStore } from '../../store/chat';
const chat = chatStore();
</script>
<template>
	<div class="sideLeft">
		<UserSetting v-if="chat.userInfo" />
	</div>
</template>
<style lang="less" scoped>
.sideLeft {
}
</style>
