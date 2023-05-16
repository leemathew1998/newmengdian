<template>
  <div class="warp-order">
    <!-- 搜索 -->
    <div class="form" >
      <SearchForm v-show="false" @formData="solveformData"></SearchForm>
      <!-- <SearchForm v-model="solveformData"></SearchForm> -->
    </div>

    <!-- 表格 -->
    <Tables
      :columns="columns"
      :data="data"
      :loading="loading"
      ref="table"
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @tablePaginationChange="loadData"
      @addUser="operations"
    >
      <template v-slot="slotProps">
        <a-button
          style="display: flex; justify-content: center"
          size="small"
          type="primary"
          @click.stop="operations(slotProps.table_key)"
        >
          修改
        </a-button>
        <a-popconfirm
          title="确定要删除此用户吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="deleteUser(slotProps.table_key)"
        >
          <a-button
            style="display: flex; justify-content: center; margin-left: 10px"
            size="small"
            type="danger"
          >
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </Tables>
    <UserModal
      :modalVisible.sync="modalVisible"
      :selectedRowKeys="selectedRowKeys"
    ></UserModal>
  </div>
</template>
<script>
import Tables from '@/components/tables/TableForUserManage'
import SearchForm from '@/components/searchform/SearchRoleManage'
import UserModal from './modalBox.vue'
import { postAction } from '@/api/manage'
import { deleteUser } from '@/api/login.js'
const columns = [
  {
    title: '门户账号',
    dataIndex: 'userName',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '真实姓名',
    dataIndex: 'relaName',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '掌机登录账号',
    dataIndex: 'userName1',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '所属单位',
    dataIndex: 'orgName',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '角色权限',
    dataIndex: 'isRole',
    align: 'center',
    ellipsis: true,
    width: 130,
    scopedSlots: {
      customRender: 'isRole'
    }
  },
  {
    title: '管理员',
    dataIndex: 'isManage',
    align: 'center',
    ellipsis: true,
    width: 130,
    scopedSlots: {
      customRender: 'isManage'
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 80,
    scopedSlots: {
      customRender: 'operation'
    }
  }
]
export default {
  data() {
    return {
      loading: false,
      modalVisible: false,
      data: [],
      columns,
      roleSelect: null,
      selectedRowKeys: {}
    }
  },
  components: {
    Tables,
    SearchForm,
    UserModal
  },
  watch: {
    modalVisible(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.loadData()
        }, 400)
      }
    }
  },
  methods: {
    // 数据展示分装
    async loadData() {
      this.loading = true
      const res = await postAction(`SysUser/getUserList`).catch((err) => {
        console.log(err)
      })
      res.forEach((row) => {
        row.isAdd = false
      })
      this.data = res
      this.loading = false
    },
    // 搜索
    solveformData(e) {
      console.log('solveformData', e)
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.loadData()
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    operations(key) {
      this.selectedRowKeys = key
      this.modalVisible = true
    },
    async deleteUser(payload) {
      const res = await deleteUser({ id: payload.id })
      this.$notification['success']({
        message: '操作成功',
        description: res
      })
      this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>
.warp-order {
  display: flex;
  flex-direction: column;
  height: 100%;

  // justify-content: center;
  // align-items: center;
  .form {
    // width: 100%;
    margin: 10px 0;
    display: flex;
    // justify-content: space-around;
  }
}

.ant-form,
.ant-form-inline {
  display: flex;
  justify-content: space-between;
}

/deep/ .ant-table-tbody > tr > td {
  padding-top: 10px;
  padding-bottom: 10px;
}

/deep/ .ant-table-thead > tr > th {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
