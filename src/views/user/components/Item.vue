<template>
  <div class="wrap" @click="ItemClick" ref="wrap">
    <img
      v-if="imageSrc"
      class="img"
      :src="require('@/assets/Overview/' + copyimageSrc + '.png')"
    />
    <div class="title">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['imageSrc', 'name'],
  data() {
    return {
      copyimageSrc: this.imageSrc
    }
  },
  mounted() {
    // 中心图片切换
    if (!this.imageSrc) {
      this.$refs.wrap.className = 'wrap center-point'
    }
  },
  methods: {
    ItemClick() {
      if (this.imageSrc) {
        if (this.$refs.wrap.className.indexOf('active') !== -1) {
          this.$refs.wrap.className = 'wrap'
          this.copyimageSrc = this.copyimageSrc.slice(0, -2)
        } else {
          this.copyimageSrc += '选中'
          this.$refs.wrap.className = 'wrap active'
          this.$emit('toggleClick', this.imageSrc)
          setTimeout(() => {
            this.$refs.wrap.className = 'wrap'
            this.copyimageSrc = this.copyimageSrc.slice(0, -2)
          }, 3000)
        }
      }
    }
  }
}
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
  background-position: center center !important;
  background-size: contain;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  // width: 18vw;
  // height: 18vw;
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
