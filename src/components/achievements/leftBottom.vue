<template>
  <!-- <a-input-search placeholder="请输入供电服务中心名称" style="width: 100%" @search="onSearch" /> -->
  <a-table
    class="box"
    rowKey="id"
    :customRow="handleClickRow"
    :columns="leftBottomColumns"
    :data-source="leftBottomData"
    size="small"
    :loading="leftBottomLoading">
  </a-table>
</template>

<script>
	export default {
		props: ['leftBottomColumns', 'leftBottomData', 'leftBottomLoading'],
		methods: {
			handleClickRow (record, index) {
      return {
        on: {
          click: () => {
            this.$emit('clickRow', record)
          }
        }
      }
    }
		}
	}
</script>

<style scoped lang="less">
	.box {
    height: 100%;
		border: 1px #f5f5f5 solid;
		border-radius: 5px;
		padding: 2px;
    /deep/.ant-spin-nested-loading{
      height: 100%;
      .ant-table-content{
        height: 100%;
      }
      .ant-spin-container{
        height: 100%;
      }
      .ant-table{
        height: 100%;
      }

    }
	}
</style>
