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
      :ccontactData="ccontactData"
      :cinformationData="cinformationData"
      :electricityPriceData="electricityPriceData"
    ></NewModel>
  </div>
</template>
<script>
import Tables from "@/components/tables/baseTables";
import NewModel from "@/components/NewModel/consumerModel";
import SearchForm from "@/components/searchform/consumerSearch";
import { getAction, postAction } from "@/api/manage";
const columns = [
  {
    title: "用户编号",
    dataIndex: "consNo",
    align: "center",
    ellipsis: true,
    width: 120,
  },
  {
    title: "用户名称",
    dataIndex: "consName",
    ellipsis: true,
    align: "center",
    width: 150,
  },
  {
    title: "供电单位编号",
    dataIndex: "orgNo",
    ellipsis: true,
    align: "center",
    width: 120,
  },
  {
    title: "用户地址",
    dataIndex: "elecAddr",
    ellipsis: true,
    align: "center",
    width: 170,
  },
  {
    title: "用户状态",
    dataIndex: "statusCode",
    align: "center",
    width: 100,
  },
  {
    title: "用户分类",
    dataIndex: "consSortCode",
    align: "center",
    width: 135,
  },
  {
    title: "行业分类",
    dataIndex: "tradeCode",
    ellipsis: true,
    align: "center",
    width: 130,
  },
  {
    title: "供电电压",
    dataIndex: "voltCode",
    ellipsis: true,
    align: "center",
    width: 80,
  },
  {
    title: "合同容量(kVA)",
    dataIndex: "contractCap",
    align: "center",
    width: 130,
  },
  {
    title: "临时用电标志",
    dataIndex: "tmpFlag",
    align: "center",
    width: 80,
  },
  {
    title: "抄表段编号",
    dataIndex: "mrSectNo",
    align: "center",
    width: 90,
  },
  {
    title: "用户类别",
    dataIndex: "elecTypeCode",
    align: "center",
    width: 130,
  },
  {
    title: "运行容量(kVA)",
    dataIndex: "runCap",
    align: "center",
    width: 130,
  },
  {
    title: "抄表员姓名",
    dataIndex: "realName",
    align: "center",
    width: 80,
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
      ccontactData: [],
      cinformationData: [],
      electricityPriceData: [],
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
  methods: {
    // 数据展示分装
    async initList(
      payload = {
        consNo: "",
        consName: "",
        orgName: "",
        elecTypeCode: "",
      }
    ) {
      this.loading = true;
      this.data = [];
      const res = await postAction(
        `coll/getConsListweb?consNo=${payload.consNo}&consName=${payload.consName}&orgName=${payload.orgName}&elecTypeCode=${payload.elecTypeCode}`
      );
      if (
        res &&
        res.length > 0 &&
        !(res.hasOwnProperty("code") && res.code == 20001)
      ) {
        console.log("基本信息", res);
        this.data = [...res];
      }
      this.loading = false;
    },
    // 搜索
    solveformData(e) {
      for (let key in e) {
        if (!e[key]) {
          e[key] = "";
        }
      }
      console.log("e", e);
      this.initList(e);
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e;
    },
    // 处理点击进入详情的数据
    clickRows(e) {
      this.ccontactData = [];
      postAction(`coll/getConsListMobile?consNo=${e.consNo}`).then((res) => {
        console.log("电话：", res);
        this.ccontactData = res;
      });
      this.cinformationData = e;
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
