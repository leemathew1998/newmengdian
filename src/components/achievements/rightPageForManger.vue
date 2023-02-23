<template>
  <div class="box">
    <div class="head">
      <span class="title">工单概览</span>
    </div>
    <div class="workorder">
      <li class="title2" style="color: #8d8d8d">当月待处理工单</li>
      <p style="margin-left: 80px; color: #8d8d8d">
        累计
        <span
          style="
            font-size: 25px;
            margin-left: 30px;
            margin-right: 20px;
            font-weight: 600;
          "
        >
          {{ unhandledNum }}</span
        >件
      </p>
      <div class="tanger">
        <div v-for="(item, index) in unhandledData" :key="index">
          <div class="noi1">{{ index + 1 }}.</div>
          <div class="noi2">{{ item.tgName }}</div>
          <div class="noi3">{{ item.perOne }}%</div>
          <div class="noi4">{{ item.statusOnenums }}件</div>
        </div>
        <!-- <div>
          <div class="noi1">1.</div>
          <div class="noi2">岭上家园F区</div>
          <div class="noi3">35%</div>
          <div class="noi4">88件</div>
        </div>
        <div>
          <div class="noi1">2.</div>
          <div class="noi2">祥瑞苑</div>
          <div class="noi3">20%</div>
          <div class="noi4">67件</div>
        </div>
        <div>
          <div class="noi1">3.</div>
          <div class="noi2">岭上家园D区</div>
          <div class="noi3">16%</div>
          <div class="noi4">54件</div>
        </div>
        <div>
          <div class="noi1">4.</div>
          <div class="noi2">岭上家园E区</div>
          <div class="noi3">18%</div>
          <div class="noi4">44件</div>
        </div>
        <div>
          <div class="noi1">5.</div>
          <div class="noi2">上普玫瑰庄园</div>
          <div class="noi3">11%</div>
          <div class="noi4">32件</div>
        </div> -->
      </div>
    </div>
    <div class="workorder">
      <li class="title2" style="color: #f59a23">当月处理中工单</li>
      <p style="margin-left: 80px; color: #f59a23">
        累计
        <span
          style="
            font-size: 25px;
            margin-left: 30px;
            margin-right: 20px;
            font-weight: 600;
          "
        >
          {{ processingNum }}</span
        >件
      </p>
      <div class="tanger">
        <div v-for="(item, index) in processingData" :key="index">
          <div class="noi1">{{ index + 1 }}.</div>
          <div class="noi2">{{ item.tgName }}</div>
          <div class="noi3">{{ item.perTwo }}%</div>
          <div class="noi4">{{ item.statusTwonums }}件</div>
        </div>
        <!-- <p>
          <span class="no1">1.</span>
          <span class="no2">岭上家园F区</span>
          <span class="no3">35%</span>
          <span class="no4">88件</span>
        </p>
        <p>
          <span class="no1">2.</span>
          <span class="no2">祥瑞苑</span>
          <span class="no3">20%</span>
          <span class="no4">67件</span>
        </p>
        <p>
          <span class="no1">3.</span>
          <span class="no2">岭上家园D区</span>
          <span class="no3">16%</span>
          <span class="no4">54件</span>
        </p>
        <p>
          <span class="no1">4.</span>
          <span class="no2">岭上家园E区</span>
          <span class="no3">18%</span>
          <span class="no4">44件</span>
        </p>
        <p>
          <span class="no1">5.</span>
          <span class="no2">上普玫瑰庄园</span>
          <span class="no3">11%</span>
          <span class="no4">32件</span>
        </p> -->
      </div>
    </div>
    <div class="workorder">
      <li class="title2" style="color: #009688">当月已处理工单</li>
      <p style="margin-left: 80px; color: #009688">
        累计
        <span
          style="
            font-size: 25px;
            margin-left: 30px;
            margin-right: 20px;
            font-weight: 600;
          "
        >
          {{ processedNum }}</span
        >件
      </p>
      <div class="tanger">
        <div v-for="(item, index) in processedData" :key="index">
          <div class="noi1">{{ index + 1 }}.</div>
          <div class="noi2">{{ item.tgName }}</div>
          <div class="noi3">{{ item.perThree }}%</div>
          <div class="noi4">{{ item.statusThrnums }}件</div>
        </div>
        <!-- <p>
          <span class="no1">1.</span>
          <span class="no2">岭上家园F区</span>
          <span class="no3">35%</span>
          <span class="no4">88件</span>
        </p>
        <p>
          <span class="no1">2.</span>
          <span class="no2">祥瑞苑</span>
          <span class="no3">20%</span>
          <span class="no4">67件</span>
        </p>
        <p>
          <span class="no1">3.</span>
          <span class="no2">岭上家园D区</span>
          <span class="no3">16%</span>
          <span class="no4">54件</span>
        </p>
        <p>
          <span class="no1">4.</span>
          <span class="no2">岭上家园E区</span>
          <span class="no3">18%</span>
          <span class="no4">44件</span>
        </p>
        <p>
          <span class="no1">5.</span>
          <span class="no2">上普玫瑰庄园</span>
          <span class="no3">11%</span>
          <span class="no4">32件</span>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/api/manage'
export default {
  props: ['rightInitPageColumns', 'rightInitPageData', 'rightPageLoading'],
  data () {
    return {
      unhandledData: [],
      processingData: [],
      processedData: [],
      unhandledNum: 0,
      processingNum: 0,
      processedNum: 0,
    }
  },
  created () {
    this.workOrderView()
  },
  methods: {
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
    async workOrderView () {
      const res = await Promise.all([
        postAction("/wosum/getWorkoSum1"),
        postAction("/wosum/getWorkoSum2"),
        postAction("/wosum/getWorkoSum3")
      ])
      console.log(res, 'qweqeqasda')
      this.unhandledData = res[0].data['当月待处理工单']
      this.processingData = res[1].data['当月处理中工单']
      this.processedData = res[2].data['当月已处理工单']
      this.unhandledData = this.unhandledData.sort((a, b) => b.statusOnenums - a.statusOnenums)
      this.processingData = this.processingData.sort((a, b) => b.statusTwonums - a.statusTwonums)
      this.processedData = this.processedData.sort((a, b) => b.statusThrnums - a.statusThrnums)
      this.unhandledNum = this.unhandledData.reduce((prev, next) => prev + next.statusOnenums, 0)
      this.processingNum = this.processingData.reduce((prev, next) => prev + next.statusTwonums, 0)
      this.processedNum = this.processedData.reduce((prev, next) => prev + next.statusThrnums, 0)
    }
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

.workorder {
  height: 264px;
  margin: 30px;
  margin: 0px;

  li::marker {
    font-size: 28px;
  }

  .title2 {
    font-size: 14px;
    font-weight: 600;
    margin-left: 50px;
    color: #aaaaaa;
  }

  p {
    margin-left: 70px;
  }
  .tanger::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .tanger {
    height: 150px;
    overflow: scroll;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none;
    p {
      margin-bottom: 8px;
    }
    > div {
      width: 100%;
      padding: 0 20px;
      height: 30px;
      display: flex;
      align-items: center;
      .noi1 {
        width: 30px;
      }
      .noi2 {
        flex: 1;
      }
      .noi3 {
        width: 40px;
      }
      .noi4 {
        width: 60px;
      }
    }
  }

  .no1 {
    display: inline-block;
    width: 30px;
  }

  .no2 {
    display: inline-block;
    width: 280px;
    overflow: hidden;
  }

  .no3 {
    display: inline-block;
    width: 30px;
  }

  .no4 {
    display: inline-block;
    width: 30px;
  }
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
