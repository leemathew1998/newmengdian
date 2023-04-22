<template>
  <div class="warp">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <!-- 表单 -->
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @tablePaginationChange="loadData"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      xlsxName="费控负电"
      :ids="ids"
      ref="table"
      exportUrl="feecontrolWorkOrder"
      :copyTheQueryParams="copyTheQueryParams"
    ></Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      modalName="工单详情"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="费控复电"
    ></NewModel>
  </div>
</template>
<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/index'
import SearchForm from '@/components/searchform/SearchChange'
import { getAction, feecontrolWorkOrder } from '@/api/manage'
import { chargeList } from '@/components/NewModel/constant.js'
import { dealSituation } from '@/utils/util.js'
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
    title: '工单生成时间',
    dataIndex: 'workOrderCtime',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '工单下发时间',
    dataIndex: 'remoteDate',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '台区经理',
    dataIndex: 'tgManager',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '台区编号',
    dataIndex: 'tgId',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '台区名称',
    dataIndex: 'tgName',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '供电单位',
    dataIndex: 'orgNo',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '用户名称',
    dataIndex: 'consName',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '用户编号',
    dataIndex: 'consNo',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '工单处理状态',
    dataIndex: 'workOrderStatus',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '用户地址',
    dataIndex: 'elecAddr',
    align: 'center',
    ellipsis: true,
    width: 200
  }
]
export default {
  data() {
    return {
      NewModalVisible: false,
      loading: false,
      data: [],
      columns,
      selectedRowKeys: [],
      selectItem: {},
      clickRow: {},
      // 一下为重新修改的代码
      NewModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      exportUrl: 'feecontrolWorkOrder',
      ids: 'workOrderNo',
      copyTheQueryParams: {}
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  // mounted() {
  //   for (let i = 0; i < 100; i++) {
  //     this.data.push({
  //       elecAddr:
  //         '1234567890-==-09876543w23e4567890-09834567890-==-09876543w23e4567890-09865434565434567890--098'
  //     })
  //   }
  // },
  methods: {
    // 接口、时间状态转换
    async loadData() {
      this.loading = true
      const res = await feecontrolWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      let total = Object.keys(res.data)[0]
      this.$refs.table.pagination.total = Number(total)
      this.data = res.data[total]
      for (var i = 0; i < this.data.length; i++) {
        this.data[i].key = i
        this.data[i].failTime = moment(this.data[i].failTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        this.data[i].workOrderTime = moment(this.data[i].workOrderTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        this.data[i].workOrderCtime = moment(
          this.data[i].workOrderCtime
        ).format('YYYY-MM-DD HH:MM:SS')
        this.data[i].remoteDate = moment(this.data[i].remoteDate).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        if (this.data[i].workOrderStatus == '1') {
          this.data[i].workOrderStatus = '待处理'
        } else if (this.data[i].workOrderStatus == '2') {
          this.data[i].workOrderStatus = '处理中'
        } else if (this.data[i].workOrderStatus == '3') {
          this.data[i].workOrderStatus = '待归档'
        } else if (this.data[i].workOrderStatus == '4') {
          this.data[i].workOrderStatus = '已归档'
        }
      }
      this.loading = false
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    // 搜索数据处理
    solveformData(e) {
      console.log('solveformData', e)
      this.loading = true
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      feecontrolWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
        .then((res) => {
          let total = Object.keys(res.data)[0]
          this.$refs.table.pagination.total = Number(total)
          this.data = res.data[total]
          // 张生要求，"采集你先把时间最近的放前面"
          for (var i = 0; i < this.data.length; i++) {
            this.data[i].key = i
            this.data[i].failTime = moment(this.data[i].failTime).format(
              'YYYY-MM-DD HH:MM:SS'
            )
            this.data[i].workOrderCtime = moment(
              this.data[i].workOrderCtime
            ).format('YYYY-MM-DD HH:MM:SS')
            this.data[i].workOrderTime = moment(
              this.data[i].workOrderTime
            ).format('YYYY-MM-DD HH:MM:SS')
            this.data[i].remoteDate = moment(this.data[i].remoteDate).format(
              'YYYY-MM-DD HH:MM:SS'
            )
            if (this.data[i].workOrderStatus == '1') {
              this.data[i].workOrderStatus = '待处理'
            } else if (this.data[i].workOrderStatus == '2') {
              this.data[i].workOrderStatus = '处理中'
            } else if (this.data[i].workOrderStatus == '3') {
              this.data[i].workOrderStatus = '待归档'
            } else if (this.data[i].workOrderStatus == '4') {
              this.data[i].workOrderStatus = '已归档'
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 弹框、现场处理
    async clickRows(e) {
      this.dictionary = chargeList
      this.NewModelData = e
      // 此处为现场情况，为以后考虑，设置为数组  初始化数据
      this.situation = []
      const { data } = await getAction(
        'feecontrolWorkOrder/selectWorkOrderScene?workOrderNo=' + e.workOrderNo
      )
      const res = await dealSituation(
        data,
        'liveVideo',
        'livePhotos',
        'liveSituation'
      )
      this.situation.push(res)

      // 处理进度条
      this.progress.stepOne = e.workOrderCtime
      this.progress.stepTwo = e.workOrderTime
      this.progress.stepThree = e.workOrderStime
      this.progress.stepFour = e.workOrderFtime
      if (e.workOrderStatus === '待处理') {
        this.progress.progress = 0
      } else if (e.workOrderStatus === '处理中') {
        this.progress.progress = 1
      } else if (e.workOrderStatus === '待归档') {
        this.progress.progress = 2
      } else {
        this.progress.progress = 3
      }
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

.title {
  margin: 14px 0 20px 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
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
