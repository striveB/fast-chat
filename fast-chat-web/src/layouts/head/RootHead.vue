<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
const route = useRoute();
let nowUrl = ref(route.fullPath);
onBeforeRouteUpdate(to => {
	nowUrl.value = to.fullPath;
});
</script>
<template>
	<div class="root-head">
		<div class="back" v-if="nowUrl != '/'">
			<router-link to="/" tag="span">
				<span class="iconfont icon-fanhui"></span>
			</router-link>
		</div>
		<div class="title">
			<h3>{{ route.name }}</h3>
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
