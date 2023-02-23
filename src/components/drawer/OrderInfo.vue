<template>
	<div class="warp">
		<!-- <table align="center" border="1px" class="OrderInfoTable">
      <tr v-for="(item,index,i) in clickRow" :key="index">
        <th style="font-weight: 1100;">{{columns[i].title}}</th>
        <th>{{item}}</th>
      </tr>
    </table> -->
		<!-- <a-table :columns="column" :data-source="data">
		</a-table> -->
		<a-table bordered :columns="temcolumns" :data-source="data" :pagination="false">

			<div style="font-weight: 900;" slot="info" slot-scope="text">{{ text }}</div>
		</a-table>
		<!--    <a-descriptions v-for="(item, index, i) in clickRow" :key="index" bordered>
      <a-descriptions-item :span="2">
        <span slot="label">{{ columns[i].title }}</span>
        {{ item }}
      </a-descriptions-item>
    </a-descriptions> -->
	</div>
</template>

<script>
	const temcolumns = [{
			title: '工单信息',
			dataIndex: 'info',
			key: 'info',
			scopedSlots: { customRender: 'info' },
		},
		{
			title: '工单状态',
			dataIndex: 'status',
			scopedSlots: { customRender: 'status' },
			key: 'status',
		},
	];
	export default {
		name: "OrderInfo",
		props: {
			clickRow: {
				type: Object,
				required: true,
			},
			columns: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {
				data: [],
				temcolumns,
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				const tem = []
				console.log(this.columns,this.clickRow)
				for (let i = 0; i < this.columns.length; i++) {
					this.data.push({
						key: i,
						info: this.columns[i].title,
						status:this.clickRow[this.columns[i].dataIndex],
					});
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.ant-pagination {
		display: none;
	}
</style>
