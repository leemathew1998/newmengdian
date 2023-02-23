<template>
  <!-- 导入、导出 -->
  <a-modal
    v-model="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="700"
    :footer="null"
  >
    <!-- <template slot="footer">
			<a style="float: left; " v-show="progress==0" @click="showImport">{{showImportLog?'返回':'导入记录'}}</a>
			<a-button @click="handleBack" v-show="progress!=0">
				上一步
			</a-button>
			<a-button @click="reUpload" v-show="exceptionShow">
				重新上传
			</a-button>
			<a-button key="submit" type="primary" @click="handleOk" ref="poplocation">
				{{mainButtonText}}
			</a-button>
		</template> -->
    <!-- <div class="modalwarp">
			<a-steps progress-dot :current="progress">
				<a-step title="上传采集未接入数据" />
				<a-step title="上传采集异常数据" />
				<a-step title="上传采集失败数据" />
				<a-step title="导入完成" />
			</a-steps>

			<a-upload class="upload" name="file" :custom-request="fileHandleChange"
				v-show="progress==0&&!exceptionShow&&!showImportLog">
				<div class="left"></div>
				<div class="right">
					<div style="font-weight: 700;">上传采集未接入数据</div>
					<div style="font-size: 12px;">文件后缀名必须为xml、xls或xlsx（即Excel格式），文件大小不得大于100M，最多支持导入500条数据</div>
					<div style="color: #3F9FFF;">{{filename==''?"上传文件":filename+' '+fileSize}}</div>
				</div>
			</a-upload>
			<div class="footer" v-show="progress==0&&!exceptionShow&&!showImportLog">
				<div>特别提示</div>
				<div>导入之前请核对离线文件是否与导入业务相对应。</div>
			</div>
			<Table :columns="columns" :data="data" v-show="progress==1">
			</Table>
			<a-table style="width: 100%;" :columns="columns" :data-source="data" v-show="showImportLog">
			
			</a-table>
			<a-progress :percent="progressPercent" v-show="progress==2" :status="progressStatus" />
			<div v-show="progress==3">
				<div style="font-weight: 700; font-size: 24px;">数据导入完成</div>
				<div>您已成功导入{{count}}条数据</div>
			</div>
			<div class="exception" v-show="exceptionShow" style="width: 100%;">
				<div class="top">
					<div class="left"></div>
					<div class="right">
						<div style="font-weight: 700;">正常数据条数：<span style="color: green;">{{count}}条</span></div>
						<div style="font-weight: 700;">异常数据条数：<span style="color: red;">{{failCount}}条</span></div>
					</div>
				</div>
				<div>
					<div v-for="row in exceptionData">{{row}}</div>
				</div>
			</div>


		</div> -->
    <!-- 上传 -->
    <div class="modalwarp">
      <a-steps :current="current">
        <a-step
          v-for="item in steps"
          :key="item.title"
          :title="item.title"
          :current="current"
        />
      </a-steps>
      <div v-if="current == 0">
        <a-upload
          class="upload"
          name="file"
          accept=".xml,.xls,.xlsx"
          action="api"
        >
          <div class="left"></div>
          <div class="right">
            <div style="font-size: 12px; text-align: left">
              文件后缀名必须为xml、xls或xlsx（即Excel格式），文件大小不得大于100M，最多支持导入500条数据
            </div>
            <div style="color: #3f9fff; text-align: left">
              {{ filename == "" ? "上传文件" : filename + " " + fileSize }}
            </div>
          </div>
        </a-upload>
        <div class="footer">
          <div>特别提示</div>
          <div>导入之前请核对离线文件是否与导入业务相对应。</div>
        </div>
      </div>
      <div v-if="current == 1">
        <a-upload
          class="upload"
          name="file"
          accept=".xml,.xls,.xlsx"
          action="api/coll/import"
        >
          <div class="left"></div>
          <div class="right">
            <div style="font-size: 12px; text-align: left">
              文件后缀名必须为xml、xls或xlsx（即Excel格式），文件大小不得大于100M，最多支持导入500条数据
            </div>
            <div style="color: #3f9fff; text-align: left">
              {{ filename2 == "" ? "上传文件" : filename2 + " " + fileSize2 }}
            </div>
          </div>
        </a-upload>
        <div class="footer">
          <div>特别提示</div>
          <div>导入之前请核对离线文件是否与导入业务相对应。</div>
        </div>
      </div>
      <div v-if="current == 2">
        <a-upload
          class="upload"
          name="file"
          accept=".xml,.xls,.xlsx"
          action="api/coll/import"
        >
          <div class="left"></div>
          <div class="right">
            <div style="font-size: 12px; text-align: left">
              文件后缀名必须为xml、xls或xlsx（即Excel格式），文件大小不得大于100M，最多支持导入500条数据
            </div>
            <div style="color: #3f9fff; text-align: left">
              {{ filename3 == "" ? "上传文件" : filename3 + " " + fileSize3 }}
            </div>
          </div>
        </a-upload>
        <div class="footer">
          <div>特别提示</div>
          <div>导入之前请核对离线文件是否与导入业务相对应。</div>
        </div>
      </div>
      <div v-if="current == 3">导入完成</div>
      <div class="steps-action">
        <a-button
          v-if="current > 0 && current < steps.length - 1"
          style="margin-left: 8px"
          @click="prev"
        >
          上一步
        </a-button>

        <a-button v-if="current == steps.length - 1" type="primary" @click="OK">
          完成
        </a-button>
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >
          下一步
        </a-button>
      </div>
    </div>
  </a-modal>
