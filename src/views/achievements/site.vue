<template>
  <div class="warp-site">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop :name="username" :ranks="ranks" :dateTime.sync="dateTime"></leftTop>
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
import { postAction } from '@/api/manage'
import {
  indexCenter16List,
  leftBottomColumns,
  rightInitPageColumns
} from './const.js'
import { sortRanking, MAP_NAME_TO_FUNC } from './utils.js'
import moment from 'moment'
export default {
  created() {
    this.dateTime =
      this.$route.query.ymd || moment().add(-1, 'days').format('yyyy-MM-DD')
    this.username = this.$route.query.name || this.$store.getters.username
    this.orgNo = this.$route.query.orgNo
    this.ranks = JSON.parse(this.$route.query.ranks)
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
      // 此处直接模拟点击左下第一条数据
      if (this.leftBottomData.length > 0) {
        await this.renderCenterData(this.leftBottomData[0])
        if (this.centerData.length > 0) {
          this.rightPageData.data = []
          this.rightPageData.params = this.centerData[0]
          this.rightPageData.name = this.centerData[0].indexItems
        }
      }
      this.leftBottomLoading = false
    },
    async renderCenterData(record) {
      this.tableLoading = true
      const res = await postAction(
        `ach/stationList?ymd=${this.dateTime}&id=${record.id}`
      )
      // Promise.all([
      //   postAction(`ach/stationList?ymd=${this.dateTime}&id=${record.id}`),
      //   postAction(
      //     `ach/selectStaByman?ymd=${this.dateTime}&orgNo=${record.orgNo}`
      //   )
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
          orgNo: res.data[0].orgNo,
          ymd: this.dateTime
        })
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
          day: index + 1,
          month: index + 1
        })
      }
      this.$store.commit(
        'setUserAchievementsList',
        {
          name: this.$route.query.name,
          orgNo: this.$route.query.orgNo,
          ymd: this.dateTime,
          router: 'achievements/site',
          ranks: JSON.stringify(this.ranks)
        })
      this.$router.push({
        name: 'achievements/manger',
        query: params
      })
    },
    // 右侧16接口请求
    async loadRightMathPage() {
      this.rightPageData.data = []
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
