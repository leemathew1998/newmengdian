<template>
  <div class="warp">
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @tablePaginationChange="loadData"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      :scroll="1100"
      xlsxName="优质服务"
      :exportUrl="exportUrl"
      :ids="ids"
      ref="table"
      :copyTheQueryParams="copyTheQueryParams">
    </Tables>
    <NewModel
      :visible="NewModalVisible"
      modalName="工单详情"
      @changeModal="NewModalVisible = !NewModalVisible"
      :newModelData="newModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      :isSensitivity="isSensitivity"
      :isOutage="isOutage"
      name="优质服务"
      :loading="loading"></NewModel>
  </div>
</template>

<script>
import moment from 'moment'
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/serve.vue'
import SearchForm from '@/components/searchform/SearchService'
import { getAction, postAction, superiorWorkOrder } from '@/api/manage'
import { serviceList } from '@/components/NewModel/constant.js'
const columns = [
  {
    title: '工单编号',
    dataIndex: 'appNo',
    align: 'center',
    ellipsis: true,
    width: 150,
    scopedSlots: {
      customRender: 'appNo'
    }
  },
  {
    title: '工单来源',
    dataIndex: 'workOrderSource',
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: '业务类型',
    dataIndex: 'busiTypeCode',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '业务子类型',
    dataIndex: 'busiSubType',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '受理时间',
    dataIndex: 'handleTime',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '处理状态',
    dataIndex: 'workOrderStatus',
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
    title: '供电单位',
    dataIndex: 'orgName',
    align: 'center',
    ellipsis: true,
    width: 120
  },
  {
    title: '工单日期',
    dataIndex: 'workOrderCtime',
    align: 'center',
    ellipsis: true,
    width: 120
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
      newModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      isOutage: [],
      isSensitivity: [],
      exportUrl: 'superiorWorkOrder',
      ids: 'appNo',
      copyTheQueryParams: {}
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  // 接口
  methods: {
    async loadData() {
      // this.loading = true
      const res = await superiorWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      let total = Object.keys(res.data)[0]
      this.$refs.table.pagination.total = Number(total)
      this.data = res.data[total]
      // 时间格式、状态转换
      this.data.map((item) => {
        if (item.workOrderStatus == '1') {
          item.workOrderStatus = '待处理'
        } else if (item.workOrderStatus == '2') {
          item.workOrderStatus = '处理中'
        } else if (item.workOrderStatus == '3') {
          item.workOrderStatus = '待归档'
        } else {
          item.workOrderStatus = '已归档'
        }
        item.handleTime = moment(item.handleTime).format('MM-DD HH:MM:SS')
        item.workOrderCtime = moment(item.workOrderCtime).format(
          'MM-DD HH:MM:SS'
        )
        if (
          item.whetherOutage == '是' &&
          item.whetherSensitivity == '是' &&
          item.examineStatus == 2
        ) {
          item.userType = '频繁停电/敏感用户'
        } else if (item.whetherSensitivity == '是' && item.examineStatus == 2) {
          item.userType = '敏感用户'
        } else if (item.whetherOutage == '是') {
          item.userType = '频繁停电'
        } else {
          item.userType = '普通用户'
        }
        if (item.whetherSensitivity == '是' && item.examineStatus != 2) {
          item.whetherSensitivity = '否'
        }
        item.workOrderTime = moment(item.workOrderTime).format(
          'MM-DD HH:MM:SS'
        )
        item.acceptedTime = moment(item.acceptedTime).format('MM-DD HH:MM:SS')
      })
      this.loading = false
    },
    // 搜索
    solveformData(e) {
      console.log('solveformData', e)
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.loading = true
      superiorWorkOrder({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
        .then(({ data }) => {
          let total = Object.keys(data)[0]
          this.$refs.table.pagination.total = Number(total)
          this.data = data[total]
          this.data.map((item) => {
            item.handleTime = moment(item.handleTime).format('MM-DD HH:MM:SS')
            item.workOrderCtime = moment(item.workOrderCtime).format(
              'MM-DD HH:MM:SS'
            )
            if (item.workOrderStatus == '1') {
              item.workOrderStatus = '待处理'
            } else if (item.workOrderStatus == '2') {
              item.workOrderStatus = '处理中'
            } else if (item.workOrderStatus == '3') {
              item.workOrderStatus = '待归档'
            } else {
              item.workOrderStatus = '已归档'
            }
            if (
              item.whetherOutage == '是' &&
              item.whetherSensitivity == '是' &&
              item.examineStatus == 2
            ) {
              item.userType = '频繁停电/敏感用户'
            } else if (
              item.whetherSensitivity == '是' &&
              item.examineStatus == 2
            ) {
              item.userType = '敏感用户'
            } else if (item.whetherOutage == '是') {
              item.userType = '频繁停电'
            } else {
              item.userType = '普通用户'
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
    // 数据展示列表
    async clickRows(e) {
      this.dictionary = serviceList
      this.newModelData = e
      console.log('优质服务', e)

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

/deep/ .ant-table-tbody>tr>td {
  padding-top: 10px;
  padding-bottom: 10px;
}

/deep/ .ant-table-thead>tr>th {
  padding-top: 10px;
  padding-bottom: 10px;
}

.foot {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
</style>
