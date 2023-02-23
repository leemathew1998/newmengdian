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
							<a-popover slot="progressDot" slot-scope="{ status, prefixCls }">
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
			<div class="record">
				<div class="center">
					<div class="head">
						<span>现场记录</span>
					</div>
					<div class="last">
						<div class="left">
							<a-collapse accordion>
								<a-collapse-panel key="1" header="故障点/危机缺陷照片">
									<div v-if="situation.livePhotos.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px"
											v-for="item in situation.livePhotos" :key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button @click="showModal2(item)">查看图片</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
								<a-collapse-panel key="2" header="抢修单照片">
									<div v-if="situation.picture.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px"
											v-for="item in situation.picture" :key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button @click="showModal2(item)">查看图片</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
								<a-collapse-panel key="3" header="监控班许可照片">
									<div v-if="situation.photograph.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px"
											v-for="item in situation.photograph" :key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button @click="showModal2(item)">查看图片</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
								<a-collapse-panel key="4" header="安全措施照片">
									<div v-if="situation.caption.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px"
											v-for="item in situation.caption.length" :key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button @click="showModal2(item)">查看图片</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
							</a-collapse>
						</div>
						<div class="right">
							<a-collapse accordion>
								<a-collapse-panel key="5" header="到岗位置许可检查安全措施是否完备照片并同意开工照片">
									<div v-if="situation.pin.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px" v-for="item in situation.pin"
											:key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button type="primary" @click="showModal2(item)">查看图片
											</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
								<a-collapse-panel key="6" header="故障/危急缺陷处理后照片">
									<div v-if="situation.print.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px" v-for="item in situation.print"
											:key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button type="primary" @click="showModal2(item)">查看图片
											</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
								<a-collapse-panel key="7" header="安全措施拆除照片">
									<div v-if="situation.photoprint.length" class="imageList">
										<div style="padding-top: 20px; margin-left: 5px"
											v-for="item in situation.photoprint" :key="item">
											<img :src="item" width="50px" height="50px" class="logo" alt="logo" />
											<a-button type="primary" @click="showModal2(item)">查看图片
											</a-button>
										</div>
										<ImgModel :imgvisible="ImgModalVisible"
											@changeimgModal="ImgModalVisible = !ImgModalVisible" :photos="photos">
										</ImgModel>
									</div>
								</a-collapse-panel>
							</a-collapse>
						</div>
					</div>
				</div>
			</div>
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
			// modalName: {
			// 	type: String,
			// 	default: ""
			// },
			situation: {
				type: Object,
				required: true,
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
				imgvisible: true,
				modalVisible: false,
				ImgModalVisible: false,
				photos: '',
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
				console.log(this.situation, "数据");
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
				padding-left: 80px;
				padding-top: 20px;

				.left {
					width: 45%;
					padding-right: 45px;

					.ant-btn {
						color: #fff;
						background-color: #1890ff;
						padding: 0 5px;
						margin-left: 0;
					}

					// .describe {
					//   width: 80%;
					//   margin-left: 10px;
					//   span {
					//     font-size: 12px;
					//   }
					// }
				}

				.right {
					padding-left: 45px;
					width: 45%;

					.ant-btn {
						padding: 0 5px;
						margin-left: 0;
					}
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
		//   justify-content: center;
		align-items: center;

		div {
			width: 100px;
		}
	}

	.imageList button {
		margin-top: 10px;
		margin-left: 5px;
	}

	// .imageList img:hover{
	// 	transform: scale(3,4.8);
	// 	transition: all 0.1s linear;
	// 	position: relative;
	// 	top: -80px;
	// }
	// .bigimg{
	// 	display: none;
	// 	border: 5px solid #c0c0c0;
	// 	top:27%;
	// 	left: 3%;
	// 	width: 90%;
	// 	position: absolute;
	// }
</style>
