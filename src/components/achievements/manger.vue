<template>
  <div class="manage-detail-page">
    <div class="top">
      <!-- 简介 -->
      <p class="p1" style="font-size: 23px">绩效指标详情—{{ data.name }}</p>
      <p class="p2" style="font-size: 14px">指标计算方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonList[data.name] }}</p>
      <p class="p2" style="font-size: 14px">指标考核方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonListV2[data.name] }}</p>
      <!-- <p class="p2" style="font-size: 14px">计算过程</p> -->
    </div>
    <!-- 表单 -->
    <div class="lower">
      <p class="p2" style="font-size: 14px">
        原始数据
        <a href="javascript:;" v-if="isShowDetailModal" @click.prevent="openModal">查看详情</a>
      </p>

      <a-table
        :columns="tableColumnListForManagr[data.name]"
        :data-source="data.data"
        bordered
        :loading="loading"
        :pagination="false">
      </a-table>
    </div>
    <details-modal :toggleModal.sync="toggleModal" :data="data"></details-modal>
  </div>
</template>
<script>
import {
  reasonList,
  reasonListV2,
  tableColumnListForManagr
} from './constion.js'
import detailsModal from './detailsModal.vue'
export default {
  data() {
    return {
      reasonList,
      reasonListV2,
      tableColumnListForManagr,
      toggleModal: false
    }
  },
  props: {
    data: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    },
    clickTgManager: {
      type: Boolean,
      default: false
    }
  },
  components: {
    detailsModal
  },
  computed: {
    isShowDetailModal() {
      if (['采集消缺及时率'].includes(this.data.name)) {
        return true
      }
      return false
    }
  },
  methods: {
    openModal() {
      this.toggleModal = true
    }
  }
}
</script>

<style lang="less" scoped>
.manage-detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    .p1 {
      color: #1c9399;
      text-align: center;
    }

    .p2 {
      color: #1c9399;
    }

    .formula {
      margin-left: 2%;
      width: 95%;
    }
  }

  .lower {
    flex: 1;
    display: flex;
    flex-direction: column;

    .p2 {
      color: #1c9399;
    }
  }
}
</style>
