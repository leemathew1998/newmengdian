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
          <!-- 台区编号 -->
          <a-form-item>
            <a-input
              v-decorator="['tgId', { rules: [{ message: '请输入台区编号' }] }]"
              placeholder="台区编号"
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
          <a-form-model-item>
            <a-select
              v-decorator="[
                'status',
                {
                  initialValue:['1','2','3'],
                  rules: [
                    {
                      type: 'array',
                      message: '请选择工单状态',
                      trigger: 'blur',
                    },
                  ],
                },
              ]"
              placeholder="请选择处理状态"
              :style="{ minWidth: '150px' }"
              allowClear
              mode="multiple">
              <a-select-option value="1">待处理</a-select-option>
              <a-select-option value="2">处理中</a-select-option>
              <a-select-option value="3">待归档</a-select-option>
              <a-select-option value="4">已归档</a-select-option>
            </a-select>
          </a-form-model-item>
          <!-- 分类 -->
          <a-form-model-item>
            <a-tree-select
              style="width: 100%"
              :tree-data="treeData"
              tree-checkable
              v-decorator="[
                'elecTypeCode',
                {
                  rules: [
                    {
                      type: 'array',
                      message: '请选择用电类别',
                      trigger: 'blur',
                    },
                  ],
                },
              ]"
              search-placeholder="请选择用电类别"
              placeholder="请选择用电类别"
              :style="{ minWidth: '150px', maxWidth: '250px' }"
              allowClear />
          </a-form-model-item>
          <a-form-model-item>
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
            />
          </a-form-model-item>
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
            @click="handleSubmit">查询</a-button>
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
const treeData = [
  {
    title: '大工业用电',
    value: '大工业用电',
    key: '大工业用电'
  },
  {
    title: '居民生活用电',
    value: '居民生活用电',
    key: '居民生活用电',
    children: [
      {
        title: '乡村居民生活用电',
        value: '乡村居民生活用电',
        key: '乡村居民生活用电'
      },
      {
        title: '城镇居民生活用电',
        value: '城镇居民生活用电',
        key: '城镇居民生活用电'
      },
      {
        title: '中小学教学用电',
        value: '中小学教学用电',
        key: '中小学教学用电'
      }
    ]
  },
  {
    title: '农业生产用电',
    value: '农业生产用电',
    key: '农业生产用电'
  },
  {
    title: '一般工商业',
    value: '一般工商业',
    key: '一般工商业',
    children: [
      {
        title: '非居民照明',
        value: '非居民照明',
        key: '非居民照明'
      },
      {
        title: '非工业',
        value: '非工业',
        key: '非工业'
      },
      {
        title: '普通工业',
        value: '普通工业',
        key: '普通工业'
      },
      {
        title: '商业用电',
        value: '商业用电',
        key: '商业用电'
      }
    ]
  },
  {
    title: '泵售',
    value: '泵售',
    key: '泵售'
  },
  {
    title: '大用户直购电',
    value: '大用户直购电',
    key: '大用户直购电'
  },
  {
    title: '其它用电',
    value: '其它用电',
    key: '其它用电'
  }
]
export default {
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'searchform'
      }),
      treeData,
      cascaderOptions: []
    }
  },
  mounted() {
    getAllStation().then(res => {
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
        values.status = values.status.join(',')
        values.orgNo = values.orgNo ? values.orgNo.slice(-1)[0] : values.orgNo
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
