<template>
  <div class="warp-managr">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop :name="username" :ranks="ranks" :dateTime.sync="dateTime"></leftTop>
      </div>
      <div class="left-bottom">
        <div class="box">
          <leftBottom
            :leftBottomColumns="leftBottomColumns"
            :leftBottomData="leftBottomData"
            :leftBottomLoading="leftBottomLoading"
            @clickRow="leftBottomClickRow"></leftBottom>
        </div>
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
      <div ref="rightMainPage" class="box" style="height: 100%">
        <div class="head">
          <manger :data="rightPageData"> </manger>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftTop from '@/components/achievements/leftTop'
import leftBottom from '@/components/achievements/leftBottom'
import center from '@/components/achievements/center'
import manger from '@/components/achievements/manger'
import rightPageForManger from '@/components/achievements/rightPageForManger'
import { postAction } from '@/api/manage'
import {
  indexCenter16List,
  leftBottomColumns,
  rightInitPageColumns
} from './const.js'
import { sortRanking, MAP_NAME_TO_FUNC, MAP_NAME_TO_FUNC_TG_MANAGE } from './utils.js'
import moment from 'moment'
export default {
  created() {
    this.dateTime =
      this.$route.query.ymd || moment().add(-1, 'days').format('yyyy-MM-DD')
    this.orgNo = this.$route.query.orgNo
    this.ranks = JSON.parse(this.$route.query.ranks)
    // this.username = this.$route.query.name || this.$store.getters.username
    this.init2()
  },
  watch: {
    dateTime() {
      this.centerData = []
      this.rightInitPageData = []
      this.rightInitPage = false
      this.init2()
    },
    'rightPageData.name': {
      handler: function (newVal) {
        this.loadRightMathPage()
      }
    }
  },
  methods: {
    async init2() {
      this.leftBottomLoading = true
      const res = await postAction(
        `ach/selectStaByman?ymd=${this.dateTime}&orgNo=${this.orgNo}`
      )
      res.data.forEach((i) => {
        i.countyName = i.tgManager
      })
      this.leftBottomData = sortRanking(res.data)
      // 此处直接模拟点击左下第一条数据
      await this.renderCenterData(this.$route.query)
      this.username = this.$route.query.name || this.$store.getters.username
      if (this.centerData.length > 0) {
        this.rightPageData.data = []
        this.rightPageData.params = this.centerData[0]
        this.rightPageData.name = this.centerData[0].indexItems
      }
      this.leftBottomLoading = false
    },
    async renderCenterData(record) {
      this.tableLoading = true
      const res = await postAction(
        `ach/stationList?ymd=${this.dateTime}&id=${record.id}`
      )
      // 处理中间数据
      let temp = []
      for (const key in indexCenter16List) {
        let originalValue = res.data[0][indexCenter16List[key].rate]
        originalValue =
          originalValue != null
            ? `${originalValue}${indexCenter16List[key].tail}`
            : '0'
        temp.push({
          id: key,
          indexItems: indexCenter16List[key].name,
          originalValue: originalValue,
          integral: res.data[0][indexCenter16List[key].point],
          orgNo: res.data[0].orgNo,
          ymd: this.dateTime
        })
      }
      this.centerData = temp
      this.tableLoading = false
    },
    async leftBottomClickRow(record) {
      this.clickTgManager = true
      this.username = record.tgManager
      this.rightInitPage = false
      this.tableLoading = true
      this.rightPageLoading = true
      const res = await postAction(
        `ach/selectStaByman?ymd=${this.dateTime}&id=${record.id}`
      )
      // Promise.all([
      //   postAction(`ach/selectStaByman?ymd=${this.dateTime}&id=${record.id}`)
      //   // postAction(`ach/selectStaByman?ymd=${this.dateTime}&orgNo=${record.orgNo}`)
      // ])
      // 处理中间数据
      let temp = []
      for (const key in indexCenter16List) {
        let originalValue = res.data[0][indexCenter16List[key].rate]
        originalValue =
          originalValue != null
            ? `${originalValue}${indexCenter16List[key].tail}`
            : '0'
        temp.push({
          id: key,
          indexItems: indexCenter16List[key].name,
          originalValue: originalValue,
          integral: res.data[0][indexCenter16List[key].point],
          orgNo: res.data[0].acStationId,
          ymd: this.dateTime
        })
      }
      this.centerData = temp
      this.tableLoading = false
      // 处理右面数据

      this.rightPageLoading = false
    },
    // 右侧16接口请求
    async loadRightMathPage() {
      // 此处比较特殊，需要判断请求所站的接口还是台区经理的接口
      this.rightPageData.data = []

      if (this.clickTgManager) {
        let res = await MAP_NAME_TO_FUNC_TG_MANAGE[this.rightPageData.name]({
          ymd: this.rightPageData.params.ymd,
          tgManager: this.username
        })
        this.rightPageData.data.push(res)
      } else {
        let res = await MAP_NAME_TO_FUNC[this.rightPageData.name]({
          orgNo: this.rightPageData.params.orgNo,
          ymd: this.rightPageData.params.ymd
        })
        if (res && Array.isArray(res)) {
          res.forEach((item, i) => {
            this.rightPageData.data.push(item)
          })
        } else if (res && res.constructor === Object) {
          // 终止发行比例"noop"
          res.noop = 0
          this.rightPageData.data.push(res)
        }
      }
    }
  },
  components: {
    manger,
    leftTop,
    leftBottom,
    center,
    rightPageForManger
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
      dateTime:
        this.$route.query.ymd || moment().add(-1, 'days').format('yyyy-MM-DD'),
      orgNo: '',
      username: '',
      ranks: { day: '-', month: '-' },
      clickTgManager: false
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/less/animate.css");

.warp-managr {
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
  height: 100%;
}
</style>
