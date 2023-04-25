<template>
  <div>
    <div class="top">
      <!-- 简介 -->
      <p class="p1" style="font-size: 23px">绩效指标详情—{{ data.name }}</p>
      <p class="p2" style="font-size: 14px">指标计算方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonList[data.name] }}</p>
      <p class="p2" style="font-size: 14px">指标考核方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonListV2[data.name] }}</p>
      <!-- 隐藏 -->
      <p class="p2" style="font-size: 14px" v-show="false">计算过程</p>
      <div class="formula" v-show="false">
        {{ formula }}
      </div>
    </div>
    <!-- 表单 -->
    <div class="lower">
      <p class="p2" style="font-size: 14px">原始数据</p>
      <a-table
        :columns="tableColumnList[data.name]"
        :data-source="data.data"
        :customRow="rowClick"
        bordered
        :loading="loading"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
import MathJax from '@/utils/globalVariable.js'
import { reasonList, reasonListV2, tableColumnList } from './constion.js'
export default {
  data() {
    return {
      formula:
        '$$等分=\\sum _{nT}^{i=1}\\frac{第i期支付金额}{1+年化综合成本}$$',
      reasonList,
      reasonListV2,
      tableColumnList
    }
  },
  props: {
    data: {
      type: Object
    },
    loading: {
      type: Boolean
    }
  },
  computed: {
    sumNumber: function () {
      let sum = 0
      for (let i = this.data.length - 1; i >= 0; i--) {
        let num = Number(this.data[i].caiji)
        sum += num
        // console.log(this.centerdata[i].integral,'ll');
        // sum = sum.toFixed(2);
      }
      return sum
    },
    allNumber: function () {
      let sum = 0
      for (let i = this.data.length - 1; i >= 0; i--) {
        let num = Number(this.data[i].COUNT)
        sum += num
        // console.log(this.centerdata[i].integral,'ll');
        // sum = sum.toFixed(2);
      }
      return sum
    },
    heNumber: function () {
      let sum = 0
      for (let i = this.data.length - 1; i >= 0; i--) {
        let num = Number(this.data[i].zongshu)
        sum += num
        // console.log(this.centerdata[i].integral,'ll');
        // sum = sum.toFixed(2);
      }
      return sum
    }
  },
  created() {
    this.formatMath()
  },
  methods: {
    formatMath() {
      let that = this
      setTimeout(function () {
        that.$nextTick(function () {
          if (MathJax.isMathjaxConfig) {
            // 判断是否初始配置，若无则配置。
            MathJax.initMathjaxConfig()
          }
          MathJax.MathQueue('formula') // 传入组件id，让组件被MathJax渲染
        })
      }, 500)
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name: 'achievements/site',
              params: {
                name: record.name
              }
            })
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.three-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .dingbu {
    display: inline-block;
    margin-left: 20px;
    margin: 0;
    padding-left: 8px;
  }
}

.top {
  .p1 {
    color: #1c9399;
    text-align: center;
  }

  .p2 {
    color: #1c9399;
  }

  .formula {
    margin-left: 10px;
  }
}

.lower {
  .p2 {
    color: #1c9399;
  }
}

.com {
  float: left;
  display: inline-block;
  width: 40%;
  margin-right: 10px;
  // margin: 0 auto;
  display: flex;
  position: relative;
}

.fenzi {
  flex: 1;
  text-align: center;
  font-weight: 600;
  display: inline-block;

  hr {
    margin: 0;
    // border: 1px solid black;
    background-color: black;
  }
}

.baifen {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 600;
  //   display: flex;
  flex: 2;
  display: inline-block;
}

.dengyu {
  padding-top: 8px;
  //   display: flex;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  display: inline-block;
}

.comn {
  display: inline-block;
  display: flex;
  width: 55%;
}

.one {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  padding-top: 9px;
  display: inline-block;
}

.two {
  flex: 2;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;

  hr {
    margin: 0;
    // border: 1px solid black;
    background-color: black;
  }
}

.three {
  flex: 1;
  padding-top: 9px;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
}

.four {
  flex: 1;
  font-weight: 600;
  font-size: 16px;
  padding-top: 9px;
  display: inline-block;
}

.gongshi {
  width: 100%;
  height: 60px;

  p {
    margin: 0;
  }

  .gongshi1 {
    width: 45%;
    margin-right: 10px;
    float: left;
    font-size: 16px;
    font-weight: 600;
  }

  .gongshi2 {
    width: 52%;
    float: left;
    font-size: 16px;
    font-weight: 600;

    .fenshu2 {
      float: left;
      // width: 70px;
      height: 60px;

      hr {
        margin: 0;
        // border: 1px solid black;
        background-color: black;
      }

      p {
        text-align: center;
      }
    }
  }
}
</style>
