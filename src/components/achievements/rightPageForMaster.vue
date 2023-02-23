<template>
  <div class="box" ref="wrapBox">
    <div class="head">
      <span class="title">各所站积分</span>
    </div>
    <a-input-search
      placeholder="请输入供电所名称"
      style="width: 100%"
      @search="onSearch"
    />
    <a-table
      :columns="rightInitPageColumns"
      :data-source="rightInitPageData"
      size="small"
      :loading="rightPageLoading"
      :customRow="handleClickRow"
    >
    </a-table>
    <a-divider style="margin-top: 0; margin-bottom: 10px" />
    <Charts
      :legendData="legend"
      :xAxisData="xAxis"
      :yAxismin="0"
      :yAxismax="100"
      :seriesData="seriesData"
      id="chart"
    >
      <template>
        <div id="chart"></div>
      </template>
    </Charts>
  </div>
</template>

<script>
import moment from 'moment'
import Charts from '@/components/charts/Charts'
import { postAction } from '../../api/manage'
export default {
  mounted () {
    // this.xAxis = this.eachOfMonth()
    this.xAxis = this.walk(moment().format('MM-DD'), moment().format('MM-DD'))
    // 开始计算剩余高度给echart
    let antherHeight = 0
    let allHeight = this.$refs.wrapBox.clientHeight
    for (let i = 0; i < 4; i++) {
      antherHeight += this.$refs.wrapBox.children[i].clientHeight
    }
    this.$refs.wrapBox.children[4].children[0].style.height = `${allHeight - antherHeight}px`
  },
  watch: {
    rightPageLoading: {
      handler: function (newValue) {
        if (!newValue) {
          this.legendChange('all')
        }
      }
    }
  },
  methods: {
    walk (from, to) {
      // let start = moment(from).startOf('month')
      let start = moment().startOf('month')
      let end = moment()
      const res = []
      while (start.isBefore(end)) {
        res.push(`${start.format('M月D日')}`)
        start = start.add(1, 'days')
      }
      res.push(`${moment().format('M月D日')}`)
      return res
    },
    async solveData () {
      this.seriesData = []
      const res = await postAction("/ach/acStationSp?id=1")
      this.legend.map(item => {
        let tem = []
        res.data[item].map(item_ => {
          tem.push(item_.toPoint)
        })
        this.seriesData.push(tem)
      })
    },
    legendChange (e) {
      this.rightInitPageData.map(item => {
        if (!this.legend.includes(item.stationName)) {
          this.legend.push(item.stationName)
        }
      })
      this.solveData()
    },
    latelyOneWeek () {
      this.defaultValue = [moment(moment().add(-6, 'days').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
        .format(
          'YYYY/MM/DD'), "YYYY/MM/DD")]
      // 横坐标
      this.xAxis = this.eachOfWeek()
      this.solveData()
    },
    thismonth () {
      this.defaultValue = [moment(moment().startOf('month').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
        .format('YYYY/MM/DD'), "YYYY/MM/DD")]
      this.xAxis = this.eachOfMonth()
      this.solveData()
    },
    thisyear () {
      this.defaultValue = [moment(moment().startOf('year').format('YYYY/MM/DD'), "YYYY/MM/DD"), moment(moment()
        .format('YYYY/MM/DD'), "YYYY/MM/DD")]
      this.xAxis = this.eachOfYear()
      this.solveData()
    },
    eachOfYear () {
      return [2019, 2020, 2021, 2022]
    },
    eachOfMonth () {
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
    eachOfWeek () {
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
    onSearch () { },
    handleClickRow (record, index) {
      return {
        on: {
          click: (event) => {
            this.$router.push({
              name: "achievements/site",
              params: {
                name: record.stationName
              }
            })
            localStorage.setItem("PLACE_ID", record.id)
          },
        }
      }
    },
  },
  props: ['rightInitPageColumns', 'rightInitPageData', 'rightPageLoading'],
  components: {
    Charts,
  },
  data () {
    return {
      legend: [],
      xAxis: [],
      seriesData: []
    }
  }
}
</script>

<style scoped lang="less">
.greenTitle {
  background-color: #f2f2f2;
  line-height: 40px;
  font-size: 20px;
  color: #009688;
  margin: 0;
  text-align: center;
}

/deep/ tr {
  cursor: pointer;
}

#chart {
  width: 100%;
  height: 500px;
}

.box {
  border: 1px #f5f5f5 solid;
  border-radius: 5px;
  padding: 2px;

  .head {
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    color: #009688;
    height: 40px;
    align-items: center;
    justify-content: center;

    .title {
      display: flex;
      font-size: 18px;
      font-weight: 600;
    }

    .ranking {
      font-size: 10px;
    }
  }
}
</style>
