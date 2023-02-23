<template>
  <div>
    <iframe class="picket" src="http://plant3-ui-md.show.wiz.top:9600/#/mdPowerGrid/powerCenter"></iframe>
    <!-- <div class="rowOne">
      <div class="Indicators">
        <DashboardTitle title='业绩指标' />
        <DashboardIndicators />
      </div>
      <div class="Overview">
        <DashboardTitle title='工单总览' />
        <DashboardOverview />
      </div>
    </div>
    <div class="rowTwo">
      <div class="Finish">
        <DashboardTitle title='各类工单完成情况' />
        <DashboardFinish />
      </div>
    </div>
    <div class="rowThree">
      <div class="Quality">
        <DashboardTitle title='优质服务工单' />
        <DashboardQuality />
      </div>
    </div> -->

  </div>

</template>

<script>
  // import DashboardIndicators from './DashboardIndicators.vue'
  // import DashboardTitle from './DashboardTitle.vue'
  // import DashboardOverview from './DashboardOverview.vue'
  // import DashboardFinish from './DashboardFinish.vue'
  // import DashboardQuality from './DashboardQuality.vue'
  export default {
    name: "DashBorad",
    // components: {
    //   DashboardIndicators,
    //   DashboardTitle,
    //   DashboardOverview,
    //   DashboardFinish,
    //   DashboardQuality
    // }
  };
</script>

<style lang="less" scoped>
  // .rowOne {
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: nowrap;

  //   .Indicators,
  //   .Overview {
  //     // height: 400px;
  //     flex: 1
  //   }
  // }
  .picket{
    width: 100%;
    height: 750px;
  }
</style>
