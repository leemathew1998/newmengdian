<template>
<!-- 抽屉——计量运维页面 -->
  <div class="warp">
    <a-drawer title="采集运维工单详情" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
      <a-tabs default-active-key="1" class="drawerTabs">
        <a-tab-pane key="1" tab="工单信息">
          <OrderInfo :clickRow="clickRow" :columns="columns" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="处理流程">
          <Steps></Steps>
        </a-tab-pane>
        <a-tab-pane key="3" tab="数据来源">
        <Source :clickRow="clickRow"  :columns="columns"/>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </div>
</template>
<script>
  import OrderInfo from '@/components/drawer/OrderInfo'
  import Steps from '@/components/drawer/Steps'
  import Source from '@/components/drawer/Source'
  export default {
    name: 'Drawer',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      clickRow: {
        type: Object,
        required: true
      },
      columns: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        drawerVisible: false,
      };
    },
    components: {
      OrderInfo,
      Steps,
      Source
    },
    watch: {
      visible(val, valOld) {
        this.drawerVisible = val
      }
    },
    methods: {
      onClose() {
        this.drawerVisible = !this.drawerVisible
        this.$emit("changeDrawer", false)
      },

    },
  };
</script>

<style lang="less" scoped>
  .warp {
    // background-color: red;
	.drawerTabs{
		display: flex;
	}
  }
</style>
