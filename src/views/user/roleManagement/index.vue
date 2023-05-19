<template>
  <div class="warp-order">
    <!-- 搜索 -->
    <div class="form">
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
      @addUser="addUser"
      @reloadPage="loadData"
    >
      <template v-slot="slotProps">
        <a-button
          style="display: flex; justify-content: center"
          size="small"
          type="primary"
          @click.stop="addUserFromRow(slotProps.table_key)"
        >
          新增
        </a-button>
        <a-button
          style="display: flex; justify-content: center; margin-left: 10px"
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
import cookie from '@/utils/cookie.js'
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
  // {
  //   title: '抄表员账号',
  //   dataIndex: 'userName1',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 130
  // },
  // {
  //   title: '抄表员',
  //   dataIndex: 'readName',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 130
  // },
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
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 100,
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
  // {
  //       isAdd: false,
  //       disable: false,
  //       userName: '12',
  //       relaName: '1',
  //       userName1: '12',
  //       readName: '1',
  //       orgName: '1',
  //       isRole: '1',
  //       readNameList: []
  //     }, {
  //       isAdd: false,
  //       disable: false,
  //       userName: '12',
  //       relaName: '1',
  //       userName1: '12',
  //       readName: '1',
  //       orgName: '1',
  //       isRole: '1',
  //       readNameList: []
  //     }
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
      let orgNo = cookie.getCookie('orgNo')
      // orgNo = '1542121'
      const res = await postAction(`SysUser/getUserList?orgNo=${orgNo}`).catch(
        (err) => {
          console.log(err)
        }
      )
      res.forEach((row) => {
        row.isAdd = false
        row.disable = false
        row.readNameList = []
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
    // 本页面的修改按钮，不需要禁用，新增操作
    operations(key) {
      key.disable = false
      key.isAdd = false
      this.selectedRowKeys = key
      this.modalVisible = true
    },
    // 由table发送的修改，需要禁用和新增
    addUser(payload) {
      this.selectedRowKeys = payload
      this.modalVisible = true
    },
    // 本页面的新增抄表员
    addUserFromRow(key) {
      key.disable = true
      key.isAdd = true
      key.userName1 = ''
      key.readName = ''
      this.selectedRowKeys = key
      this.modalVisible = true
    },
    // 编辑
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
