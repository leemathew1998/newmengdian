<template>
	<div class="warp">
		<span class="header"></span>
		<div class="title">
			{{title}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DashboardTitle',
		props: {
			title: {
				require: true,
				type: String
			}
		}
	}
</script>

<style lang="less" scoped>
	.warp {
		font-weight: 700;
		height: 35px;
		display: flex;
		align-items: center;
		
		.header {
			display: inline-block;
			width: 7px;
			height: 100%;
			background-color: #333333;
			color: #333;
		}
		.title{
			margin-left: 5px;
		}
		
	}
</style>
