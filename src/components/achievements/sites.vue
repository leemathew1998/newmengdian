<template>
  <div>
    <div class="top">
      <!-- 简介 -->
      <p class="p1" style="font-size: 24px">绩效指标详情—{{ data.name }}</p>
      <p class="p2" style="font-size: 14px">指标计算方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonList[data.name] }}</p>
      <p class="p2" style="font-size: 14px">指标考核方式</p>
      <p class="p3" style="font-size: 11px">{{ reasonListV2[data.name] }}</p>
    </div>
    <!-- 表单 -->
    <div class="lower">
      <p class="p2" style="font-size: 14px">原始数据
        <a href="javascript:;" v-if="isShowDetailModal" @click.prevent="openModal">查看详情</a>
      </p>
      <a-table
        :columns="tableColumnList[data.name]"
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
import { reasonList, reasonListV2, tableColumnList } from './constion.js'
import detailsModal from './detailsModal.vue'
export default {
  data() {
    return {
      reasonList,
      reasonListV2,
      tableColumnList,
      toggleModal: false
    }
  },
  props: ['data', 'loading', 'clickTgManager'],
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
    tablePaginationChange(pagination) {
      this.pagination.current = pagination.current // 重新设置当前页
      this.pagination.pageSize = pagination.pageSize
    },
    openModal() {
      this.toggleModal = true
    }
  }
}
</script>

<style lang="less" scoped>
.dingbu {
  display: inline-block;
  margin-left: 20px;
  width: 100px;
}

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
  .p2 {
    color: #1c9399;
  }
}

.com {
  float: left;
  display: inline-block;
  width: 40%;
  margin-right: 0;
  // margin: 0 auto;
  display: flex;
  position: relative;
}

.fenzi {
  flex: 1;
  font-weight: 600;
  display: inline-block;
}

.baifen {
  padding-top: 5px;
  //   display: flex;
  flex: 1;
  display: inline-block;
}

.dengyu {
  padding-top: 10px;
  //   display: flex;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  display: inline-block;
}

.comn {
  display: inline-block;
  display: flex;
  width: 60%;
}

.one {
  flex: 1;
  padding-top: 5px;
  display: inline-block;
}

.two {
  flex: 2;
  font-weight: 600;
  display: inline-block;
}

.three {
  flex: 1;
  display: inline-block;
}

.four {
  flex: 1;
  font-weight: 600;
  font-size: 16px;
  padding-top: 10px;
  display: inline-block;
}

.gongshi {
  width: 100%;
}
</style>
