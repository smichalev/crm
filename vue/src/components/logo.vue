<template>
	<div class="logotype" @click="logo">
		crm
	</div>
</template>

<script>
	export default {
		methods: {
			logo() {
				if (this.$route.path !== '/' && this.$store.state.auth.profile) {
					this.$router.push('/');
				}
			},
		},
	};
</script>

<style scoped>
	.logotype {
		font-family: 'Open Sans', sans-serif;
		user-select: none;
		color: #fff;
		text-transform: uppercase;
		font-size: 22px;
		cursor: pointer;
	}
</style>
