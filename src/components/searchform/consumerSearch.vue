// 搜索框
<template>
  <div class="warp">
    <a-form layout="inline" :form="form" @submit="handleSubmit" class="form">
      <div class="formRegion">
        <!-- 用户编号 -->
        <a-form-item>
          <a-input
            v-decorator="['consNo', { rules: [{ message: '请输入用户编号' }] }]"
            placeholder="用户编号"
            :style="{ width: '150px' }"
            allowClear>
            <!-- @change="ande" 实时-->
          </a-input>
        </a-form-item>
        <!-- 用户名称 -->
        <a-form-item>
          <a-input
            v-decorator="[
              'consName',
              { rules: [{ message: '请输入用户名称' }] },
            ]"
            placeholder="请输入用户名称"
            :style="{ width: '150px' }"
            allowClear>
          </a-input>
        </a-form-item>

        <!-- 供电单位 -->
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
        <!-- 台区名称 -->
        <a-form-item>
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
        </a-form-item>
        <!-- 标记时间 -->
        <!-- <a-form-item>
					<a-range-picker v-decorator="['labelTime']" :style="{ width: '250px' }" @change="onChange"
						allowClear />
				</a-form-item> -->
        <a-form-item class="search">
          <a-button id="sear" type="primary" icon="search" html-type="submit" @click="handleSubmit">查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button icon="reload" @click="handleReset"> 重置 </a-button>
        </a-form-item>
      </div>
    </a-form>
    <!-- 查询、重置 -->
    <div class="buttonRegion">
      <!-- <a-form-item class="search">
				<a-button id="sear" type="primary" icon="search" html-type="submit" @click="handleSubmit">查询</a-button>
			</a-form-item>
			<a-form-item>
				<a-button icon="reload" @click="handleReset"> 重置 </a-button>
			</a-form-item> -->
    </div>

    <a-form-item>
      <slot name="import"></slot>
    </a-form-item>
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
    // 如果有路由参数就获取赋值
    Object.keys(this.$route.query).forEach(key => {
      this.form.setFieldsValue({
        [key]: this.$route.query[key]
      })
    })
    getAllStation().then((res) => {
      this.cascaderOptions = res
    })
    // 验证字段
    this.$nextTick(() => {
      this.form.validateFields()
      // this.handleSubmit()
    })
  },
  methods: {
    // 搜索传值
    handleSubmit(e) {
      e && e.preventDefault()
      this.form.validateFields((_, values) => {
        this.$emit('formData', values)
        // this.$emit('input', values);
        // console.log(values,'asdd');
      })
    },
    // 重置为空
    handleReset(e) {
      this.form.resetFields()

            // this.handleSubmit()
            e.preventDefault()
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
      console.log(dateString)
    }
  }
}
</script>

<style lang="less" scoped>
.warp {
  .form {
    // display: flex;
    width: 100%;

    // .formRegion {
    // 	flex: 5;
    // 	display: flex;
    // 	flex-wrap: nowrap;

    // 	//   flex-direction: column;
    // }

    .buttonRegion {
      // flex: 1;
      // display: flex;
      // align-items: center;
      // justify-content: right;
      // margin-right: 15px;
      // margin-bottom: 0;

      // .search {
      // 	padding-right: 15px;
      // }
    }
  }
}

/deep/ .ant-form-item {
  // display: none;
  margin-bottom: 0;
}

/deep/ .ant-btn-primary {
  background-color: #28599d;
}

// .ant-form,
// .ant-form-inline {
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// }
</style>
