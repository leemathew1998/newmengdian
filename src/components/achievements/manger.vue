<template>
  <div>
    <div>
      <div class="top">
        <!-- 简介 -->
        <p class="p1" style="font-size: 23px">绩效指标详情—采集成功率</p>
        <p class="p2" style="font-size: 14px">计算规则</p>
        <p class="p3" style="font-size: 11px">满分10分</p>
        <p class="p3" style="font-size: 11px">
          采集成功的用户数量/该区域管辖的所有用户数量
          目标值定为100%，每低0.5%，扣1分。采集成功率为95%时， 此项分数扣减为0
        </p>
        <p class="p2" style="font-size: 14px">计算过程</p>
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
        <p class="p2" style="font-size: 14px">原始数据</p>
        <!-- <a-table></a-table> -->
        <a-table :columns="columns" :data-source="data" :customRow="rowClick" bordered>
          <template slot="title">
            <span class="dingbu">采集成功：3205</span>
            <span class="dingbu">采集失败： 35</span>
            <span class="dingbu">采集总数：3240</span>
          </template>
          <a slot="name" slot-scope="text">aaa</a>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
	import {
		collect,
		control
	} from '@/components/achievements/constion.js'

	const columns = [{
			title: '变压器编号',
			dataIndex: 'name',
			align: 'center'
		},
		{
			title: '采集成功',
			dataIndex: 'success',
			align: 'center'
		},
		{
			title: '采集失败',
			dataIndex: 'failed',
			align: 'center'
		},
		{
			title: '采集总数',
			dataIndex: 'total',
			align: 'center'
		}
	]

	const data = [{
			name: 'C001',
			success: '1221',
			failed: '5',
			total: '1226'
		},
		{
			name: 'C002',
			success: '411',
			failed: '5',
			total: '416'
		},
		{
			name: 'C003',
			success: '111',
			failed: '5',
			total: '116'
		},
		{
			name: 'C004',
			success: '232',
			failed: '5',
			total: '237'
		},
		{
			name: 'C005',
			success: '434',
			failed: '5',
			total: '439'
		},
		{
			name: 'C006',
			success: '343',
			failed: '5',
			total: '348'
		},
		{
			name: 'C007',
			success: '453',
			failed: '5',
			total: '458'
		},
		{
			name: 'C008',
			success: '434',
			failed: '5',
			total: '439'
		},
		{
			name: 'C009',
			success: '343',
			failed: '5',
			total: '348'
		},
		{
			name: 'C010',
			success: '453',
			failed: '5',
			total: '458'
		}
	]
	// 将control赋值给sent
	// var sent = control();
	// const rightdata = []

	export default {
		data() {
			return {
				data,
				columns
			}
		},

		props: {
			rightdata: {
				type: Object
			}
		},

		mounted() {
			collect().then((res) => {
				this.shuju = res
				console.log(res, 'kkk')
			})
			control().then((res) => {
				// this.shuju = res;
				// console.log(res, "mmm");.
			})
		},

		watch: {
			rightdata: {
				deep: true,
				handler(newval, oldval) {
					// console.log(newval,'ssa');
					if (oldval.id == '0') {
						this.data = this.shuju
					}
					if (newval.id == '0') {
						this.data = this.shuju
						// console.log(this.data, "ppppp");
					}
					if (newval.id == '1') {
						this.data = this.shuju
						// console.log(this.data, "kk");
					}
				}
			}
		},

		methods: {
			rowClick(record, index) {
				return {
					on: {
						click: () => {
							// this.$router.push('/achievements/site')
						}
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.dingbu {
		display: inline-block;
		margin-left: 13px;
		width: 110px;
	}

	.top {
		.p1 {
			color: #1c9399;
			text-align: center;
		}

		.p2 {
			color: #1c9399;
		}

		.formula {
			margin-left: 2%;
			width: 95%;
		}
	}

	.lower {
		.p2 {
			color: #1c9399;
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
		margin: 0;
		display: inline-block;
		display: flex;
		width: 60%;
		font-size: 23px;
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
		font-size: 15px;

		p {
			text-align: center;
			margin: 0;
		}
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
