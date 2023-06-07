<template>
  <div class="warp-site">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop
          :name="username"
          :ranks="ranks"
          :dateTime.sync="dateTime"
        ></leftTop>
      </div>
      <div class="left-bottom">
        <leftBottom
          :leftBottomColumns="leftBottomColumns"
          :leftBottomData="leftBottomData"
          :leftBottomLoading="leftBottomLoading"
          @clickRow="leftBottomClickRow"
        ></leftBottom>
      </div>
    </div>
    <div class="wrap-center animated fadeInUp">
      <center
        :centerData="centerData"
        :tableLoading="tableLoading"
        :rightInitPage.sync="rightInitPage"
        :rightInitPageData="rightInitPageData"
        :rightPageData.sync="rightPageData"
      ></center>
    </div>
    <div class="wrap-right animated fadeInRight">
      <div ref="rightMainPage" class="box" style="height: 100%">
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
import { postAction, getAcAll } from '@/api/manage'
import {
  indexCenter16List,
  leftBottomColumns,
  rightInitPageColumns
} from './const.js'
import { sortRanking, MAP_NAME_TO_FUNC } from './utils.js'
import moment from 'moment'
export default {
  created() {
    // 获取传参
    this.dateTime =
      this.$route.query.ymd || moment().add(-1, 'days').format('yyyy-MM-DD')
    this.username = this.$route.query.name || this.$store.getters.username
    this.orgNo = this.$route.query.orgNo
    this.ranks = JSON.parse(this.$route.query.ranks)
    // 请求左下列表
    this.init2()
  },
  watch: {
    'rightPageData.name': {
      handler: function (newVal) {
        this.loadRightMathPage()
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
      const res = await postAction(
        `ach/stationList?ymd=${this.dateTime}&orgNo=${this.$route.query.orgNo}`
      )
      res.data.forEach((i) => {
        i.countyName = i.stationName
      })
      this.leftBottomData = sortRanking(res.data)
      // 此处使用上级传入的centerData查询中奖数据
      await this.renderCenterDataV2(this.$route.query)
      if (this.centerData.length > 0) {
        this.rightPageData.data = []
        this.rightPageData.params = this.centerData[0]
        this.rightPageData.name = this.centerData[0].indexItems
      }
      this.leftBottomLoading = false
    },
    // 请求河东/河西级别的中间数据
    async renderCenterDataV2(record) {
      this.tableLoading = true
      const res = await postAction(
        `ach/countyList?ymd=${this.dateTime}&id=${record.id}`
      )
      // 处理中间数据
      let temp = []
      if (res.data.length > 0) {
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
            orgName: res.data[0].countyName,
            ymd: this.dateTime
          })
        }
      }

      this.centerData = temp
      this.tableLoading = false
    },
    async leftBottomClickRow(record, index) {
      let params = {
        name: record.countyName,
        orgNo: record.orgNo,
        ymd: this.dateTime,
        router: 'achievements/site',
        ranks: JSON.stringify({
          day: record.ranking,
          month: record.ranking
        }),
        id: record.id
      }
      // 提供给右上角返回使用
      this.$store.commit('setUserAchievementsList', {
        name: this.$route.query.name,
        orgNo: this.$route.query.orgNo,
        ymd: this.dateTime,
        router: 'achievements/site',
        ranks: JSON.stringify(this.ranks),
        id: this.$route.query.id
      })
      this.$router.push({
        name: 'achievements/manger',
        query: params
      })
    },
    // 右侧16接口请求
    async loadRightMathPage() {
      let res
      if (this.rightPageData.name == '采集成功率') {
        res = await MAP_NAME_TO_FUNC[this.rightPageData.name]({
          orgNo: this.rightPageData.params.orgNo,
          ymd: this.rightPageData.params.ymd
        })
      } else {
        res = await getAcAll({
          orgNo: this.rightPageData.params.orgNo,
          ymd: this.rightPageData.params.ymd,
          acId: '3'
        })
      }

      console.warn('acId: 3', res)
      this.rightPageData.data = []
      this.rightPageData.data.push(res)
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
        distLv: 3,
        data: []
      },
      leftBottomLoading: false,
      tableLoading: false,
      rightPageLoading: false,
      // 结束
      dateTime:
        this.$route.query.ymd || moment().add(-1, 'days').format('yyyy-MM-DD'), // .add(-1, 'days')
      orgNo: '',
      username: '',
      ranks: { day: '-', month: '-' }
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
