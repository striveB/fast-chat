<script lang="ts" setup>
import { ref } from 'vue';
import {
	useRoute,
	onBeforeRouteUpdate,
	RouteLocationNormalized
} from 'vue-router';
import { chatStore } from '../../store/chat';
const route = useRoute();
const chat = chatStore();
const title = ref<string | null>('title');
setTitle();
let nowUrl = ref(route.fullPath);
onBeforeRouteUpdate(to => {
	nowUrl.value = to.fullPath;
	setTitle(to);
});

function setTitle(to?: RouteLocationNormalized) {
	let r = to || route;
	let userId = r.params.fCode;
	if (userId) {
		title.value = null;
	} else {
		title.value = r.name as string;
	}
}
</script>
<template>
	<div class="root-head">
		<div class="back" v-if="nowUrl != '/' && nowUrl != '/weclome'">
			<router-link to="/weclome" tag="span">
				<span class="iconfont icon-fanhui"></span>
			</router-link>
		</div>
		<div class="title">
			<h3>{{ title || chat.chatFriend?.userName }}</h3>
		</div>
		<div class="more">
			<span class="iconfont icon-qita" style="font-size: 20px"></span>
		</div>
	</div>
</template>
<style lang="less" scoped>
.root-head {
	display: flex;
	padding: 0 20px;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid @primary-color-2;
	.title {
		flex: 1;
		text-align: center;
	}
}
</style>
