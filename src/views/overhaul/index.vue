<template>
  <div class="warp">
    <div class="form">
      <SearchForm> </SearchForm>
    </div>
    <div class="table">
      <Tables
        @changeSelectedRowKeys="changeSelectedRowKeys"
        @clickRow="clickRows"
        :columns="columns"
        :data="data"
        operationName=""
      >
      </Tables>
    </div>
    <div class="drawer">
      <Drawer
        :visible="drawerVisible"
        @changeDrawer="drawerVisible = !drawerVisible"
        :clickRow="clickRow"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/searchform/SearchFormForOverhaul";
import Tables from "@/components/tables/Tables";
import Drawer from "@/components/drawer/Drawer";
const columns = [
  {
    title: "生成时间",
    dataIndex: "a",
    align: "center",
  },
  {
    title: "检修编号",
    dataIndex: "b",
    align: "center",
  },
  {
    title: "台区经理",
    dataIndex: "c",
    align: "center",
  },
  {
    title: "缺陷个数",
    dataIndex: "d",
    align: "center",
  },
  {
    title: "消缺个数",
    dataIndex: "e",
    align: "center",
  },
  {
    title: "处理人",
    dataIndex: "f",
    align: "center",
  },
  {
    title: "完成时间",
    dataIndex: "k",
    align: "center",
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: i,
    a: new Date().toLocaleString(),
    b: `JX23343${i}`,
    c: `${Math.random() > 0.5 ? "台区经理1" : "台区经理2"}`,
    d: `${Math.floor(Math.random() * 5)}`,
    e: `${Math.floor(Math.random() * 2)}`,
    f: `${Math.random() > 0.5 ? "台区经理1" : "台区经理2"}`,
    k: new Date().toLocaleString(),
  });
}
var XLSX = require("xlsx");
export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [],
      drawerVisible: false,
      selectItem: {},
      clickRow: {},
      headers: {
        authorization: "authorization-text",
      },
    };
  },
  components: {
    Tables,
    Drawer,
    SearchForm,
  },
  created() {},
  methods: {
    async fileHandleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        let formData = new FormData();
        formData.append("file", info.file.originFileObj);
        const res = await postAction("/excel/upload", formData);
        // console.log(res.data);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },

    changeSelectedRowKeys(e) {
      this.selectedRowKeys = e;
    },
    clickRows(e) {
      console.log(e);
      this.clickRow = e;
      this.drawerVisible = true;
    },

    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>

<style lang="less" scoped>
.warp {
  display: flex;
  flex-direction: column;

  .form {
    // width: 90%;
    margin: 10px 0;
  }
}
</style>
