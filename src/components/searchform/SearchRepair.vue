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
              allowClear
            >
            </a-input>
          </a-form-item>
          <!-- 台区编号 -->
          <a-form-item>
            <a-input
              v-decorator="['tgNo', { rules: [{ message: '请输入台区编号' }] }]"
              placeholder="台区编号"
              :style="{ width: '150px' }"
              allowClear
            >
            </a-input>
          </a-form-item>
          <!-- 时间 -->
          <a-form-model-item>
            <a-date-picker
              v-decorator="[
                'workOrderCtime',
                {
                  rules: [{ required: false, message: '请选择日期' }],
                },
              ]"
              valueFormat="yyyy-MM-DD"
              :style="{ width: '150px' }"
              placeholder="请选择日期"
            />
          </a-form-model-item>
          <!-- 台区名称 -->
          <!-- <a-form-item>
						<a-select v-decorator="[
                'powerSupplyUnit',
                { rules: [{ message: '请选择供电单位' }] },
              ]" placeholder="请选择供电单位" :style="{ width: '150px' }" allowClear>
							<a-select-option value="哈克供电营业站"> 哈克供电营业站 </a-select-option>
							<a-select-option value="园丁供电营业站"> 园丁供电营业站 </a-select-option>
							<a-select-option value="光明供电营业站"> 光明供电营业站 </a-select-option>
						</a-select>
					</a-form-item> -->
          <!-- 工单状态 -->
          <a-form-item>
            <a-select
              v-decorator="[
                'errorStetus',
                { rules: [{ message: '请选择异常开关状态' }] },
              ]"
              placeholder="请选择异常开关状态"
              :style="{ width: '150px' }"
              allowClear
            >
              <a-select-option value="分">分</a-select-option>
              <a-select-option value="合">合</a-select-option>
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
          <a-button
            type="primary"
            icon="search"
            html-type="submit"
            style="background-color: #28599d"
            @click="handleSubmit"
            >查询</a-button
          >
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
        name: "searchform",
      }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        this.$emit("formData", values);
        // if (!err) {
        // 	console.log("Received values of form: ", values);
        // }
      });
    },
    handleReset() {
      this.form.resetFields();
      this.$parent.loadData();
    },

    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
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
