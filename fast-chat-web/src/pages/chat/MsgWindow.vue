<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
const props = defineProps({
	messages: {
		type: Array,
		default: () => {
			return [];
		}
	}
});
</script>
<template>
	<div class="msgWin">
		<ul>
			<transition-group name="fade">
				<li v-for="(msg, index) in props.messages" :key="index">
					{{ msg.userId }} : {{ msg.content }}
				</li>
			</transition-group>
		</ul>
	</div>
</template>
<style lang="less" scoped>
.msgWin {
	height: 100%;
}
</style>
