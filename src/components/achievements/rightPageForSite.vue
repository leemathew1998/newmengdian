<template>
  <div class="box" ref="wrapBox">
    <div class="head">
      <span class="title">各台区经理积分</span>
    </div>
    <a-input-search
      placeholder="请输入供电所名称"
      style="width: 100%"
      @search="onSearch"
    />
    <a-table
      class="box-table"
      :columns="rightInitPageColumns"
      :data-source="rightInitPageData"
      size="small"
      :loading="rightPageLoading"
      :customRow="handleClickRow"
      :pagination="false"
    >
    </a-table>
    <a-divider style="margin-top: 0; margin-bottom: 10px" />
    <Charts
      :legendData="legend"
      :xAxisData="xAxis"
      :yAxismin="0"
      :yAxismax="100"
      :seriesData="seriesData"
      :id="`chart`"
      :echartSize="echartSize"
      class="chart-class"
      v-show="false"
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
import {
  postAction
} from '@/api/manage'
export default {
  props: ['rightInitPageColumns', 'rightInitPageData', 'rightPageLoading'],
  data () {
    return {
      legend: [],
      xAxis: [],
      seriesData: [],
      id: '',
      echartSize: {
        height: 100,
        width: 100
      }
    }
  },
  mounted() {
    // this.xAxis = this.eachOfMonth()
    this.xAxis = this.walk(moment().format('MM-DD'), moment().format('MM-DD'))
    // 开始计算剩余高度给echart
    const el = document.querySelector('.chart-class')
    el.style.height = `${el.clientHeight}px`
    this.echartSize.height = el.clientHeight
    this.echartSize.width = el.clientWidth
    const table = document.querySelector('.box-table')
    table.style.height = `${table.clientHeight}px`
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
      const res = await postAction(`/ach/acManagerSp?id=${this.id}`)
      // console.log(res, 'sdad', this.rightInitPageData)
      this.legend.map(item => {
        let arr = []
        res.data[item].map(item_ => {
          arr.push(item_.totalScore)
        })
        this.seriesData.push(arr)
      })
      console.log(this.seriesData)
    },
    legendChange (e) {
      this.rightInitPageData.map(item => {
        if (!this.legend.includes(item.stationName)) {
          this.legend.push(item.stationName)
        }
      })
      this.solveData()
    },
    onSearch () { },
    handleClickRow (record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name: 'achievements/manger',
              params: {
                name: record.stationName,
                orgNo: record.orgNo,
                ymd: record.ymd
              }
            })
          }
        }
      }
    }
  },
  components: {
    Charts
  }
}
</script>

<style scoped lang="less">
/deep/ tr {
  cursor: pointer;
}

.box {
  border: 1px #f5f5f5 solid;
  border-radius: 5px;
  padding: 2px;
  height: 100%;
  display: flex;
  flex-direction: column;

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
  }

  .box-table {
    flex: 1;

    /deep/.ant-spin-nested-loading {
      height: 100%;

      .ant-table-content {
        height: 100%;

        .ant-table-placeholder {
          height: calc(100% - 43px);
        }
      }

      .ant-spin-container {
        height: 100%;
      }

      .ant-table {
        height: 100%;
        overflow-y: scroll;
      }

    }
  }

  .chart-class {
    flex: 1;
    width: 100%;

    #chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
