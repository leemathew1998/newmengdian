<template>
  <div class="warp">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <!-- 表格 -->
    <Tables @changeSelectedRowKeys="changeSelectedRowKeys" @clickRow="clickRows" :columns="columns" :data="data"
      :loading="loading" :scroll="1000"></Tables>
    <!-- 弹窗 -->
    <NewModel :visible="NewModalVisible" modalName="工单详情" @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData" :situation="situation" :dictionary="dictionary" :progress="progress" name="线损治理">
    </NewModel>
  </div>
</template>
<script>
import Tables from '@/components/tables/Tables'
import SearchForm from '@/components/searchform/SearchLineloss'
import NewModel from '@/components/NewModel/index'
import moment from 'moment'
import {
  getAction,
  postAction,
  linelosses
} from '@/api/manage'
import {
  lineloss
} from '@/components/NewModel/constant.js'
import {
  dealSituation
} from "@/utils/util.js"
const columns = [{
  title: '工单编号',
  dataIndex: 'workOrderNo',
  // ellipsis: true,
  align: 'center'
},
{
  title: '台区编号',
  dataIndex: 'tgId',
  // ellipsis: true,
  align: 'center'
},
{
  title: '台区名称',
  dataIndex: 'tgName',
  // ellipsis: true,
  align: 'center'
},
{
  title: '台区经理',
  dataIndex: 'tgManager',
  // ellipsis: true,
  align: 'center'
},
{
  title: '台区容量',
  dataIndex: 'tgSpq',
  // ellipsis: true,
  align: 'center'
},
{
  title: '线损率',
  dataIndex: 'linelossRate',
  // ellipsis: true,
  align: 'center'
},
// {
//   title: '事件类型',
//   dataIndex: 'eventType',
//   // ellipsis: true,
//   align: 'center'
// },
{
  title: '工单周期',
  dataIndex: 'workOrderCycle',
  // ellipsis: true,
  align: 'center'
},
{
  title: '工单状态',
  dataIndex: 'workOrderStatus',
  // ellipsis: true,
  align: 'center'
},
{
  title: '工单时间',
  dataIndex: 'workOrderCtime',
  // ellipsis: true,
  align: 'center'
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
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  created() {
    this.loadData()
  },
  methods: {
    // 接口
    async loadData() {
      this.loading = true
      const res = await postAction('/lineloss/list')
      this.data = res

      //张生要求，"采集你先把时间最近的放前面"
      this.data.sort((a, b) => {
        return moment(b.workOrderCtime).format('X') - moment(a.workOrderCtime).format('X')
      })
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].workOrderCycle == '1') {
          this.data[i].workOrderCycle = '连续1天工单'
        } else if (this.data[i].workOrderCycle >= '2') {
          this.data[i].workOrderCycle = '连续2天工单'
        } else if (this.data[i].workOrderCycle == '0') {
          this.data[i].workOrderCycle = '连续0天工单'
        }
        Object.defineProperty(this.data[i], 'key', {
          value: i
        })
        this.data[i].workOrderCtime = moment(this.data[i].workOrderCtime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        this.data[i].linelossDate = moment(this.data[i].linelossDate).format(
          'YYYY-MM-DD HH:MM:SS'
        )
      }
      this.loading = false
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    // 处理详情页
    async clickRows(e) {
      this.clickRow = e
      this.NewModalVisible = true
      this.dictionary = []
      this.dictionary.push(...lineloss)
      // 原始数
      this.NewModelData = e
      // 开始处理进度条,接着跟上时间
      if (e.workOrderStatus === '待处理') {
        this.progress.progress = 0
      } else if (e.workOrderStatus === '处理中') {
        this.progress.progress = 1
      } else if (e.workOrderStatus === '待归档') {
        this.progress.progress = 2
      } else {
        this.progress.progress = 3
      }
      // 处理现场情况
      this.situation = []
      const data = await postAction(
        '/lineloss/load?workOrderNo=' + e.workOrderNo
      )
      const res = dealSituation(data, 'liveVideo', 'livePhotos', 'liveSituation')
      this.situation.push(res)
      // 处理进度条
      this.progress.stepOne = e.workOrderCtime
      this.progress.stepTwo = e.workOrderTime
      this.progress.stepThree = e.workOrderStime
      this.progress.stepFour = e.workOrderFtime
      this.dictionary.push({
        label: '皮尔逊公式',
        name: 'pilsonFormula',
      }, {
        label: '分时计算结果',
        name: 'timeCalculation',
      }, {
        label: '分相计算结果',
        name: 'phaseCalculation',
      })
      this.NewModelData['pilsonFormula'] = '点击查看'
      this.NewModelData['timeCalculation'] = '点击查看'
      this.NewModelData['phaseCalculation'] = '点击查看'
      // if (res1.statusCode == 200) {
      // 	this.pilsonFormula = res1.data
      // }
    },
    // 这个是处理搜索数据的
    solveformData(e) {
      linelosses(e).then(res => {
        this.data = res
        res.map(item => {
          if (item.workOrderCycle == '1') {
            item.workOrderCycle = '连续1天工单'
          } else if (+item.workOrderCycle >= 2) {
            item.workOrderCycle = '连续2天工单'
          } else if (item.workOrderCycle == '0') {
            item.workOrderCycle = '连续0天工单'
          }
          if (item.workOrderStatus == '1') {
            item.workOrderStatus = "待处理"
          } else if (item.workOrderStatus == '2') {
            item.workOrderStatus = "处理中"
          } else if (item.workOrderStatus == '3') {
            item.workOrderStatus = "待归档"
          } else {
            item.workOrderStatus = "已归档"
          }
        })
      })
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

/deep/ .ant-table-tbody>tr>td {
  padding-top: 10px;
  padding-bottom: 10px;
}

/deep/ .ant-table-thead>tr>th {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
