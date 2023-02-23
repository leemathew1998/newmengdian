<template>
  <div class="wrap-overview">
    <div class="header">
      <div class="header-title animated zoomIn">呼伦贝尔台区精细化管理系统</div>
    </div>
    <div class="main animated bounceInUp" @click="solveClick">
      <div class="rowOne">
        <Item id="jiashi" class="item anim" ImageSrc="newjiashicang" name="驾驶舱"></Item>
        <Item id="yekuo" class="item anim" ImageSrc="yekuobaozhuang" name="业扩报装"></Item>
        <Item id="achievements" class="item anim" ImageSrc="jixiaoguanli" name="绩效管理">
        </Item>
      </div>
      <div class="rowTwo">
        <Item id="sanwei" class="item anim" ImageSrc="sanwei" name="三维模型管理"></Item>
        <Item id="antitheft" class="item anim" ImageSrc="fanqiechawei" name="反窃查违"></Item>
        <Item id="order" class="item anim" ImageSrc="yewugongdan" name="业务工单">
        </Item>
      </div>
    </div>
    <div class="footer">
      <div class="time">{{ nowTime }}</div>
      <div class="center">
        <img class="user-icon" src="" alt="" />
        <div class="welcome">早上好 {{ userName }}</div>
        <a-button class="changeUser" type="primary" @click="logOut">
          {{ buttonName }}
        </a-button>
      </div>
      <div class="footer-right">
        <div>
          <div>{{ thisWeek }}</div>
          <div>7/25</div>
        </div>
        <img @click="solveClick('/basic')" style="width: 50px; margin-left: 10px" src="" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from './components/Item.vue'
import LoginAccount from './LoginAccount.vue'
import {
  mapActions
} from 'vuex'
import moment from 'moment'
import {
  getAction,
} from '@/api/manage'
let timer
export default {
  data() {
    return {
      nowTime: '',
      thisWeek: '',
      date: '',
      userName: '',

      rememberMe: false,

    }
  },
  computed: {
    buttonName() {
      return this.$store.getters.username ? '退出' : "登录"
    }
  },
  async created() {
    // 初始化时间
    this.userName = this.$store.getters.username
    this.nowTime = moment().format('HH:mm')
    this.date = moment().format('MM/DD')
    const day = moment().format('d')
    if (day == 1) {
      this.thisWeek = '周一'
    } else if (day == 2) {
      this.thisWeek = '周二'
    } else if (day == 3) {
      this.thisWeek = '周三'
    } else if (day == 4) {
      this.thisWeek = '周四'
    } else if (day == 5) {
      this.thisWeek = '周五'
    } else if (day == 6) {
      this.thisWeek = '周六'
    } else if (day == 0) {
      this.thisWeek = '周日'
    }

    timer = setInterval(() => {
      this.nowTime = moment().format('HH:mm')
    }, 10000)
    // 张升isc集成测试
    const href = window.location.href
    if (href.includes('ticket')) {
      const res = await getAction(`SysUser/login1`)
      console.log('张升注意看返回值！', res)
    }

    // this.handleSubmit()
  },
  beforeDestroy() {
    clearInterval(timer)
  },

  methods: {
    ...mapActions(['Login']),
    solveClick(e) {
      let refName
      if (e == '/basic') {
        this.$router.push('/basic')
        return
      } else if (e.target.className == 'img' || e.target.className == '' || e.target.className == 'title') {
        refName = e.target.parentNode.id
      } else if (e.target.className == 'arrow' || e.target.className == 'text') {
        refName = e.target.parentNode.parentNode.id
      } else {
        refName = e.target.id
      }
      if (refName) {
        if (refName == 'jiashi') {
          window.open('http://plant3-ui-md.show.wiz.top:9600/#/mdPowerGrid/powerCenter', "_blank")
        } else if (refName == 'sanwei') {
          window.open('http://plant3-ui-md.show.wiz.top:9600/#/modelCenter/index', "_blank")
        } else if (refName == 'yekuo') {
          window.open('http://plant3-ui-md.show.wiz.top:9600/#/mdPowerGrid/businessExpansionList', "_blank")
        } else{
          let routeData = this.$router.resolve({
            name: refName,
          });
          window.open(routeData.href, '_blank');
        }
      }
      // if (refName) {
      // 	this.$refs[refName].$el.style.animation = 'animation 0.2s'
      // 	setTimeout(() => {
      // 		this.$refs[refName].$el.style.animation = ''
      // 	}, 200)
      // }
    },

    async logOut() {
      if (this.buttonName == '登录') {
        const res = await getAction(`SysUser/login`)
        console.log('张升注意看返回值！', res)
        // window.location.href = 'http://10.173.78.137:17001/isc_sso/login?service=http://25.73.1.171:80'
      } else {
        this.$store.commit('clearUserInfo', [])
        this.$notification['success']({
          message: '注销成功',
          duration: 4,
        })
        this.$router.push('/user/login')
      }
    },
    // 免登录获取token
    handleSubmit() {
      this.Login()
        .then((res) => {
          this.$store.commit('setUserInfo', {
            'token': res.token,
            'username': '刘月焱',
            'role': 'admin',
            'password': 111,
            'department': '哈克供电营业站'
          })
          this.$emit('success', res)
        })
        .catch((err) => {
          this.$emit('fail', err)
          // if (err.info == "用户已存在,自动登录") {
          // 	// this.$router.push('/dashboard')
          // 	this.$emit('success', err.info)
          // } else {
          // 	this.$emit('fail', err)
          // }
        })
    },
  },
  components: {
    Item,
    LoginAccount
  },
}
</script>

<style lang="less" scoped>
@import url("../../assets/less/animate.css");

.wrap-overview {
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

  .header {
    background-size: 100% 100% !important;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;

    .header-title {
      display: flex;
      color: #3788b1;
      font-size: 36px;
      margin-top: 20px;
    }
  }

  .main {
    width: 80%;
    display: flex;
    flex-direction: column;

    .rowOne,
    .rowTwo {
      // width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }

  .footer {
    width: 100%;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background: linear-gradient(#5E7095, #7785A1);
    background-color: #0b2141;
    opacity: 0.8;

    .time {
      font-size: 36px;
      color: #fff;
    }

    .footer-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 24px;
      color: #fff;
    }

    .center {
      display: flex;
      flex-direction: row;
      align-items: center;

      .user-icon {
        width: 40px;
        height: 40px;
      }

      .welcome {
        color: #fff;
        font-size: 20px;
        margin-right: 10px;
        font-weight: 300;
      }

      .changeUser {
        display: flex;
        align-items: center;
        background-color: #1296db;
        color: #fff;
        border-radius: 10px;
        padding: 5px 10px;
      }
    }
  }
}

.item {
  // width: 25%;
  // margin-bottom: 20px;
  flex: 1;
  margin: 20px;
  display: flex;
}

.anim {
  // position: relative;
  // padding: 30px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    cursor: default;
  }
}

#anim3,
#anim4,
#anim6,
#anim7,
#anim8,
#anim9,
#anim11,
#anim12 {
  min-width: 160px;
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
