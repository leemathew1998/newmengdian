<template>
  <!-- 表格、导入、导出数据 -->
  <div class="warp">
    <!-- 表格部分 -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="tablePaginationChange"
      :customRow="handleClickRow"
      :loading="loading"
      :pagination="pagination"
      :scroll="{ x: scroll }"
      rowKey="key"
    ></a-table>
  </div>
</template>

<script>
import UploadModal from '@/components/modal/UploadModal'
import ExportModal from '@/components/modal/ExportModal'
export default {
  // inject:['reload'],
  name: 'Tables',
  props: {
    columns: {
      type: Array,
      required: true
    },
    scroll: {
      type: Number,
      default: 1500
    },
    data: {
      type: Array,
      required: true
    },
    operationName: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    },
    xlsxName: {
      type: String,
      require: true
    },
    // 导出接口地址
    exportUrl: {
      type: String,
      require: true
    },
    // 导出的索引名
    ids: {
      type: String,
      require: true
    }
  },
  components: {
    UploadModal,
    ExportModal
  },
  data () {
    return {
      selectedRowKeys: [],
      uploadvisible: false,
      exportvisible: false,
      pagination: {
        current: 1,
        total: this.data.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '40', '80', '100'],
        showTotal: (total) => `共 ${total} 条`,
        pageSize: 10
      }
    }
  },
  created () {
    if (
      this.operationName !== '' &&
      this.columns[this.columns.length - 1].dataIndex !== 'operation'
    ) {
      this.columns.push({
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        // width: 80,
        scopedSlots: {
          customRender: 'operation'
        }
      })
    }
  },
  watch: {
    pageConfig: {
      handler: function (newVal) {
        if (Object.keys(newVal).length) {
          this.pagination.current = newVal.current
          this.pagination.pageSize = newVal.pageSize
          this.pagination.total = newVal.total

          this.pageConfig.current = newVal.current
          this.pageConfig.pageSize = newVal.pageSize
          this.pageConfig.total = newVal.total
        }
      },
      deep: true
    },
    pagination: {
      handler: function (newVal) {
        if (Object.keys(this.pageConfig).length) {
          this.pageConfig.current = newVal.current
          this.pageConfig.pageSize = newVal.pageSize
          this.pageConfig.total = newVal.total
        }
      },
      deep: true
    }
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      console.log(current, pageSize)
    },
    // 选择更改
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('changeSelectedRowKeys', this.selectedRowKeys)
    },
    // 选择全部
    selectAll () {
      this.selectedRowKeys = []
      for (let i = 0; i < this.data.length; i++) {
        this.selectedRowKeys.push(i)
      }
      this.$emit('changeSelectedRowKeys', this.selectedRowKeys)
    },
    // 重置
    toggle () {
      const tem = []
      for (let i = 0; i < this.data.length; i++) {
        if (!this.selectedRowKeys.includes(i)) {
          tem.push(i)
        }
      }
      this.selectedRowKeys = tem
      this.$emit('changeSelectedRowKeys', this.selectedRowKeys)
    },
    tablePaginationChange (pagination) {
      this.pagination.current = pagination.current // 重新设置当前页
      this.pagination.pageSize = pagination.pageSize
      this.pageConfig.current = pagination.current
    },
    // 单击跳出选择框
    handleClickRow (record, index) {
      return {
        on: {
          click: () => {
            this.$emit('clickRow', record)
          }
        }
      }
    },
    // 局部刷新
    // newpay(){
    //   this.reload
    // }
  }
}
</script>

<style lang="less" scoped>
.warp {
  width: 100%;

  :hover {
    cursor: pointer;
  }

  overflow: hidden;

  .orderNumber {
    text-align: right;
    overflow: hidden;
  }

  .bottom {
    z-index: 10;
    position: relative;
    width: 100%;

    .left {
      position: absolute;
      left: 0;
      bottom: 20px;
      display: flex;
    }
  }

  .alert {
    color: red;
  }

  .safe {
    color: green;
  }

  .hidden {
    display: none;
  }
}

/deep/.ant-table-tbody tr:nth-child(2n) {
  background-color: #fafafa;
}
</style>
