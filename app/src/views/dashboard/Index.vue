<template>
	<div class="min-h-screen bg-gray-100">
		<HeaderLI />
		<RouterView />
	</div>
</template>

<script>
	import HeaderLI from "@/components/HeaderLI";
	export default {
		components: {
			HeaderLI,
		},
	};
</script>

<style>
</style>