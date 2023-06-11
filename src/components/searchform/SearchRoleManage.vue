<template>
  <div class="warp">
    <a-form layout="inline" :form="form" @submit="handleSubmit" class="form">
      <div class="formRegion">
        <div class="rowOne">
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                { rules: [{ message: '请输入用户名称' }] },
              ]"
              placeholder="用户名称"
              :style="{ width: '150px' }"
              allowClear
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-select
              v-decorator="[
                'isRole',
                {
                  rules: [
                    {
                      type: 'array',
                      message: '请选择角色权限',
                      trigger: 'blur',
                    },
                  ],
                },
              ]"
              placeholder="请选择角色权限"
              :style="{ minWidth: '150px' }"
              allowClear
              mode="multiple"
            >
              <a-select-option value="1">台区经理</a-select-option>
              <a-select-option value="2">所站长</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-cascader
              v-decorator="[
                'orgNo',
                {
                  rules: [{ required: false, message: '请选择供电单位' }],
                },
              ]"
              :options="cascaderOptions"
              :style="{ minWidth: '150px' }"
              placeholder="请选择供电单位"
              allowClear
              @change="orgNoSelected"
              changeOnSelect
            ></a-cascader>
          </a-form-item>
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
import { getAllStation } from '@/api/order.js'
export default {
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'searchform'
      }),
      cascaderOptions: []
    }
  },
  mounted() {
    getAllStation().then((res) => {
      this.cascaderOptions = res
    })
    this.$nextTick(() => {
      this.form.validateFields()
      this.handleSubmit()
    })
  },
  methods: {
    handleSubmit(e) {
      e && e.preventDefault()
      this.form.validateFields((err, values) => {
        // values.status = values.status.join(',')
        // values.orgNo = values.orgNo ? values.orgNo.slice(-1)[0] : values.orgNo
        this.$emit('formData', values)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleReset() {
      this.form.resetFields()
      this.handleSubmit()
    },
    // 管理单位选择
    orgNoSelected(_, selectedOptions) {
      const item = selectedOptions.pop()
      if (item.children && item.children.length > 0) {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            orgNo: [item.value]
          })
        })
      }
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
      align-self: baseline;
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
