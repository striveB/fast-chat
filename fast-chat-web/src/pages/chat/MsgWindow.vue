<script lang="ts" setup>
import { chatStore } from '../../store/chat';
import { defineProps } from 'vue';
const chat = chatStore();
const props = defineProps({
	messages: {
		type: Array,
		default: () => {
			return [];
		}
	},
	friend: {}
});
</script>
<template>
	<div class="msgWin">
		<transition-group name="fade">
			<div
				class="message"
				v-for="(msg, index) in props.messages"
				:class="msg.userId == chat?.userInfo?.userId ? 'self' : 'friend'"
				:key="index"
			>
				<div class="msgBox">
					<a-avatar
						:size="50"
						icon="F"
						:src="
							msg.userId == chat?.userInfo?.userId
								? chat?.userInfo?.avatar
								: friend?.avatar
						"
					/>
					<div class="content">
						<p class="userName">{{ msg.userId }}</p>
						<p class="msg">{{ msg.content }}</p>
					</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>
<style lang="less" scoped>
.msgWin {
	height: 100%;
	.message {
		display: flex;
		font-size: 16px;
		padding: 10px 0;
		&.self {
			justify-content: end;
			.msgBox {
				display: flex;
				flex-direction: row-reverse;
				.avatar {
					justify-self: end;
				}
				.content {
					.userName {
						text-align: right;
					}
				}
			}
		}
		.msgBox {
			display: flex;
			// img {
			// 	width: 100%;
			// 	height: 100%;
			// }
			.ant-avatar {
				margin: 0 10px;
			}
			.content {
				max-width: 314px;
				word-wrap: break-word;
				p {
					margin-bottom: 0px;
				}
				.userName {
					font-weight: bold;
				}
				.msg {
					background-color: @primary-color-2;
					padding: 5px;
					border-radius: 6px;
				}
			}
		}
	}
}
</style>
