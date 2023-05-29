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
      <img src="@/assets/u506.png" alt="" class="img" />
      <div class="text">
        <div class="chinese">国网呼伦贝尔供电公司</div>
        <div class="english">STATE GRID HULUNBEIER</div>
        <div class="english">ELECTRIC POWER SUPPLY COMPANY</div>
      </div>
    </div>
    <div class="center">台区网格化精细管理</div>
    <!-- <div class="center">主界面</div> -->
    <div class="right">
      <a-button style="margin-right: 8px;" @click="returnBack" v-if="showBackButton">
        <a-icon type="rollback" />
        返回上一级</a-button
        >
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
import { postAction } from '@/api/manage'
import cookie from '@/utils/cookie.js'
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = this.$store.getters.username
  },
  computed: {
    showBackButton() {
      return this.$store.state.user.userAchievementsList.length > 0
    }
  },
  methods: {
    confirm() {
      window.open('http://25.73.1.171/api/SysUser/logout1', '_self')
      this.$store.commit('clearUserInfo', [])
      this.$notification['success']({
        message: '注销成功',
        duration: 4
      })
      cookie.clearCookie('ticket')
      this.$router.push({
        name: '/overView',
        params: {
          needLogin: false
        }
      })
    },
    returnBack() {
      // this.$store.state.user.userAchievementsList.pop()
      const item = this.$store.state.user.userAchievementsList.pop()
      let left = this.$store.state.user.userAchievementsList
      left = left.length > 0 ? left : false
      this.$store.commit('setUserAchievementsList', left)
      if (item.ranks && typeof item.ranks === 'object') {
        item.ranks = JSON.stringify(item.ranks)
      }
      // console.warn(item, this.$store.state.user.userAchievementsList)
      this.$router.push({
        // path: item.router,
        name: item.router,
        query: item
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
