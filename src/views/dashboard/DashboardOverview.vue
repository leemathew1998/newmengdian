<template>
	<div class='warp'>
		<div class="left">
			<strong>工单总数</strong>
			<span>400</span>
			<a-icon type="diff" :style="{fontSize:'24px'}" />
		</div>
		<div class="right">
			<div class="rowOne">
				<div v-for="item in dataRowOne" :key='item.title' class="itemRowOne"
					:style="{backgroundColor:item.backgroundColor}">
					<img class="item-left" :src="item.img" alt="">
					<div class="item-right">
						<div>{{item.title}}</div>
						<div>{{item.number}}</div>
					</div>
				</div>
			</div>
			<div class="rowTwo">
				<div v-for="item in dataRowTwo" :key='item.title' class="itemRowTwo"
					:style="{backgroundColor:item.backgroundColor}">
					<img class="item-left" :src="item.img" alt="">
					<div class="item-right">
						<div>{{item.title}}</div>
						<div>{{item.number}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DashboardOverview',
		data() {
			return {
				dataRowOne: [{
						title: '待派单',
						number: 310,
						// img: require('@/assets/Overview/Overview01.png'),
						backgroundColor: '#8AD0CF'
					},
					{
						title: '待处理',
						number: 3330,
						// img: require('@/assets/Overview/Overview02.png'),
						backgroundColor: '#8AD2B3'
					},
					{
						title: '待审核',
						number: 340,
						// img: require('@/assets/Overview/Overview03.png'),
						backgroundColor: '#64C7F9'
					},
				],
				dataRowTwo: [{
						title: '已处理',
						number: 310,
						// img: require('@/assets/Overview/Overview04.png'),
						backgroundColor: '#FFBD8E'
					},
					{
						title: '已完成',
						number: 3330,
						// img: require('@/assets/Overview/Overview05.png'),
						backgroundColor: '#FFAC99'
					},
					{
						title: '已关闭',
						number: 340,
						// img: require('@/assets/Overview/Overview06.png'),
						backgroundColor: '#FEA7D7'
					},
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		flex-direction: row;
		padding: 10px;
		font-weight: 700;

		.left {
			flex: 1;
			border-radius: 10px;
			background-color: #FEE7B8;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

		}

		.right {
			flex: 4;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: baseline;

			.rowOne,
			.rowTwo {
				flex: 1;
				display: flex;
			}
			.itemRowOne {
				flex: 1;
				width: 120px;
				height: 120px;
				margin-left: 10px;
				margin-bottom: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10px;
			}
			.item-left {
				width: 40px;
				height: 40px;
			}
			.itemRowTwo {
				flex: 1;
				width: 120px;
				height: 120px;
				margin-left: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10px;
			}
		}

	}
</style>
