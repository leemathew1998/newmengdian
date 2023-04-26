<template>
  <div class="warp-site">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop :name="$route.params.name" :dateTime.sync="dateTime"></leftTop>
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
      <div ref="rightInitPage" class="box">
        <rightPageForSite
          :rightInitPageColumns="rightInitPageColumns"
          :rightInitPageData="rightInitPageData"
          :rightPageLoading="rightPageLoading"></rightPageForSite>
      </div>
      <div ref="rightMainPage" class="box" style="display: none;height: 100%;">
        <div class="head">
          <sites :data="rightPageData"> </sites>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftTop from '@/components/achievements/leftTop'
import leftBottom from '@/components/achievements/leftBottom'
import center from '@/components/achievements/center'
import rightPageForSite from '@/components/achievements/rightPageForSite'
import sites from '@/components/achievements/sites'
import {
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
    // console.log(this.$route.params)
    this.dateTime = this.$route.params.ymd || moment().add(-1, 'days').format('yyyy-MM-DD')
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
        } else {
          this.$refs['rightMainPage'].className = 'box animated fadeOutRight'
          setTimeout(() => {
            this.$refs['rightMainPage'].style.display = 'none'
            this.$refs['rightInitPage'].style.display = 'block'
            this.$refs['rightInitPage'].className = 'box animated fadeInRight'
          }, 400)
        }
      }
    },
    dateTime() {
      this.centerData = []
      this.rightInitPageData = []
      this.rightInitPage = false
      this.init2()
    }
  },
  methods: {
    async init2() {
      this.leftBottomLoading = true
      const res = await postAction(`ach/stationList?ymd=${this.dateTime}&orgNo=${this.$route.params.orgNo}`)
      res.data.forEach(i => {
        i.countyName = i.stationName
      })
      this.leftBottomData = sortRanking(res.data)
      this.leftBottomLoading = false
    },
    async leftBottomClickRow(record) {
      console.warn('record', record)
      this.rightInitPage = false
      this.tableLoading = true
      this.rightPageLoading = true
      const res = await Promise.all([
        postAction(`ach/stationList?ymd=${this.dateTime}&id=${record.id}`),
        postAction(`ach/selectStaByman?ymd=${this.dateTime}&orgNo=${record.orgNo}`)
      ])
      // 处理中间数据
      let temp = []
      for (const key in indexCenter16List) {
        let originalValue = res[0].data[0][indexCenter16List[key].rate]
        originalValue = originalValue != null ? `${originalValue}%` : '0'
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
        resRight[i].stationName = resRight[i].tgManager
        // resRight[i].toPoint = resRight[i].totalScore
      }
      this.rightInitPageData = sortRanking(resRight)
      this.rightPageLoading = false
    }
  },
  components: {
    sites,
    leftTop,
    leftBottom,
    center,
    rightPageForSite
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
      dateTime: this.$route.params.ymd || moment().add(-1, 'days').format('yyyy-MM-DD')// .add(-1, 'days')
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/less/animate.css");

.warp-site {
  display: flex;
  height: 100%;

  .wrap-left {
    flex: 2;
    display: flex;
    flex-direction: column;
    // height: 100% !important;

    .left-top {
      flex: 4;
    }

    .left-bottom {
      flex: 6;
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
  height: 100%;
}

.head {
  width: 100%;
}
</style>
