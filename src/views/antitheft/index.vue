<template>
  <div class="warp">
    <div class="form">
      <SearchForm @formData="solveformData"></SearchForm>
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
    <div>
      <NewModel
        :visible="NewModalVisible"
        modalName="工单详情"
        @changeModal="NewModalVisible = !NewModalVisible"
        :NewModelData="NewModelData"
        :situation="situation"
        :dictionary="dictionary"
        :progress="progress"
        name="反窃查违"
      ></NewModel>
    </div>
    <!-- <div class="drawer">
      <Drawer
        :visible="drawerVisible"
        @changeDrawer="drawerVisible = !drawerVisible"
        :clickRow="clickRow"
        :columns="columns"
      />
    </div> -->
  </div>
</template>

<script>
import SearchForm from "@/components/searchform/SearchFormForAntitheft"
import Tables from "@/components/tables/Tables"
import NewModel from '@/components/NewModel/mean'
import Drawer from "@/components/drawer/Drawer"
import {
  getAction,
  postAction
} from "@/api/manage"
import {
  antitheftList
} from '@/components/NewModel/constant.js'
import moment from 'moment'
const columns = [{
  title: "台区名称",
  dataIndex: "tgName",
  align: "center",
},
{
  title: "供电单位",
  dataIndex: "orgName",
  align: "center",
},
{
  title: "用户电压",
  dataIndex: "consVoltCode",
  align: "center",
},
{
  title: "用户编号",
  dataIndex: "consNo",
  align: "center",
},
{
  title: "用户地址",
  dataIndex: "consAddr",
  align: "center",
  width: 170
},
{
  title: "违约用电行为",
  dataIndex: "violateCode",
  align: "center",
},
{
  title: "窃电时长",
  dataIndex: "violateLong",
  align: "center",
},
{
  title: "窃电小时数",
  dataIndex: "violateHour",
  align: "center",
  width: 170
},
{
  title: "检查人员",
  dataIndex: "checkerName",
  align: "center",
},
{
  title: "提交时间",
  dataIndex: "commitTime",
  align: "center",
  width: 170
},
]
const data = []
export default {
  data () {
    return {
      data,
      columns,
      selectedRowKeys: [],
      drawerVisible: false,
      selectItem: {},
      clickRow: {},
      NewModalVisible: false,
      NewModelData: [],
      situation: [],
      dictionary: [],
      progress: {},
    }
  },
  components: {
    Tables,
    Drawer,
    SearchForm,
    NewModel
  },
  computed: {},
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      let obj = {
        tgName: '',
        queryNo: '',
        orgName: '',
        consNo: '',
        consName: ''
      }
      const data = await postAction("pi/AllStatus", obj)
      this.data = data
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].selectTime = moment(
          this.data[i].selectTime
        ).format('YYYY-MM-DD hh-mm-ss')
      }

    },
    changeSelectedRowKeys (e) {
      this.selectedRowKeys = e
    },
    // 模糊查询
    async solveformData (values) {
      console.log(values, 123)
      const data = await postAction("pi/AllStatus", values)
      this.data = data
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].selectTime = moment(
          this.data[i].selectTime
        ).format('YYYY-MM-DD hh-mm-ss')
      }
    },
    clickRows (e) {
      console.log(e)
      // e.lenthtimeStealing = e.lenthtimeStealing.split('至')[0] + "至" + e.lenthtimeStealing.split('至')[1]
      // e.selectTime = e.selectTime
      this.NewModelData = e
      this.NewModalVisible = true
      this.dictionary = antitheftList
      this.situation = []
      let temp = e
      let tem = {}
      let photos = []
      temp.vimage.split(',').map((i) => {
        if (i) {
          photos.push(i)
        }
      })
      tem.livePhotos = photos
      tem.autograph = temp.userSignature
      tem.ptime = temp.selectTime
      this.situation.push(tem)
    },

    handleChange (value) {
      console.log(`selected ${value}`)
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
