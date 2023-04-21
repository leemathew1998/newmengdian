<template>
  <div class="warp-order">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
      <!-- <SearchForm v-model="solveformData"></SearchForm> -->
    </div>

    <!-- 表格 -->
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @tablePaginationChange="initList"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      :scroll="1500"
      ref="table"
      exportUrl="coll"
      :copyTheQueryParams="copyTheQueryParams"
    ></Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="采集运维"
    ></NewModel>
  </div>
</template>
<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/coll'
import SearchForm from '@/components/searchform/SearchCollection'
import { coll } from '@/api/manage'
import {
  failList,
  unUsualList,
  unConnectList
} from '@/components/NewModel/constant.js'
import { dealSituation } from '@/utils/util.js'
import moment from 'moment'
import { postAction } from '../../../api/manage'
const columns = [
  {
    title: '工单编号',
    dataIndex: 'workOrderNo',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '电能表资产号',
    dataIndex: 'meterAssetNo',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '台区名称',
    dataIndex: 'tgName',
    align: 'center',
    ellipsis: true,
    width: 150
  },
  {
    title: '台区经理',
    dataIndex: 'tgManager',
    ellipsis: true,
    align: 'center',
    width: 70
  },
  {
    title: '用户名称',
    dataIndex: 'consName',
    ellipsis: true,
    align: 'center',
    width: 100
  },
  {
    title: '用户编号',
    dataIndex: 'consNo',
    ellipsis: true,
    align: 'center',
    width: 100
  },
  {
    title: '用户地址',
    dataIndex: 'elecAddr',
    align: 'center',
    ellipsis: true,
    width: 160
  },
  {
    title: '事件类型',
    dataIndex: 'eventType',
    align: 'center',
    ellipsis: true,
    width: 90
  },
  {
    title: '原因研判',
    dataIndex: 'eventReason',
    align: 'center',
    ellipsis: true,
    width: 135
  },
  {
    title: '工单状态',
    dataIndex: 'workOrderStatus',
    align: 'center',
    ellipsis: true,
    width: 70
  },
  {
    title: '工单创建时间',
    dataIndex: 'workOrderCtime',
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
      dataa: [],
      columns,
      selectedRowKeys: [], // 选择多行数组
      NewModalVisible: false,
      selectItem: {},
      // 一下为重新修改的代码
      NewModelData: {},
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
      let res = await coll({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
      let total = Object.keys(res.data)[0]
      this.$refs.table.pagination.total = Number(total)

      res.data[total].map((val) => {
        this.convertFormat(val)
      })
      this.data = res.data[total]
      this.loading = false
    },
    // 搜索
    solveformData(e) {
      console.log('solveformData', e)
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.loading = true
      coll({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
        .then((res) => {
          let total = Object.keys(res.data)[0]
          this.$refs.table.pagination.total = Number(total)

          res.data[total].map((val) => {
            this.convertFormat(val)
          })
          this.data = res.data[total]
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    // 处理点击进入详情的数据
    async clickRows(e) {
      this.clickRow = e
      const res = await postAction(`coll/rawdata?id=${e.id}`)
      console.log('rawdata', res)
      this.NewModelData = res
      this.NewModelData.workOrderCtime = moment(
        this.NewModelData.workOrderCtime
      ).format('YYYY-MM-DD hh:mm:ss')
      // console.log( this.NewModelData,'aaa');
      if (this.clickRow['eventType'] === '采集失败') {
        this.dictionary = failList
        if (this.NewModelData.synchroTime) {
          this.NewModelData.synchroTime = moment(
            this.NewModelData.synchroTime
          ).format('YYYY-MM-DD HH:MM:SS')
        }
      } else if (this.clickRow['eventType'] === '采集未接入') {
        this.dictionary = unConnectList
        if (this.NewModelData.synchroTime) {
          this.NewModelData.synchroTime = moment(
            this.NewModelData.synchroTime
          ).format('YYYY-MM-DD HH:MM:SS')
        }
        if (this.NewModelData.expoUserTime) {
          this.NewModelData.expoUserTime = moment(
            this.NewModelData.expoUserTime
          ).format('YYYY-MM-DD HH:MM:SS')
        }
      } else {
        if (this.NewModelData.terMeterReadtime) {
          this.NewModelData.terMeterReadtime = moment(
            this.NewModelData.terMeterReadtime
          ).format('YYYY-MM-DD HH:MM:SS')
        }
        if (this.NewModelData.sendTime) {
          this.NewModelData.sendTime = moment(
            this.NewModelData.sendTime
          ).format('YYYY-MM-DD HH:MM:SS')
        }
        this.NewModelData.sendTime = moment(this.NewModelData.sendTime).format(
          'YYYY-MM-DD HH:MM:SS'
        )
        if (this.NewModelData.synchroTime) {
          this.NewModelData.synchroTime = moment(
            this.NewModelData.synchroTime
          ).format('YYYY-MM-DD HH:MM:SS')
        }
        this.dictionary = unUsualList
      }
      this.situation = []
      const data = await postAction(`coll/load?workOrderNo=${e.workOrderNo}`)
      console.log(data)
      const item = await dealSituation(
        data,
        'liveVideo',
        'livePhotos',
        'liveSituation'
      )
      this.situation.push(item)

      // // 开始处理进度条,接着跟上时间
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
    },
    convertFormat(item) {
      item.workOrderCtime = moment(item.workOrderCtime).format(
        'YYYY-MM-DD HH:mm:ss'
      )

      if (item.eventType == 1) {
        item.eventType = '采集失败'
      } else if (item.eventType == 2) {
        item.eventType = '采集异常'
      } else if (item.eventType == 3) {
        item.eventType = '采集未接入'
      }
      // 状态转换
      if (item.eventReason == 0) {
        item.eventReason = '未确认'
      } else if (item.eventReason == 1) {
        item.eventReason = '采集设备掉线'
      } else if (item.eventReason == 2) {
        item.eventReason = '485线问题,任务'
      } else if (item.eventReason == 3) {
        item.eventReason = '表前开关掉线，时钟错误'
      } else if (item.eventReason == 4) {
        item.eventReason = '模块、表计故障，表前开关掉线，时钟错误'
      } else if (item.eventReason == 5) {
        item.eventReason = '采集异常，需要补抄'
      } else if (item.eventReason == 6) {
        item.eventReason = '采集未接入'
      }
      if (item.workOrderStatus == 1) {
        item.workOrderStatus = '待处理'
      } else if (item.workOrderStatus == 2) {
        item.workOrderStatus = '处理中'
      } else if (item.workOrderStatus == 3) {
        item.workOrderStatus = '待归档'
      } else if (item.workOrderStatus == 4) {
        item.workOrderStatus = '已归档'
      }
      return item
    },
    dealEventReason(res) {
      let i = 0
      let j = 0
      let k = 0
      // 声明用户类型数组
      let consTypes = [
        '三相一般工商业用户（C类）',
        '单相一般工商业用户（D类）',
        '居民用户（E类）'
      ]
      res.map((item) => {
        item.EventType = {}
        if (item.eventType == '1') {
          item.EventType.eventType = '采集失败'
          i += 1
        } else if (item.eventType == '2') {
          item.EventType.eventType = '采集异常'
          j += 1
        } else if (item.eventType == '3') {
          item.EventType.eventType = '采集未接入'
          k += 1
        }
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
      res.map((item) => {
        if (item.eventType == 1) {
          // 判断用户类型
          if (!consTypes.includes(item.consType)) {
            if (i >= 10) {
              item.EventType.eventReason = '表前开关掉线，时钟错误'
            } else {
              item.EventType.eventReason =
                '模块、表计故障，表前开关掉线，时钟错误'
            }
          } else {
            item.EventType.eventReason = '485线问题'
          }
        } else if (item.eventType == 2) {
          item.EventType.eventReason = '采集异常，需要补抄'
        } else {
          item.EventType.eventReason = '采集未接入'
        }
      })
      // if(item.elecTypeCode){

      // }
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
