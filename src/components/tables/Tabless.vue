<template>
  <a-table
    :columns="bigcolumns"
    :data-source="data"
    bordered
    :loading="tableLoading"
    :pagination="false"
    style="width:100%;"
    rowKey="indexItems"
  >
    <template slot="operation" slot-scope="text, record">
      <div style="display: flex;justify-content: center;">
        <slot :table_key="record"></slot>
      </div>
    </template>
  </a-table>
</template>

<script>
	const bigcolumns = [{
			title: '指标项',
			dataIndex: 'indexItems',
			align: 'center'

		},
		{
			title: '原始值',
			dataIndex: 'originalValue',
			align: 'center'

		},
		{
			title: '积分',
			dataIndex: 'integral',
			align: 'center'

		},
		{
			title: '操作',
			dataIndex: 'operation',
			align: 'center',
			scopedSlots: {
				customRender: 'operation'
			}
		}
	]
	export default {
		name: 'Tables',
		props: {
			data: {
				type: Array,
				required: true
			},
			tableLoading: {
				type: Boolean
			}
		},
		data() {
			return {
				bigcolumns
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
