<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.fCode);
</script>
<template>
	<div class="chatpanel">
		<h1>聊天面板{{ route.params.fCode }}</h1>
	</div>
</template>
