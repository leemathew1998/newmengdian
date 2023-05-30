<template>
  <div class="manage-detail-page">
    <div class="top">
      <!-- 简介 -->
      <p class="p1" style="font-size: 23px">绩效指标详情—{{ data.name }}</p>
      <p class="p2" style="font-size: 14px">指标计算方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonList[data.name] }}</p>
      <p class="p2" style="font-size: 14px">指标考核方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonListV2[data.name] }}</p>
      <!-- <p class="p2" style="font-size: 14px">计算过程</p> -->
    </div>
    <!-- 表单 -->
    <div class="lower">
      <p class="p2" style="font-size: 14px">原始数据</p>
      <a-table
        :columns="tableColumnListForManagr[data.name]"
        :data-source="data.data"
        :customRow="rowClick"
        bordered
        :loading="loading"
        :pagination="false"
      >
      </a-table>
    </div>
  </div>
</template>
<script>

// 将control赋值给sent
// var sent = control();
// const rightdata = []
import { reasonList, reasonListV2, tableColumnListForManagr } from './constion.js'
export default {
  data() {
    return {
      reasonList,
      reasonListV2,
      tableColumnListForManagr
    }
  },

  props: {
    data: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            // this.data.push({
            //   name: 'C010',
            //   success: '453',
            //   failed: '5',
            //   total: '458'
            // })
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
