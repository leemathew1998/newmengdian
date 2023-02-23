<template>
  <div class="warp">
    <iframe
      src="http://plant3-ui-md.show.wiz.top:9600/#/mdPowerGrid/businessExpansionList?fromOrigin=otherSystem&projectName=%E8%92%99%E4%B8%9C%E5%8F%B0%E5%8C%BA%E7%B2%BE%E7%BB%86%E5%8C%96&RelyUserId=bc4ba096-ac22-4f68-b43d-9499679ede7a"
      id="mobsf"
      scrolling="no"
      frameborder="0"
      style="
        position: absolute;
        top: 85px;
        left: 75px;
        right: 0px;
        bottom: 0px;
      "
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {},
  created() {},
   mounted(){
            /**
            * iframe-宽高自适应显示   
            */
            function changeMobsfIframe(){
                const mobsf = document.getElementById('mobsf');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                mobsf.style.width = (Number(deviceWidth)-75) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)-85) + 'px'; //数字是页面布局高度差
            }

            changeMobsfIframe()

            window.onresize = function(){
                changeMobsfIframe()
            }
        },
  methods: {},
};
</script>

<style lang="less" scoped>
.warp {
  display: flex;
  flex-direction: column;

  .form {
    // width: 90%;
    margin: 10px 0;
  }
}
</style>