</template>
<script>
var XLSX = require("xlsx")
import Table from "@/components/tables/Table"
import Tables from "@/components/tables/Tables"
export default {
  inject: ['reload'],
  name: 'UploadModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
  },
  data () {
    return {
      modalVisible: false,
      mainButtonText: '下一步',
      progress: 0,
      progressPercent: 0,
      progressStatus: 'active',
      columns: [],
      data: [],
      info: Object,
      filename: '',
      filename2: '',
      filename3: '',
      count: 0,
      failCount: 0,
      buttonShow: false,
      fileSize: '',
      fileSize2: '',
      fileSize3: '',
      exceptionData: [],
      showImportLog: false,
      exceptionShow: false,
      current: 0,
      steps: [
        {
          title: '上传采集未接入数据',
          content: '上传采集未接入数据',
        },
        {
          title: '上传采集异常数据',
          content: '上传采集异常数据',
        },
        {
          title: '上传采集失败数据',
          content: '上传采集失败数据',
        },
        {
          title: '导入完成',
          content: '导入完成',
        },
      ],
    }
  },
  components: {
    Table,
    Tables
  },
  watch: {
    visible (val, valOld) {
      this.modalVisible = val
    }
  },
  methods: {
    handleFileChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info, '123')
        this.readFile(info.file)
      }
    },
    readFile (file) {
      let that = this
      let reader = new FileReader()
      reader.onload = function (e) {
        let wb = XLSX.read(e.target.result, {
          type: "binary"
        }) // 读取文件
        let wbSheetName = wb.SheetNames[0]
        const wbSheet = wb.Sheets[wbSheetName]
        let selectFileData = XLSX.utils.sheet_to_json(wbSheet, {
          defval: ""
        })
        let title = XLSX.utils.sheet_to_json(wbSheet, {
          header: 1,
          defval: ""
        })

        for (let i = 0; i < selectFileData.length; i++) {
          delete selectFileData[i].__EMPTY
          delete selectFileData[i].__EMPTY_1
          delete selectFileData[i].__EMPTY_2
          delete selectFileData[i].__EMPTY_3
          selectFileData[i].key = i
          that.data.push(selectFileData[i])
        }

        for (let i = 0; i < selectFileData.length; i++) {
          let flag = false
          title[0].map((item) => {
            if (selectFileData[i][item] == '') {
              !flag ? that.failCount = that.failCount + 1 : ''
              flag = true
              that.exceptionData.push(
                `第${i + 1}行:【${item}】字段为空!`
              )
            }
          })
        }
        that.count = selectFileData.length
        title[0].map((item) => {
          if (item != '') {
            that.columns.push({
              'title': item,
              'dataIndex': item,
              'ellipsis': true,
            })
          }

        })
      }
      reader.readAsBinaryString(file)
    },

    fileHandleChange (info) {
      if (['xlsx', 'xml', 'xls'].indexOf(info.file.name.split('.')[1]) == -1) {
        this.$message.error(`${info.file.name} 文件格式不正确！，请导入xml、xlsx、xls等类型文件！`)
      } else {
        this.handleFileChange(info)
        this.filename = info.file.name
        this.info = info
        let SIZE = info.file.size / 1000
        let division = 1
        while (SIZE > 1000) {
          division = division + 1
          SIZE = SIZE / 1000
        }
        division == 1 ? this.fileSize = Math.floor(SIZE * 100) / 100 + 'KB' : this.fileSize = Math.floor(SIZE *
          100) / 100 + 'MB'

        this.buttonShow = true

      }
    },
    fileHandleChange2 (info) {
      if (['xlsx', 'xml', 'xls'].indexOf(info.file.name.split('.')[1]) == -1) {
        this.$message.error(`${info.file.name} 文件格式不正确！，请导入xml、xlsx、xls等类型文件！`)
      } else {
        this.handleFileChange(info)
        this.filename2 = info.file.name
        this.info = info
        let SIZE = info.file.size / 1000
        let division = 1
        while (SIZE > 1000) {
          division = division + 1
          SIZE = SIZE / 1000
        }
        division == 1 ? this.fileSize2 = Math.floor(SIZE * 100) / 100 + 'KB' : this.fileSize2 = Math.floor(SIZE *
          100) / 100 + 'MB'

        this.buttonShow = true

      }
    },
    fileHandleChange3 (info) {
      if (['xlsx', 'xml', 'xls'].indexOf(info.file.name.split('.')[1]) == -1) {
        this.$message.error(`${info.file.name} 文件格式不正确！，请导入xml、xlsx、xls等类型文件！`)
      } else {
        this.handleFileChange(info)
        this.filename3 = info.file.name
        this.info = info
        let SIZE = info.file.size / 1000
        let division = 1
        while (SIZE > 1000) {
          division = division + 1
          SIZE = SIZE / 1000
        }
        division == 1 ? this.fileSize3 = Math.floor(SIZE * 100) / 100 + 'KB' : this.fileSize3 = Math.floor(SIZE *
          100) / 100 + 'MB'

        this.buttonShow = true

      }
    },
    handleCancel () {
      this.closeModal()
    },
    showImport () {
      this.showImportLog = !this.showImportLog
      // 请求数据
      if (this.showImportLog) {
        this.columns = [{
          title: "姓名",
          dataIndex: "name",
        },
        {
          title: "部门",
          dataIndex: "department",
        },
        {
          title: "职务",
          dataIndex: "job",
        },
        {
          title: "导入数据（条）",
          dataIndex: "count",
        },
        {
          title: "导入时间",
          dataIndex: "time",
        }
        ]

        this.data = [{
          key: 0,
          name: `刘启庆`,
          department: `x x x x x部`,
          job: `计量采集`,
          count: '12',
          time: '2022-05-25 12:33:22'
        }, {
          key: 1,
          name: `刘启xs庆`,
          department: `x xsx x x x部`,
          job: `计量xs采集`,
          count: '1xs2',
          time: '2022-05-25 12:33:22'
        },]
      } else {
        this.columns = []
        this.data = []
      }
    },

    reUpload () {
      this.progress = 0
      this.filename = ''
      this.filename2 = ''
      this.filename3 = ''
      this.buttonShow = false
      this.progressPercent = 0
      this.columns = []
      this.data = []
      this.exceptionShow = false
      this.failCount = 0
      this.exceptionData = []
      this.showImportLog = false
      this.mainButtonText = '下一步'
      this.info = null
    },
    closeModal () {
      this.modalVisible = !this.modalVisible
      this.$emit("changeModal", false)
      this.progress = 0
      this.filename = ''
      this.filename2 = ''
      this.filename3 = ''
      this.buttonShow = false
      this.progressPercent = 0
      this.columns = []
      this.data = []
      this.failCount = 0
      this.exceptionShow = false
      this.exceptionData = []
      this.showImportLog = false
      this.mainButtonText = '下一步'
      this.info = null
    },
    handleBack () {
      this.progress = this.progress - 1
    },
    OK () {
      this.modalVisible = false
      this.reload()
      // window.location.reload();
    },
    async handleOk (e) {
      this.progress = this.progress + 1
      console.log('111')
      if (this.progress == 2) {
        setTimeout(() => {
          this.progressPercent = 50
        }, 500)
        setTimeout(() => {
          this.progressPercent = 100
          this.progress = this.progress + 1
          this.mainButtonText = '完成'
        }, 1000)

        // let formData = new FormData()
        // formData.append('file', this.info.file)
        // const res = await postAction('/excel/upload', formData)
        // this.$message.success(`${info.file.name} file uploaded successfully`);
        // console.log(res.data);
      } else if (this.progress == 1) {
        if (!this.info.file) {
          this.progress = this.progress - 1
          this.$message.error('请上传文件！')
        }
        if (this.failCount && !this.exceptionShow) {
          this.progress = this.progress - 1
          this.exceptionShow = true
        } else {
          this.exceptionShow = false
        }
      } else if (this.progress == 4) {
        this.closeModal()
      }



    },
    next () {
      this.current++
      // this.reload()
    },
    prev () {
      this.current--
    },
    // 局部刷新
    newpay () {
      this.reload()
    }
  },
};
</script>


<style lang="less" scoped>
.modalwarp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // position: relative;
  .exception {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      border: 1px solid #f5f5f5;

      .left {
        // flex: 1;
        height: 100px;
        width: 80px;
        background-color: #f5f5f5;
      }

      .right {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }

  .upload {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    border: 1px solid #f5f5f5;

    &:hover {
      cursor: pointer;
    }

    .left {
      // flex: 1;
      height: 100px;
      width: 80px;
      background-color: #f5f5f5;
    }

    .right {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .footer {
    background-color: #fef5e6;
    border-radius: 5px;
    margin-top: 40px;
    padding: 20px 50px;
    width: 100%;
  }

  .pop {
    position: absolute;
  }
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
  .button {
    margin-right: 10px;
  }
}
</style>
