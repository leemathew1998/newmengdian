<template>
  <a-modal
    :title="selectedRowKeys.isAdd ? '新增用户信息' : '修改用户信息'"
    :visible="modalVisible"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirm-loading="confirmLoading">
    <a-form labelAlign="left" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="门户账号">
        <a-input
          v-decorator="[
            'userName',
            { rules: [{ required: true, message: '请输入门户账号!' }] },
          ]"
          :disabled="selectedRowKeys.disable"
          placeholder="请输入门户账号" />
      </a-form-item>
      <a-form-item label="真实名称">
        <a-input
          v-decorator="[
            'relaName',
            { rules: [{ required: true, message: '请输入真实姓名!' }] },
          ]"
          :disabled="selectedRowKeys.disable"
          placeholder="请输入真实姓名" />
      </a-form-item>
      <a-form-item label="抄表员账号">
        <a-input
          v-decorator="[
            'userName1',
            { rules: [{ required: true, message: '请输入抄表员账号!' }] },
          ]"
          :disabled="localDisable"
          placeholder="请输入抄表员账号" />
      </a-form-item>
      <a-form-item label="抄表员姓名">
        <a-input
          v-decorator="[
            'readName',
            { rules: [{ required: true, message: '请输入抄表员姓名!' }] },
          ]"
          :disabled="localDisable"
          placeholder="请输入抄表员姓名" />
      </a-form-item>
      <a-form-item label="供电单位">
        <a-cascader
          v-decorator="[
            'orgNo',
            {
              rules: [{ required: true, message: '请选择供电单位' }],
            },
          ]"
          :disabled="selectedRowKeys.disable"
          :options="cascaderOptions"
          :style="{ minWidth: '150px' }"
          placeholder="请选择供电单位"
          @change="orgNoSelected"
          changeOnSelect></a-cascader>
      </a-form-item>
      <a-form-item label="用户权限">
        <a-select
          v-decorator="[
            'isRole',
            { rules: [{ required: true, message: '请选择用户角色' }] },
          ]"
          :disabled="selectedRowKeys.disable"
          placeholder="请选择用户角色"
          @change="roleSelected">
          <a-select-option value="1">所站长</a-select-option>
          <a-select-option value="2">台区经理</a-select-option>
          <a-select-option value="3">管理员</a-select-option>
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
          value: '1542121',
          label: '北京'
        }
      ],
      confirmLoading: false,
      tempSaveSelectOrgNo: '',
      localDisable: false
    }
  },
  mounted() {
    getAllStation().then((res) => {
      this.cascaderOptions = res
    })
  },
  watch: {
    modalVisible(newVal) {
      if (newVal) {
        console.log(JSON.stringify(this.selectedRowKeys))
        Object.keys(this.selectedRowKeys).forEach((key) => {
          if (key !== 'orgNo') {
            this.form.getFieldDecorator(key, {
              initialValue: this.selectedRowKeys[key],
              preserve: true
            })
          }
        })
        this.tempSaveSelectOrgNo = this.selectedRowKeys['orgNo']

        let alhpa = []
        if (this.selectedRowKeys['orgNo']) {
          alhpa = [this.selectedRowKeys['orgNo']]
          if (this.selectedRowKeys['orgNo'].length === 9) {
            alhpa.unshift(this.selectedRowKeys['orgNo'].slice(0, 7))
          }
        }
        this.form.getFieldDecorator('orgNo', {
          initialValue: alhpa,
          preserve: true
        })
      } else {
        this.tempSaveSelectOrgNo = ''
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
        values.orgNo = this.tempSaveSelectOrgNo

        // values.orgNo = values.orgNo ? values.orgNo[0] : undefined
        console.log(values, this.tempSaveSelectOrgNo)
        let res
        // 新增和修改都在这里
        if (values.hasOwnProperty('readNameList')) {
          delete values.readNameList
        }
        if (values.isAdd) {
          delete values.id
          res = await addUser(values)
        } else {
          res = await updateUser(values)
        }
        this.confirmLoading = false

        if (!values.isAdd && this.$store.getters.username == values.userName) {
          this.$notification['success']({
            message: '操作成功,请重新登录',
            description: res
          })
        } else {
          this.$notification['success']({
            message: '操作成功',
            description: res
          })
        }
        this.$emit('update:modalVisible', false)
      })
    },
    orgNoSelected(_, selectedOptions) {
      const item = selectedOptions.pop()
      this.tempSaveSelectOrgNo = item.value
      this.$nextTick(() => {
        this.form.setFieldsValue({
          orgName: item ? item.label : ''
        })
      })
    },
    // 权限切换
    roleSelected(value) {
      if (value == 1) {
        this.form.setFieldsValue({
          userName1: '-'
        })
        this.form.setFieldsValue({
          readName: '-'
        })
        this.localDisable = true
      } else {
        // this.form.setFieldsValue({
        //   userName1: ''
        // })
        // this.form.setFieldsValue({
        //   readName: ''
        // })
        this.localDisable = false
      }
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
