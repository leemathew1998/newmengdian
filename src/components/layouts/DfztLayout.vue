<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <DfztSider />

    <a-layout :style="{ marginLeft: '80px' }">
      <DfztHeader />

      <a-layout-content
        :style="{
          padding: '100px 20px 0 20px',
          background: '#fff',
          minHeight: '280px',
          overflow: 'initial',
          'overflow-y': 'hidden',
          height:'calc(100% - 100px)'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!--    <a-layout id="components-layout-demo-fixed-sider">

      <a-layout :style="{ marginLeft: '200px' }">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%',background: '#fff', padding: 0 }" />
        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
          <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
            ...
            <br />
            Really
            <br />...<br />...<br />...<br />
            long
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />
            content
          </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout> -->
</template>
<script>
import DfztSider from '@/components/layouts/DfztSider'
import DfztHeader from '@/components/layouts/DfztHeader'
export default {
  data() {
    return {}
  },
  components: {
    DfztSider,
    DfztHeader
  }
}
</script>
<style lang="less" scoped>
#components-layout-demo-fixed-sider {
  height: 100%;
  .logo {
    height: 32px;

    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
