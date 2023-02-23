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
        :scroll="1300"
        :pageConfig.sync="pageConfig"
      ></Tables>
    </div>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :basics="basics"
      :mpNo="mpNo"
      :rCpmpNo="rCpmpNo"
      :dMeter="dMeter"
      :sItScheme="sItScheme"
    ></NewModel>
  </div>
</template>
<script>
import Tables from "@/components/tables/baseTables"
import NewModel from "@/components/NewModel/partyModel"
import SearchForm from "@/components/searchform/partySearch"
import {
  getAction,
  postAction,
  cMp,
  cMpItRela,
  rCp,
  dMeter,
  sItScheme
} from "@/api/manage"
const columns = [{
  title: "计量点编号",
  dataIndex: "mpNo",
  align: "center",
  width: 50,
},
{
  title: "计量点容量",
  dataIndex: "mpCap",
  align: "center",
  width: 70,
},
{
  title: "电压等级",
  dataIndex: "voltCode",
  // ellipsis: true,
  align: "center",
  width: 70,
},
{
  title: "电价金额",
  dataIndex: "kwhPrc",
  // ellipsis: true,
  align: "center",
  width: 70,
},
{
  title: "电价名称",
  dataIndex: "catPrcName",
  align: "center",
  width: 130,
},
{
  title: "定比定量值",
  dataIndex: "fqrValue",
  align: "center",
  width: 90,
},
{
  title: "定比扣减标志",
  dataIndex: "frDeductFlag",
  align: "center",
  width: 70,
},
{
  title: "计量方式",
  dataIndex: "measMode",
  align: "center",
  width: 70,
},
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
      // 弹窗数据
      basics: {},
      mpNo: [],
      rCpmpNo: [],
      dMeter: [],
      sItScheme: [],
      pageSize: 10,
      pageConfig: {
        current: 1,
        total: 10,
        pageSize: 10
      }
    }
  },
  components: {
    Tables,
    SearchForm,
    NewModel,
  },
  created () {
    this.initList()
  },
  watch: {
    'pageConfig': {
      handler: function (newVal) {
        this.initList()
      },
      deep: true
    }
  },
  methods: {
    // 数据展示分装
    async initList () {
      this.loading = true
      const res = await postAction(
        `/cMp/selectAll?current=${this.pageConfig.current}&size=${this.pageConfig.pageSize}`)
      this.data = res.data.records
      this.pageConfig.pageSize = res.data.size
      this.pageConfig.total = res.data.total
      this.pageConfig.current = res.data.current
      this.loading = false
    },
    // 搜索
    solveformData (e) {
      cMp(e).then(res => {
        this.data = res.data.records
      })
    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 处理点击进入详情的数据
    async clickRows (e) {
      this.NewModalVisible = true
      this.basics = e
      cMpItRela({
        mpNo: e.mpNo
      }).then((res) => {
        this.mpNo = res.data.records
      })
      rCp({
        mpNo: e.mpNo
      }).then((res) => {
        this.rCpmpNo = res.data.records
      })
      dMeter({
        mpNo: e.mpNo
      }).then((res) => {
        this.dMeter = res.data.records
      })
      sItScheme({
        mpNo: e.mpNo
      }).then((res) => {
        this.sItScheme = res.data.records
      })
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
</style>
