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
import { postAction } from '@/api/manage'
import {
  indexCenter16List,
  leftBottomColumns,
  rightInitPageColumns
} from './const.js'
import { sortRanking, MAP_NAME_TO_FUNC } from './utils.js'
import moment from 'moment'
export default {
  mounted() {
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
      const resRightBottom = await postAction(
        `ach/countyList?ymd=${this.dateTime}`
      )
      this.leftBottomData = sortRanking(resRightBottom.data)
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
    // 只请求中间的数据
    async renderCenterData(record) {
      this.tableLoading = true
      const res = await postAction(
        `ach/countyList?ymd=${this.dateTime}&id=${record.id}`
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
      let params = {
        name: record.countyName,
        orgNo: record.orgNo,
        ymd: this.dateTime,
        router: 'achievements'
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
      console.log(this.rightPageData.data)
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
      // dateTime: moment().add(-1, 'days').format('yyyy-MM-DD') //
      dateTime: moment('2023-04-21').format('yyyy-MM-DD')
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
