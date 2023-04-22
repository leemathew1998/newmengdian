<template>
  <div class="warp">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <!-- 表格 -->
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @tablePaginationChange="loadData"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      xlsxName="电费回收"
      exportUrl="recycleWorkOrder"
      ref="table"
      :copyTheQueryParams="copyTheQueryParams"
    >
    </Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      modalName="工单详情"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="电费回收"
    >
    </NewModel>
  </div>
</template>

<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/index'
import SearchForm from '@/components/searchform/SearchRecovery'
import { recycleWorkOrder, postAction } from '@/api/manage'
import { recoveryList } from '@/components/NewModel/constant.js'
import { dealSituation } from '@/utils/util.js'
import moment from 'moment'

const columns = [
  {
    title: '工单编号',
    dataIndex: 'workOrderNo',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '台区经理',
    dataIndex: 'tgManager',
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: '台区编号',
    dataIndex: 'tgId',
    align: 'center',
    ellipsis: true,
    width: 110
  },
  {
    title: '台区名称',
    dataIndex: 'tgName',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '供电单位',
    dataIndex: 'orgNo',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '用户名称',
    dataIndex: 'consName',
    align: 'center',
    ellipsis: true,
    width: 180
  },
  {
    title: '用户地址',
    dataIndex: 'elecAddr',
    align: 'center',
    ellipsis: true,
    width: 190
  },
  {
    title: '用户电话',
    dataIndex: 'mobile',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '用电类别',
    dataIndex: 'elecTypeCode',
    ellipsis: true,
    scopedSlots: {
      customRender: 'elecTypeCode'
    },
    align: 'center',
    width: 130
  },
  {
    title: '处理状态',
    dataIndex: 'workOrderStatus',
    ellipsis: true,
    align: 'center',
    width: 120
  },
  {
    title: '电度电费',
    dataIndex: 'oweAmt',
    ellipsis: true,
    align: 'center',
    width: 100
  }
]
export default {
  data() {
    return {
      NewModalVisible: false,
      loading: false,
      data: [],
      // 搜索用数据
      dataa: [],
      columns,
      selectedRowKeys: [],
      selectItem: {},
      clickRow: {},
      // 一下为重新修改的代码
      NewModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      exportUrl: 'recycleWorkOrder',
      ids: 'workOrderNo',
      copyTheQueryParams: {}
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  methods: {
    // 接口，时间格式状态转换
    async loadData() {
      this.loading = true
      const res = await recycleWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      let total = Object.keys(res.data)[0]
      this.$refs.table.pagination.total = Number(total)
      this.data = res.data[total]
      this.data.map((item) => {
        item.workorderTime = moment(item.workorderTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        item.processingTime = moment(item.processingTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        item.workOrderCycle = '连续 ' + item.workOrderCycle + ' 个月'
        if (item.workOrderStatus == '1') {
          item.workOrderStatus = '待处理'
        } else if (item.workOrderStatus == '2') {
          item.workOrderStatus = '处理中'
        } else if (item.workOrderStatus == '3') {
          item.workOrderStatus = '待归档'
        } else {
          item.workOrderStatus = '已归档'
        }
      })
      this.loading = false
    },
    // 搜索数据处理
    solveformData(e) {
      console.log('搜索', e)
      this.loading = true
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      recycleWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
        .then((res) => {
          let total = Object.keys(res.data)[0]
          this.$refs.table.pagination.total = Number(total)
          this.data = res.data[total]
          this.data.map((item) => {
            item.workorderTime = moment(item.workorderTime).format(
              'YYYY-MM-DD HH:MM:SS'
            )
            item.processingTime = moment(item.processingTime).format(
              'YYYY-MM-DD HH:MM:SS'
            )
            item.workOrderCycle = '连续 ' + item.workOrderCycle + ' 个月'
            if (item.workOrderStatus == '1') {
              item.workOrderStatus = '待处理'
            } else if (item.workOrderStatus == '2') {
              item.workOrderStatus = '处理中'
            } else if (item.workOrderStatus == '3') {
              item.workOrderStatus = '待归档'
            } else {
              item.workOrderStatus = '已归档'
            }
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    // 步骤进度条  弹框
    async clickRows(e) {
      this.dictionary = recoveryList
      this.NewModelData = e
      if (e.workOrderStatus === '待处理') {
        this.progress.progress = 0
      } else if (e.workOrderStatus === '处理中') {
        this.progress.progress = 1
      } else if (e.workOrderStatus === '待归档') {
        this.progress.progress = 2
      } else {
        this.progress.progress = 3
      }
      // 现场处理
      this.situation = []
      const { data } = await postAction(
        'recycleWorkOrder/selectWordOrderId?workOrderId=' + e.workOrderNo
      )
      const res = await dealSituation(
        data,
        'liveVideo',
        'livePhotos',
        'liveSituation'
      )
      this.situation.push(res)
      this.NewModalVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.warp {
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
