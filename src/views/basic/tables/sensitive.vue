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
    <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :dictionary="dictionary"
      :progress="progress"
      :imgdata="imgdata"
      name="采集运维"
    ></NewModel>
  </div>
</template>
<script>
import Tables from '@/components/tables/baseTables'
import NewModel from '@/components/NewModel/pubService'
import SearchForm from '@/components/searchform/sensitiveSearch'
// import {
// 	list
// } from "@/api/collection";
import {
  getAction,
  postAction,
  selectAll
} from '@/api/manage'
// import axios from "axios";
import {
  sensitive
} from '@/components/NewModel/constant.js'
import moment from 'moment'
const columns = [{
  title: '用户编号',
  dataIndex: 'consNo',
  align: 'center',
  ellipsis: true,
  width: 80
},
{
  title: '用户名称',
  dataIndex: 'consName',
  align: 'center',
  ellipsis: true,
  width: 70
},
{
  title: '用户电话',
  dataIndex: 'mobile',
  ellipsis: true,
  align: 'center',
  width: 100
},
{
  title: '用户地址',
  dataIndex: 'elecAddr',
  ellipsis: true,
  align: 'center',
  width: 200
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
  width: 90
},
{
  title: '供电单位',
  dataIndex: 'orgNo',
  align: 'center',
  ellipsis: true,
  width: 135
},
{
  title: '标记时间',
  dataIndex: 'labelTime',
  align: 'center',
  ellipsis: true,
  width: 130
},
{
  title: '标记原因',
  dataIndex: 'labelCause',
  align: 'center',
  ellipsis: true,
  width: 80
},
{
  title: '标记人',
  dataIndex: 'labelName',
  align: 'center',
  ellipsis: true,
  width: 80
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
      NewModelData: {},
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
      this.loading = true
      const res = await postAction('/superiorSensitivity/selectAll')
      this.data = res.data
      this.loading = false
    },
    // 搜索
    async solveformData (e) {
      const res = await selectAll(e)
      this.data = res.data
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 处理点击进入详情的数据
    async clickRows (e) {
      this.clickRow = e
      this.dictionary = sensitive
      this.NewModelData = e
      this.progress.progress = 2
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
