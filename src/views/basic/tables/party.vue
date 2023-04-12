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
import Tables from "@/components/tables/baseTables";
import NewModel from "@/components/NewModel/partyModel";
import SearchForm from "@/components/searchform/partySearch";
import {
  getAction,
  postAction,
  cMp,
  cMpItRela,
  rCp,
  dMeter,
  sItScheme,
} from "@/api/manage";
const columns = [
  {
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
    title: "计算方式",
    dataIndex: "calcMode",
    // ellipsis: true,
    align: "center",
    width: 70,
  },
  {
    title: "定比扣减标志",
    dataIndex: "frDeductFlag",
    align: "center",
    width: 130,
  },
  {
    title: "计量方式",
    dataIndex: "measMode",
    align: "center",
    width: 90,
  },
  {
    title: "台区名称",
    dataIndex: "tgName",
    align: "center",
    width: 70,
  },
];
export default {
  data() {
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
        pageSize: 10,
      },
    };
  },
  components: {
    Tables,
    SearchForm,
    NewModel,
  },
  created() {
    this.initList();
  },
  watch: {
    pageConfig: {
      handler: function (newVal) {
        this.initList();
      },
      deep: true,
    },
  },
  methods: {
    // 数据展示分装
    async initList(payload = { mpId: "" }) {
      this.loading = true;
      let mpId = payload.mpId;
      let postList = [
        postAction(`coll/getMeter1?mpId=${mpId}`),
        postAction(`coll/getMeter2?mpId=${mpId}`),
        postAction(`coll/getMeter3?mpId=${mpId}`),
        postAction(`coll/getMeter4?mpId=${mpId}`),
      ];
      const res = await Promise.all(postList);
      console.log("全部打印", res);
      if (res) {
        if (
          res[0] &&
          !(res[0].hasOwnProperty("code") && res[0].code == 20001)
        ) {
          this.basics = res[0];
        }
        if (
          res[1] &&
          !(res[1].hasOwnProperty("code") && res[1].code == 20001)
        ) {
          this.mpNo = res[1];
        }
        if (
          res[2] &&
          !(res[2].hasOwnProperty("code") && res[2].code == 20001)
        ) {
          this.dMeter = res[2];
        }
        if (
          res[3] &&
          !(res[3].hasOwnProperty("code") && res[3].code == 20001)
        ) {
          this.sItScheme = res[3];
        }
      }
      this.loading = false;
    },
    // 搜索
    solveformData(e) {
      this.initList(e);
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e;
    },
    // 处理点击进入详情的数据
    async clickRows(e) {
      this.NewModalVisible = true;
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
