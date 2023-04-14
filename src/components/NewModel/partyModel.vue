<template>
  <div>
    <!-- 弹窗 -->

    <a-modal
      v-model="modalVisible"
      @cancel="handleCancel"
      :width="1100"
      :footer="null"
    >
      <div>
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="基础信息">
            <p class="first">计量点容量：{{ basics.mpCap }}</p>
            <p class="first">电压等级：{{ basics.voltCode }}</p>
            <p class="first">计算方式：{{ basics.calcMode }}</p>
            <p class="first">定比扣减方式：{{ basics.frDeductFlag }}</p>
            <p class="first">计量方式：{{ basics.measMode }}</p>
            <p class="first">变损分摊标志：{{ basics.tlshareFlag }}</p>
            <p class="first">线损计费标志：{{ basics.llBillFlag }}</p>
            <p class="first">线损分摊标志：{{ basics.llshareFlag }}</p>
            <p class="first">定比定量值：{{ basics.fqrValue }}</p>
            <p class="first">变损计费标志：{{ basics.tlBillFlag }}</p>
            <p class="first">线损计算方式：{{ basics.llCalcMode }}</p>
            <p class="first">计量点状态：{{ basics.statusCode }}</p>
            <p class="first">台区编号：{{ basics.tgNo }}</p>
            <p class="first">台区名称：{{ basics.tgName }}</p>
            <p class="first">线路编号：{{ basics.lineNo }}</p>
            <p class="first">线路名称：{{ basics.lineName }}</p>
            <p class="first">接线方式：{{ basics.wiringMode }}</p>
            <p class="first">市场化类型：{{ basics.marketType }}</p>

            <!-- <p class="first">变损分摊标志：{{ basics.tlShareFlag }}</p>
						<p class="first">线损计费标志：{{ basics.llBillFlag }}</p>
						<p class="first">线损分摊标志：{{ basics.llShareFlag }}</p>
						<p class="first">计量点地址：{{ basics.mpAddr }}</p> -->
          </a-collapse-panel>
          <a-collapse-panel header="计费关系" :disabled="false" key="2">
            <div class="box" v-for="(item, key) in mpNo" :key="key + '2'">
              <p class="two">关系分类：{{ item.relaSortCode }}</p>
              <p class="two">计量点：{{ item.mpName }}</p>
              <p class="two">计量点编号：{{ item.mpId }}</p>
              <p class="two">用电客户：{{ item.consName }}</p>
              <p class="two">关系比例值：{{ item.relaRatio }}</p>
              <p class="two">用户编号：{{ item.consNo }}</p>
              <p class="two">相关计量点计量方向：{{ item.mpDirectionCode }}</p>
              <p class="two"></p>
            </div>
          </a-collapse-panel>
          <!-- <a-collapse-panel header="采集档案" :disabled="false" key="3">
						<div class="box" v-for="(item, key) in rCpmpNo" :key="key + '3'">
							<p class="two">终端地址码：{{ item.terminalAddr }}</p>
							<p class="two">终端类型：{{ item.terminalTypeCode }}</p>
							<p class="two">通信规约：{{ item.protocolCode }}</p>
							<p class="two">生产厂家：{{ item.factoryCode }}</p>
							<p class="two"></p>
							<p class="two"></p>
						</div>
					</a-collapse-panel> -->
          <a-collapse-panel header="电能表档案" :disabled="false" key="4">
            <div class="box" v-for="(item, key) in dMeter" :key="key + '4'">
              <p class="first">资产编号：{{ item.assetNo }}</p>
              <p class="first">综合倍率：{{ item.tfactor }}</p>
              <p class="first">是否参考表：{{ item.refMeterFlag }}</p>
              <p class="first">额定电压：{{ item.voltCode }}</p>
              <p class="first">标定电流：{{ item.ratedCurrent }}</p>
              <p class="first">有功准确度等级：{{ item.apPreLevelCode }}</p>
              <p class="first">无功准确度等级：{{ item.rpPreLevelCode }}</p>
              <p class="first">接线方式：{{ item.wiringMode }}</p>
              <p class="first">接入方式：{{ item.conMode }}</p>
              <p class="first">制造单位：{{ item.manufacturer }}</p>
              <p class="first">通信规约：{{ item.commProtCode }}</p>
              <!-- <p class="first">终端地址码：{{ item.terminalAddr }}</p>
              <p class="first">终端关型：{{ item.terminalTypeCode }}</p> -->
              <p class="first"></p>
            </div>
          </a-collapse-panel>
          <a-collapse-panel header="互感器档案" :disabled="false" key="5">
            <div class="box" v-for="(item, key) in sItScheme" :key="key + '5'">
              <p class="first">资产编号：{{ item.assetNo }}</p>
              <p class="first">类别：{{ item.sortCode }}</p>
              <p class="first">额定电流变比：{{ item.rcRatioCode }}</p>
              <p class="first">在用电流变比：{{ item.currentRatioCode }}</p>
              <p class="first">可变变比：{{ item.chgRatioCode }}</p>
              <p class="first">TA准确度等级：{{ item.tvPreCode }}</p>
              <p class="first">制造单位：{{ item.manufacturer }}</p>
              <p class="first"></p>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "NewModel",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    basics: Object,
    mpNo: Array,
    rCpmpNo: Array,
    dMeter: Array,
    sItScheme: Array,
  },
  data() {
    return {
      modalVisible: false,
      activeKey: ["1"],
    };
  },
  watch: {
    // 弹窗现场情况
    async visible(val, valOld) {
      this.modalVisible = val;
    },
  },
  mounted() {},
  methods: {
    // 点击
    handleOk(e) {
      this.modalVisible = false;
    },
    // 点击取消
    handleCancel() {
      this.modalVisible = !this.modalVisible;
      this.$emit("changeModal", false);
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  margin-bottom: 30px;
}

.oneTop {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;

  span {
    width: 25%;
  }
}

.first {
  width: 25%;
}

.two {
  width: 33%;
}

/deep/ .ant-collapse-content-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
