<template>
  <div class="warp">
    <table id="table">
      <tr id="table_tr">
        <th style="background-color: #f2f2f2" class="table_first leftRadius">
          <i class="fa fa-bookmark" style="color: #999; font-size: 20px"></i>
          <span
            class="title"
            style="color: #999; font-weight: 900; font-size: 18px"
          >服务类型</span
          >
        </th>

        <th
          class="table_th sensitive"
          @click="changePages('/basic/sensitive')"
          ref="sensitive"
        >
          <div class="topColor"></div>
          <div class="mainTitle">敏感用户</div>
        </th>
        <th
          class="table_th hourly"
          @click="changePages('/basic/hourly')"
          ref="hourly"
        >
          <div class="topColor"></div>
          <div class="mainTitle">频繁停电</div>
        </th>
        <th
          class="table_th consumer"
          @click="changePages('/basic/consumer')"
          ref="consumer"
        >
          <div class="topColor"></div>
          <div class="mainTitle">用户档案</div>
        </th>
        <th
          class="table_th party"
          @click="changePages('/basic/party')"
          ref="party"
        >
          <div class="topColor rightRadius"></div>
          <div class="mainTitle">计量点档案</div>
        </th>

      </tr>
    </table>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectItem: ['sensitive', 'hourly', 'consumer', 'party' ]
    }
  },
  mounted() {
    this.$refs[this.$route.name].children[0].style.backgroundColor = '#28599d'
    this.$refs[this.$route.name].children[0].style.borderTopLeftRadius = '5px'
    this.$refs[this.$route.name].children[0].style.borderTopRightRadius = '5px'
    this.$refs[this.$route.name].children[1].style.borderTopLeftRadius = '5px'
    this.$refs[this.$route.name].children[1].style.borderTopRightRadius = '5px'
    this.$refs[this.$route.name].children[1].style.lineHeight = '50px'
    this.$refs[this.$route.name].children[1].style.background = '#28599d'
  },
  methods: {
    changePages(path) {
      for (let item = 0; item < this.selectItem.length; item++) {
        const tab = this.selectItem[item]
        this.$refs[tab].children[0].style.backgroundColor =
          '#f3f3f3'
        this.$refs[tab].children[0].style.borderTopLeftRadius = '0'
        this.$refs[tab].children[0].style.borderTopRightRadius = '0'
        this.$refs[tab].children[1].style.borderTopLeftRadius = '0'
        this.$refs[tab].children[1].style.borderTopRightRadius = '0'
        this.$refs[tab].children[1].style.lineHeight = '25px'
        this.$refs[tab].children[1].style.background =
          '#aaaaaa'
      }
      this.$refs[path.split('/')[2]].children[0].style.height = '0px'
      this.$refs[path.split('/')[2]].children[1].style.borderTopLeftRadius =
        '5px'
      this.$refs[path.split('/')[2]].children[1].style.borderTopRightRadius =
        '5px'
      this.$refs[path.split('/')[2]].children[1].style.lineHeight = '50px'
      this.$refs[path.split('/')[2]].children[1].style.background = '#28599d'
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.warp {
  display: flex;
  flex-direction: column;
  height: 100%;

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
