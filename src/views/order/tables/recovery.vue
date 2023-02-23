<template>
  <div class="warp">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <!-- 表格 -->
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      xlsxName="电费回收"
      :exportUrl="exportUrl"
      :ids="ids"
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
    ></NewModel>
  </div>
</template>

<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/index'
import SearchForm from '@/components/searchform/SearchRecovery'
import {
  getAction,
  recycleWorkOrder,
  postAction
} from '@/api/manage'
import {
  recoveryList
} from '@/components/NewModel/constant.js'
import {
  dealSituation
} from "@/utils/util.js"
import moment from 'moment'

const columns = [{
  title: '工单编号',
  dataIndex: 'workOrderNo',
  align: 'center',
  width: 120
},
{
  title: '台区经理',
  dataIndex: 'tgManager',
  align: 'center',
  width: 80
},
{
  title: '台区编号',
  dataIndex: 'tgId',
  align: 'center',
  width: 110
},
{
  title: '台区名称',
  dataIndex: 'tgName',
  align: 'center',
  width: 130
},
{
  title: '供电单位',
  dataIndex: 'orgNo',
  align: 'center',
  width: 130
},
{
  title: '用户名称',
  dataIndex: 'consName',
  align: 'center',
  width: 180
},
{
  title: '用户地址',
  dataIndex: 'elecAddr',
  align: 'center',
  width: 190
},
{
  title: '用户电话',
  dataIndex: 'mobile',
  align: 'center',
  width: 120
},
{
  title: '用户类别',
  dataIndex: 'elecTypeCode',
  scopedSlots: {
    customRender: 'elecTypeCode'
  },
  align: 'center',
  width: 130
},
{
  title: '处理状态',
  dataIndex: 'workOrderStatus',
  align: 'center',
  width: 120
},
{
  title: '电度电费',
  dataIndex: 'oweAmt',
  align: 'center',
  width: 100
}
]
export default {
  data () {
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
      ids: 'workOrderNo'
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  created () {
    this.loadData()
  },
  methods: {
    // 接口，时间格式状态转换
    async loadData () {
      this.loading = true
      const data = await postAction('recycleWorkOrder/selectAll')
      this.data = data.data.records

      this.data.map((item) => {
        item.workorderTime = moment(item.workorderTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        item.processingTime = moment(item.processingTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        item.workOrderCycle = '连续 ' + item.workOrderCycle + ' 个月'
        if (item.workOrderStatus == 'STATUS_ONE') {
          item.workOrderStatus = '待处理'
        } else if (item.workOrderStatus == 'STATUS_ONE') {
          item.workOrderStatus = '处理中'
        } else if (item.workOrderStatus == 'STATUS_ONE') {
          item.workOrderStatus = '待归档'
        } else {
          item.workOrderStatus = '已归档'
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    // 搜索数据处理
    solveformData (e) {
      console.log('搜索', e)
      recycleWorkOrder(e).then(({ data: { records } }) => {
        console.log('搜索', records)
        this.data = records
      })
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 步骤进度条  弹框
    async clickRows (e) {
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
      const res = dealSituation(data, 'liveVideo', 'livePhotos', 'liveSituation')
      this.situation.push(res)
      this.NewModalVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.warp {
  // display: flex;
  // flex-direction: column;
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
