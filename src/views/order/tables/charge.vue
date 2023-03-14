<template>
  <div class="warp">
    <!-- 搜索 -->
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <!-- 表单 -->
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
      xlsxName="费控负电"
      :exportUrl="exportUrl"
      :ids="ids"
    ></Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      modalName="工单详情"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="费控复电"
    ></NewModel>
  </div>
</template>
<script>
import Tables from "@/components/tables/Tables";
import NewModel from "@/components/NewModel/index";
import SearchForm from "@/components/searchform/SearchChange";
import { getAction, feecontrolWorkOrder, postAction } from "@/api/manage";
import { chargeList } from "@/components/NewModel/constant.js";
import { dealSituation } from "@/utils/util.js";
import moment from "moment";
const columns = [
  {
    title: "工单编号",
    dataIndex: "workOrderNo",
    align: "center",
    width: 130,
  },
  {
    title: "工单生成时间",
    dataIndex: "workOrderCtime",
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
    title: "台区编号",
    dataIndex: "tgId",
    align: "center",
    width: 100,
  },
  {
    title: "台区名称",
    dataIndex: "tgName",
    align: "center",
    width: 100,
  },
  {
    title: "供电单位",
    dataIndex: "orgNo",
    align: "center",
    width: 100,
  },
  {
    title: "用户名称",
    dataIndex: "consName",
    align: "center",
    width: 100,
  },
  {
    title: "用户编号",
    dataIndex: "consNo",
    align: "center",
    width: 100,
  },
  {
    title: "工单处理状态",
    dataIndex: "workOrderStatus",
    align: "center",
    width: 100,
  },
  {
    title: "用户地址",
    dataIndex: "elecAddr",
    align: "center",
    width: 200,
  },
];
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
      exportUrl: "feecontrolWorkOrder",
      ids: "workOrderNo",
    };
  },
  components: {
    Tables,
    SearchForm,
    NewModel,
  },
  created() {
    this.loadData();
  },
  methods: {
    // 接口、时间状态转换
    async loadData() {
      this.loading = true;
      const data = await postAction(`feecontrolWorkOrder/selectAll`);
      this.data = data.data;
      console.log(data.data);
      for (var i = 0; i < this.data.length; i++) {
        Object.defineProperty(this.data[i], "key", {
          value: i,
        });
        this.data[i].failTime = moment(this.data[i].failTime).format(
          "YYYY-MM-DD HH:MM:SS"
        );
        this.data[i].workOrderTime = moment(this.data[i].workOrderTime).format(
          "YYYY-MM-DD HH:MM:SS"
        );
        if (this.data[i].workOrderStatus == "1") {
          this.data[i].workOrderStatus = "待处理";
        } else if (this.data[i].workOrderStatus == "2") {
          this.data[i].workOrderStatus = "处理中";
        } else if (this.data[i].workOrderStatus == "3") {
          this.data[i].workOrderStatus = "待归档";
        } else if (this.data[i].workOrderStatus == "4") {
          this.data[i].workOrderStatus = "已归档";
        }
      }
      this.loading = false;
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e;
    },
    // 搜索数据处理
    solveformData(e) {
      console.log("solveformData", e);
      feecontrolWorkOrder(e).then((res) => {
        this.data = res.data;
        for (var i = 0; i < this.data.length; i++) {
          Object.defineProperty(this.data[i], "key", {
            value: i,
          });
          this.data[i].failTime = moment(this.data[i].failTime).format(
            "YYYY-MM-DD HH:MM:SS"
          );
          // this.data[i].workOrderTime = moment(this.data[i].workOrderTime).format(
          //   'YYYY-MM-DD HH:MM:SS'
          // )
          if (this.data[i].workOrderStatus == "1") {
            this.data[i].workOrderStatus = "待处理";
          } else if (this.data[i].workOrderStatus == "2") {
            this.data[i].workOrderStatus = "处理中";
          } else if (this.data[i].workOrderStatus == "3") {
            this.data[i].workOrderStatus = "待归档";
          } else if (this.data[i].workOrderStatus == "4") {
            this.data[i].workOrderStatus = "已归档";
          }
        }
        if (e.workOrderStatus && e.workOrderStatus.length > 0) {
          this.data = this.data.filter((item) => {
            return e.workOrderStatus.includes(item.workOrderStatus);
          });
        }
      });
    },
    // 弹框、现场处理
    async clickRows(e) {
      this.dictionary = chargeList;
      this.NewModelData = e;
      // 此处为现场情况，为以后考虑，设置为数组  初始化数据
      this.situation = [];
      const { data } = await getAction(
        "feecontrolWorkOrder/selectWorkOrderScene?workOrderNo=" + e.workOrderNo
      );
      const res = dealSituation(
        data,
        "liveVideo",
        "livePhotos",
        "liveSituation"
      );
      this.situation.push(res);

      // 处理进度条
      this.progress.stepOne = e.workOrderCtime;
      this.progress.stepTwo = e.workOrderTime;
      this.progress.stepThree = e.workOrderStime;
      this.progress.stepFour = e.workOrderFtime;
      if (e.workOrderStatus === "待处理") {
        this.progress.progress = 0;
      } else if (e.workOrderStatus === "处理中") {
        this.progress.progress = 1;
      } else if (e.workOrderStatus === "待归档") {
        this.progress.progress = 2;
      } else {
        this.progress.progress = 3;
      }
      this.NewModalVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.warp {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  .form {
    // width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
  }
}

.title {
  margin: 14px 0 20px 0;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
  font-size: 16px;
  line-height: 1.5;
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
