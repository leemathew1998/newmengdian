<template>
	<div class='warp'>
		<div class='indicators-item' v-for="item in data" :key='item.title'>
			<img class="image" :src="item.img" alt="">
			<div class='right'>
				<div class='percentage'>{{item.percentage}}%</div>
				<div class='title'>{{item.title}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DashboardIndicators',
		data() {
			return {
				data: [{

						percentage: 50,
						title: "优质服务满意度",
						img: require('@/assets/Indicators/Indicators01.png')
					},
					{
						percentage: 50,
						title: "低压线损率",
						img: require('@/assets/Indicators/Indicators02.png')
					},
					{
						percentage: 50,
						title: "采集成功率",
						img: require('@/assets/Indicators/Indicators03.png')
					},
					{
						percentage: 50,
						title: "线损合格率",
						img: require('@/assets/Indicators/Indicators04.png')
					}, {
						percentage: 50,
						title: "采集失败处理及时率",
						img: require('@/assets/Indicators/Indicators05.png')
					},
					{
						percentage: 50,
						title: "高负损台区处理及时率",
						img: require('@/assets/Indicators/Indicators06.png')
					},
					{
						percentage: 50,
						title: "计量异常处理及时率",
						img: require('@/assets/Indicators/Indicators07.png')
					},
					{
						percentage: 50,
						title: "现场复电处理及时率",
						img: require('@/assets/Indicators/Indicators08.png')
					},
				]
			}
		},
	}
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;

		.indicators-item {
			width: 50%;
			display: flex;
			align-items: center;
			margin-bottom: 10px;

			.image {
				width: 50px;
				border-radius: 50%;
				margin-right: 10px;
			}
		}

		.right {
			font-weight: 700;
		}
	}
</style>
