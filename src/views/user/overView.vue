<template>
  <div class="wrap-overview">
    <div class="header">
      <div class="header-title animated zoomIn">台区网格化精细管理系统</div>
      <!-- 台区网格化精细管理系统 -->
      <img src="@/assets/Overview/logo.png" class="header-icon" />
    </div>
    <div class="main animated bounceInUp">
      <div class="rowOne">
        <Item imageSrc="驾驶舱" name="驾驶舱" @toggleClick="solveClick"></Item>
        <Item
          imageSrc="业扩报装"
          name="业扩报装"
          @toggleClick="solveClick"
        ></Item>
      </div>
      <div class="rowTwo">
        <Item
          imageSrc="业务工单"
          name="业务工单"
          @toggleClick="solveClick"
        ></Item>
        <Item name=""></Item>
        <Item
          imageSrc="绩效管理"
          name="绩效管理"
          @toggleClick="solveClick"
        ></Item>
      </div>
      <div class="rowThree">
        <Item
          imageSrc="反窃查询"
          name="反窃查询"
          @toggleClick="solveClick"
        ></Item>
        <Item
          imageSrc="三维模型管理"
          name="三维模型管理"
          @toggleClick="solveClick"
        ></Item>
      </div>
    </div>

    <div class="footer">
      <div class="left">
        <div class="left-top">
          <img src="@/assets/Overview/管理员图标.png" alt="" />
          <div class="left-top-name">{{ welcomeWord }} {{ userName }}</div>

          <img
            v-if="userName === '请登录'"
            src="@/assets/Overview/login.png"
            class="login-logout"
            @click="handleSubmit"
          />
          <img
            v-else
            src="@/assets/Overview/logout.png"
            class="login-logout"
            @click="logOut"
          />
        </div>
        <div class="left-bottom">
          {{ nowTime }}
        </div>
      </div>
      <div class="right">{{ orgName }}</div>
    </div>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import LoginAccount from './LoginAccount.vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import cookie from '@/utils/cookie.js'
