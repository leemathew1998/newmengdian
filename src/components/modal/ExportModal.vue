<template>
  <!-- 导出 -->
  <a-modal
    v-model="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
    title="数据导出"
  >
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 200px;
      "
    >
      <div v-show="!finsh">{{ progressPercent }}%</div>
      <a-progress
        v-show="!finsh"
        :percent="progressPercent"
        :showInfo="false"
      />
      <span
        v-show="!finsh"
      >批量导出{{ selectedRowKeys.length }}条数据，正在在生成导出文件</span
      >
      <a-button type="primary" v-show="finsh" @click="exportExcel" size="large">
        下载导出文件
      </a-button>
    </div>
  </a-modal>
</template>
<script>
import { downFile } from '@/api/manage.js'
import { layer } from '@fortawesome/fontawesome-svg-core'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    selectedRowKeys: {
      type: Array,
      required: true
    },
    xlsxName: {
      type: String,
      require: true
    },
    // 导出接口地址
    exportUrl: {
      type: String,
      require: true
    },
    // 导出的索引名
    ids: {
      type: String,
      require: true
    },
    copyTheQueryParams: {
      type: Object
    }
  },
  created() {
    NProgress.configure({
      showSpinner: false
    })
  },
  data() {
    return {
      modalVisible: false,
      progressPercent: 0,
      finsh: false,
      tableData: [
        ['表', '头', '数', '据'],
        [1, 2, 3, 4],
        [1, 2, 3, 4]
      ],
      tableDataThree: [],
      link: null,
      url: null,
      success: null
    }
  },

  watch: {
    visible(newVal, oldVal) {
      // console.log('newVal', newVal, 'oldVal', oldVal)
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('正在批量导出中...')
      }
      this.modalVisible = newVal
      if (newVal) {
        this.preDownLoad()
      }
    }
  },
  methods: {
    handleCancel() {
      this.progressPercent = 0
      this.finsh = false
      this.modalVisible = !this.modalVisible
      this.$emit('changeModal', false)
    },
    async preDownLoad() {
      console.log('导出', this.exportUrl)
      NProgress.start()
      let ids = this.selectedRowKeys.join(',')
      const res = await downFile(`${this.exportUrl}/${this.selectedRowKeys.length > 0 ? 'export' : 'exportAll'}`, {
        ids,
        ...this.copyTheQueryParams
      })
      this.url = window.URL.createObjectURL(new Blob([res]))
      this.link = document.createElement('a')
      this.link.style.display = 'none'
      this.link.href = this.url
      this.link.setAttribute('download', `${this.xlsxName}工单.xlsx`)
      document.body.appendChild(this.link)
      this.finsh = true
      NProgress.done()
    },

    async exportExcel() {
      this.link.click()
      document.body.removeChild(this.link) // 下载完成移除元素
      window.URL.revokeObjectURL(this.url) // 释放掉blob对象
    },

    handleOk(e) {
      this.modalVisible = !this.modalVisible
      this.$nextTick(() => {
        this.$emit('changeModal', false)
        this.progressPercent = 0
        this.finsh = false
      })
    }
  }
}
</script>
