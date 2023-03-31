<template>
  <div class="wrap-overview">
    <div class="header">
      <div class="header-left">呼伦贝尔台区精细化管理系统</div>
      <div class="header-right">
        <img class="user-icon" src="" alt="" />
        <div class="welcome">早上好，{{ userName }}</div>
        <a-button class="changeUser" type="primary" @click="logOut">
          切换
        </a-button>
      </div>
    </div>
    <div class="main" @click="solveClick">
      <div class="main-left-wrap">
        <div>此接口已经加了/api前缀，并且需要先登录后再进这个页面进行测试</div>
        <a-input v-model:value="urlForZS" placeholder="输入URL" />
        <br />
        <a-textarea
          v-model:value="paramsForZS"
          placeholder="只接受body传入的json参数，如果是拼接在URL上的参数直接在URL上拼就可以了"
        />
        <br />
        <a-button @click="sendQuery">发送</a-button>
        <br />
      </div>
      <div class="main-left-wrap">
        <div>上传接口</div>
        <a-upload :file-list="fileList" :before-upload="beforeUpload">
          <a-button> <a-icon type="upload" />选择文件 </a-button>
        </a-upload>
        <a-button type="primary" style="margin-top: 16px" @click="handleUpload">
          上传
        </a-button>
      </div>
    </div>
    <div class="footer">
      <div class="time">{{ nowTime }}</div>
      <div class="footer-right" style="position: relative">
        <div style="padding-right: 100px">
          <div>{{ thisWeek }}</div>
          <div>7/25</div>
        </div>
        <div class="footer-right-img" @click="solveClick('/basic')">
          <img style="width: 50px" src="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import longButton from "@/views/user/components/longButton.vue";
import normalButton from "@/views/user/components/normalButton.vue";
import moment from "moment";
import { postAction } from "@/api/manage";
import { axios } from "@/utils/request";
let timer;
export default {
  data() {
    return {
      nowTime: "",
      thisWeek: "",
      date: "",
      userName: "",
      urlForZS: "",
      paramsForZS: "",
      fileList: [],
    };
  },
  created() {
    // 初始化时间
    if (this.$store.getters.role == "user") {
      this.userName = "刘月焱";
    } else if (this.$store.getters.role == "admin") {
      this.userName = "所站长";
    }
    this.nowTime = moment().format("HH:mm:ss");
    this.date = moment().format("MM/DD");
    const day = moment().format("d");
    if (day == 1) {
      this.thisWeek = "周一";
    } else if (day == 2) {
      this.thisWeek = "周二";
    } else if (day == 3) {
      this.thisWeek = "周三";
    } else if (day == 4) {
      this.thisWeek = "周四";
    } else if (day == 5) {
      this.thisWeek = "周五";
    } else if (day == 6) {
      this.thisWeek = "周六";
    } else if (day == 0) {
      this.thisWeek = "周日";
    }
    timer = requestAnimationFrame(this.refreshTime);
  },
  beforeDestroy() {
    cancelAnimationFrame(timer);
  },
  methods: {
    async handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });
      axios({
        url: "http://25.73.1.171:18080/api/file/upload",
        method: "post",
        data: formData,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("报错了：", err);
        });
      postAction("file/upload", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("报错了：", err);
        });
      // console.log(res);
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    async sendQuery() {
      const res = await postAction(this.urlForZS, this.paramsForZS).catch(
        (err) => {
          console.log("报错了：", err);
        }
      );
      this.$notification["success"]({
        message: "发送成功，返回值看控制台",
      });
      console.log("单独请求返回值：", res);
    },
    refreshTime() {
      this.nowTime = moment().format("HH:mm:ss");
      requestAnimationFrame(this.refreshTime);
    },
    // refName为点击的id
    solveClick(e) {
      let refName;
      if (e == "/basic") {
        this.$router.push("/basic");
        return;
      } else if (
        e.target.className == "img" ||
        e.target.className == "" ||
        e.target.className == "text"
      ) {
        refName = e.target.parentNode.id;
      } else {
        refName = e.target.id;
      }
      if (refName) {
        this.$refs[refName].$el.style.animation = "animation 0.2s";
        setTimeout(() => {
          this.$refs[refName].$el.style.animation = "";
          if (refName == "anim1") {
            window.open(
              "http://plant3-ui-md.show.wiz.top:9600/#/mdPowerGrid/powerCenter",
              "_self"
            );
          } else if (refName == "anim2") {
            window.open(
              "http://plant3-ui-md.show.wiz.top:9600/#/modelCenter/index",
              "_self"
            );
          } else if (refName == "anim3") {
            window.open(
              "http://plant3-ui-md.show.wiz.top:9600/#/mdPowerGrid/businessExpansionList",
              "_self"
            );
          } else if (refName == "anim4") {
            this.$router.push("/antitheft");
          } else if (refName == "anim5") {
            this.$router.push("/order");
          } else if (refName == "anim6") {
            this.$router.push("/achievements");
          }
        }, 200);
      }
    },
    logOut() {
      this.$store.commit("clearUserInfo", null);
      this.$notification["success"]({
        message: "注销成功",
        duration: 4,
      });
      console.log("与张升测试ISC，在此处修改跳转，如需要改变，直接切换即可！");
      this.$router.push("/overView");
      // this.$router.push("/user/login");
    },
  },
  components: {
    longButton,
    normalButton,
  },
};
</script>

<style lang="less" scoped>
.wrap-overview {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(#294a92, #7389b7);

  .header {
    font-family: "YouYuan";
    padding: 20px 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      color: #fff;
      font-size: 32px;
      font-weight: 300;
    }

    .header-right {
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

  .main {
    padding: 20px 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .main-left-wrap {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;

      .main-left {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .main-center {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .main-right {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .footer {
    width: 100%;
    padding: 20px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(#5e7095, #7785a1);

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

      .footer-right-img {
        background-color: #596686;
        opacity: 0.8;
        position: absolute;
        right: -40px;
        bottom: -20px;
        top: -20px;
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.component {
  width: 350px;
  height: 250px;
  margin: 10px 20px;
}

.anim {
  // position: relative;
  padding: 30px;

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