import { postAction } from '../../api/manage'
let timer
export default {
  data() {
    return {
      nowTime: '',
      welcomeWord: '',
      userName: '',
      orgName: '',
      devModel: false // 开发环境开启
    }
  },
  async created() {
    // 初始化时间
    this.userName = this.$store.getters.username || '请登录'
    this.orgName = this.$store.getters.department || ''
    this.welcomeWord =
      moment().hour() < 9
        ? '早上好'
        : moment().hour() < 12
        ? '中午好'
        : '下午好'
    this.nowTime = moment().format('YYYY-MM-DD HH:mm')

    timer = setInterval(() => {
      this.welcomeWord =
        moment().hour() < 9
          ? '早上好'
          : moment().hour() < 12
          ? '中午好'
          : '下午好'
      this.nowTime = moment().format('YYYY-MM-DD HH:mm')
    }, 10000)
    // 核查cookie
    const ticket = cookie.getCookie('ticket')
    console.log('ticket', ticket)
    if (!ticket) {
      this.$notification['warning']({
        message: '请登录'
      })
      let needLogin = true
      if (this.$route.params.hasOwnProperty('needLogin')) {
        needLogin = this.$route.params.needLogin
      }
      console.log(this.$route, 'this.$route')
      !this.devModel && needLogin && this.handleSubmit()
    } else {
      const res = await postAction('SysUser/getToken', {})

      this.userName = cookie.getCookie('loName2')
      this.orgName = cookie.getCookie('orgName')
      let username = cookie.getCookie('userName')
      const role = await postAction(`SysUser/getUserRole?userName=${username}`)
      let isManage = false
      if (role.role == 3) {
        isManage = true
      }
      this.$store.commit('setUserInfo', {
        username: this.userName,
        role: role.role,
        token: res.token,
        isManage: isManage,
        department: this.orgName
      })
    }
  },
  beforeDestroy() {
    clearInterval(timer)
  },

  methods: {
    ...mapActions(['Login']),
    solveClick(name) {
      const ticket = cookie.getCookie('ticket')
      if (!ticket && !this.devModel) {
        this.$notification['warning']({
          message: '请先进行登录！'
        })
        this.handleSubmit()
        return
      }
      if (name == '驾驶舱') {
        window.open(
          `http://10.173.172.9:18880/#/mdPowerGrid/powerCenter?fromOrigin=otherSystem&projectName=台区精细化&RelyUserId=bc4ba096-ac22-4f68-b43d-9499679ede7a&MdTicket=${ticket}`,
          '_blank'
        )
      } else if (name == '三维模型管理') {
        window.open(
          `http://10.173.172.9:18880/#/modelCenter/index?projectName=台区精细化&RelyUserId=bc4ba096-ac22-4f68-b43d-9499679ede7a&MdTicket=${ticket}`,
          '_blank'
        )
      } else if (name == '业扩报装') {
        window.open(
          `http://10.173.172.9:18880/#/mdPowerGrid/businessExpansionList?projectName=台区精细化=bc4ba096-ac22-4f68-b43d-9499679ede7a&MdTicket=${ticket}`,
          '_blank'
        )
      } else {
        let map = {
          业务工单: 'order',
          绩效管理: 'achievements',
          反窃查询: 'antitheft'
        }
        let routeData = this.$router.resolve({
          name: map[name]
        })
        window.open(routeData.href, '_blank')
      }
    },

    async logOut() {
      window.open('http://25.73.1.171/api/SysUser/logout1', '_self')
      this.$store.commit('clearUserInfo', [])
      this.$notification['success']({
        message: '注销成功',
        duration: 4
      })
      this.userName = '请登录'
      this.orgName = ''
      cookie.clearCookie('ticket')
    },
    // 免登录获取token
    handleSubmit() {
      console.log('进入isc')
      window.open('http://25.73.1.171/api/SysUser/login1', '_self')
    }
  },
  components: {
    Item,
    LoginAccount
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/less/animate.css");

@font-face {
  font-family: title;
  /*为引入的字体文件起名，可以为任意名*/
  src: url("../../assets/font/title.otf");
}

@font-face {
  font-family: digitDate;
  /*为引入的字体文件起名，可以为任意名*/
  src: url("../../assets/font/DS-DIGIB-2.ttf");
}

.wrap-overview {
  background: url("../../assets/Overview/bg_img.jpg") 0 0;
  background-size: auto;
  background-size: 100% 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: hidden;

  .header {
    background: url(../../assets/Overview/title.png) no-repeat !important;
    background-size: auto;
    background-position: center !important;
    // background-size: 100% 100% !important;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;

    .header-title {
      display: flex;
      font-family: "title";
      /*引入字体起的名字*/
      color: #f9f9fb;
      font-size: 2.5vw;
      margin-top: 0px;
    }

    .header-icon {
      position: fixed;
      top: 12px;
      left: 12px;
      width: 60px;
    }
  }

  .main {
    width: 80%;
    height: 70vh;
    display: flex;
    flex-direction: column;

    .rowOne,
    .rowTwo,
    .rowThree {
      padding: 0 25%;
      margin-bottom: -50px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .rowTwo {
      padding: 0 13%;
    }
  }

  .footer {
    z-index: 100;
    height: 20vh;
    width: 100%;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      flex-direction: column;

      &-top {
        display: flex;
        align-items: flex-end;

        &-name {
          font-size: 32px;
          color: #fff;
          margin-left: 8px;
        }

        .login-logout {
          width: 32px;
          cursor: pointer;
        }
      }

      &-bottom {
        font-family: "digitDate";
        font-size: 32px;
        color: #fff;
      }
    }

    .right {
      font-size: 28px;
      color: #afb4c0;
    }
  }
}
</style>

<style>
@keyframes animation {
  0% {
    transform: scale(1.05);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}
</style>
