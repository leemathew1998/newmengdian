<template>
  <a-modal
    title="修改用户信息"
    :visible="modalVisible"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirm-loading="confirmLoading"
  >
    <a-form
      labelAlign="left"
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item label="门户账号">
        <a-input
          v-decorator="[
            'userName',
            { rules: [{ required: true, message: '请输入门户账号!' }] },
          ]"
          placeholder="请输入门户账号"
        />
      </a-form-item>
      <a-form-item label="真实名称">
        <a-input
          v-decorator="[
            'relaName',
            { rules: [{ required: true, message: '请输入真实姓名!' }] },
          ]"
          placeholder="请输入真实姓名"
        />
      </a-form-item>
      <a-form-item label="掌机登录账号">
        <a-input
          v-decorator="[
            'userName1',
            { rules: [{ required: true, message: '请输入掌机登录账号!' }] },
          ]"
          placeholder="请输入掌机登录账号"
        />
      </a-form-item>
      <a-form-item label="供电单位">
        <a-cascader
          v-decorator="[
            'orgNo',
            {
              rules: [{ required: true, message: '请选择供电单位' }],
            },
          ]"
          :options="cascaderOptions"
          :style="{ minWidth: '150px' }"
          placeholder="请选择供电单位"
          @change="orgNoSelected"
        ></a-cascader>
      </a-form-item>
      <a-form-item label="用户权限">
        <a-select
          v-decorator="[
            'isRole',
            { rules: [{ required: true, message: '请选择用户角色' }] },
          ]"
          placeholder="请选择用户角色"
        >
          <a-select-option value="1">台区经理</a-select-option>
          <a-select-option value="2">所站长</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否为管理员">
        <a-select
          v-decorator="[
            'isManage',
            { rules: [{ required: true, message: '是否为管理员' }] },
          ]"
          placeholder="是否为管理员"
        >
          <a-select-option value="1">是</a-select-option>
          <a-select-option value="0">否</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { getAllStation } from '@/api/order.js'
import { addUser, updateUser } from '@/api/login.js'
export default {
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    selectedRowKeys: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'userForm'
      }),
      cascaderOptions: [
        {
          value: '154212103',
          label: 'nihao'
        },
        {
          value: '154212104',
          label: 'buhao',
          children: [
            {
              value: '15421210401',
              label: 'test'
            }
          ]
        }
      ],
      confirmLoading: false,
      tempSaveSelectOrgNo: {}
    }
  },
  mounted() {
    // getAllStation().then((res) => {
    //   this.cascaderOptions = res
    // })
  },
  watch: {
    modalVisible(newVal) {
      if (newVal) {
        Object.keys(this.selectedRowKeys).forEach((key) => {
          if (key !== 'orgNo') {
            this.form.getFieldDecorator(key, {
              initialValue: this.selectedRowKeys[key],
              preserve: true
            })
          }
        })
        this.form.getFieldDecorator('orgNo', {
          initialValue: this.selectedRowKeys['orgNo']
            ? [this.selectedRowKeys['orgNo']]
            : [],
          preserve: true
        })
      } else {
        this.form.resetFields()
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e && e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (err) {
          this.$notification['error']({
            message: '请填写完整信息！'
          })
          return
        }
        this.confirmLoading = true
        values.relaName = values.userName
        values.orgNo = this.tempSaveSelectOrgNo.value
        // values.orgNo = values.orgNo ? values.orgNo[0] : undefined
        console.log(values)
        let res
        if (values.isAdd) {
          delete values.id
          res = await addUser(values)
        } else {
          res = await updateUser(values)
        }
        this.confirmLoading = false
        this.$notification['success']({
          message: '操作成功',
          description: res
        })
        this.$emit('update:modalVisible', false)
      })
    },
    orgNoSelected(_, selectedOptions) {
      const item = selectedOptions.pop()
      console.log(item)
      this.tempSaveSelectOrgNo = item
      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgName: item ? item.label : ''
        })
      })
    },
    handleCancel(e) {
      this.$emit('update:modalVisible', false)
    }
  }
}
</script>
<style scoped lang="less">
/deep/.ant-form-item {
  display: flex;
  justify-content: center;
}
</style>
