<template>
	<div class="wrap" :style="{backgroundColor:bgc}">
		<img class="img" :src="require('@/assets/Overview/'+imageSrc)">
		<div style="color: #fff;font-size: 24px;">{{text}}</div>
	</div>
</template>

<script>
	export default {
		name: 'longButton',
		props: ['text', 'imageSrc', 'bgc'],
		data() {
			return {
				bgimg: null
			}
		},
		created() {}
	}
</script>

<style lang="less" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;

		.img {
			width: 150px;
			height: 150px;
		}
	}
</style>
