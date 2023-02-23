<template>
	<div class="warp">
		<div class="right">
			<a-button @click="latelyOneWeek">最近7天</a-button>
			<a-button @click="thismonth">本月</a-button>
			<a-range-picker v-model:value="defaultValue" format="YYYY/MM/DD" />
		</div>
		<Charts :legendData="['待处理', '已处理']"
			:xAxisData="['采集运维', '计量运维', '线损治理', '费控复电', '电费回收', '电费发行', '优质服务','主动运维','主动抢修']" :yAxismin="0"
			:yAxismax="50" :seriesData="seriesData" id="main">
			<template>
				<div id='main'></div>
			</template>
		</Charts>
	</div>

</template>

<script>
	import moment from 'moment';
	import Charts from '@/components/charts/Charts'
	export default {
		name: 'DataboardFinish',
		data() {
			return {
				defaultValue: [],
				seriesData: []
			};
		},
		components: {
			Charts
		},
		mounted() {
			// console.log(this.startOfOneWeek())
			this.solveData()
		},
		methods: {
			moment,
			solveData() {
				this.seriesData = []
				for (var i = 0; i < 2; i++) {
					let tem = []
					for (var j = 0; j < 9; j++) {
						tem.push(j + Math.floor(Math.random() * 15)+2)
					}
					this.seriesData.push(tem)
				}
			},
			latelyOneWeek() {
				this.defaultValue = [moment(moment().add(-6, 'days').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
					.format(
						'YYYY/MM/DD'), "YYYY/MM/DD")]
				this.solveData()
			},
			thismonth() {
				this.defaultValue = [moment(moment().startOf('month').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
					.format('YYYY/MM/DD'), "YYYY/MM/DD")]
				this.solveData()
			},
		},

	};
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		flex-direction: column;

		// align-items: flex-end;
		.right {
			display: flex;
			justify-content: flex-end;
		}

		#chart,
		#main {
			width: 100%;
			height: 400px;
		}
	}
</style>
