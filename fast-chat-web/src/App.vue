<script setup lang="ts">
import { settingStore } from './store/setting';
import { enquireScreen } from './utils/util.js';

const setting = settingStore();
enquireScreen((is: boolean) => setting.toMobile(is));
</script>
<template>
	<router-view></router-view>
</template>

<style></style>
