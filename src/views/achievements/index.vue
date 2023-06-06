<template>
  <div class="warp-achievements">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop name="呼伦贝尔供电公司" :dateTime.sync="dateTime"></leftTop>
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
import { postAction, getAcAll } from '@/api/manage'
import { MAP_NAME_TO_SORT } from '@/api/order.js'
import {
  indexCenter16List,
  leftBottomColumns,
  rightInitPageColumns
} from './const.js'
import { sortRanking } from './utils.js'
import moment from 'moment'
export default {
  async mounted() {
    this.init2()
    await this.renderCenterData()
    if (this.centerData.length > 0) {
      this.rightPageData.data = []
      this.rightPageData.params = this.centerData[0]
      this.rightPageData.name = this.centerData[0].indexItems
    }
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
      const resRightBottom = await postAction(
        `ach/countyList?ymd=${this.dateTime}`
      )
      resRightBottom.data.forEach((item) => {
        let countyName = ''

        if (MAP_NAME_TO_SORT[item.countyName]) {
          countyName = MAP_NAME_TO_SORT[item.countyName]
        } else {
          countyName = item.countyName
            .replace('国网内蒙古东部电力有限公司', '国网')
            .replace('分', '')
        }
        item.countyName = countyName
      })
      this.leftBottomData = sortRanking(resRightBottom.data)
      this.leftBottomLoading = false
    },
    // 只请求中间的数据
    async renderCenterData() {
      this.tableLoading = true
      const res = await postAction(
        `ach/cityList?ymd=${this.dateTime}&orgNo=15421`
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
    async leftBottomClickRow(record, index) {
      let params = {
        name: record.countyName,
        orgNo: record.orgNo,
        ymd: this.dateTime,
        router: 'achievements',
        ranks: JSON.stringify({
          day: record.ranking,
          month: record.ranking
        }),
        id: record.id
      }
      this.$store.commit(
        'setUserAchievementsList',
        JSON.parse(JSON.stringify(params))
      )
      this.$router.push({
        name: 'achievements/site',
        query: params
      })
    },
    // 右侧16接口请求
    async loadRightMathPage() {
      let res = await getAcAll({
        orgNo: '15421',
        ymd: this.rightPageData.params.ymd,
        acId: '4'
      })

      console.warn('acId: 4', res)
      this.rightPageData.data = []
      this.rightPageData.data.push(res)
    }
  },
  components: {
    views,
    leftTop,
    leftBottom,
    center
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
        distLv: 4,
        params: {
          successALL: 0,
          failALL: 0,
          total: 0
        },
        data: []
      },
      leftBottomLoading: false,
      tableLoading: false,
      rightPageLoading: false,
      // 结束
      dateTime: moment().add(-1, 'days').format('yyyy-MM-DD') //
      // dateTime: moment('2023-04-21').format('yyyy-MM-DD')
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/less/animate.css");

.warp-achievements {
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
}

.head {
  width: 100%;
}
</style>
