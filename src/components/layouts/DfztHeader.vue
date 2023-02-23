<template>
  <a-layout-header
    :style="{
      position: 'fixed',
      zIndex: 1,
      background: '#fff',
      padding: '22px',
      height: '100px',
    }"
    class="warp"
  >
    <div class="left">
      <!-- 		<img src="@/assets/u506.png" alt="" class="img">
			<div class="text">
				<div class="chinese">国网呼伦贝尔供电公司</div>
				<div class="english">STATE GRID HULUNBEIER POWER</div>
			</div> -->
    </div>
    <!-- <div class="center">台区网格化精细管理</div> -->
    <!-- <div class="center">主界面</div> -->
    <div class="right">
      <img src="@/assets/u513.svg" alt="" class="right_img" />
      <span class="username">{{ username }}</span>
      <img src="@/assets/u511.svg" alt="" class="avatar" />
      <a-popconfirm
        title="您确定要退出吗？"
        ok-text="是"
        cancel-text="否"
        @confirm="confirm"
      >
        <img src="@/assets/u512.svg" alt="" class="exit" />
      </a-popconfirm>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  data () {
    return {
      username: '',
    }
  },
  created () {
    this.username = this.$store.getters.username
  },
  methods: {
    confirm () {
      this.$store.commit('clearUserInfo', [])
      console.log('与张升测试ISC，在此处修改跳转，如需要改变，直接切换即可！')
      // this.$router.push('/overView')
      this.$router.push('/user/login')
      this.$notification['success']({
        message: '退出成功！',
        duration: 4,
      })
    }
  }
}
</script>

<style lang="less" scoped>
.warp {
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 80px);

  .left {
    display: flex;
    align-items: center;
    // margin-right: 60px;

    .img {
      width: 98px;
      height: 73px;
    }

    .text {
      display: flex;
      flex-direction: column;
    }

    .chinese,
    .english {
      line-height: normal;
      font-weight: 700;
    }
  }

  .center {
    font-size: 24px;
    font-weight: 700;
    margin-left: -200px;
  }

  .right {
    display: flex;
    align-items: center;

    .right_img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }

    .avatar {
      width: 39px;
      height: 39px;
      margin-right: 10px;
    }

    .exit {
      width: 25px;
      height: 25px;
      // margin-right:10px
    }
  }
}
</style>
