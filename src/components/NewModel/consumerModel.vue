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
          <a-collapse-panel key="1" header="联系信息">
            <div
              class="box"
              v-for="(item, key) in ccontactData"
              :key="key + '1'"
            >
              <p class="first">联系类型：{{ item.contactMode }}</p>
              <p class="first">联系人：{{ item.contactName }}</p>
              <p class="first">移动电话：{{ item.mobile }}</p>
            </div>
          </a-collapse-panel>
          <a-collapse-panel header="受电点基础信息" :disabled="false">
            <div class="box">
              <p class="first">受电点名称：{{ cinformationData.spName }}</p>
              <p class="first">电源数目：{{ cinformationData.psNumCode }}</p>
              <p class="first">定价策略：{{ cinformationData.typeCode }}</p>
              <p class="first">
                基本电费计算方式：{{ cinformationData.baCalcMode }}
              </p>
              <p class="first">
                需量核定值：{{ cinformationData.dmdSpecValue }}
              </p>
              <p class="first">
                功率因数考核方式：{{ cinformationData.pfEvalMode }}
              </p>
            </div>
          </a-collapse-panel>
          <!--          <a-collapse-panel header="采集档案" :disabled="false" key="3">
            <div
              class="box"
              v-for="(item, key) in electricityPriceData"
              :key="key + '3'"
            >
              <p class="first">定价策略：{{ item.priceStrategy }}</p>
              <p class="first">基本电费计算方式：{{ item.basicCalMethod }}</p>
              <p class="first">需要核定值：{{ item.deValue }}</p>
              <p class="first">功率因数考核方式：{{ item.assMethod }}</p>
              <p class="first"></p>
              <p class="first"></p>
            </div>
          </a-collapse-panel> -->
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
    ccontactData: {
      type: Array,
      required: true,
    },
    cinformationData: {
      type: Array,
      required: true,
    },
    electricityPriceData: {
      type: Array,
      required: true,
    },
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
      // console.log(this.situation,'asdd')
    },
  },
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

.word {
  font-size: 16px;
  color: #000;
  font-weight: 600;
}

.first {
  width: 33%;
}

.box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
