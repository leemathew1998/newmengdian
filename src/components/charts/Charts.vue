<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import * as echarts from 'echarts'
var myChartchart = null
export default {
  name: 'Charts',
  props: {
    legendData: {
      type: Array
    },
    xAxisData: {
      type: Array
    },
    yAxismin: {
      type: Number
    },
    yAxismax: {
      type: Number
    },
    seriesData: {
      type: Array
    },
    id: {
      type: String
    },
    echartSize: {
      type: Object
    }
  },
  mounted() {
    // console.log('mount', this.legendData, this.seriesData)
    this.$nextTick(() => {
      this.initChart()
    })
  },
  updated() {
    console.warn('update')
    this.initChart()
    if (myChartchart) {
      console.log(myChartchart)
      myChartchart.resize()
    }
  },
  methods: {
    initChart() {
      var option = ''

      var chartDom = document.getElementById(this.id)
      if (myChartchart !== null) {
        chartDom.style.height = `${this.echartSize.height}px`
				chartDom.style.width = `${this.echartSize.width}px`
      }
      myChartchart = echarts.init(chartDom)

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
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: this.yAxismin,
            max: this.yAxismax,
            interval: 10,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: []
      }
      // 处理series 数据
      // this.seriesData.map((item, index) => {
      //   let temData = {}
      //   temData.type = 'line'
      //   temData.tooltip = {
      //     valueFormatter: function (value) {
      //       return value
      //     }
      //   }
      //   temData.name = this.legendData[index]
      //   temData.data = item
      //   option.series.push(temData)
      // })
      // 处理series 数据结束
      option && myChartchart.setOption(option)
    }
  }
}
</script>

<style>
</style>
