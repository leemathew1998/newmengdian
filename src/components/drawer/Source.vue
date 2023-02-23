<template>
	<div class="warp">
	<!-- 	<table border="1px">
			<tr>
				<th></th>
				<th>处理前</th>
				<th>处理后</th>
			</tr>
			<tr v-for="item in columns" :key="item.title">
				<th>{{item.title}}</th>
				<th></th>
				<th></th>
			</tr>
		</table> -->
		<a-table bordered :columns="temcolumns" :data-source="data" :pagination="false">
		
			<div style="font-weight: 900;" slot="info" slot-scope="text">{{ text }}</div>
		</a-table>
	</div>
</template>

<script>
	const temcolumns = [{
			title: '工单信息',
			dataIndex: 'info',
			key: 'info',
			scopedSlots: {
				customRender: 'info'
			},
		},
		{
			title: '处理前',
			dataIndex: 'before',
			key: 'before',
		},
		{
			title: '处理后',
			dataIndex: 'after',
			key: 'after',
		},
	];
	export default {
		name: 'Source',
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
				for (let i = 0; i < this.columns.length; i++) {
					this.data.push({
						key: i,
						info: this.columns[i].title,
						before: '需要显示的数据',
						after: '需要显示的数据',
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>
