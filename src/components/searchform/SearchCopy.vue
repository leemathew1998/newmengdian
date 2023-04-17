<template>
  <div class="warp">
    <a-form layout="inline" :form="form" @submit="handleSubmit" class="form">
      <div class="formRegion">
        <div class="rowOne">
          <!-- 工单编号 -->
          <a-form-item>
            <a-input
              v-decorator="[
                'consNo',
                { rules: [{ message: '请输入工单用户户号' }] },
              ]"
              placeholder="工单用户户号"
              :style="{ width: '150px' }"
              allowClear>
            </a-input>
          </a-form-item>
          <!-- 台区编号 -->
          <a-form-item>
            <a-input
              v-decorator="[
                'consName',
                { rules: [{ message: '请输入工单用户户名' }] },
              ]"
              placeholder="工单用户户名"
              :style="{ width: '150px' }"
              allowClear>
            </a-input>
          </a-form-item>
          <!-- 时间 -->
          <a-form-model-item>
            <a-date-picker
              v-decorator="[
                'workOrderCtime1',
                {
                  rules: [{ required: false, message: '请选择日期' }],
                },
              ]"
              valueFormat="yyyy-MM-DD"
              :style="{ width: '150px' }"
              placeholder="请选择日期" />
          </a-form-model-item>
          <!-- 工单状态 -->
          <a-form-item>
            <a-select
              v-decorator="[
                'workOrderStatus',
                {
                  initialValue: ['1', '2', '3'],
                  rules: [
                    {
                      type: 'array',
                      message: '请选择工单状态',
                      trigger: 'blur',
                    },
                  ],
                },
              ]"
              placeholder="请选择工单状态"
              :style="{ minWidth: '150px' }"
              allowClear
              mode="multiple">
              <a-select-option value="1">待处理</a-select-option>
              <a-select-option value="2">处理中</a-select-option>
              <a-select-option value="3">待归档</a-select-option>
              <a-select-option value="4">已归档</a-select-option>
            </a-select>
          </a-form-item>
          <!-- 工单编号 -->
          <!-- <a-form-item>
						<a-input v-decorator="[
                'workOrderNo',
                { rules: [{ message: '请输入用户名称' }] },
              ]" placeholder="请输入用户名称" :style="{ width: '150px' }" allowClear>
						</a-input>
					</a-form-item> -->
          <!-- 开始时间 -->
          <!-- <a-form-item>
						<a-range-picker v-decorator="['synchro_time']" :style="{ width: '230px' }" @change="onChange"
							allowClear />
					</a-form-item> -->
          <!-- 结束时间 -->
        </div>
      </div>

      <div class="buttonRegion">
        <a-form-item>
          <a-button type="primary" icon="search" html-type="submit" @click="handleSubmit">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button icon="reload" @click="handleReset"> 重置 </a-button>
        </a-form-item>
      </div>

      <a-form-item>
        <slot name="import"></slot>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'searchform'
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields()
      this.handleSubmit()
    })
  },
  methods: {
    handleSubmit(e) {
      e && e.preventDefault()
      this.form.validateFields((err, values) => {
        values.workOrderStatus = values.workOrderStatus.join(',')
        this.$emit('formData', values)
        if (err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleReset() {
      this.form.resetFields()
      this.handleSubmit()
    },

    onChange(date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>

<style lang="less" scoped>
.warp {
  .form {
    display: flex;
    width: 100%;

    .formRegion {
      flex: 5;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
    }

    .buttonRegion {
      flex: 1;
      align-self: baseline;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.ant-form,
.ant-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/ .ant-btn-primary {
  background-color: rgb(40, 89, 157);
  border-color: rgb(40, 89, 157);
}
</style>
