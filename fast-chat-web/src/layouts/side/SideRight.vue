<template>
	<div class="sideRight">
		<ul>
			<router-link to="/chat-panel/2" custom v-slot="{ navigate }">
				<li @click="navigate">张三</li>
			</router-link>
		</ul>
	</div>
</template>
