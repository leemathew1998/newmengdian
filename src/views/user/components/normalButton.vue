<template>
	<div class="wrap" :style="{'background-image': `url(${require('@/assets/Overview/'+imageSrc)})`}">
		<div class="text" :style="{fontSize:text == '管理台区'?'30px':'20px'}">{{text}}</div>
	</div>
</template>

<script>
	export default {
		name: 'normalButton',
		props: ['text', 'imageSrc', 'bgc'],
	}
</script>

<style lang="less" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: end;
		background-size: 100% 100%;
		position: relative;

		.text {
			color: #fff;
			position: absolute;
			bottom: 10px;
			right: 20px;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
