<template>
  <div class="warp-order">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
      <!-- <SearchForm v-model="solveformData"></SearchForm> -->
    </div>

    <!-- 表格 -->
    <Tables
      @tablePaginationChange="initList"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      :scroll="1500"
      ref="table"
      exportUrl="coll"
      :copyTheQueryParams="copyTheQueryParams"
      :showExportButton="false"
    ></Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :newModelData="newModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="联网互办"
    ></NewModel>
  </div>
</template>
<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/interworking'
import SearchForm from '@/components/searchform/SearchInterWorking'
import { getNetmuWorkOrder } from '@/api/manage'
import { interworking } from '@/components/NewModel/constant.js'
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
    title: '用户编号',
    dataIndex: 'consNo',
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
    title: '台区编号',
    dataIndex: 'tgNo',
    ellipsis: true,
    align: 'center',
    width: 100
  },
  {
    title: '台区名称',
    dataIndex: 'tgName',
    ellipsis: true,
    align: 'center',
    width: 100
  },
  {
    title: '供电单位编号',
    dataIndex: 'orgNo',
    align: 'center',
    ellipsis: true,
    width: 160
  },
  {
    title: '供电单位名称',
    dataIndex: 'orgName',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '申请方式',
    dataIndex: 'appMode',
    align: 'center',
    ellipsis: true,
    width: 70
  },
  {
    title: '业务类型',
    dataIndex: 'appTypeCode',
    align: 'center',
    ellipsis: true,
    width: 110
  },
  {
    title: '受理时间',
    dataIndex: 'handleTime',
    align: 'center',
    ellipsis: true,
    width: 170
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
    align: 'center',
    ellipsis: true,
    width: 110
  },
  {
    title: '用户地址',
    dataIndex: 'elecAddr',
    align: 'center',
    ellipsis: true,
    width: 135
  },
  {
    title: '联系类型',
    dataIndex: 'contactMode',
    align: 'center',
    ellipsis: true,
    width: 110
  },
  {
    title: '联系方式',
    dataIndex: 'mobile',
    align: 'center',
    ellipsis: true,
    width: 110
  },
  // {
  //   title: '更改后地址',
  //   dataIndex: 'newElecAddr',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 110
  // },
  // {
  //   title: '更改后联系人',
  //   dataIndex: 'newContactName',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 110
  // },
  // {
  //   title: '更改后联系方式',
  //   dataIndex: 'newMobile',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 110
  // },
  // {
  //   title: '所站长查看标识',
  //   dataIndex: 'countStatus',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 110
  // },
  {
    title: '工单创建时间',
    dataIndex: 'workOrderCtime',
    align: 'center',
    ellipsis: true,
    width: 170
  },
  {
    title: '工单状态',
    dataIndex: 'workOrderStatus',
    align: 'center',
    ellipsis: true,
    width: 110
  }
]
export default {
  data() {
    return {
      loading: false,
      data: [],
      columns,
      NewModalVisible: false,
      // 一下为重新修改的代码
      newModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      userInfo: {},
      username: null,
      copyTheQueryParams: {}
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  methods: {
    // 数据展示分装
    async initList() {
      this.loading = true
      let res = await getNetmuWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      if (res) {
        this.$refs.table.pagination.total = res.data.total
        let MAP = {
          '01': '待处理',
          '02': '处理中',
          '03': '待归档',
          '04': '已归档'
        }
        res.data.records.forEach((item) => {
          item.handleTime = item.handleTime
            ? moment(item.handleTime).format('yyyy-MM-DD HH:mm:ss')
            : '-'
          item.workOrderCtime = item.workOrderCtime
            ? moment(item.workOrderCtime).format('yyyy-MM-DD HH:mm:ss')
            : '-'
          item.workOrderStatus = MAP[item.workOrderStatus]
          item.appMode = '政务WEB端'
          item.appTypeCode = '过户'
        })
        this.data = res.data.records
      }

      this.loading = false
    },
    // 搜索
    solveformData(e) {
      console.log('solveformData', e)
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.$refs.table.pagination.current = 1
      this.initList()
    },
    // 处理点击进入详情的数据
    async clickRows(e) {
      // 针对三个特殊字段进行处理
      // e.contactNames = e.contactNames.split(',')
      // e.contactModes = e.contactModes.split(',')
      // e.mobiles = e.mobiles.split(',')

      this.clickRow = e
      this.dictionary = interworking
      this.newModelData = e

      // 开始处理进度条
      if (e.workOrderStatus === '待处理') {
        this.progress.progress = 0
      } else if (e.workOrderStatus === '处理中') {
        this.progress.progress = 1
      } else if (e.workOrderStatus === '待归档') {
        this.progress.progress = 2
      } else if (e.workOrderStatus === '已归档') {
        this.progress.progress = 3
      }
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
