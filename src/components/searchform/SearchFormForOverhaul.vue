<template>
  <div class="warp">
    <a-form layout="inline" :form="form" @submit="handleSubmit" class="form">
      <div class="formRegion">
        <div class="rowOne">
          <!-- 工单编号 -->
          <a-form-item>
            <a-input
              v-decorator="[
                'workOrderNo',
                { rules: [{ message: '请输入工单编号' }] },
              ]"
              placeholder="工单编号"
              :style="{ width: '150px' }"
              allowClear>
            </a-input>
          </a-form-item>
          <!-- 台区名称 -->
          <a-form-item>
            <a-select
              v-decorator="[
                'platform_name',
                { rules: [{ message: '请选择台区' }] },
              ]"
              placeholder="请选择台区"
              :style="{ width: '150px' }"
              allowClear>
              <a-select-option value="male"> 合作1组 </a-select-option>
              <a-select-option value="female"> 合作2组 </a-select-option>
              <a-select-option value="male1"> 合作3组 </a-select-option>
              <a-select-option value="female1"> 合作4组 </a-select-option>
            </a-select>
          </a-form-item>
          <!-- 工单状态 -->
          <a-form-item>
            <a-select
              v-decorator="[
                'work_order_status',
                { rules: [{ message: '请选择工单状态' }] },
              ]"
              placeholder="请选择工单状态"
              :style="{ width: '150px' }"
              allowClear>
              <a-select-option value="male">待处理</a-select-option>
              <a-select-option value="femadle">处理中</a-select-option>
              <a-select-option value="maxle">待归档</a-select-option>
              <a-select-option value="femacdle">已归档</a-select-option>
            </a-select>
          </a-form-item>
          <!-- 工单编号 -->
          <a-form-item>
            <a-input
              v-decorator="[
                'workOrderNo',
                { rules: [{ message: '请输入用户名称' }] },
              ]"
              placeholder="请输入用户名称"
              :style="{ width: '150px' }"
              allowClear>
            </a-input>
          </a-form-item>
          <!-- 开始时间 -->
          <a-form-item>
            <a-range-picker
              v-decorator="['synchro_time']"
              :style="{ width: '230px' }"
              @change="onChange"
              allowClear />
          </a-form-item>
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
			})
		},
		methods: {
			handleSubmit(e) {
				e.preventDefault()

				this.form.validateFields((err, values) => {
					// console.log(values);
					this.$emit('formData', values)
					// if (!err) {
					// 	console.log("Received values of form: ", values);
					// }
				})
			},
			handleReset() {
				this.form.resetFields()
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
</style>
