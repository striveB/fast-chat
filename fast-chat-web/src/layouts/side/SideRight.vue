<script setup lang="ts">
import { chatStore } from '../../store/chat';
const chat = chatStore();
</script>
<template>
	<div class="sideRight">
		<ul class="friedGroup">
			<router-link
				v-for="(user, index) in chat.friends"
				:key="index"
				:to="'/chat-panel/' + user"
				custom
				v-slot="{ navigate }"
			>
				<li class="friend" @click="navigate">{{ user }}</li>
			</router-link>
		</ul>
	</div>
</template>
<style lang="less" scoped>
.sideRight {
	.friedGroup {
		.friend {
			cursor: pointer;
		}
	}
}
</style>
