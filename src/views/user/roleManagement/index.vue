<template>
  <div class="warp-order">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
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
    >
      <template v-slot="slotProps">
        <a-button
          style="display: flex; justify-content: center"
          size="small"
          type="primary"
          @click.stop="operations(slotProps.table_key)"
        >
          修改角色
        </a-button>
      </template>
    </Tables>
    <a-modal
      title="修改用户角色"
      :visible="modalVisible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-radio-group v-model="roleSelect" name="radioGroup" :default-value="1">
        <a-radio :value="1">
          台区经理
        </a-radio>
        <a-radio :value="2">
          所站长
        </a-radio>
        <a-radio :value="3">
          C
        </a-radio>
        <a-radio :value="4">
          D
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>
<script>
import Tables from '@/components/tables/TableForUserManage'
import SearchForm from '@/components/searchform/SearchRoleManage'

import moment from 'moment'
import { postAction } from '@/api/manage'
const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '所属单位',
    dataIndex: 'dept',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '用户角色',
    dataIndex: 'role',
    align: 'center',
    ellipsis: true,
    width: 150
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
      roleSelect: null
    }
  },
  components: {
    Tables,
    SearchForm
  },
  methods: {
    // 数据展示分装
    async initList() {},
    async loadData() {
      this.loading = true
      this.data.push({
        userName: '111',
        dept: '123',
        role: '11'
      })
      this.loading = false
    },
    // 搜索
    solveformData(e) {
      console.log('solveformData', e)
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.loadData()
      // this.loading = true
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    operations(key) {
      console.log('click')
      this.modalVisible = true
    },
    handleOk(e) {
      if (this.roleSelect === null) {
        this.$notification['warn']({
          message: '请选择用户角色'
        })
        return
      }
      console.log(this.roleSelect)
      setTimeout(() => {
        this.modalVisible = false
      }, 2000)
    },
    handleCancel(e) {
      this.modalVisible = false
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
    justify-content: space-around;
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
