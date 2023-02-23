// 搜索框
<template>
	<div class="warp">
		<a-form layout="inline" :form="form" @submit="handleSubmit" class="form">
			<div class="formRegion">

				<!-- 工单编号 -->
				<a-form-item>
					<a-input v-decorator="[
                'workOrderNo',
                { rules: [{ message: '请输入工单编号' }] },
              ]" placeholder="工单编号" :style="{ width: '150px' }" allowClear>
						<!-- @change="ande" 实时-->
					</a-input>
				</a-form-item>
				<!-- 用户名称 -->
				<a-form-item>
					<a-input v-decorator="[
                'userName',
                { rules: [{ message: '请输入用户名称' }] },
              ]" placeholder="请输入用户名称" :style="{ width: '150px' }" allowClear>
					</a-input>
				</a-form-item>
				<!-- 营业站 -->
				<a-form-item>
					<a-select v-decorator="[
                'supply_unit',
                { rules: [{ message: '请选择营业站' }] },
              ]" placeholder="请选择营业站" :style="{ width: '150px' }" allowClear>
						<a-select-option value="male"> 光明营业站 </a-select-option>
						<a-select-option value="female"> 累死了营业站 </a-select-option>
					</a-select>
				</a-form-item>
				<!-- 台区名称 -->
				<a-form-item>
					<a-select v-decorator="[
                'platform_name',
                { rules: [{ message: '请选择台区' }] },
              ]" placeholder="请选择台区" :style="{ width: '150px' }" allowClear>
						<a-select-option value="male"> male </a-select-option>
						<a-select-option value="female"> female </a-select-option>
					</a-select>
				</a-form-item>




				<!-- 工单状态 -->
				<a-form-item>
					<a-select v-decorator="[
                'workOrderStatus',
                { rules: [{ message: '请选择工单状态' }] },
              ]" placeholder="请选择工单状态" :style="{ width: '150px' }" allowClear>
						<a-select-option value="待处理"> 待处理 </a-select-option>
						<a-select-option value="处理中"> 处理中 </a-select-option>
						<a-select-option value="待归档"> 待归档 </a-select-option>
						<a-select-option value="已归档"> 已归档 </a-select-option>
					</a-select>
				</a-form-item>

				<a-form-item>
					<a-select v-decorator="[
                'eventType',
                { rules: [{ message: '请选择事件类型' }] },
              ]" placeholder="事件类型" :style="{ width: '150px' }" allowClear>
						<a-select-option value="采集失败"> 采集失败 </a-select-option>
						<a-select-option value="采集异常"> 采集异常 </a-select-option>
						<a-select-option value="采集未接入"> 采集未接入 </a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item>
					<a-select v-decorator="[
                'state1',
                { rules: [{ message: '请选择预警级别' }] },
              ]" placeholder="预警级别" :style="{ width: '150px' }" allowClear>
						<a-select-option value="1级预警"> 1级预警 </a-select-option>
						<a-select-option value="2级预警"> 2级预警 </a-select-option>
						<a-select-option value="3级预警"> 3级预警 </a-select-option>
					</a-select>
				</a-form-item>
				<!-- 开始时间 -->
				<a-form-item>
					<a-range-picker v-decorator="['synchroTime']" :style="{ width: '230px' }" @change="onChange"
						allowClear />
				</a-form-item>
				<!-- 结束时间 -->
			</div>
		</a-form>
		<!-- 查询、重置 -->
		<div class="buttonRegion">
			<a-form-item class="search">
				<a-button id="sear" type="primary" icon="search" html-type="submit" @click="handleSubmit">查询</a-button>
			</a-form-item>
			<a-form-item>
				<a-button icon="reload" @click="handleReset"> 重置 </a-button>
			</a-form-item>
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
		data() {
			return {
				form: this.$form.createForm(this, {
					name: "searchform",
				}),
			};
		},
		mounted() {
			// 验证字段
			this.$nextTick(() => {
				this.form.validateFields();
			});
		},
		methods: {
			// 搜索传值
			handleSubmit(e) {
				e.preventDefault();

				this.form.validateFields((err, values) => {
					this.$emit("formData", values);
					// this.$emit('input', values);
					// console.log(this.value,'asdd');
				});
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
			handleReset(e) {
				this.form.resetFields();
				e.preventDefault();

				this.form.validateFields((err, values) => {
					this.$emit("formData", values);
				});
			},

			onChange(date, dateString) {
				console.log(date, dateString);
			},
			// ande: function(e){
			// 	console.log(e,'e')
			// },
		},
		// watch:{
		// 	value:_.debounce( function(newvalue,oldvalue){
		// 		console.log(newvalue,'s');

		// 	})
		// },
	};
</script>

<style lang="less" scoped>
	.warp {
		.form {
			display: flex;
			width: 100%;




			// .formRegion {
			// 	flex: 5;
			// 	display: flex;
			// 	flex-wrap: nowrap;

			// 	//   flex-direction: column;
			// }

			.buttonRegion {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: right;
				margin-right: 15px;
				margin-bottom: 0;

				.search {
					padding-right: 15px;
				}

				/deep/ .ant-btn-primary {
					background-color: #28599d;
				}

			}
		}
	}

	/deep/ .ant-form-item {
		// display: none;
		margin-bottom: 0;
	}

	.ant-form,
	.ant-form-inline {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
