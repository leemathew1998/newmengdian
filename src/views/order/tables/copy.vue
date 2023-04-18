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
      xlsxName="电费补抄"
      :exportUrl="exportUrl"
      :ids="ids"
      ref="table"
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
      :imgdata="imgdata"
      name="电费补抄"
    ></NewModel>
  </div>
</template>
<script>
import moment from 'moment'
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/index'
import SearchForm from '@/components/searchform/SearchCopy'
import { getAction, postAction, runWorkOrder } from '@/api/manage'
import { copyList } from '@/components/NewModel/constant.js'
import { dealSituation } from '@/utils/util.js'
const columns = [
  {
    title: '预警状态',
    dataIndex: 'warningStatus',
    align: 'center',
    width: 90
  },
  {
    title: '工单用户户号',
    dataIndex: 'consNo',
    align: 'center',
    width: 90
  },
  {
    title: '工单用户户名',
    dataIndex: 'consName',
    align: 'center',
    width: 160
  },
  {
    title: '工单用户地址',
    dataIndex: 'elecAddr',
    align: 'center',
    width: 190
  },
  {
    title: '台区经理',
    dataIndex: 'arcEmpName',
    align: 'center',
    width: 80
  },
  {
    title: '工单编号',
    dataIndex: 'appNo',
    align: 'center',
    width: 100
  },
  {
    title: '工单电压等级',
    dataIndex: 'voltCode',
    align: 'center',
    width: 80
  },
  {
    title: '工单用电类别',
    dataIndex: 'elecTypeCode',
    align: 'center',
    width: 80
  },
  {
    title: '工单状态',
    dataIndex: 'workOrderStatus',
    align: 'center',
    width: 80
  },
  {
    title: '供电单位',
    dataIndex: 'orgName',
    align: 'center',
    width: 120
  }
]

export default {
  data() {
    return {
      NewModalVisible: false,
      ImgModalVisible: false,
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
      imgdata: null,
      exportUrl: 'runWorkOrder',
      ids: 'appNo',
      copyTheQueryParams: {}
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  methods: {
    // 接口
    async loadData() {
      this.loading = true
      const data = await runWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      console.log(data)
      this.data = data.data.records
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].workOrderStatus1 == '1') {
          this.data[i].workOrderStatus = '待处理'
        } else if (this.data[i].workOrderStatus1 == '2') {
          this.data[i].workOrderStatus = '处理中'
        } else if (this.data[i].workOrderStatus1 == '3') {
          this.data[i].workOrderStatus = '待归档'
        } else {
          this.data[i].workOrderStatus = '已归档'
        }
        // 工单生成时间
        this.data[i].meterGenerationTime = moment(
          this.data[i].meterGenerationTime
        ).format('MM-DD HH:MM:SS')
        this.data[i].key = i
        if (this.data[i].warningStatus == '0') {
          this.data[i].warningStatus = '正常工单'
        } else {
          this.data[i].warningStatus = '一级预警'
        }
      }
      this.data.map((item) => {
        item.meterCycle = '连续 ' + item.meterCycle + ' 个月'
      })
      this.loading = false
    },
    // 搜索数据处理
    solveformData(e) {
      this.loading = true
      console.log('搜索', e)
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      runWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
        .then(({ data: { records } }) => {
          records.map((item, i) => {
            if (item.workOrderStatus1 == '1') {
              item.workOrderStatus = '待处理'
            } else if (item.workOrderStatus1 == '2') {
              item.workOrderStatus = '处理中'
            } else if (item.workOrderStatus1 == '3') {
              item.workOrderStatus = '待归档'
            } else {
              item.workOrderStatus = '已归档'
            }
            item.key = i
            item.meterGenerationTime = moment(item.meterGenerationTime).format(
              'MM-DD HH:MM:SS'
            )
            item.meterCycle = '连续 ' + item.meterCycle + ' 个月'
            if (item.warningStatus == '0') {
              item.warningStatus = '正常工单'
            } else {
              item.warningStatus = '一级预警'
            }
          })
          console.log('res', records)
          this.data = records
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    // 弹窗数据
    async clickRows(e) {
      this.NewModalVisible = true

      this.NewModelData = e
      this.dictionary = copyList

      // 开始处理进度条
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

      /**
       *	通过工单编号查询现场情况的数据
       */
      // 初始化现场情况
      this.situation = []
      const { data } = await getAction('runWorkOrder/queryOne?gdNo=' + e.appNo)
      const res = await dealSituation(
        data,
        'gdEventVideo',
        'gdEventPhoto',
        'gdDisplay',
        'gdDealDate'
      )
      this.situation.push(res)
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
