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
      <div ref="rightInitPage" class="box" style="height: 100%">
        <rightPageForMaster
          :rightInitPageColumns="rightInitPageColumns"
          :rightInitPageData="rightInitPageData"
          :rightPageLoading="rightPageLoading"
        ></rightPageForMaster>
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
    this.init2()
  },
  mounted() {
    //     Array.from({ length: 10 }, (_, i) => i).forEach(i => {
    //   this.rightInitPageData.push({
    //     ranking: i,
    //     id: Math.random()
    //   })
    // })
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
      this.leftBottomLoading = false
    },
    async leftBottomClickRow(record) {
      this.rightInitPage = false
      this.tableLoading = true
      this.rightPageLoading = true
      const res = await Promise.all([
        postAction(`ach/countyList?ymd=${this.dateTime}&id=${record.id}`),
        postAction(
          `ach/stationList?ymd=${this.dateTime}&orgNo=${record.orgNo}`
        )
      ])
      // 处理中间数据
      let temp = []
      for (const key in indexCenter16List) {
        // let originalValue = res[0].data[0][indexCenter16List[key].rate]
        // originalValue = originalValue ? `${originalValue}%` : '-'
        temp.push({
          id: key,
          indexItems: indexCenter16List[key].name,
          originalValue: `${res[0].data[0][indexCenter16List[key].rate]}%`,
          integral: res[0].data[0][indexCenter16List[key].point],
          orgNo: res[0].data[0].orgNo,
          ymd: this.dateTime
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
        this.rightPageData.data.push(res)
      }
      console.log(this.rightPageData.data)
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
      dateTime: moment().add(-5, 'days').format('yyyy-MM-DD') //
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
