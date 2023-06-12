<template>
  <div class="center-container">
    <div class="head">
      <span class="title">当日总积分：{{ allNumber }}分</span>
      <!-- <span class="ranking">日环比+3</span> -->
    </div>
    <Tables
      class="center-table"
      :data="centerData"
      :tableLoading="tableLoading"
    >
      <template v-slot="slotProps">
        <a-button
          style="display: flex; justify-content: center"
          size="small"
          type="primary"
          @click.stop="operations(slotProps.table_key)"
        >
          查看详情
        </a-button>
      </template>
    </Tables>
  </div>
</template>

<script>
import Tables from '@/components/tables/Tabless'
export default {
  methods: {
    // 查看右侧详情
    operations: function (payload) {
      if (payload.indexItems != this.rightPageData.name) {
        this.rightPageData.data = []
        this.rightPageData.params = payload
        this.rightPageData.name = payload.indexItems
      }

      if (!this.rightInitPage) {
        this.$emit('update:rightInitPage', true)
      }
    }
  },
  props: [
    'centerData',
    'tableLoading',
    'rightInitPage',
    'rightInitPageData',
    'rightPageData'
  ],
  computed: {
    allNumber: function () {
      let all = 0
      this.centerData.map((item) => {
        all += item.integral
      })
      return all
    }
  },
  components: {
    Tables
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

.center-container {
  border: 1px #f5f5f5 solid;
  border-radius: 5px;
  padding: 2px;
  height: 100%;

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
  .center-table {
    height: calc(100% - 40px);
    /deep/.ant-spin-nested-loading {
      height: 100%;
      overflow-y: scroll;
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
      }
    }
  }
}

/deep/ .ant-table-tbody > tr > td {
  padding-top: 12px;
  padding-bottom: 12px;
}

/deep/ .ant-table-thead > tr > th {
  padding-top: 15px;
  padding-bottom: 15px;
}

.ant-btn-primary {
  background-color: #28599d;
}
</style>
