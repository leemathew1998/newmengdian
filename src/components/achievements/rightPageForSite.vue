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
import {
  postAction
} from "@/api/manage"
export default {
  props: ['rightInitPageColumns', 'rightInitPageData', 'rightPageLoading'],
  data () {
    return {
      legend: [],
      xAxis: [],
      seriesData: [],
      id: ''
    }
  },
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
    this.id = localStorage.getItem("PLACE_ID")
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
              name: "achievements/manger",
              params: {
                name: record.stationName
              }
            })
          }
        }
      }
    },
  },
  components: {
    Charts
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

#chart {
  width: 100%;
  height: 500px;
}

/deep/ tr {
  cursor: pointer;
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
