<template>
  <div class="warp">
    <table id="table">
      <tr id="table_tr">
        <th style="background-color: #f2f2f2" class="table_first leftRadius">
          <i class="fa fa-bookmark" style="color: #999; font-size: 20px"></i>
          <span
            class="title"
            style="
              color: #999;
              font-weight: 900;
              font-size: 18px;
              padding-left: 8px;
            "
            >工单类型</span
          >
        </th>
        <th
          class="table_th collection"
          @click="changePages('/order/collection')"
          ref="collection"
        >
          <div class="topColor"></div>
          <div class="mainTitle">采集运维</div>
        </th>
        <th
          class="table_th metering"
          @click="changePages('/order/metering')"
          ref="metering"
        >
          <div class="topColor"></div>
          <div class="mainTitle">计量运维</div>
        </th>
        <th
          class="table_th lineloss"
          @click="changePages('/order/lineloss')"
          ref="lineloss"
        >
          <div class="topColor"></div>
          <div class="mainTitle">线损治理</div>
        </th>
        <th
          class="table_th charge"
          @click="changePages('/order/charge')"
          ref="charge"
        >
          <div class="topColor"></div>
          <div class="mainTitle">费控复电</div>
        </th>
        <th
          class="table_th recovery"
          @click="changePages('/order/recovery')"
          ref="recovery"
        >
          <div class="topColor"></div>
          <div class="mainTitle">电费回收</div>
        </th>
        <th
          class="table_th copy"
          @click="changePages('/order/copy')"
          ref="copy"
        >
          <div class="topColor"></div>
          <div class="mainTitle">电费补抄</div>
        </th>
        <th
          class="table_th service"
          @click="changePages('/order/service')"
          ref="service"
        >
          <div class="topColor"></div>
          <div class="mainTitle">优质服务</div>
        </th>
        <th
          class="table_th activeMetering"
          @click="changePages('/order/activeMetering')"
          ref="activeMetering"
        >
          <div class="topColor"></div>
          <div class="mainTitle">主动运维</div>
        </th>
        <th
          class="table_th activeRepair"
          @click="changePages('/order/activeRepair')"
          ref="activeRepair"
        >
          <div class="topColor rightRadius"></div>
          <div class="mainTitle">主动抢修</div>
        </th>
      </tr>
    </table>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectItem: [
        "collection",
        "metering",
        "lineloss",
        "charge",
        "recovery",
        "copy",
        "service",
        "activeMetering",
        "activeRepair",
      ],
    }
  },
  mounted () {
    this.$refs[this.$route.name].children[0].style.backgroundColor = "#28599d"
    this.$refs[this.$route.name].children[0].style.borderTopLeftRadius = "5px"
    this.$refs[this.$route.name].children[0].style.borderTopRightRadius = "5px"
    this.$refs[this.$route.name].children[1].style.borderTopLeftRadius = "5px"
    this.$refs[this.$route.name].children[1].style.borderTopRightRadius = "5px"
    this.$refs[this.$route.name].children[1].style.lineHeight = "50px"
    this.$refs[this.$route.name].children[1].style.background = "#28599d"
  },
  methods: {
    changePages (path) {
      // console.log(path.split('/')[2],this.$refs['collection'],this.$refs)
      for (let item = 0; item < this.selectItem.length; item++) {
        this.$refs[this.selectItem[item]].children[0].style.backgroundColor = "#f3f3f3"
        this.$refs[this.selectItem[item]].children[0].style.borderTopLeftRadius = "0"
        this.$refs[this.selectItem[item]].children[0].style.borderTopRightRadius = "0"
        this.$refs[this.selectItem[item]].children[1].style.borderTopLeftRadius = "0"
        this.$refs[this.selectItem[item]].children[1].style.borderTopRightRadius = "0"
        this.$refs[this.selectItem[item]].children[1].style.lineHeight = "25px"
        this.$refs[this.selectItem[item]].children[1].style.background = "#aaaaaa"
      }
      this.$refs[path.split("/")[2]].children[0].style.height = "0px"
      this.$refs[path.split("/")[2]].children[1].style.borderTopLeftRadius = "5px"
      this.$refs[path.split("/")[2]].children[1].style.borderTopRightRadius = "5px"
      this.$refs[path.split("/")[2]].children[1].style.lineHeight = "50px"
      this.$refs[path.split("/")[2]].children[1].style.background = "#28599d"
      this.$router.push(path)
    },
  },
};
</script>

<style lang="less" scoped>
.warp {
  display: flex;
  flex-direction: column;

  #table_tr {
    display: flex;
    align-items: center;
    justify-content: center;

    .leftRadius {
      border-top-left-radius: 10px;
    }

    .rightRadius {
      border-top-right-radius: 10px;
    }

    .table_first {
      height: 50px;
      padding: 0;
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .table_th {
      height: 50px;
      padding: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
        // transform: scaleX(1.2)
      }

      .topColor {
        height: 10px;
        width: 100%;
        background-color: #f3f3f3;
        flex: 1;
      }

      .mainTitle {
        width: 100%;
        flex: 2;
        text-align: center;
        color: #fff;
        background: #aaaaaa;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      // background-color: #f3f3f3;
      // color: #fff;
    }
  }

  // .header {
  // 	display: flex;
  // 	justify-content: space-around;
  // 	align-items: center;

  // 	.title {
  // 		font-weight: 700;
  // 	}

  // 	#table {
  // 		width: 80%;
  // 	}

  // }
}

// table,
// th {

// 	width: 137px;
// 	height: 40px;
// 	text-align: center;
// 	vertical-align: middle;

// }
</style>
