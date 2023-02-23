<template>
	<div class="box">
		<a-input-search placeholder="请输入供电服务中心名称" style="width: 100%" @search="onSearch" />
		<a-table :columns="leftBottomColumns" :data-source="leftBottomData" size="small" :loading="leftBottomLoading">
		</a-table>
	</div>
</template>

<script>
	export default {
		props: ['leftBottomColumns', 'leftBottomData', 'leftBottomLoading'],
		methods: {
			onSearch() {}
		}
	}
</script>

<style scoped lang="less">
	.box {
		border: 1px #f5f5f5 solid;
		border-radius: 5px;
		padding: 2px;
	}
</style>
