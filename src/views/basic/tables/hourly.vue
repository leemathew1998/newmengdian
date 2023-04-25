<template>
  <div class="warp">
    <div class="cardShadow">
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
        :scroll="1500"
      ></Tables>
    </div>
    <!-- 弹窗 -->
    <!-- <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :newModelData="newModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      :imgdata="imgdata"
      name="采集运维"
    ></NewModel> -->
  </div>
</template>
<script>
import Tables from '@/components/tables/baseTables'
import NewModel from '@/components/NewModel/pubService'
import SearchForm from '@/components/searchform/sensitiveHourly'
import { FselectAll, getAction, postAction } from '@/api/manage'
import {
  hourly
} from '@/components/NewModel/constant.js'
import moment from 'moment'
const columns = [
  {
    title: '用户编号',
    dataIndex: 'userId',
    align: 'center',
    ellipsis: true,
    width: 80
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center',
    ellipsis: true,
    width: 70
  },
  {
    title: '用户电话',
    dataIndex: 'userPhone',
    ellipsis: true,
    align: 'center',
    width: 100
  },
  {
    title: '用户地址',
    dataIndex: 'userLocation',
    ellipsis: true,
    align: 'center',
    width: 200
  },
  {
    title: '台区编号',
    dataIndex: 'platformId',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '台区名称',
    dataIndex: 'platformName',
    align: 'center',
    ellipsis: true,
    width: 90
  },
  {
    title: '供电单位',
    dataIndex: 'powerUnit',
    align: 'center',
    ellipsis: true,
    width: 135
  },
  {
    title: '停电描述',
    dataIndex: 'description',
    align: 'center',
    ellipsis: true,
    width: 130
  },
  {
    title: '停电时间',
    dataIndex: 'powerCutTime',
    align: 'center',
    ellipsis: true,
    width: 100
  },
  {
    title: '来电时间',
    dataIndex: 'incomingTelegramTime',
    align: 'center',
    ellipsis: true,
    width: 100
  }
]
export default {
  data () {
    return {
      loading: false,
      data: [],
      // dataa: [],
      columns,
      selectedRowKeys: [], // 选择多行数组
      NewModalVisible: false,
      selectItem: {},
      // 一下为重新修改的代码
      newModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      imgdata: []
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel
  },
  created () {
    this.initList()
  },
  methods: {
    // 数据展示分装
    async initList () {
      // this.loading = true
      const { data: { records } } = await postAction('superiorFrequentoutages/selectAll')
      this.data = records
      records.map(item => {
        if (item.powerCutTime) {
          item.powerCutTime = moment(item.powerCutTime).format('YYYY-MM-DD hh:mm')
        }
        if (item.incomingTelegramTime) {
          item.incomingTelegramTime = moment(item.incomingTelegramTime).format('YYYY-MM-DD hh:mm')
        }
      })
      this.loading = false
    },
    // 搜索
    async solveformData (e) {
      const { data: { records } } = await FselectAll(e)
      this.data = records
      records.map(item => {
        if (item.powerCutTime) {
          item.powerCutTime = moment(item.powerCutTime).format('YYYY-MM-DD hh:mm')
        }
        if (item.incomingTelegramTime) {
          item.incomingTelegramTime = moment(item.incomingTelegramTime).format('YYYY-MM-DD hh:mm')
        }
      })
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 处理点击进入详情的数据
    async clickRows (e) {
      // this.clickRow = e;
      // // 获取上面原始数据
      // // this.newModelData = await getAction("api/collect/rawdata", {
      // //   id: e.id,
      // // });
      // this.newModelData = await getAction("coll/rawdata", {
      // 	id: e.id,
      // });
      // // console.log(this.newModelData);
      // // val.sendTime = moment(val.sendTime).format("MM-DD h:mm:ss");
      // // 此处为现场情况，为以后考虑，设置为数组
      // this.situation = [];
      // const temp = await getAction("coll/load?workOrderNo=" + e.workOrderNo);
      // if (temp.liveVideo) {
      // 	temp.liveVideo = [temp.liveVideo];
      // } else if (temp.livePhotos) {
      // 	let photos = [];
      // 	temp.livePhotos.split(",").map((item) => {
      // 		if (item) {
      // 			photos.push(item);
      // 		}
      // 	});
      // 	temp.livePhotos = photos;
      // 	this.imgdata = temp.livePhotos
      // 	temp.ptime = moment(temp.ptime).format(
      // 		"YYYY-MM-DD HH:MM:SS"
      // 	);
      // }
      // this.situation.push(temp);
      // // 开始处理进度条,接着跟上时间
      // if (e.workOrderStatus === "待处理") {
      // 	this.progress.progress = 0;
      // 	this.progress.stepOne = e.workOrderCtime
      // } else if (e.workOrderStatus === "处理中") {
      // 	this.progress.progress = 1;
      // 	this.progress.stepOne = e.workOrderCtime
      // } else if (e.workOrderStatus === "待归档") {
      // 	this.progress.progress = 2;
      // 	this.progress.stepOne = e.workOrderCtime
      // } else {
      // 	this.progress.progress = 3;
      // 	this.progress.stepOne = e.workOrderCtime
      // }
      // this.NewModalVisible = true;
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
