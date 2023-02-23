<template>
  <div>
    <a-modal
      v-model="imgmodalVisible"
      :width="600"
      :photos="photos"
      @ok="handleimgOk"
      @cancel="handleimgCancel"
      :footer="null"
    >
      <img class="tupian" :src="modalPhotos" v-if="!isVideo" />
      <video class="tupian" controls v-if="isVideo">
        <source :src="modalPhotos" type="video/mp4" />
      </video>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    imgvisible: {
      type: Boolean,
      required: true,
    },
    photos: {
      type: String
    },
  },
  data () {
    return {
      imgmodalVisible: this.imgvisible,
      isVideo: false,
      modalPhotos: this.photos
    }
  },
  watch: {
    imgvisible (newVal, oldVal) {
      this.imgmodalVisible = newVal
      let len = this.photos.split('.').length
      let name = this.photos.split('.')[len - 1].toLocaleLowerCase()
      let video = this.photos.includes('mp4') || this.photos.includes('avi') || this.photos.includes('MOV')
      if (name != 'jpg' && name != 'jpeg' && name != 'png' && name != '' && video) {
        this.isVideo = true
      }
    },
    photos (newVal, oldVal) {
      immediate: true
      this.modalPhotos = newVal
      const addIsAll = this.modalPhotos.includes('http://1.15.125.141:3007/downloadavatar?name=')
      if (!addIsAll) {
        this.modalPhotos = 'http://1.15.125.141:3007/downloadavatar?name=' + this.modalPhotos
      }
    }
  },
  methods: {
    // 点击
    handleimgOk (e) {
      this.imgmodalVisible = false
    },
    // 点击取消
    handleimgCancel () {
      this.imgmodalVisible = !this.imgmodalVisible
      this.$emit('changeimgModal', false)
    }
  },
}
</script>

<style>
.tupian {
  width: 530px;
}
</style>
