<template>
  <div class="manage-detail-page">
    <div class="top">
      <!-- 简介 -->
      <p class="p1" style="font-size: 23px">绩效指标详情—采集成功率</p>
      <p class="p2" style="font-size: 14px">计算规则</p>
      <p class="p3" style="font-size: 11px">满分10分</p>
      <p class="p3" style="font-size: 11px">
        采集成功的用户数量/该区域管辖的所有用户数量
        目标值定为100%，每低0.5%，扣1分。采集成功率为95%时， 此项分数扣减为0
      </p>
      <!-- <p class="p2" style="font-size: 14px">计算过程</p> -->
    </div>
    <!-- 表单 -->
    <div class="lower">
      <p class="p2" style="font-size: 14px">原始数据</p>
      <a-table
        class="manage-table"
        :columns="columns"
        :data-source="data"
        :customRow="rowClick"
        bordered
        :pagination="false"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
import { collect, control } from '@/components/achievements/constion.js'

const columns = [
  {
    title: '变压器编号',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '采集成功',
    dataIndex: 'success',
    align: 'center'
  },
  {
    title: '采集失败',
    dataIndex: 'failed',
    align: 'center'
  },
  {
    title: '采集总数',
    dataIndex: 'total',
    align: 'center'
  }
]

const data = [
  {
    name: 'C007',
    success: '453',
    failed: '5',
    total: '458'
  },
  {
    name: 'C008',
    success: '434',
    failed: '5',
    total: '439'
  },
  {
    name: 'C009',
    success: '343',
    failed: '5',
    total: '348'
  },
  {
    name: 'C010',
    success: '453',
    failed: '5',
    total: '458'
  }
]
// 将control赋值给sent
// var sent = control();
// const rightdata = []

export default {
  data() {
    return {
      data,
      columns
    }
  },

  props: {
    rightdata: {
      type: Object
    },
    rightInitPage: {
      type: Boolean
    }
  },

  mounted() {
    // Array.from({ length: 100 }, (_, i) => i).forEach((i) => {
    //   this.data.push({
    //     name: 'C010',
    //     success: '453',
    //     failed: '5',
    //     total: '458'
    //   })
    // })
    // el.style.height = `${el.clientHeight}px`
    // collect().then((res) => {
    //   this.shuju = res
    //   console.log(res, 'kkk')
    // })
    // control().then((res) => {
    //   // this.shuju = res;
    //   // console.log(res, "mmm");.
    // })
  },

  watch: {
    rightdata: {
      deep: true,
      handler(newval, oldval) {
        // console.log(newval,'ssa');
        if (oldval.id == '0') {
          this.data = this.shuju
        }
        if (newval.id == '0') {
          this.data = this.shuju
          // console.log(this.data, "ppppp");
        }
        if (newval.id == '1') {
          this.data = this.shuju
          // console.log(this.data, "kk");
        }
      }
    },
    rightInitPage(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$nextTick(() => {
            const el = document.querySelector('.manage-table')
            el.style.height = `${el.clientHeight}px`
            console.dir(el.clientHeight)
          })
        }, 400)
      }
    }
  },

  methods: {
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.data.push({
              name: 'C010',
              success: '453',
              failed: '5',
              total: '458'
            })
            // this.$router.push('/achievements/site')
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.manage-detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    .p1 {
      color: #1c9399;
      text-align: center;
    }

    .p2 {
      color: #1c9399;
    }

    .formula {
      margin-left: 2%;
      width: 95%;
    }
  }
  .lower {
    flex: 1;
    display: flex;
    flex-direction: column;
    .p2 {
      color: #1c9399;
    }
    .manage-table {
      // flex: 1;
			height: 100%;
      /deep/.ant-spin-nested-loading {
        height: 100%;

        .ant-table-content {
          height: 100%;

          .ant-table-placeholder {
            height: calc(100% - 43px);
          }
        }

        .ant-spin-container {
          height: 100%;
        }

        .ant-table {
          height: 100%;
          overflow-y: scroll;
        }
      }
    }
  }
}
</style>
