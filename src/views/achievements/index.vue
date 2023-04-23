<template>
  <div class="warp">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop name="呼伦贝尔供电公司" :dateTime.sync="dateTime"></leftTop>
      </div>
      <div class="left-bottom">
        <leftBottom
          :leftBottomColumns="leftBottomColumns"
          :leftBottomData="leftBottomData"
          :leftBottomLoading="leftBottomLoading"
          @clickRow="leftBottomClickRow"></leftBottom>
      </div>
    </div>
    <div class="wrap-center animated fadeInUp">
      <center
        :centerData="centerData"
        :tableLoading="tableLoading"
        :rightInitPage.sync="rightInitPage"
        :rightInitPageData="rightInitPageData"
        :rightPageData.sync="rightPageData"></center>
    </div>
    <div class="wrap-right animated fadeInRight">
      <div ref="rightInitPage" class="box" style="height: 100%">
        <rightPageForMaster
          :rightInitPageColumns="rightInitPageColumns"
          :rightInitPageData="rightInitPageData"
          :rightPageLoading="rightPageLoading"></rightPageForMaster>
      </div>
      <div ref="rightMainPage" class="box" style="display: none">
        <div class="head">
          <views :data="rightPageData"> </views>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import views from '@/components/achievements/views'
import leftTop from '@/components/achievements/leftTop'
import leftBottom from '@/components/achievements/leftBottom'
import center from '@/components/achievements/center'
import rightPageForMaster from '@/components/achievements/rightPageForMaster'
import {
  getAction,
  postAction
} from '@/api/manage'
import {
  indexCenter16List,
  leftBottomColumns,
  rightInitPageColumns
} from './const.js'
import {
  sortRanking
} from './utils.js'
import moment from 'moment'
export default {
  created() {
    // this.init()
    this.init2()
  },
  watch: {
    rightInitPage: {
      handler: function (newVal) {
        if (newVal) {
          this.$refs['rightInitPage'].className = 'box animated fadeOutRight'
          setTimeout(() => {
            this.$refs['rightInitPage'].style.display = 'none'
            this.$refs['rightMainPage'].style.display = 'block'
            this.$refs['rightMainPage'].className = 'box animated fadeInRight'
          }, 400)
        }
      }
    }
  },
  methods: {
    async init2() {
      this.leftBottomLoading = true
      const resRightBottom = await postAction(`ach/countyList?ymd=${this.dateTime}`)
      this.leftBottomData = sortRanking(resRightBottom.data)
      this.leftBottomLoading = false
    },
    async leftBottomClickRow(record) {
      this.tableLoading = true
      this.rightPageLoading = true
      const res = await Promise.all([
        postAction(`ach/countyList?ymd=${this.dateTime}&id=${record.id}`),
        postAction(`ach/stationList?ymd=${this.dateTime}&orgNo=${record.orgNo}`)
      ])
      // 处理中间数据
      let temp = []
      for (const key in indexCenter16List) {
        let originalValue = res[0].data[0][indexCenter16List[key].rate]
        originalValue = originalValue ? `${originalValue}%` : '-'
        temp.push({
          id: key,
          indexItems: indexCenter16List[key].name,
          originalValue: originalValue,
          integral: res[0].data[0][indexCenter16List[key].point]
        })
      }
      this.centerData = temp
      this.tableLoading = false
      // 处理右面数据
      let resRight = res[1].data
      for (let i = 0; i < resRight.length; i++) {
        resRight[i].ymd = this.dateTime
        resRight[i].orgNo = record.orgNo
      }
      this.rightInitPageData = sortRanking(resRight)
      this.rightPageLoading = false
    },
    async init() {
      let temp = []

      // let dataAll = await Promise.all([
      //   postAction("ach/selectAcCounty?id=1"),
      //   postAction("ach/selectAcCounty"),
      //   postAction("acStation/selectAll")
      // ])
      let dataAll = await Promise.all([
        postAction('/ach/dayPoint?id=1'),
        postAction('/ach/countyList'),
        postAction('/ach/stationList')
      ])
      // console.log(dataAll, '12312321')
      let res1 = dataAll[0].data
      // 处理中心位置
      for (const key in indexCenter16List) {
        temp.push({
          id: key,
          indexItems: indexCenter16List[key].name,
          originalValue: res1[indexCenter16List[key].rate] + '%',
          integral: res1[indexCenter16List[key].point]
        })
      }
      this.centerData = temp
      this.tableLoading = false

      // 处理左下角
      let res2 = dataAll[1].data
      temp = []
      for (let i = 0; i < res2.length; i++) {
        temp.push({
          countyName: res2[i].countyName,
          toPoint: res2[i].toPoint
        })
      }
      this.leftBottomData = sortRanking(temp)
      this.leftBottomLoading = false

      // 处理首页右侧加载
      let res3 = dataAll[2].data
      temp = []
      for (let i = 0; i < res3.length; i++) {
        temp.push({
          stationName: res3[i].stationName,
          toPoint: res3[i].toPoint,
          id: res3[i].id
        })
      }
      this.rightInitPageData = sortRanking(temp)
      this.rightPageLoading = false
    }

  },
  components: {
    views,
    leftTop,
    leftBottom,
    center,
    rightPageForMaster
  },
  data() {
    return {
      // 新数据开始
      centerData: [],
      leftBottomData: [],
      leftBottomColumns,
      rightInitPage: false,
      rightInitPageData: [],
      rightInitPageColumns,
      rightPageData: {
        name: null,
        data: []
      },
      leftBottomLoading: false,
      tableLoading: false,
      rightPageLoading: false,
      // 结束
      dateTime: moment().add(-2, 'days').format('yyyy-MM-DD')//
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/less/animate.css");

.warp {
  display: flex;

  .wrap-left {
    flex: 2;
    display: flex;
    flex-direction: column;

    .left-top {
      // flex: 4;
    }

    .left-bottom {
      // flex: 6;
    }
  }

  .wrap-center {
    flex: 5;
  }

  .wrap-right {
    flex: 3;
  }
}

.box {
  border: 1px #f5f5f5 solid;
  border-radius: 5px;
  padding: 2px;
}

.head {
  width: 100%;
}
</style>
