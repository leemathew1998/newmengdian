<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	var myChartmain;
	var myChartchart
	export default {
		name: 'Charts',
		props: {
			legendData: {
				type: Array,

			},
			xAxisData: {
				type: Array,

			},
			yAxismin: {
				type: Number
			},
			yAxismax: {
				type: Number
			},
			seriesData: {
				type: Array,
			},
			id: {
				type: String
			}
		},
		mounted() {
			// console.log('mount', this.legendData, this.seriesData)
			this.initChart()
		},
		updated() {
			// console.log('update', this.legendData, this.seriesData)
			this.initChart()
		},
		methods: {
			initChart() {
				if (this.id == 'main') {
					if (myChartmain != null && myChartmain != "" && myChartmain != undefined) {
						myChartmain.dispose(); //销毁
					}
					var chartDom = document.getElementById(this.id);
					myChartmain = echarts.init(chartDom);
					var option;
				} else {
					if (myChartchart != null && myChartchart != "" && myChartchart != undefined) {
						myChartchart.dispose(); //销毁
					}
					var chartDom = document.getElementById(this.id);
					myChartchart = echarts.init(chartDom);
					var option;
				}


				option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: this.legendData
					},
					xAxis: [{
						type: 'category',
						data: this.xAxisData,
						axisPointer: {
							type: 'shadow'
						}
					}],
					yAxis: [{
						type: 'value',
						min: this.yAxismin,
						max: this.yAxismax,
						interval: 10,
						axisLabel: {
							formatter: '{value}'
						}
					}, ],
					series: []
				};
				// 处理series 数据
				this.seriesData.map((item, index) => {
					let temData = {}
					temData.type = 'line'
					temData.tooltip = {
						valueFormatter: function(value) {
							return value;
						}
					}
					temData.name = this.legendData[index]
					temData.data = item
					option.series.push(temData)

				})
				// 处理series 数据结束
				if (this.id == 'main') {
					option && myChartmain.setOption(option);
				} else {
					option && myChartchart.setOption(option);
				}

			}
		}
	}
</script>

<style>
</style>
