<template>
  <a-modal
    v-model="innerToggle"
    width="40%"
    title="工单详情"
    :maskClosable="false"
    @cancel="close"
    @ok="close"
  >
    <a-table
      :columns="columns"
      :data-source="tableData"
      :scroll="{ x: 1500, y: 300 }"
      :loading="loading"
    >
    </a-table>
  </a-modal>
</template>

<script>
import { getAcManDetails1 } from '@/api/manage'
const columns = [
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' }
]

const tableData = []
for (let i = 0; i < 100; i++) {
  tableData.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
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
      tableData,
      columns
    }
  },
  methods: {
    async loadData() {
      this.loading = true
      console.log(this.data)
      const res = await getAcManDetails1({
        tgManager: this.data.tgManager,
        ymd: this.data.params.ymd
      }).catch((err) => console.log(err))
      console.log(res)
      this.loading = false
    },
    close() {
      this.$emit('update:toggleModal', false)
    }
  }
}
</script>
