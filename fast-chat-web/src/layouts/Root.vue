<script setup lang="ts">
import { reactive, ref } from 'vue';
import { settingStore } from '../store/setting';
import sideLeft from './side/SideLeft.vue';
import sideRight from './side/SideRight.vue';
import RootHead from './head/RootHead.vue';
const setting = settingStore();

let sideActive = reactive([false, false]);
function setSideActive(sideLeft: boolean, sideRight: boolean): void {
	sideActive[0] = sideLeft;
	sideActive[1] = sideRight;
}
</script>

<template>
	<div class="layout-container" :class="{ 'layout-mobile': setting.isMobile }">
		<!-- 移动端：侧边栏弹出时显示的遮罩层 -->
		<div
			class="shade"
			v-if="setting.isMobile && sideActive.includes(true)"
			@click="setSideActive(false, false)"
		></div>
		<div class="con side side-left" :class="{ active: sideActive[0] }">
			<div class="side-btn" v-if="setting.isMobile && !sideActive[0]">
				<div class="btn" @click="setSideActive(true, false)">
					<span class="iconfont icon-liebiao"></span>
				</div>
			</div>
			<side-left></side-left>
		</div>
		<div class="con root">
			<root-head></root-head>
			<div class="show-area">
				<router-view v-slot="{ Component }">
					<transition name="fade">
						<component :is="Component"></component>
					</transition>
				</router-view>
			</div>
		</div>
		<div class="con side side-right" :class="{ active: sideActive[1] }">
			<div class="side-btn" v-if="setting.isMobile && !sideActive[1]">
				<div class="btn" @click="setSideActive(false, true)">
					<span class="iconfont icon-lianxiren1"></span>
				</div>
			</div>
			<side-right></side-right>
		</div>
	</div>
</template>
<style lang="less" scoped>
@import './css/root.less';
</style>
