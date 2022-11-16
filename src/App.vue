<template lang="pug">
v-app(id="app")
	router-view
</template>

<script setup lang="ts">
console.log(Date.now())
</script>
<style scoped>
	#app {
	}
	.main {
		width: 1218px;
		margin: 0 auto;
		/*background: rgb(122,32,72);
		background: -moz-radial-gradient(circle, rgba(122,32,72,1) 19%, rgba(30,39,97,1) 100%);
		background: -webkit-radial-gradient(circle, rgba(122,32,72,1) 19%, rgba(30,39,97,1) 100%);
		background: radial-gradient(circle, rgba(122,32,72,1) 19%, rgba(30,39,97,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#7a2048",endColorstr="#1e2761",GradientType=1);*/
	}
</style>
