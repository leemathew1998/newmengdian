<template>
  <div class="wrap" @click="ItemClick" ref="wrap">
    <img
      v-if="ImageSrc"
      class="img"
      :src="require('@/assets/Overview/' + copyImageSrc + '.png')"
    />
    <div class="title">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["ImageSrc", "name"],
  data() {
    return {
      copyImageSrc: this.ImageSrc,
    };
  },
  mounted() {
    //中心图片切换
    if (!this.ImageSrc) {
      this.$refs.wrap.className = "wrap center-point";
    }
  },
  methods: {
    ItemClick() {
      if (this.ImageSrc) {
        if (this.$refs.wrap.className.indexOf("active") !== -1) {
          this.$refs.wrap.className = "wrap";
          this.copyImageSrc = this.copyImageSrc.slice(0, -2);
        } else {
          this.copyImageSrc += "选中";
          this.$refs.wrap.className = "wrap active";
          this.$emit("toggleClick", this.ImageSrc);
          setTimeout(() => {
            this.$refs.wrap.className = "wrap";
            this.copyImageSrc = this.copyImageSrc.slice(0, -2);
          }, 3000);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.center-point {
  background: url(../../../assets/Overview/center-point.png) no-repeat !important;
}
.active {
  background: url(../../../assets/Overview/选中.png) no-repeat !important;
}
.wrap {
  background: url(../../../assets/Overview/未选中.png) no-repeat;
  background-position: center !important;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 250px !important;
  height: 250px !important;
  .img {
    width: 50px;
    height: 50px;
    margin-top: -40px;
  }

  .title {
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    margin-top: 70px;
    user-select: none;
  }
}
</style>
