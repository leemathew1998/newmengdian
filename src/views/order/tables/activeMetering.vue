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
      xlsxName="主动运维"
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
      name="主动运维"
    ></NewModel>
  </div>
</template>

<script>
import Tables from '@/components/tables/Tables'
import NewModel from '@/components/NewModel/operation.vue'
import SearchForm from '@/components/searchform/SearchActive'
import {
  achtiveMeteringList
} from '@/components/NewModel/constant.js'
import {
  getAction,
  postAction,
  activeOperation
} from '../../../api/manage'
const columns = [{
  title: '工单编号',
  dataIndex: 'workOrderNo',
  align: 'center',
  width: 100
},
{
  title: '工单日期',
  dataIndex: 'workOrderDate',
  align: 'center',
  width: 100
},
{
  title: '工单状态',
  dataIndex: 'workOrderStatus',
  align: 'center',
  width: 100
},
{
  title: '台区经理',
  dataIndex: 'tgManager',
  align: 'center',
  width: 50
},
{
  title: '台区编号',
  dataIndex: 'tgNo',
  align: 'center',
  width: 100
},
{
  title: '台区名称',
  dataIndex: 'tgName',
  align: 'center',
  width: 150
},

{
  title: '异常分类',
  dataIndex: 'excpType',
  align: 'center',
  width: 100
},
{
  title: '异常地点',
  dataIndex: 'excpAdd',
  align: 'center',
  width: 100
},
{
  title: '异常时间',
  dataIndex: 'excpDate',
  align: 'center',
  width: 100
},
{
  title: '研判分析结果',
  dataIndex: 'analysisResult',
  align: 'center',
  width: 100
}

]

export default {
  data () {
    return {
      NewModalVisible: false,
      ImgModalVisible: false,
      data: [],
      columns,
      selectedRowKeys: [],
      modalVisible: false,
      drawerVisible: false,
      selectItem: {},
      clickRow: {},
      NewModelData: {},
      progress: {},
      situation: {
        livePhotos: [],
        picture: [],
        photograph: [],
        caption: [],
        pin: [],
        print: [],
        photoprint: []
      },
      dictionary: [],
      exportUrl: 'activeOperation',
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

    // 列表数据
    async loadData () {
      const { data } = await postAction('activeOperation/list1')
      this.data = data
      data.map(item => {
        if (item.excpDate) {
          item.excpDate = moment(item.excpDate).format('YYYY-MM-DD')
        }
      })
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    async clickRows (e) {
      this.NewModelData = e
      this.dictionary = achtiveMeteringList
      // this.clickRow = e
      const res1 = await getAction('activeOperation/load?workOrderNo=' + e.workOrderNo)
      console.log('res1', res1)
      if (e.workOrderStatus == '待处理') {
        this.progress.progress = 0
      } else if (e.workOrderStatus == '处理中') {
        this.progress.progress = 1
      } else if (e.workOrderStatus == '待归档') {
        this.progress.progress = 2
      } else if (e.workOrderStatus == '已归档') {
        this.progress.progress = 3
      }
      // 现场处理
      this.situation = {
        livePhotos: [],
        picture: [],
        photograph: [],
        caption: [],
        pin: [],
        print: [],
        photoprint: []
      }
      const temp = await getAction(
        'activeOperation/selHandle?workOrderNo=' + e.workOrderNo
      )
      console.log('temp', temp)
      // 故障点/危机缺陷
      let livePhotos = []
      // 抢修单
      let picture = []
      // 监控班许可证
      let photograph = []
      // 安全措施
      let caption = []
      // 到岗许可安全措施是否完备
      let pin = []
      // 故障危机缺陷处理后
      let print = []
      // 安全措施拆除照片
      let photoprint = []
      if (temp.handlePhoto) {
        temp.handlePhoto.split(',').map((i) => {
          if (i) {
            livePhotos.push(i)
          }
        })
      }
      if (temp.workPhoto) {
        temp.workPhoto.split(',').map((i) => {
          if (i) {
            picture.push(i)
          }
        })
      }
      if (temp.monitorPhoto) {
        temp.monitorPhoto.split(',').map((i) => {
          if (i) {
            photograph.push(i)
          }
        })
      }
      if (temp.safePhoto) {
        temp.safePhoto.split(',').map((i) => {
          if (i) {
            caption.push(i)
          }
        })
      }
      if (temp.agreeStartPhoto) {
        temp.agreeStartPhoto.split(',').map((i) => {
          if (i) {
            pin.push(i)
          }
        })
      }
      if (temp.defectPhoto) {
        temp.defectPhoto.split(',').map((i) => {
          if (i) {
            print.push(i)
          }
        })
      }
      if (temp.safeDismantlePhoto) {
        temp.safeDismantlePhoto.split(',').map((i) => {
          if (i) {
            photoprint.push(i)
          }
        })
      }
      this.situation.livePhotos = livePhotos
      this.situation.picture = picture
      this.situation.photograph = photograph
      this.situation.caption = caption
      this.situation.pin = pin
      this.situation.print = print
      this.situation.photoprint = photoprint
      this.NewModalVisible = true
    },
    // 搜索
    solveformData (e) {
      activeOperation(e).then(res => {
        this.data = res
      })
    },
    handleChange (value) { },
    operation (key) {
      this.selectItem = key
      this.modalVisible = !this.modalVisible
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
