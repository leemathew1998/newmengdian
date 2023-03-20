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
      xlsxName="主动抢修"
      :exportUrl="exportUrl"
      :ids="ids"
    >
      <!-- 			<template v-slot="slotProps">
				<a-button @click.stop="operation(slotProps.table_key)">转派</a-button>
			</template> -->
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
      :imgdata="imgdata"
      name="activeRepair"
    ></NewModel>
  </div>
</template>
<script>
import Tables from "@/components/tables/Tables";
import NewModel from "@/components/NewModel/active";
import SearchForm from "@/components/searchform/SearchRepair";
import { activeRepairList } from "@/components/NewModel/constant.js";
import { getAction, postAction, repairsWorkOrder } from "../../../api/manage";
import moment from "moment";
// const columns = [{
//   title: '工单编号',
//   dataIndex: 'workOrderNo',
//   align: 'center',
//   width: 150
// },
// {
//   title: '台区经理',
//   dataIndex: 'tgManager',
//   align: 'center',
//   width: 50
// },
// {
//   title: '台区编号',
//   dataIndex: 'tgNo',
//   align: 'center',
//   width: 70
// },
// {
//   title: '台区名称',
//   dataIndex: 'tgName',
//   align: 'center',
//   width: 150
// },
// {
//   title: '故障设备',
//   dataIndex: 'failureEquipment',
//   align: 'center',
//   width: 100
// },
// {
//   title: '工单状态',
//   dataIndex: 'workOrderStatus',
//   align: 'center',
//   width: 50
// },
// {
//   title: '电压',
//   dataIndex: 'voltCode',
//   // ellipsis: true,
//   align: 'center',
//   width: 50
// },
// {
//   title: '电流',
//   dataIndex: 'ratedCurrent',
//   // ellipsis: true,
//   align: 'center',
//   width: 50
// },
// {
//   title: '本体温度',
//   dataIndex: 'tgTemperature',
//   // ellipsis: true,
//   align: 'center',
//   width: 50
// },
// {
//   title: '故障区域',
//   dataIndex: 'failureArea',
//   // ellipsis: true,
//   align: 'center',
//   width: 100

