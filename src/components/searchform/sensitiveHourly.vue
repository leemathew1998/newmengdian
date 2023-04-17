// 搜索框
<template>
  <div class="warp">
    <a-form layout="inline" :form="form" @submit="handleSubmit" class="form">
      <div class="formRegion">
        <!-- 用户编号 -->
        <a-form-item>
          <a-input
            v-decorator="['userId', { rules: [{ message: '请输入用户编号' }] }]"
            placeholder="用户编号"
            :style="{ width: '150px' }"
            allowClear
          >
            <!-- @change="ande" 实时-->
          </a-input>
        </a-form-item>
        <!-- 用户名称 -->
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ message: '请输入用户名称' }] },
            ]"
            placeholder="请输入用户名称"
            :style="{ width: '150px' }"
            allowClear
          >
          </a-input>
        </a-form-item>
        <!-- 台区名称 -->
        <!-- <a-form-item>
          <a-select
            v-decorator="[
              'platformName',
              { rules: [{ message: '请选择台区' }] },
            ]"
            placeholder="请选择台区"
            :style="{ width: '150px' }"
            allowClear
          >
            <a-select-option value="海拉尔区"> 海拉尔区 </a-select-option>
            <a-select-option value="海啤社区"> 海啤社区 </a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item>
          <a-input
            v-decorator="[
              'platformName',
              { rules: [{ message: '请输入台区' }] },
            ]"
            placeholder="请输入台区"
            :style="{ width: '150px' }"
            allowClear
          >
          </a-input>
        </a-form-item>

        <!-- 供电单位 -->
        <a-form-item>
          <!-- <a-select
            v-decorator="[
              'powerUnit',
              { rules: [{ message: '请选择供电单位' }] },
            ]"
            placeholder="请选择供电单位"
            :style="{ width: '150px' }"
            allowClear
          >
            <a-select-option value="河西供电服务中心">
              河西供电服务中心
            </a-select-option>
            <a-select-option value="河东供电服务中心">
              河东供电服务中心
            </a-select-option>
          </a-select> -->
          <a-input
            v-decorator="[
              'powerUnit',
              { rules: [{ message: '请输入供电单位' }] },
            ]"
            placeholder="请输入供电单位"
            :style="{ width: '150px' }"
            allowClear
          >
          </a-input>
        </a-form-item>
        <!-- 标记时间 -->
        <!-- <a-form-item>
					<a-range-picker v-decorator="['labelTime']" :style="{ width: '250px' }" @change="onChange"
						allowClear />
				</a-form-item> -->
        <a-form-item class="search">
          <a-button
            id="sear"
            type="primary"
            icon="search"
            html-type="submit"
            @click="handleSubmit"
          >查询</a-button
          >
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
export default {
  props: {
    // value:{
    // 	type:Object
    // },
  },
  data () {
    return {
      form: this.$form.createForm(this, {
        name: 'searchform'
      })
    }
  },
  mounted () {
    // 验证字段
    this.$nextTick(() => {
      this.form.validateFields()
    })
  },
  methods: {
    // 搜索传值
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        this.$emit('formData', values)
        // this.$emit('input', values);
        // console.log(values,'asdd');
      })
    },
    // searchList(){
    // 	const inputValue = e.target.values;
    // 	this.form.validateFields((err, values) => {
    // 		console.log(values,'uuu');
    // 		this.$emit("formData", values);
    // 		if (!err) {
    // 			console.log("Received values of form: ", values);
    // 		}
    // 	});
    // },
    // 重置为空
    handleReset (e) {
      this.form.resetFields()
      e.preventDefault()

      this.form.validateFields((err, values) => {
        this.$emit('formData', values)
      })
    },

    onChange (date, dateString) {
      console.log(dateString)
    }
    // ande: function(e){
    // 	console.log(e,'e')
    // },
  }
  // watch:{
  // 	value:_.debounce( function(newvalue,oldvalue){
  // 		console.log(newvalue,'s');

  // 	})
  // },
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
