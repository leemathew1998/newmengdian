<template>
  <div class="warp">
    <div class="form">
      <!-- 搜索 -->
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
      ref="table"
      exportUrl="mwo"
      :copyTheQueryParams="copyTheQueryParams"
    ></Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :newModelData="newModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="计量运维"
    ></NewModel>
  </div>
</template>

<script>
import moment from 'moment'
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/index'
import SearchForm from '@/components/searchform/SearchMeter'
import { mwo, postAction } from '@/api/manage'
import { meteringList } from '@/components/NewModel/constant.js'
import { dealSituation } from '@/utils/util.js'
import { ListOfReason } from '@/views/order/utils/MeteringEnum.js'
const columns = [
  {
    title: '工单编号',
    dataIndex: 'workOrderNo',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  // {
  // 	title: "台区经理",
  // 	dataIndex: "areaManagerDesk",
  // 	ellipsis: true,

  // },
  {
    title: '台区编号',
    dataIndex: 'tgId',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '台区名称',
    dataIndex: 'tgName',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '供电单位',
    dataIndex: 'orgName',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '用户名称',
    dataIndex: 'consName',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '用户编码',
    dataIndex: 'consNo',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '用户地址',
    dataIndex: 'consAddr',
    ellipsis: true,
    align: 'center',
    width: 170
    // width: "12.5%",
    // width:60,
  },
  {
    title: '计量事件类型',
    dataIndex: 'eventType',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '工单状态',
    dataIndex: 'workOrderStatus',
    ellipsis: true,
    align: 'center',
    width: 170
  },
  {
    title: '工单创建时间',
    dataIndex: 'workOrderCtime',
    ellipsis: true,
    width: 170,
    align: 'center'
  }
]

export default {
  data() {
    return {
      NewModalVisible: false,
      loading: false,
      data: [],
      dataa: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      modalVisible: false,
      selectItem: {},
      // 一下为重新修改的代码
      newModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      reasonList: [],
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
      let res = await mwo({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      }).finally(() => {
        this.loading = false
      })
      this.$refs.table.pagination.total = res.data.total
      res.data.records = res.data.records.map((item) => {
        item.workOrderCtime = moment(item.workOrderCtime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
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
      })
      this.data = res.data.records
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e
    },
    // 点击了某一行打开详情页
    async clickRows(e) {
      console.log('e', e)
      this.clickRow = e
      this.dictionary = meteringList
      // 原始数据
      this.newModelData = e
      // 现场情况暂时不处理
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
      // 现场处理
      this.situation = []
      const temp = await postAction(
        'mwo/loadwkoreder?workOrderNo=' + this.clickRow.workOrderNo
      )
      const res = await dealSituation(
        temp,
        'liveVideo',
        'livePhotos',
        'liveSituation',
        'pTime'
      )
      this.situation.push(res)

      //   if (temp) {
      //     if (temp.liveVideo) {
      //       temp.liveVideo = [temp.liveVideo]
      //     } else if (temp.livePhotos) {
      //       let photos = []
      //       temp.livePhotos.split(',').map((item) => {
      //         if (item) {
      //           photos.push(item)
      //         }
      //       })
      //       temp.livePhotos = photos
      //     }
      //     this.situation.push(temp)
      //   }

      // temp.ptime = moment(temp.ptime).format('YYYY-MM-DD HH:MM:SS')

      // 显示原因
      const reason = await postAction(
        `mwo/selectOne?workOrderNo=${this.clickRow.workOrderNo}`
      )
      for (let i = 0; i < ListOfReason.length; i++) {
        if (
          reason[ListOfReason[i].englishName] != null &&
          !this.isNeedObj(i, reason[ListOfReason[i].englishName])
        ) {
          if (
            ListOfReason[i].englishName == 'ninesix1' ||
            ListOfReason[i].englishName == 'ninesix2'
          ) {
            this.dictionary.push({
              label: '时间',
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] = `${moment()
              .subtract(1, 'day')
              .format('MM月DD日')}${
              reason[ListOfReason[i].englishName].split('时')[0]
            }分`
            // this.reasonList.push({
            // 	chineseName: '时间',
            // 	value: `${moment().subtract(1, 'day').format('MM月DD日')}${reason[ListOfReason[i].englishName].split('时')[0]}分`,
            // })
          } else if (ListOfReason[i].englishName == 'edVoltage') {
            this.dictionary.push({
              label: ListOfReason[i].chineseName,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          } else if (ListOfReason[i].englishName == 'oneReverseActive') {
            this.dictionary.push({
              label: `${moment().subtract(1, 'day').format('MM月DD日')}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          } else if (ListOfReason[i].englishName == 'twoReverseActive') {
            this.dictionary.push({
              label: `${moment().subtract(2, 'day').format('MM月DD日')}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          } else if (ListOfReason[i].englishName == 'threeReverseActive') {
            this.dictionary.push({
              label: `${moment().subtract(3, 'day').format('MM月DD日')}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          } else if (
            ListOfReason[i].englishName == 'nowPositiveActive' ||
            ListOfReason[i].englishName == 'nowavgCurrentA' ||
            ListOfReason[i].englishName == 'nowavgCurrentB' ||
            ListOfReason[i].englishName == 'nowavgCurrentC'
          ) {
            this.dictionary.push({
              label: `${moment().subtract(1, 'day').format('MM月DD日')}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          } else if (
            ListOfReason[i].englishName == 'beforePositiveActive' ||
            ListOfReason[i].englishName == 'beforeavgCurrentA' ||
            ListOfReason[i].englishName == 'beforeavgCurrentB' ||
            ListOfReason[i].englishName == 'beforeavgCurrentC'
          ) {
            this.dictionary.push({
              label: `${moment().subtract(2, 'day').format('MM月DD日')}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          } else {
            this.dictionary.push({
              label: ListOfReason[i].chineseName,
              name: ListOfReason[i].englishName
            })
            this.newModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName]
          }
        }
      }
      console.log('dict', this.dictionary)
      this.NewModalVisible = true
    },
    // 判断是否已经包含上面需要添加的属性
    isNeedObj(index, obj) {
      let flag = this.dictionary[index].label == obj
      console.log('flag', flag)
      return flag
    },
    // 这个是处理搜索数据的
    solveformData(e) {
      this.copyTheQueryParams = JSON.parse(JSON.stringify(e))
      this.loading = true
      mwo({
        ...this.copyTheQueryParams,
        ...this.$refs.table.pageParamsReturn()
      })
        .then((res) => {
          this.$refs.table.pagination.total = res.data.total
          res.data.records.map((item) => {
            item.workOrderCtime = moment(item.workOrderCtime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
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
          })
          this.data = res.data.records
        })
        .finally(() => {
          this.loading = false
        })
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