// },
// {
//   title: '异常开关状态',
//   dataIndex: 'errorStatus',
//   // ellipsis: true,
//   align: 'center',
//   width: 50
// },
// ]
const columns = [
  {
    title: "工单编号",
    dataIndex: "workNo",
    align: "center",
    width: 150,
  },
  {
    title: "市供电单位",
    dataIndex: "cityOrgName",
    align: "center",
    width: 100,
  },
  {
    title: "台区编号",
    dataIndex: "orgNo",
    align: "center",
    width: 100,
  },
  {
    title: "台区名称",
    dataIndex: "orgName",
    align: "center",
    width: 150,
  },
  {
    title: "停电类型",
    dataIndex: "workType",
    align: "center",
    width: 100,
  },
  {
    title: "告警类型",
    dataIndex: "faultType",
    align: "center",
    width: 50,
  },
  {
    title: "工单状态",
    dataIndex: "workOrderStatus",
    // ellipsis: true,
    align: "center",
    width: 50,
  },
  {
    title: "线路名称",
    dataIndex: "lineRoadName",
    // ellipsis: true,
    align: "center",
    width: 100,
  },
  {
    title: "线路编号",
    dataIndex: "lineRoadNo",
    // ellipsis: true,
    align: "center",
    width: 100,
  },
  {
    title: "故障名称",
    dataIndex: "faultName",
    // ellipsis: true,
    align: "center",
    width: 100,
  },
  {
    title: "故障编号",
    dataIndex: "orderld",
    // ellipsis: true,
    align: "center",
    width: 100,
  },
  {
    title: "停电时间",
    dataIndex: "faultTime",
    // ellipsis: true,
    align: "center",
    width: 100,
  },
];
export default {
  data() {
    return {
      NewModalVisible: false,
      ImgModalVisible: false,
      data: [],
      columns,
      dictionary: [],
      selectedRowKeys: [],
      modalVisible: false,
      drawerVisible: false,
      selectItem: {},
      NewModelData: {},
      progress: {},
      situation: {
        livePhotos: [],
        picture: [],
        photograph: [],
        caption: [],
        pin: [],
        print: [],
        photoprint: [],
      },
      dictionary: [],
      clickRow: {},
      imgdata: [],
      exportUrl: "repairsWorkOrder",
      ids: "workOrderNo",
    };
  },
  components: {
    Tables,
    // Modal,
    // Drawer,
    SearchForm,
    NewModel,
  },
  computed: {},
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const {
        data: { records },
      } = await postAction("repairsWorkOrder/selectAll");
      records.map((item) => {
        this.dealData(item);
      });
      //张生要求，"采集你先把时间最近的放前面"
      records.sort((a, b) => {
        return (
          moment(b.workOrderCtime).format("X") -
          moment(a.workOrderCtime).format("X")
        );
      });
      this.data = records;
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e;
    },
    async solveformData(e) {
      let tempStatus = e.workOrderStatus;
      delete e.workOrderStatus;
      const {
        data: { records },
      } = await repairsWorkOrder(e);
      //张生要求，"采集你先把时间最近的放前面"
      records.sort((a, b) => {
        return (
          moment(b.workOrderCtime).format("X") -
          moment(a.workOrderCtime).format("X")
        );
      });
      records.map((item) => {
        this.dealData(item);
      });
      if (tempStatus && tempStatus.length > 0) {
        records = records.filter((item) => {
          return tempStatus.includes(item.workOrderStatus);
        });
      }
      this.data = records;
    },
    async clickRows(e) {
      this.NewModelData = e;
      this.dictionary = activeRepairList;
      this.clickRow = e;
      const { data } = await getAction(
        "repairsWorkOrder/selectByNo?workOrderNo=" + e.workOrderNo
      );
      if (e.workOrderStatus === "待处理") {
        this.progress.progress = 0;
      } else if (e.workOrderStatus === "处理中") {
        this.progress.progress = 1;
      } else if (e.workOrderStatus === "待归档") {
        this.progress.progress = 2;
      } else {
        this.progress.progress = 3;
      }
      // 此处为现场情况，为以后考虑，设置为数组 faultPoint
      this.situation = {
        livePhotos: [],
        picture: [],
        photograph: [],
        caption: [],
        pin: [],
        print: [],
        photoprint: [],
      };
      // 故障点
      let photos = [];
      // 抢修单
      let picture = [];
      // 监控班许可证
      let photograph = [];
      // 安全措施
      let caption = [];
      // 到岗许可安全措施是否完备
      let pin = [];
      // 故障缺陷
      let print = [];
      // 安全措施猜出照片
      let photoprint = [];
      if (data.faultPoint) {
        data.faultPoint.split(",").map((i) => {
          if (i) {
            photos.push(i);
          }
        });
      }
      if (data.repairList) {
        data.repairList.split(",").map((i) => {
          if (i) {
            picture.push(i);
          }
        });
      }
      if (data.monShiftPer) {
        data.monShiftPer.split(",").map((i) => {
          if (i) {
            photograph.push(i);
          }
        });
      }
      if (data.secuMeas) {
        data.secuMeas.split(",").map((i) => {
          if (i) {
            caption.push(i);
          }
        });
      }
      if (data.iscompSecuMeas) {
        data.iscompSecuMeas.split(",").map((i) => {
          if (i) {
            pin.push(i);
          }
        });
      }
      if (data.afterTrou) {
        data.afterTrou.split(",").map((i) => {
          if (i) {
            print.push(i);
          }
        });
      }
      if (data.secuMeasRem) {
        data.secuMeasRem.split(",").map((i) => {
          if (i) {
            photoprint.push(i);
          }
        });
      }
      this.situation.livePhotos = photos;
      this.situation.picture = picture;
      this.situation.photograph = photograph;
      this.situation.caption = caption;
      this.situation.pin = pin;
      this.situation.print = print;
      this.situation.photoprint = photoprint;
      this.NewModalVisible = true;
    },
    operation(key) {
      this.selectItem = key;
      this.modalVisible = !this.modalVisible;
    },
    dealData(item) {
      item["workOrderCtime"] = moment(item["workOrderCtime"]).format(
        "MM-DD HH:MM:SS"
      );
      item["faultTime"] = moment(item["faultTime"]).format("MM-DD HH:MM:SS");
      if (item["workOrderStatus"] == "1") {
        item["workOrderStatus"] = "待处理";
      } else if (item["workOrderStatus"] == "2") {
        item["workOrderStatus"] = "处理中";
      } else if (item["workOrderStatus"] == "3") {
        item["workOrderStatus"] = "待归档";
      } else {
        item["workOrderStatus"] = "已归档";
      }
      if (item["voltCode"]) {
        item["voltCode"] = item["voltCode"] + "V";
      }
      if (item["ratedCurrent"]) {
        item["ratedCurrent"] = item["ratedCurrent"] + "A";
      }
      if (item["tgTemperature"]) {
        item["tgTemperature"] = item["tgTemperature"] + "℃";
      }
      return item;
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
