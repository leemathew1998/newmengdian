<template>
  <!-- 表格、导入、导出数据 -->
  <div class="warp-table">
    <!-- 表格部分 -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="tablePaginationChange"
      :loading="loading"
      :pagination="pagination"
      :scroll="{ y: caclHeight }"
      rowKey="id"
      @expand="expand"
    >
      <template slot="isRole" slot-scope="text">
        <div>{{ MAP_ROLES[text] }}</div>
      </template>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <!-- <span v-if="expandLoadings">加载中...</span> -->
        <span >
          <div
            class="expanded"
            v-for="item in record.readNameList"
            :key="item.readName"
          >
            <span
              style="min-width: 150px"
              class="expanded-item"
            >抄表员姓名:{{ item.readName }}</span
            >
            <span
              style="min-width: 200px"
              class="expanded-item"
            >抄表员账号:{{ item.userName1 }}</span
            >
            <a-button
              style="display: flex; justify-content: center"
              size="small"
              type="primary"
              @click.stop="operations(item)"
            >
              修改
            </a-button>
            <a-popconfirm
              title="确定要删除此用户吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteUser(item)"
            >
              <a-button
                style="
                  display: flex;
                  justify-content: center;
                  margin-left: 10px;
                "
                size="small"
                type="danger"
              >
                删除
              </a-button>
            </a-popconfirm>
          </div>
        </span>
      </p>
      <template slot="operation" slot-scope="text, record">
        <div style="display: flex; justify-content: center">
          <slot :table_key="record"></slot>
        </div>
      </template>
    </a-table>
    <div class="bottom">
      <div class="left">
        <a-button
          type="primary"
          style="margin-right: 10px; background-color: #28599d"
          @click="addUser"
        >
          新增用户
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/api/manage'
import { deleteUser } from '@/api/login.js'
export default {
  // inject:['reload'],
  name: 'TableForUserManage',
  props: {
    columns: {
      type: Array,
      required: true
    },
    scroll: {
      type: Number,
      default: 1000
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
  data() {
    return {
      selectedRowKeys: [],
      uploadvisible: false,
      exportvisible: false,
      pagination: {
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '40', '80', '100'],
        showTotal: (total) => `共 ${total} 条`,
        pageSize: 20
      },
      caclHeight: 100,
      MAP_ROLES: {
        1: '所站长',
        2: '台区经理',
        3: '管理员'
      },
      expandLoadings: false
    }
  },
  created() {
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
  mounted() {
    const el = document.querySelector('.warp-table')
    this.caclHeight = el.clientHeight - 120
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
    // 新增用户
    addUser() {
      this.$emit('addUser', {
        isAdd: true,
        disable: false,
        isManage: undefined,
        isRole: undefined,
        orgName: undefined,
        orgNo: undefined,
        relaName: undefined,
        userId: undefined,
        userName: undefined,
        userName1: undefined,
        readName: undefined
      })
    },
    // 修改用户
    operations(payload) {
      payload.isAdd = false
      payload.disable = true
      console.log(payload)
      this.$emit('addUser', payload)
    },
    // 删除用户
    async deleteUser(payload) {
      const res = await deleteUser({ id: payload.id })
      this.$notification['success']({
        message: '操作成功',
        description: res
      })
      this.$emit('reloadPage')
    },
    // 返回给父组件方便查询
    pageParamsReturn() {
      return {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
    },
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    async expand(expanded, record) {
      if (expanded) {
        this.expandLoadings = true
        record.readNameList.length = 0
        // setTimeout(() => {
        //   record.readNameList = [
        //     {
        //       readName: '1we34',
        //       userName1: '11dfghjkhgfd1'
        //     },
        //     {
        //       readName: '123r43',
        //       userName1: '1dsf11'
        //     },
        //     {
        //       readName: '1354235',
        //       userName1: '1fergbd11'
        //     }
        //   ]
        //   this.expandLoadings = false
        // }, 2000)
        const res = await postAction(`SysUser/getReadName?userName=${record.userName}`).catch(err => { console.log(err) })
        record.readNameList = res
        this.expandLoadings = false
      }
    },
    // 选择更改
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      this.$emit('changeSelectedRowKeys', this.selectedRowKeys)
    },
    // 选择全部
    selectAll() {
      this.selectedRowKeys = []
      for (let i = 0; i < this.data.length; i++) {
        this.selectedRowKeys.push(i)
      }
      this.$emit('changeSelectedRowKeys', this.selectedRowKeys)
    },
    // 重置
    toggle() {
      const tem = []
      for (let i = 0; i < this.data.length; i++) {
        if (!this.selectedRowKeys.includes(i)) {
          tem.push(i)
        }
      }
      this.selectedRowKeys = tem
      this.$emit('changeSelectedRowKeys', this.selectedRowKeys)
    },
    tablePaginationChange(pagination) {
      console.log('tablePaginationChange', pagination)
      this.pagination.current = pagination.current // 重新设置当前页
      this.pagination.pageSize = pagination.pageSize
      this.pageConfig.current = pagination.current
      this.$emit('tablePaginationChange')
    }
  }
}
</script>

<style lang="less" scoped>
.warp-table {
  // flex:1;
  width: 100%;
  height: 100%;
  // height: 300px;
  overflow: hidden;

  /deep/.ant-table-wrapper {
    height: 100%;
    .ant-spin-nested-loading {
      height: 100%;
    }
    .ant-spin-container {
      height: 100%;
    }
  }

  /deep/.ant-table {
    height: calc(100% - 64px);

    .ant-table-content {
      height: 100%;

      .ant-table-scroll {
        overflow-y: hidden;
        height: 100%;

        .ant-table-body {
          height: 100%;
        }
      }
    }
  }

  :hover {
    cursor: pointer;
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

/deep/.ant-table td {
  white-space: nowrap;
}
.expanded {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #999;
  padding: 8px 0px;
  .expanded-item {
    white-space: nowrap;
    margin-right: 16px;
  }
}
</style>
