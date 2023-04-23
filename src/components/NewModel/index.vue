<template>
  <div>
    <!-- 弹窗 -->
    <a-modal
      v-model="modalVisible"
      @ok="handleOk"
      @cancel="handleCancel"
      :width="1100"
      :title="name"
      :okText="name"
      :footer="null"
    >
      <!-- 详情 -->
      <div class="details">
        <div class="top">
          <div class="head">
            <span
              style="
                font-size: 16px;
                font-weight: 600;
                color: #000;
                line-height: 50px;
              "
            >原始数据</span
            >
          </div>
          <!-- 原始数据展示 -->
          <div class="center">
            <div
              class="one"
              v-for="(item, key) in dictionary"
              :key="key"
              :style="{
                display: needToFix.includes(item.name) ? 'none' : 'block',
              }"
            >
              <a-popover
                :title="popoverData.title"
                @click="clickTheList"
                v-if="needToClick.includes(item.name)"
                trigger="click"
                placement="bottom"
              >
                <template slot="content" v-if="item.name == 'pilsonFormula'">
                  <div v-for="(value, key) in popoverData.value" :key="value">
                    <span class="key">{{ key }}：</span>
                    <span class="value">{{ value }}</span>
                  </div>
                </template>
                <template
                  slot="content"
                  v-if="
                    item.name == 'timeCalculation' ||
                      item.name == 'phaseCalculation'
                  "
                >
                  <a-table
                    :columns="
                      item.name == 'timeCalculation'
                        ? popoverData1.value.columns
                        : popoverData2.value.columns
                    "
                    :data-source="
                      item.name == 'timeCalculation'
                        ? popoverData1.value.data
                        : popoverData2.value.data
                    "
                    :pagination="false"
                  >
                  </a-table>
                </template>
                <div v-if="!needToFix.includes(item.name)">
                  <span class="key">{{ item.label }}：</span>
                  <span :class="['value', item.name]">{{
                    NewModelData[item.name]
                  }}</span>
                </div>
              </a-popover>
              <div
                v-if="
                  !needToFix.includes(item.name) &&
                    !needToClick.includes(item.name)
                "
              >
                <span class="key">{{ item.label }}：</span>
                <span :class="['value', item.name]">{{
                  NewModelData[item.name]
                }}</span>
              </div>
            </div>

            <div
              class="two"
              v-for="(item, key) in dictionary"
              :key="'abc' + key"
              :style="{
                display: needToFix.includes(item.name) ? 'block' : 'none',
              }"
            >
              <div v-if="needToFix.includes(item.name)">
                <span class="key">{{ item.label }}：</span>
                <span :class="['value', item.name]">{{
                  NewModelData[item.name]
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 进度 -->
      <div class="schedule">
        <div class="center">
          <div class="head">
            <span>工单进度</span>
          </div>
          <div class="middle">
            <a-steps :current="progress.progress">
              <a-popover slot="progressDot" slot-scope="{ status, prefixCls }">
                <template slot="content">
                  <span
                  >状态:
                    {{
                      status == "finish"
                        ? "处理中"
                        : status == "wait"
                          ? "已归档"
                          : "待归档"
                    }}</span
                  >
                </template>
                <span :class="`${prefixCls}-icon-dot`" />
                <!-- 工单状态步骤条 -->
              </a-popover>
              <a-step title="待处理" :description="progress.stepOne" />
              <a-step title="处理中" :description="progress.stepTwo" />
              <a-step title="待归档" :description="progress.stepThree" />
              <a-step title="已归档" :description="progress.stepFour" />
            </a-steps>
          </div>
        </div>
      </div>
      <!-- 记录 -->
      <div class="record">
        <div class="center">
          <div class="head">
            <span>现场记录</span>
          </div>
          <div class="middle">
            <div
              class="header"
              v-for="(item, key) in situation"
              :key="key + '1'"
            >
              <div class="blue"></div>
              <span>{{ item.pStatus }}</span>
              <span>{{ item.pTime }}</span>
            </div>
          </div>
          <div
            class="last"
            v-for="(item, index) in situation"
            :key="`situation-${index}`"
          >
            <div class="left">
              <div class="world">
                <span>现场情况说明： </span>
              </div>
              <div class="describe" style="padding-top: 20px">
                <span>
                  {{ item.liveSituation }}
                </span>
              </div>
            </div>
            <div class="right">
              <div class="world">
                <span>现场情况： </span>
              </div>
              <div v-if="item.livePhotos.length" class="imageList">
                <div
                  style="padding-top: 20px; margin-left: 10px"
                  v-for="(photo, index) in item.livePhotos"
                  :key="`livePhotos-${index}`"
                >
                  <img
                    :src="photo"
                    width="100px"
                    height="100px"
                    class="logo"
                    alt="logo"
                  />
                  <a-button
                    type="primary"
                    @click="showModal2(photo)"
                  >查看图片</a-button
                  >
                </div>
                <ImgModel
                  :imgvisible="ImgModalVisible"
                  @changeimgModal="ImgModalVisible = !ImgModalVisible"
                  :photos="photos"
                ></ImgModel>
              </div>
              <div v-else-if="item.liveVideo.length" class="imageList">
                <div style="padding-top: 20px; margin-left: 10px">
                  <video
                    :src="item.liveVideo[0]"
                    width="100px"
                    height="100px"
                    class="logo"
                  ></video>
                  <a-button
                    type="primary"
                    @click="showModal2(item.liveVideo[0])"
                  >查看视频</a-button
                  >
                </div>
                <ImgModel
                  :imgvisible="ImgModalVisible"
                  @changeimgModal="ImgModalVisible = !ImgModalVisible"
                  :photos="photos"
                ></ImgModel>
              </div>
              <div v-else>
                <a-empty />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import ImgModel from '@/components/ImgModel/index'
import {
  getAction,
  postAction
} from '@/api/manage'
export default {
  name: 'NewModel',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    newModelData: Object,
    // modalName: {
    // 	type: String,
    // 	default: ""
    // },
    situation: {
      type: Array
      // required: true
      // default: [{ livePhotos: [] }]
    },
    dictionary: {
      required: true,
      type: Array
    },
    progress: {
      type: Object,
      required: true
    },
    name: {
      required: true,
      type: String
    }
  },
  components: {
    ImgModel
  },
  data () {
    return {
      modalVisible: false,
      ImgModalVisible: false,
      photos: '',
      needToFix: [],
      needToClick: ['pilsonFormula', 'timeCalculation', 'phaseCalculation'],
      popoverData: {
        title: null,
        value: {}
      },
      // 分时
      popoverData1: {
        title: '分时计算',
        value: {
          columns: [],
          data: []
        }
      },
      // 分相
      popoverData2: {
        title: '分相计算',
        value: {
          columns: [],
          data: []
        }
      }
    }
  },
  watch: {
    // 弹窗现场情况
    visible (nval, oval) {
      immediate: true
      this.modalVisible = nval
      console.log(nval, oval)
      if (this.name === '优质服务') {
        this.needToFix = ['acceptedContent', 'relationLocation']
      } else if (this.name === '电费补抄') {
        this.needToFix = ['dfbcGdUseraddress', 'dfbcGdUsername', 'dfbcGdCode', 'dfbcGdZcid',
          'dfbcGdUsername'
        ]
      } else if (this.name === '电费回收') {
        this.needToFix = ['userName', 'userLocation']
      } else if (this.name === '计量运维') {
        this.needToFix = ['elecmeterAssetNum', 'platformName', 'workOrderNo', 'userAdd', 'elecmeterCode',
          'userName', 'terminalFactory', 'elecmeterFactory'
        ]
      } else if (this.name === '采集运维') {
        this.needToFix = ['elecmeterAssetNum', 'platformName', 'terminalFactory', 'terAssetNo',
          'elecmeterFactory', 'userName', 'userElecAdd'
        ]
      } else if (this.name === '费控复电') {
        this.needToFix = ['elecmeterAssetNum', 'terminalLocation', 'userLocation']
      } else if (this.name === '线损治理') {
        this.needToFix = ['elecmeterAssetNum']
      } else if (this.name === '反窃查违') {
        this.needToFix = ['powerConsumption']
      }
    }
  },
  methods: {
    loaMore (name) {
      // 此处写下拉展示函数
      for (let i = 0; i < this.needToFix.length; i++) {
        if (this.needToFix[i] === name) {
          this.needToFix.splice(i, 1)
        }
      }
    },
    showModal () {
      this.modalVisible = true
    },
    // 点击
    handleOk (e) {
      this.modalVisible = false
    },
    // 点击取消
    handleCancel () {
      // this.modalVisible = !this.modalVisible
      this.modalVisible = false
      this.$emit('changeModal', false)
    },
    // 点击按钮放大图片
    showModal2 (e) {
      this.photos = e
      this.ImgModalVisible = true
    },
    // 为线损中皮尔逊公式适配
    async pilsonFormula () {
      this.popoverData = {
        title: null,
        value: {}
      }
      const res1 = await postAction('/lineloss/pearson?tgId=' + this.NewModelData.tgId)
      console.log('pearson', res1)

      for (let key in res1) {
        this.popoverData.value[key] = res1[key]
      }
      this.popoverData.title = '皮尔逊公式'
    },
    async timeCalculation () {
      this.popoverData1 = {
        title: '分时计算',
        value: {
          columns: [],
          data: []
        }
      }
      const res = await postAction('/lineloss/split?tgId=' + this.NewModelData.tgId)
      this.popoverData1.value.columns.push({
        dataIndex: 'index',
        key: '时间段',
        title: '时间段'
      })
      console.log('split', res)
      for (let i = 0; i < 4; i++) {
        this.popoverData1.value.columns.push({
          dataIndex: `time${i + 1}`,
          key: res[i].timeSlot,
          title: res[i].timeSlot
        })
      }
      let data = [{
        name: '供电量',
        value: 'ppq'
      }, {
        name: '售电量',
        value: 'tgSpq'
      }, {
        name: '损耗电量',
        value: 'lossPq'
      }, {
        name: '线损率',
        value: 'linelossRate'
      }]
      for (let i = 0; i < data.length; i++) {
        this.popoverData1.value.data.push({
          'index': data[i].name,
          'time1': res[0][data[i].value],
          'time2': res[1][data[i].value],
          'time3': res[2][data[i].value],
          'time4': res[3][data[i].value]
        })
      }
    },
    async phaseCalculation () {
      this.popoverData2 = {
        title: '分相计算',
        value: {
          columns: [],
          data: []
        }
      }
      const res = await postAction('/lineloss/split?tgId=' + this.NewModelData.tgId)
      console.log('split', res)
      let data = [{
        name: '供电量',
        value: 'ppq'
      }, {
        name: '售电量',
        value: 'tgSpq'
      }, {
        name: '损耗电量',
        value: 'lossPq'
      }, {
        name: '线损率',
        value: 'linelossRate'
      }]
      this.popoverData2.value.columns.push({
        dataIndex: 'index',
        key: '相位',
        title: '相位'
      })
      for (let i = 0; i < data.length; i++) {
        this.popoverData2.value.columns.push({
          dataIndex: data[i].value,
          key: data[i].value,
          title: data[i].name
        })
      }
      for (let i = 4; i < 7; i++) {
        this.popoverData2.value.data.push({
          'index': `${i == 4 ? 'A相' : (i == 5 ? 'B相' : 'C相')}`,
          'ppq': res[i].ppq,
          'tgSpq': res[i].tgSpq,
          'lossPq': res[i].lossPq,
          'linelossRate': res[i].linelossRate
        })
      }
    },
    clickTheList (e) {
      if (e.target.classList[1] == 'pilsonFormula') {
        this.pilsonFormula()
      } else if (e.target.classList[1] == 'timeCalculation') {
        this.timeCalculation()
      } else if (e.target.classList[1] == 'phaseCalculation') {
        this.phaseCalculation()
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 单独适配一些元素
.pilsonFormula {
  color: #169bd5;
  cursor: pointer;
}

.timeCalculation {
  color: #169bd5;
  cursor: pointer;
}

.phaseCalculation {
  color: #169bd5;
  cursor: pointer;
}

// 单独适配一些元素,结束

/deep/ .ant-popover-inner-content {
  display: flex;
  flex-direction: column;
}

/deep/ .ant-modal-body {
  padding: 0;
}

/deep/ .ant-modal-header {
  background: #f9f9f9;
}

/deep/ .ant-steps-item-title {
  font-size: 12px;
  font-weight: 400;
}

/deep/ .ant-steps-item-description {
  font-size: 12px;
  color: #ccc;
}

.top {
  width: 100%;

  .head {
    display: flex;
    padding-left: 20px;

    .front {
      display: flex;
      height: 50px;
      align-items: center;

      span {
        line-height: 50px;
        font-size: 16px;
      }

      .yuan {
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: red;
        margin-right: 7px;
      }
    }

    .queen {
      span {
        line-height: 50px;
        font-size: 14px;
      }

      .fang {
        width: 5px;
        height: 11px;
        border: 1px solid red;
        margin-right: 7px;
      }
    }
  }

  .center {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px 0 20px;

    .one {
      width: 25%;
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-right: 10px;

      .key {
        white-space: nowrap;
        display: flex;
        float: left;
        flex-wrap: nowrap;
        font-weight: 700;
      }

      .value {
        word-wrap: normal;
        word-break: break-all;
      }
    }

    .two {
      width: 50%;
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-right: 10px;

      .key {
        white-space: nowrap;
        display: flex;
        float: left;
        flex-wrap: nowrap;
        font-weight: 700;
      }

      .value {
        word-wrap: normal;
        word-break: break-all;
      }
    }
  }
}

.schedule {
  width: 100%;
  margin-top: 5px;

  .center {
    width: 100%;

    .head {
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #f9f9f9;
      height: 50px;
      padding-left: 20px;

      span {
        font-size: 16px;
        font-weight: 600;
        color: #000;
        line-height: 50px;
      }
    }

    .middle {
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
}

.record {
  width: 100%;
  margin-top: 5px;
  padding-bottom: 50px;

  .center {
    width: 100%;

    .head {
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #f9f9f9;
      height: 50px;
      padding-left: 20px;

      span {
        font-size: 16px;
        font-weight: 600;
        color: #000;
        line-height: 50px;
      }
    }

    .middle {
      padding-top: 20px;
      padding-bottom: 30px;

      .header {
        display: flex;
        align-items: center;

        .blue {
          width: 5px;
          height: 15px;
          background: #169bd5;
          margin-right: 20px;
          margin-left: 20px;
        }

        .fang {
          width: 5px;
          height: 8px;
          border: 1px solid #999;
          margin-right: 7px;
        }

        span {
          margin-right: 30px;
        }
      }
    }

    .last {
      width: 100%;
      display: flex;
      padding-left: 60px;

      .left {
        width: 50%;

        .describe {
          width: 80%;
          margin-left: 10px;

          span {
            font-size: 12px;
          }
        }
      }

      .right {
        width: 50%;
      }
    }
  }
}

.fang {
  width: 5px;
  height: 8px;
  border: 1px solid #000;
  margin-right: 7px;
}

.world {
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
  }
}

.original {
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: -10px;

  span {
    line-height: 50px;
  }
}

.imageList {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    width: 100px;
  }
}

.imageList button {
  margin-top: 10px;
  margin-left: 5px;
}

// .imageList img:hover{
// 	transform: scale(3,4.8);
// 	transition: all 0.1s linear;
// 	position: relative;
// 	top: -80px;
// }
// .bigimg{
// 	display: none;
// 	border: 5px solid #c0c0c0;
// 	top:27%;
// 	left: 3%;
// 	width: 90%;
// 	position: absolute;
// }
</style>
