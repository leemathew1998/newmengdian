<template>
	<div>
		<!-- 弹窗 -->
		<a-modal v-model="modalVisible" @ok="handleOk" @cancel="handleCancel" :width="1100" :title="name" :okText="name"
			:footer="null">
			<!-- 详情 -->
			<div class="details">
				<div class="top">
					<div class="head">
						<span style="
                font-size: 16px;
                font-weight: 600;
                color: #000;
                line-height: 50px;
              ">原始数据</span>
					</div>
					<!-- 原始数据展示 -->
					<div class="center">
						<div class="one" v-for="(item, key) in dictionary" :key="key" :style="{
                display: needToFix.includes(item.name) ? 'none' : 'block',
              }">
							<div v-if="!needToFix.includes(item.name)">
								<span class="key">{{ item.label }}：</span>
								<span class="value">{{ NewModelData[item.name] }}</span>
							</div>
						</div>
						<div class="two" v-for="(item, key) in dictionary" :key="'abc' + key" :style="{
                display: needToFix.includes(item.name) ? 'block' : 'none',
              }">
							<div v-if="needToFix.includes(item.name)">
								<span class="key">{{ item.label }}：</span>
								<span class="value">{{ NewModelData[item.name] }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 进度 -->
			<div class="schedule">
				<div class="center">
					<div class="head">
						<span>工单进度</span>
					</div>
					<div class="middle">
						<a-steps :current="progress.progress">
							<a-popover slot="progressDot" slot-scope="{  status, prefixCls }">
								<template slot="content">
									<span>状态:
										{{
                      status == "finish"
                        ? "处理中"
                        : status == "wait"
                        ? "已归档"
                        : "待归档"
                    }}</span>
								</template>
								<span :class="`${prefixCls}-icon-dot`" />
								<!-- 工单状态步骤条 -->
							</a-popover>
							<a-step title="待处理" :description="progress.stepOne" />
							<a-step title="处理中" :description="progress.stepTwo" />
							<a-step title="待归档" :description="progress.stepThree" />
							<a-step title="已归档" :description="progress.stepFour" />
						</a-steps>
					</div>
				</div>
			</div>
			<!-- 记录 -->
			<!-- 	<div class="record">
				<div class="mindo">
					<div v-show="isSensitivity !== 'undefiend'">
						<p class="zero">敏感用户</p>
						<div v-for="(item, key) in isSensitivity" :key="key + '12'">
							<p class="first">用户编号:{{ item.userId }}</p>
							<p class="first">用户名称:{{ item.userName }}</p>
							<p class="first">用户电话:{{ item.userPhone }}</p>
							<p class="first">台区编号:{{ item.platformId }}</p>
							<p class="first">台区名称:{{ item.platformName }}</p>
							<p class="first">供电单位:{{ item.powerUnit }}</p>
							<p class="first">停电描述:{{ item.describe }}</p>
							<p class="first">停电时间:{{ item.powerCutTime }}</p>
							<p class="first">来电时间:{{ item.incomingTelegramTime }}</p>
							<p class="second">用户地址:{{ item.userLocation }}</p>
						</div>
					</div>
					<div v-show="isOutage !== 'undefiend'">
						<p class="zero">频繁停电用户</p>
						<div v-for="(item, key) in isOutage" :key="key + '11'">
							<p class="first">用户编号:{{ item.userId }}</p>
							<p class="first">用户名称:{{ item.userName }}</p>
							<p class="first">用户电话:{{ item.userPhone }}</p>
							<p class="first">台区编号:{{ item.platformId }}</p>
							<p class="first">台区名称:{{ item.platformName }}</p>
							<p class="first">供电单位:{{ item.powerUnit }}</p>
							<p class="first">停电描述:{{ item.describe }}</p>
							<p class="first">标记时间:{{ item.labelTime }}</p>
							<p class="first">标记人:{{ item.labelName }}</p>
							<p class="second">用户地址:{{ item.userLocation }}</p>
						</div>
					</div>
				</div>
			</div> -->
		</a-modal>
	</div>
</template>
<script>
	import ImgModel from "@/components/ImgModel/index";
	export default {
		name: "NewModel",
		props: {
			visible: {
				type: Boolean,
				required: true,
			},
			NewModelData: {
				type: Object,
				required: true,
			},
			isSensitivity: Array,
			isOutage: Array,

			// modalName: {
			// 	type: String,
			// 	default: ""
			// },
			situation: {
				type: Array,
				// required: true
				// default: [{ livePhotos: [] }]
			},
			dictionary: {
				required: true,
				type: Array,
			},
			imgdata: {
				type: Array,
			},
			progress: {
				type: Object,
				required: true,
			},
			name: {
				required: true,
				type: String,
			},
		},
		components: {
			ImgModel,
		},
		data() {
			return {
				modalVisible: false,
				ImgModalVisible: false,
				photos: "",
				needToFix: [],
			};
		},
		watch: {
			// 弹窗现场情况
			async visible(val, valOld) {
				this.modalVisible = val;
				// console.log(this.situation,'asdd')
				if (this.name === "优质服务") {
					this.needToFix = ["acceptedContent", "relationLocation"];
				} else if (this.name === "电费补抄") {
					this.needToFix = [
						"dfbcGdUseraddress",
						"dfbcGdUsername",
						"dfbcGdCode",
						"dfbcGdZcid",
						"dfbcGdUsername",
					];
				} else if (this.name === "电费回收") {
					this.needToFix = ["userName", "userLocation"];
				} else if (this.name === "计量运维") {
					this.needToFix = [
						"elecmeterAssetNum",
						"platformName",
						"workOrderNo",
						"userAdd",
						"elecmeterCode",
						"userName",
						"terminalFactory",
						"elecmeterFactory",
					];
				} else if (this.name === "采集运维") {
					this.needToFix = [
						"elecmeterAssetNum",
						"platformName",
						"terminalFactory",
						"terAssetNo",
						"elecmeterFactory",
						"userName",
						"userElecAdd",
					];
				} else if (this.name === "费控复电") {
					this.needToFix = [
						"elecmeterAssetNum",
						"terminalLocation",
						"userLocation",
					];
				} else if (this.name === "线损治理") {
					this.needToFix = ["elecmeterAssetNum"];
				} else if (this.name === "反窃查违") {
					this.needToFix = ["powerConsumption"];
				}
			},
		},
		methods: {
			loaMore(name) {
				// 此处写下拉展示函数
				for (let i = 0; i < this.needToFix.length; i++) {
					if (this.needToFix[i] === name) {
						this.needToFix.splice(i, 1);
					}
				}
			},
			showModal() {
				this.modalVisible = true;
			},
			// 点击
			handleOk(e) {
				this.modalVisible = false;
			},
			// 点击取消
			handleCancel() {
				this.modalVisible = !this.modalVisible;
				this.$emit("changeModal", false);
			},
			// 点击按钮放大图片
			showModal2(e) {
				this.photos = e;
				console.log(this.photos, "图片路径");
				this.ImgModalVisible = true;
			},
			// 点击
			handleOk2(e) {
				this.ImgModalVisible = false;
			},
			// 点击取消
			handleCancel2() {
				this.ImgModalVisible = !this.ImgModalVisible;
				this.$emit("changeimgModal", false);
			},
		},
	};
</script>
<style lang="less" scoped>
	/deep/ .ant-modal-body {
		padding: 0;
	}

	/deep/ .ant-modal-header {
		background: #f9f9f9;
	}

	/deep/ .ant-steps-item-title {
		font-size: 12px;
		font-weight: 400;
	}

	/deep/ .ant-steps-item-description {
		font-size: 12px;
		color: #ccc;
	}

	.top {
		width: 100%;

		.head {
			display: flex;
			padding-left: 20px;

			.front {
				display: flex;
				height: 50px;
				align-items: center;

				span {
					line-height: 50px;
					font-size: 16px;
				}

				.yuan {
					height: 6px;
					width: 6px;
					border-radius: 50%;
					background-color: red;
					margin-right: 7px;
				}
			}

			.queen {
				span {
					line-height: 50px;
					font-size: 14px;
				}

				.fang {
					width: 5px;
					height: 11px;
					border: 1px solid red;
					margin-right: 7px;
				}
			}
		}

		.center {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			padding: 0 20px 0 20px;

			.one {
				width: 25%;
				display: flex;
				align-items: center;
				margin-top: 10px;
				padding-right: 10px;

				.key {
					white-space: nowrap;
					display: flex;
					float: left;
					flex-wrap: nowrap;
					font-weight: 700;
				}

				.value {
					word-wrap: normal;
					word-break: break-all;
				}
			}

			.two {
				width: 50%;
				display: flex;
				align-items: center;
				margin-top: 10px;
				padding-right: 10px;

				.key {
					white-space: nowrap;
					display: flex;
					float: left;
					flex-wrap: nowrap;
					font-weight: 700;
				}

				.value {
					word-wrap: normal;
					word-break: break-all;
				}
			}
		}
	}

	.schedule {
		width: 100%;
		margin-top: 5px;

		.center {
			width: 100%;

			.head {
				width: 100%;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				background: #f9f9f9;
				height: 50px;
				padding-left: 20px;

				span {
					font-size: 16px;
					font-weight: 600;
					color: #000;
					line-height: 50px;
				}
			}

			.middle {
				padding-top: 30px;
				padding-bottom: 30px;
			}
		}
	}

	.record {
		width: 100%;
		margin-top: 5px;
		padding-bottom: 50px;

		.center {
			width: 100%;

			.head {
				width: 100%;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				background: #f9f9f9;
				height: 50px;
				padding-left: 20px;

				span {
					font-size: 16px;
					font-weight: 600;
					color: #000;
					line-height: 50px;
				}
			}

			.middle {
				padding-top: 20px;
				padding-bottom: 30px;

				.header {
					display: flex;
					align-items: center;

					.blue {
						width: 5px;
						height: 15px;
						background: #169bd5;
						margin-right: 20px;
						margin-left: 20px;
					}

					.fang {
						width: 5px;
						height: 8px;
						border: 1px solid #999;
						margin-right: 7px;
					}

					span {
						margin-right: 30px;
					}
				}
			}

			.last {
				width: 100%;
				display: flex;
				padding-left: 60px;

				.left {
					width: 50%;

					.describe {
						width: 80%;
						margin-left: 10px;

						span {
							font-size: 12px;
						}
					}
				}

				.right {
					width: 50%;
				}
			}
		}
	}

	.fang {
		width: 5px;
		height: 8px;
		border: 1px solid #000;
		margin-right: 7px;
	}

	.world {
		display: flex;
		align-items: center;

		span {
			font-size: 12px;
		}
	}

	.original {
		width: 100%;
		height: 50px;
		display: flex;
		margin-top: -10px;

		span {
			line-height: 50px;
		}
	}

	.imageList {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		div {
			width: 100px;
		}
	}

	.imageList button {
		margin-top: 10px;
		margin-left: 5px;
	}

	.mindo {
		padding-left: 20px;
	}

	.zero {
		font-weight: 800;
	}

	.first {
		font-weight: 600;
		display: inline-block;
		width: 33%;
		margin-bottom: 5px;
	}

	.second {
		display: inline-block;
		font-weight: 600;
	}
</style>
