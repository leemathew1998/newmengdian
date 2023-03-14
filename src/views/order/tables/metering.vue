<template>
  <div class="warp">
    <div class="form">
      <!-- 搜索 -->
      <SearchForm @formData="solveformData"></SearchForm>
    </div>
    <!-- 表格 -->
    <Tables
      @changeSelectedRowKeys="changeSelectedRowKeys"
      @clickRow="clickRows"
      :columns="columns"
      :data="data"
      :loading="loading"
    ></Tables>
    <!-- 弹窗 -->
    <NewModel
      :visible="NewModalVisible"
      @changeModal="NewModalVisible = !NewModalVisible"
      :NewModelData="NewModelData"
      :situation="situation"
      :dictionary="dictionary"
      :progress="progress"
      name="计量运维"
    ></NewModel>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Tables from "@/components/tables/Tables";
import NewModel from "@/components/NewModel/index";
import SearchForm from "@/components/searchform/SearchMeter";
import { getAction, selEleVal, postAction, mwo } from "@/api/manage";
import { meteringList } from "@/components/NewModel/constant.js";
import { dealSituation } from "@/utils/util.js";
import { ListOfReason } from "@/views/order/utils/MeteringEnum.js";
const columns = [
  {
    title: "工单编号",
    dataIndex: "workOrderNo",
    // ellipsis: true,
    align: "center",
  },
  // {
  // 	title: "台区经理",
  // 	dataIndex: "areaManagerDesk",
  // 	ellipsis: true,

  // },
  {
    title: "台区编号",
    dataIndex: "tgId",
    // ellipsis: true,
    align: "center",
  },
  {
    title: "台区名称",
    dataIndex: "tgName",
    // ellipsis: true,
    align: "center",
  },
  {
    title: "供电单位",
    dataIndex: "orgName",
    // ellipsis: true,
    align: "center",
  },
  {
    title: "用户名称",
    dataIndex: "consName",
    // ellipsis: true,
    align: "center",
  },
  {
    title: "用户编码",
    dataIndex: "consNo",
    // ellipsis: true,
    align: "center",
  },
  {
    title: "用户地址",
    dataIndex: "consAddr",
    // ellipsis: true,
    align: "center",
    // width: "12.5%",
    // width:60,
  },
  // {
  // 	title: "用户电话",
  // 	dataIndex: "userPhone",
  // 	ellipsis: true,
  // },
  {
    title: "工单状态",
    dataIndex: "workOrderStatus",
    // ellipsis: true,
    align: "center",
  },
  {
    title: "工单创建时间",
    dataIndex: "workOrderCtime",
    // ellipsis: true,
    // align: "center",
  },
];

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
      NewModelData: {},
      situation: [],
      dictionary: [],
      progress: {},
      reasonList: [],
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
    // 接口
    async loadData() {
      this.loading = true;
      const res = await postAction("mwo/selectAll");
      res.data.records = res.data.records.map((item) => {
        if (item.workOrderStatus == 1) {
          item.workOrderStatus = "待处理";
        } else if (item.workOrderStatus == 2) {
          item.workOrderStatus = "处理中";
        } else if (item.workOrderStatus == 3) {
          item.workOrderStatus = "待归档";
        } else if (item.workOrderStatus == 4) {
          item.workOrderStatus = "已归档";
        }
        return item;
      });
      this.data = res.data.records;
      setTimeout(() => {
        this.loading = false;
      });
    },
    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e;
    },
    // 点击了某一行打开详情页
    async clickRows(e) {
      console.log("e", e);
      this.clickRow = e;
      this.dictionary = meteringList;
      // 原始数据
      this.NewModelData = e;
      // 现场情况暂时不处理
      // 开始处理进度条,接着跟上时间
      if (e.workOrderStatus === "待处理") {
        this.progress.progress = 0;
      } else if (e.workOrderStatus === "处理中") {
        this.progress.progress = 1;
      } else if (e.workOrderStatus === "待归档") {
        this.progress.progress = 2;
      } else {
        this.progress.progress = 3;
      }
      // 现场处理
      this.situation = [];
      const temp = await postAction(
        "mwo/loadwkoreder?workOrderNo=" + this.clickRow.workOrderNo
      );
      const res = dealSituation(
        temp,
        "liveVideo",
        "livePhotos",
        "liveSituation"
      );
      this.situation.push(res);

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
      );
      for (let i = 0; i < ListOfReason.length; i++) {
        if (
          reason[ListOfReason[i].englishName] != null &&
          !this.isNeedObj(i, reason[ListOfReason[i].englishName])
        ) {
          if (
            ListOfReason[i].englishName == "ninesix1" ||
            ListOfReason[i].englishName == "ninesix2"
          ) {
            this.dictionary.push({
              label: "时间",
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] = `${moment()
              .subtract(1, "day")
              .format("MM月DD日")}${
              reason[ListOfReason[i].englishName].split("时")[0]
            }分`;
            // this.reasonList.push({
            // 	chineseName: '时间',
            // 	value: `${moment().subtract(1, 'day').format('MM月DD日')}${reason[ListOfReason[i].englishName].split('时')[0]}分`,
            // })
          } else if (ListOfReason[i].englishName == "edVoltage") {
            this.dictionary.push({
              label: ListOfReason[i].chineseName,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          } else if (ListOfReason[i].englishName == "oneReverseActive") {
            this.dictionary.push({
              label: `${moment().subtract(1, "day").format("MM月DD日")}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          } else if (ListOfReason[i].englishName == "twoReverseActive") {
            this.dictionary.push({
              label: `${moment().subtract(2, "day").format("MM月DD日")}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          } else if (ListOfReason[i].englishName == "threeReverseActive") {
            this.dictionary.push({
              label: `${moment().subtract(3, "day").format("MM月DD日")}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          } else if (
            ListOfReason[i].englishName == "nowPositiveActive" ||
            ListOfReason[i].englishName == "nowavgCurrentA" ||
            ListOfReason[i].englishName == "nowavgCurrentB" ||
            ListOfReason[i].englishName == "nowavgCurrentC"
          ) {
            this.dictionary.push({
              label: `${moment().subtract(1, "day").format("MM月DD日")}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          } else if (
            ListOfReason[i].englishName == "beforePositiveActive" ||
            ListOfReason[i].englishName == "beforeavgCurrentA" ||
            ListOfReason[i].englishName == "beforeavgCurrentB" ||
            ListOfReason[i].englishName == "beforeavgCurrentC"
          ) {
            this.dictionary.push({
              label: `${moment().subtract(2, "day").format("MM月DD日")}${
                ListOfReason[i].chineseName
              }`,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          } else {
            this.dictionary.push({
              label: ListOfReason[i].chineseName,
              name: ListOfReason[i].englishName,
            });
            this.NewModelData[ListOfReason[i].englishName] =
              reason[ListOfReason[i].englishName];
          }
        }
      }
      console.log("dict", this.dictionary);
      this.NewModalVisible = true;
    },
    // 判断是否已经包含上面需要添加的属性
    isNeedObj(index, obj) {
      let flag = this.dictionary[index].label == obj;
      console.log("flag", flag);
      return flag;
    },
    // 这个是处理搜索数据的
    solveformData(e) {
      mwo(e).then((res) => {
        res.data.records = res.data.records.map((item) => {
          if (item.workOrderStatus == 1) {
            item.workOrderStatus = "待处理";
          } else if (item.workOrderStatus == 2) {
            item.workOrderStatus = "处理中";
          } else if (item.workOrderStatus == 3) {
            item.workOrderStatus = "待归档";
          } else if (item.workOrderStatus == 4) {
            item.workOrderStatus = "已归档";
          }
          return item;
        });
        if (e.workOrderStatus && e.workOrderStatus.length > 0) {
          res.data.records = res.data.records.filter((item) => {
            return e.workOrderStatus.includes(item.workOrderStatus);
          });
        }
        this.data = res.data.records;
      });
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
