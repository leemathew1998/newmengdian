<template>
  <div class="warp">
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      :scroll="1100"
      xlsxName="优质服务"
      :exportUrl="exportUrl"
      :ids="ids"
    ></Tables>
    <NewModel
      :visible="NewModalVisible"
      modalName="工单详情"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      :isSensitivity="isSensitivity"
      :isOutage="isOutage"
      name="优质服务"
      :loading="loading"
    ></NewModel>
  </div>
</template>

<script>
import moment from "moment"
import Tables from "@/components/tables/Tables"
import NewModel from "@/components/NewModel/serve.vue"
import SearchForm from "@/components/searchform/SearchService"
import {
  getAction,
  postAction,
  superiorWorkOrder
} from "@/api/manage"
import {
  serviceList
} from "@/components/NewModel/constant.js"
import {
  dealWorkOrderStatus
} from '@/utils/util.js'
const columns = [{
  title: "工单编号",
  dataIndex: "workOrderNo",
  align: "center",
  width: 150,
  scopedSlots: {
    customRender: "workOrderNo",
  },
},
{
  title: "工单来源",
  dataIndex: "workOrderSource",
  align: "center",
  width: 80,
},
{
  title: "业务类型",
  dataIndex: "busiTypeCode",
  align: "center",
  width: 100,
},
{
  title: "业务子类型",
  dataIndex: "busiSubType",
  align: "center",
  width: 120,
},
{
  title: "受理时间",
  dataIndex: "handleTime",
  align: "center",
  width: 120,
},
{
  title: "处理状态",
  dataIndex: "workOrderStatus",
  align: "center",
  width: 100,
},
{
  title: "台区经理",
  dataIndex: "tgManager",
  align: "center",
  width: 100,
},
{
  title: "用户类型",
  dataIndex: "userType",
  align: "center",
  width: 100,
},

{
  title: "工单日期",
  dataIndex: "workOrderCtime",
  align: "center",
  width: 120,
},
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
      isOutage: [],
      isSensitivity: [],
      exportUrl: 'superiorWorkOrder',
      ids: 'workOrderNo'
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel,
  },
  created () {
    this.loadData()
  },
  // 接口
  methods: {
    async loadData () {
      this.loading = true
      const { data: { records } } = await postAction("superiorWorkOrder/selectAll")
      this.data = records
      // 时间格式、状态转换
      records.map(item => {
        if (item.whetherOutage == '是' && item.whetherSensitivity == '是' && item
          .examineStatus == 2) {
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
          "MM-DD HH:MM:SS"
        )
        item.acceptedTime = moment(item.acceptedTime).format(
          "MM-DD HH:MM:SS"
        )
        // 工单状态字段转换
        dealWorkOrderStatus(item)

      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    // 搜索
    solveformData (e) {
      superiorWorkOrder(e).then(({ data: { records } }) => {
        records.map(i => {
          if (i.whetherOutage == '是' && i.whetherSensitivity == '是' && i.examineStatus == 2) {
            i.userType = '频繁停电/敏感用户'
          } else if (i.whetherSensitivity == '是' && i.examineStatus == 2) {
            i.userType = '敏感用户'
          } else if (i.whetherOutage == '是') {
            i.userType = '频繁停电'
          } else {
            i.userType = '普通用户'
          }
          // 工单状态字段转换
          dealWorkOrderStatus(i)
        })
        this.data = records
      })
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 数据展示列表
    async clickRows (e) {
      this.dictionary = serviceList
      this.NewModelData = e
      console.log('优质服务', e)

      // 开始处理进度条
      if (e.workOrderStatus === "未处理") {
        this.progress.progress = 0
      } else if (e.workOrderStatus === "处理中") {
        this.progress.progress = 1
      } else if (e.workOrderStatus === "待归档") {
        this.progress.progress = 2
      } else if (e.workOrderStatus === '已归档') {
        this.progress.progress = 3
      }
      this.NewModalVisible = true
    },
  },
};
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

.foot {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
</style>
