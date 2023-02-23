<template>
	<div class="warp">
		<div class="header">
			<div class="left">
				<a-select default-value="all" style="width: 140px" @change="handleChange">
					<a-select-option value="all">
						选择全部供电单位
					</a-select-option>
					<a-select-option value="光明供电营业站">
						光明供电营业站
					</a-select-option>
					<a-select-option value="绿源供电营业站">
						绿源供电营业站
					</a-select-option>
					<a-select-option value="园丁供电营业站">
						园丁供电营业站
					</a-select-option>
				</a-select>
				<a-select default-value="all" style="width: 140px" @change="legendChange">
					<a-select-option value="all">
						选择全部业务类型
					</a-select-option>
					<a-select-option value="服务申请">
						服务申请
					</a-select-option>
					<a-select-option value="意见">
						意见
					</a-select-option>
					<a-select-option value="故障报修">
						故障报修
					</a-select-option>
					<a-select-option value="校核工单">
						校核工单
					</a-select-option>
					<a-select-option value="95598客户催办">
						95598客户催办
					</a-select-option>
				</a-select>
				<a-select default-value="all" style="width: 200px" class="last">
					<a-select-option value="all">
						选择全部业务类型
					</a-select-option>
					<a-select-option value="欠费复电登记">
						欠费复电登记
					</a-select-option>
					<a-select-option value="验表（新增）">
						验表（新增）
					</a-select-option>
					<a-select-option value="电能表异常">
						电能表异常
					</a-select-option>
					<a-select-option value="客户侧用电需求配合">
						客户侧用电需求配合
					</a-select-option>
					<a-select-option value="熔断器">
						熔断器
					</a-select-option>
					<a-select-option value="塑壳断路器">
						塑壳断路器
					</a-select-option>
				</a-select>
			</div>
			<div class="right">
				<a-button @click="latelyOneWeek">周</a-button>
				<a-button @click="thismonth">月</a-button>
				<a-button @click="thisyear">年</a-button>

				<a-range-picker v-model:value="defaultValue" format="YYYY/MM/DD" />
			</div>
		</div>
		<Charts :legendData="legend" :xAxisData="xAxis" :yAxismin="0" :yAxismax="50" :seriesData="seriesData"
			id="chart">
			<template>
				<div id='chart'></div>
			</template>
		</Charts>
	</div>

</template>

<script>
	import moment from 'moment';
	import Charts from '@/components/charts/Charts'
	export default {
		name: 'DashboardQuality',
		data() {
			return {
				defaultValue: [],
				legend: [],
				xAxis: [],
				seriesData: []
			};
		},
		components: {
			Charts
		},
		created() {
			this.xAxis = this.eachOfMonth()
			this.legendChange('all')
		},
		methods: {
			solveData() {
				this.seriesData = []
				for (var i = 0; i < this.legend.length; i++) {
					let tem = []
					for (var j = 0; j < this.xAxis.length; j++) {
						tem.push(j + Math.floor(Math.random() * 15))
					}
					this.seriesData.push(tem)
				}
			},
			legendChange(e) {
				if (e === 'all') {
					this.legend = ['服务申请', '意见', '故障报修', '校核工单', '95598客户催办']
				} else {
					this.legend = [e]
				}
				this.solveData()
			},
			handleChange(value) {
				console.log(`selected ${value}`);
			},
			latelyOneWeek() {
				this.defaultValue = [moment(moment().add(-6, 'days').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
					.format(
						'YYYY/MM/DD'), "YYYY/MM/DD")]
				// 横坐标
				this.xAxis = this.eachOfWeek()
				this.solveData()
			},
			thismonth() {
				this.defaultValue = [moment(moment().startOf('month').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
					.format('YYYY/MM/DD'), "YYYY/MM/DD")]
				this.xAxis = this.eachOfMonth()
				this.solveData()
			},
			thisyear() {
				this.defaultValue = [moment(moment().startOf('year').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
					.format('YYYY/MM/DD'), "YYYY/MM/DD")]
				this.xAxis = this.eachOfYear()
				this.solveData()
			},
			eachOfYear() {
				return [2019, 2020, 2021, 2022]
			},
			eachOfMonth() {
				// 从今年开始的每个月
				let start = moment().startOf('year')
				const res = []
				while (start.isBefore(moment(), 'month')) {
					res.push(start.format('M') + '月')
					start = start.add(1, 'month')
				}
				res.push(moment().format('M') + '月')
				return res
			},
			eachOfWeek() {
				// 从本月开始的每个周
				let start = moment().startOf('month')
				let end
				const res = []
				while (start.isBefore(moment())) {
					end = start
					res.push(`${start.weekday(0).format('MM月DD日')}至${end.weekday(7).isBefore(moment()) ? start
						.format('MM月DD日') : '今'}`)
				}
				return res
			},
		},
	};
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		flex-direction: column;
		padding: 10px;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;

				.ant-select {
					margin-right: 10px;
					flex: 1;
				}

				.last {
					flex: 1.2;
				}
			}
		}

		#chart,
		#main {
			width: 100%;
			height: 400px;
		}
	}
</style>
