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
				<li class="friend" @click="navigate">
					<a-avatar icon="F"></a-avatar>
					{{ user }}
				</li>
			</router-link>
		</ul>
	</div>
</template>
<style lang="less" scoped>
.sideRight {
	.friedGroup {
		.friend {
			cursor: pointer;
			padding: 5px;
			border-radius: 5px;
			font-weight: bold;
			border-bottom: 1px solid @primary-color-2;
			transition: all 0.3s;
			color: @primary-color-7;
			&:hover {
				background-color: @primary-color-2;
				color: black;
			}
		}
	}
}
</style>
