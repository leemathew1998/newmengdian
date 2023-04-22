<template>
  <div class="warp">
    <div class="wrap-left animated fadeInLeft">
      <div class="left-top">
        <leftTop :name="$route.params.name" :dateTime.sync="dateTime"></leftTop>
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
      <div ref="rightInitPage" class="box">
        <rightPageForManger></rightPageForManger>
      </div>
      <div ref="rightMainPage" class="box" style="display: none">
        <div class="head">
          <manger> </manger>
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
  mounted() {
    // this.init()
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
        }
      }
    }
  },
  methods: {
    async init2() {
      this.leftBottomLoading = true
      const res = await postAction(`ach/selectStaByman?ymd=${this.dateTime}&orgNo=${this.$route.params.orgNo}`)
      console.log(res)
      res.data.forEach(i => {
        i.countyName = i.tgManager
      })
      this.leftBottomData = sortRanking(res.data)
      this.leftBottomLoading = false
    },
    async leftBottomClickRow(record) {
      console.warn('record', record)
      this.tableLoading = true
      this.rightPageLoading = true
      const res = await Promise.all([
        postAction(`ach/selectStaByman?ymd=${this.dateTime}&id=${record.id}`)
        // postAction(`ach/selectStaByman?ymd=${this.dateTime}&orgNo=${record.orgNo}`)
      ])
      console.log(res)
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

      this.rightPageLoading = false
    }
    // async init () {
    //   let temp = []
    //   let temp_center = []
    //   this.$route.params.name = this.$route.params.name ? this.$route.params.name : '刘月焱'
    //   const res = await postAction('/ach/selectStaByman?id=1')
    //   const res2 = await postAction('/ach/dayPoint?id=1')
    //   for (const key in indexCenter16List) {
    //     temp_center.push({
    //       id: key,
    //       indexItems: indexCenter16List[key].name,
    //       originalValue: res2.data[indexCenter16List[key].rate] + '%',
    //       integral: res2.data[indexCenter16List[key].point]
    //     })
    //   }
    //   res.data.map((item) => {
    //     if (this.$route.params.name == item.tgManager) {
    //       // for (const key in indexCenter16List) {
    //       //   temp_center.push({
    //       //     id: key,
    //       //     indexItems: indexCenter16List[key].name,
    //       //     originalValue: item[indexCenter16List[key].rate] + "%",
    //       //     integral: item[indexCenter16List[key].point],
    //       //   })
    //       // }
    //     }
    //     temp.push({
    //       countyName: item.tgManager,
    //       toPoint: item.totalScore
    //     })
    //   })
    //   this.centerData = temp_center
    //   this.tableLoading = false
    //   this.leftBottomData = sortRanking(temp)
    //   this.leftBottomLoading = false
    // }

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
      dateTime: this.$route.params.ymd || moment().add(-1, 'days').format('yyyy-MM-DD')//
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
