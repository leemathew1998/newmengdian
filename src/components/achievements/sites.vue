<template>
	<div>
		<div class="top">
			<!-- 简介 -->
			<p class="p1" style="font-size:24px">绩效指标详情—{{data.name}}</p>
			<p class="p2" style="font-size:14px">计算规则</p>
			<p class="p3" style="font-size:11px">满分10分</p>
			<p class="p3" style="font-size:11px">
				采集成功的用户数量/该区域管辖的所有用户数量
				目标值定为100%，每低0.5%，扣1分。采集成功率为95%时，
				此项分数扣减为0
			</p>
			<p class="p2" style="font-size:14px">计算过程</p>
			<div class="gongshi">
				<div class="com">
					<div class="fenzi">
						3250
						<hr />
						3240
					</div>
					<div class="baifen">
						<img src="../../../public/symbol.jpg" alt="" />
					</div>
					<div class="dengyu">89%</div>
				</div>

				<div class="comn">
					<div class="one">
						<img src="../../../public/shi.jpg" alt="" />
					</div>
					<div class="two">
						100% - 98%
						<hr />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.5%
					</div>
					<div class="three">
						<img src="../../../public/cheng.jpg" alt="" />
					</div>
					<div class="four">7.82</div>
				</div>
			</div>
			<!-- <img class="formula" src="../../../public/采集成功率.jpg" alt=""> -->
			<!-- <p class="p3" style="font-size:11px">公式</p> -->
		</div>
		<!-- 表单 -->
		<div class="lower">
			<p class="p2" style="font-size:14px">原始数据</p>
			<a-table :columns="columns" @change="tablePaginationChange" :pagination="pagination"
				:data-source="data.data" :customRow="rowClick" size="small" :scroll="{ y: 400 }" bordered>
				<template slot="title">
					<span class="dingbu">采集成功：</span>
					<span class="dingbu">采集失败：</span>
					<span class="dingbu">采集总数：</span>
				</template>
				<a slot="name" slot-scope="text">{{ text }}</a>
			</a-table>
		</div>
	</div>
</template>

<script>
	const columns = [{
			title: '台区经理',
			dataIndex: 'name',
			align: 'center',
		},
		{
			title: '采集成功',
			dataIndex: 'success',
			align: 'center',
		},
		{
			title: '采集失败',
			dataIndex: 'fail',
			align: 'center',
		},
		{
			title: '采集总数',
			dataIndex: 'total',
			align: 'center',
		},
	];

	export default {
		data() {
			return {
				columns,
				pagination: {
					current: 1,
					// total: this.data.length,
					showSizeChanger: true,
					pageSizeOptions: ['10', '20', '40', '80', '100'],
					showTotal: (total) => `共 ${total} 条`,
					pageSize: 10,

				}
			};
		},
		props: ['data'],
		methods: {
			tablePaginationChange(pagination) {
				this.pagination.current = pagination.current // 重新设置当前页
				this.pagination.pageSize = pagination.pageSize
			},
			rowClick(record, index) {
				return {
					on: {
						click: () => {
							this.$router.push({
								name: 'achievements/manger',
								params: {
									name: record.name
								}
							})
						}
					}
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.dingbu {
		display: inline-block;
		margin-left: 20px;
		width: 100px;
	}

	.top {
		.p1 {
			color: #1C9399;
			text-align: center;
		}

		.p2 {
			color: #1C9399;
		}

		.formula {
			margin-left: 2%;
			width: 95%;
		}
	}

	.lower {
		.p2 {
			color: #1C9399;
		}
	}

	.com {
		float: left;
		display: inline-block;
		width: 40%;
		margin-right: 0;
		// margin: 0 auto;
		display: flex;
		position: relative;
	}

	.fenzi {
		flex: 1;
		font-weight: 600;
		display: inline-block;
	}

	.baifen {
		padding-top: 5px;
		//   display: flex;
		flex: 1;
		display: inline-block;
	}

	.dengyu {
		padding-top: 10px;
		//   display: flex;
		font-size: 16px;
		font-weight: 600;
		flex: 1;
		display: inline-block;
	}

	.comn {
		display: inline-block;
		display: flex;
		width: 60%;
	}

	.one {
		flex: 1;
		padding-top: 5px;
		display: inline-block;
	}

	.two {
		flex: 2;
		font-weight: 600;
		display: inline-block;
	}

	.three {
		flex: 1;
		display: inline-block;
	}

	.four {
		flex: 1;
		font-weight: 600;
		font-size: 16px;
		padding-top: 10px;
		display: inline-block;
	}

	.gongshi {
		width: 100%;
	}
</style>
