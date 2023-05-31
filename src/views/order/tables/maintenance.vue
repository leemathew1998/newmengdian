<template>
  <div class="warp-order">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>

    <!-- 表格 -->
    <Tables
      @tablePaginationChange="initList"
      :columns="columns"
      :data="data"
      :loading="loading"
      :scroll="1500"
      ref="table"
      exportUrl="coll"
      :showExportButton="false"
    ></Tables>
  </div>
  <!-- 弹窗 -->
  <!-- <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :newModelData="newModelData"
      :dictionary="dictionary"
      :progress="progress"
      :imgdata="imgdata"
      name="图模维护"
    ></NewModel> -->
</template>
<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/pubService'
import SearchForm from '@/components/searchform/SearchInterWorking'
// import {
// 	list
// } from "@/api/collection";
import {
  getPicmaWorkOrder
} from '@/api/manage'
// import axios from "axios";
import moment from 'moment'
const columns = [
  {
    title: '工单编号',
    dataIndex: 'workOrderNo',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '申请编号',
    dataIndex: 'appNo',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '新换装标识',
    dataIndex: 'newReplaceId',
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: '用户名称',
    dataIndex: 'consName',
    ellipsis: true,
    align: 'center',
    width: 70
  },
  {
    title: '用户编号',
    dataIndex: 'consNo',
    ellipsis: true,
    align: 'center',
    width: 100
  },
  {
    title: '台区编号',
    dataIndex: 'tgNo',
    align: 'center',
    ellipsis: true,
    width: 160
  },
  {
    title: '台区名称',
    dataIndex: 'tgName',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '供电单位编号',
    dataIndex: 'orgNo',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '供电单位名称',
    dataIndex: 'orgName',
    align: 'center',
    ellipsis: true,
    width: 110
  },
  {
    title: '申请类型',
    dataIndex: 'appMode',
    align: 'center',
    ellipsis: true,
    width: 170
  },
  {
    title: '工单创建时间',
    dataIndex: 'workOrderCtime',
    align: 'center',
    ellipsis: true,
    width: 180
  }
]
export default {
  data () {
    return {
      loading: false,
      data: [],
      columns,
      selectedRowKeys: [], // 选择多行数组
      NewModalVisible: false,
      selectItem: {},
      // 一下为重新修改的代码
      newModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      imgdata: []
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  methods: {
    // 数据展示分装
    async initList () {
      this.loading = true
      const res = await getPicmaWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      this.$refs.table.pagination.total = res.data.total
      res.data.records.forEach(item => {
        item.workOrderCtime = item.workOrderCtime
            ? moment(item.workOrderCtime).format('yyyy-MM-DD HH:mm:ss')
            : '-'
      })
      this.data = res.data.records
      this.loading = false
    },
    // 搜索
    async solveformData (e) {
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.$refs.table.pagination.current = 1
      this.initList()
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 处理点击进入详情的数据
    async clickRows (e) {
      this.clickRow = e
      this.newModelData = e
      this.progress.progress = 2
      this.NewModalVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.warp-order {
  display: flex;
  flex-direction: column;
  height: 100%;
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
