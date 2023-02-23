<template>
<!-- 派单插槽，未使用 -->
	<a-modal v-model="modalVisible" @ok="handleOk" @cancel="handleCancel" :width="700" :title="modalName"
		:okText="modalName">
		<div class="modalwarp">
			<div style="display: flex; flex-direction: column">
				<div id="title" style="display: flex; justify-content: center; align-items: center">
					<!-- 工单概览  代派单 -->
					<div style="flex: 1; display: flex; align-items: center">
						<span class="paidan" style="color: #666; justify-conter: space-between">工单概览</span>
						<span style="flex: 1; display: flex; align-items: center">
							<p style="
								width: 6px;
								height: 6px;
								border-radius: 50%;
								background-color: #d9011b;
								margin-bottom: 0;
								margin-right: 5px;
								"></p>
							<p id="dispatch_order" style="color: #D90D1B; font-size: 16px; margin-bottom: 0; font-weight: 400;">
								待 派 单
							</p>
						</span>
					</div>
					<span  style="flex: 1; color: #D90D1B; font-size: 16px; font-weight: 400;">{{ earlyWarning }}</span>
				</div>
			</div>
			<!--  -->
			<div id="basicInfo" style="display: flex; flex-wrap: wrap; width: 100%">
				<div v-for="item in modalBasicInfoList" :key="item.name"
					style="width: 48%; font-size: 12px; color: #999999; margin: 10px 0">
					<span>{{ item.title }}:{{selectItem[item.name]}}</span>
				</div>
			</div>

			<div class="main">
				<!-- <div class="title">派单信息</div> -->
				<!-- 信息处理人员及现场情况 -->
				<div class="order-analysis" v-for="(item,index) in viewArr" :key="index">
					<hr>
					<div style="display: flex;flex-direction: column;">
						<div style="display: flex;flex-direction: row; align-items: center;">
							<div class="blueBlock"
								style="margin-right: 10px; width: 5px; height: 10px; background-color: #3F9FFF;"></div>
							<div style="flex: 1;" class="personnel_name">{{item.name}}</div>
							<div style="flex: 1;" class="processing_time">{{item.time}}</div>
							<div style="flex: 3;"></div>
						</div>
						<div style="display: flex;flex-direction: row; align-items: center;">
							<span style="flex: 1; color: #7F7F7F;" class="">现场情况说明：</span>
							<span style="flex: 1; color: #7F7F7F;" class="">现场情况：</span>
						</div>
					</div>
					<div style="display: flex;">
						<a-textarea class="content_description" auto-size  v-model="item.name" :disabled="true"/>
						<div class="description_picture" v-for="(item,index) in viewArr" :key="index">
							<img :src="item.url" id="site_picture">

						</div>
					</div>

					<div class="circle-pic" :id="gernerateId(index)"></div>
				</div>


				<!-- 处理人员 -->
				<div class="maincontent">
					<div style="margin-right: 20px">处理人员</div>
					<a-select default-value="lucy" style="width: 120px">
						<a-select-option value="jack"> Jack </a-select-option>
						<a-select-option value="lucy"> Lucy </a-select-option>
						<a-select-option value="disabled"> Disabled </a-select-option>
						<a-select-option value="Yiminghe"> yiminghe </a-select-option>
					</a-select>
				</div>
			</div>
		</div>
	</a-modal>
</template>
<script>
	export default {
		name: "Modal",
		props: {
			earlyWarning:{
				required:true,
			},
			visible: {
				type: Boolean,
				required: true,
			},
			selectItem: {
				required: true,
			},
			modalName: {
				type: String,
				default: "",
			},
			modalRadioOptions: {
				type: String,
				default: "通过",
			},
		},
		data() {
			return {
				modalVisible: false,
				viewArr: [{
						name: '张强',
						time: '2022-6-1',
						url: '/public/logo.png',
						news: 'ab作证的时候讲了太多圆不回来的话，有些是夸大其词，有些是偷换概念，有些是彻底的谎言。是不是觉得很熟悉，都是小作文里惯用的套路？c',
						type: 1
					},
					{
						name: '张强',
						time: '2022-6-1',
						url: 'dadada',
						news: 'def',
						type: 2
					}
				],
				modalBasicInfoList: [{
						title: '工单编号',
						name: 'workOrderNo'
					},
					{
						title: '工单创建时间',
						name: 'workOrderCtime'
					}, {
						title: '台区经理姓名',
						name: 'areaManagerDesk'
					}, {
						title: '台区名称',
						name: 'platformName'
					}, {
						title: '用户名称',
						name: 'userName'
					},
					{
						title: '用户地址',
						name: 'userAdd'
					}, {
						title: '研判原因',
						name: 'eventReason'
					}
				]
			};
		},

		watch: {
			visible(val, valOld) {
				this.modalVisible = val;

				// var da = new Date();
				// $('#item.time').text([year,month,data].join(','));

				// var a = moment([]);
				// var b = moment([]);
				// a.diff(b, 'days')

			
			},
		},
		methods: {
			gernerateId: function(index) {
				return "person_" + index;
			},
			handleCancel() {
				this.modalVisible = !this.modalVisible;
				this.$emit("changeModal", false);
			},

			handleOk(e) {
				if (this.modalRadioOptions == "通过") {
					this.$message.success("此工单审核已通过，将自动归档", 3);
				} else {
					this.$message.error("此工单审核未通过，将派发给台区经理王飞", 3);
				}

				this.modalVisible = !this.modalVisible;
				this.$emit("changeModal", false);
			},

		},
	};
</script>


<style lang="less" scoped>
	//title是id定义
	#title {
		// margin: 0 0 20px 0;
		color: rgba(0, 0, 0, 0.85);
		font-weight: bold;
		font-size: 16px;
		line-height: 1.5;
		margin-bottom: 25px;
		margin-left: -5px;
	}

	&/deep/ .paidan {
		font-size: 4px;
		font-family: "黑体";
		width: 120px;
	}

	.personnel_name,
	.processing_time {
		display: inline-block;
		width: 80px;
	}

	.content_description {
		display: inline-block;
		width: 40%;
		margin-right: 40px;
	}

	.description_picture {
		display: inline-block;

		// width: 60%;

	}

	.description_situation {
		display: inline-block;
		width: 40%;
		margin-left: 40px;
	}

	.site_conditions {
		display: inline-block;
		// width: 60%;
	}

	#site_picture {
		width: 80px;
		height: 80px;
		border: 1px solid #aaa;
		margin: 10px;
	}
</style>
