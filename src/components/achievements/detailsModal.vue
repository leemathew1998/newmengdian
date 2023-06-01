<template>
  <a-modal
    v-model="innerToggle"
    width="40%"
    title="工单详情"
    :maskClosable="false"
    @cancel="close"
    @ok="close">
    <a-table
      :columns="columns"
      :data-source="tableData"
      :scroll="{ x: 500, y: 300 }"
      :loading="loading"
      :pagination="false"
      row-key="id">
    </a-table>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { getAcManDetails1, getAcStaDetails1, getAcCouDetails1 } from '@/api/manage'
const columns = [
  { title: '工单编号', dataIndex: 'workOrderNo', width: 150 },
  { title: '台区经理名称', dataIndex: 'tgManager', width: 150 },
  { title: '台区编号', dataIndex: 'tgId', width: 150 },
  { title: '台区名称', dataIndex: 'tgName', width: 150 },
  { title: '供电单位', dataIndex: 'orgName', width: 150 },
  { title: '用户名称', dataIndex: 'consName', width: 150 },
  { title: '用户编号', dataIndex: 'consNo', width: 150 },
  { title: '用户地址', dataIndex: 'elecAddr', width: 150 },
  { title: '用户电话', dataIndex: 'mobile', width: 150 },
  { title: '电能表资产号', dataIndex: 'meterAssetNo', width: 150 },
  { title: '工单创建时间', dataIndex: 'workOrderCtime', width: 150 }
]
const MAP_NAME_TO_FUNC = {
  '采集消缺及时率': ['', getAcManDetails1, getAcStaDetails1, getAcCouDetails1]
}
export default {
  props: {
    toggleModal: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  watch: {
    toggleModal(val) {
      if (val) {
        this.loadData()
      }
      this.innerToggle = val
    }
  },
  data() {
    return {
      innerToggle: false,
      loading: false,
      tableData: [],
      columns
    }
  },
  methods: {
    async loadData() {
      this.loading = true
      console.log(this.data)
      const res = await MAP_NAME_TO_FUNC[this.data.name][this.data.distLv]({
        pOrgName: this.data.params.orgName,
        orgName: this.data.params.orgName,
        tgManager: this.data.tgManager || undefined,
        ymd: this.data.params.ymd
      }).catch((err) => console.log(err))
      res && Array.isArray(res) && res.forEach(item => {
        item.workOrderCtime = moment(item.workOrderCtime).format('yyyy-MM-DD HH:mm:ss')
      })
      this.tableData = Array.isArray(res) ? res : []
      this.loading = false
    },
    close() {
      this.$emit('update:toggleModal', false)
    }
  }
}
</script>
