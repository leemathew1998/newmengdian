<template>
  <div class="warp">
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="data"
      bordered
      @change="pagechange"
      :customRow="handleClickRow"
      :loading="tableLoading"
	    :scroll="{ x: scrollX }"
    >
      <!-- <template > -->
      <div slot="orderStatus" class="orderStatus">
        {{ text }}
      </div>
      <!-- </template> -->
      <template slot="operation" slot-scope="text, record">
        <div>
          <slot :table_key="record"></slot>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "Tables",
  props: {
    columns: {
      type: Array,
      required: true,
    },
	scrollX:{
		typeL:Number,
		default:3000
	},
    data: {
      type: Array,
      required: true,
    },
    operationName: {
      type: String,
      default: "",
    },
    tableLoading: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectedRowKeys: [],
    };
  },
  created() {
    if (
      this.operationName !== "" &&
      this.columns[this.columns.length - 1].dataIndex !== "operation"
    ) {
      this.columns.push({
        title: "操作",
        dataIndex: "operation",
        fixed: "right",
        width: 100,
        scopedSlots: {
          customRender: "operation",
        },
      });
    }
    // console.log('created')
  },

  mounted() {
    // console.log('mounted')
    // let status = document.getElementsByClassName('orderStatus')
    // for (var i = 0; i < status.length; i++) {
    // 	// console.log(status[i].parentNode)
    // 	// status[i].parentNode.style['backgroundColor'] = '#149BD5'
    // 	status[i].parentElement.style.background='#149BD5'
    // }
    // let status = document.getElementsByClassName('orderStatus')
    // for (var i = 0; i < status.length; i++) {
    // 	// status[i].parentNode.style['backgroundColor'] = '#149BD5'
    // 	status[i].innerHTML = 'asas'+i
    // }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.$emit("changeSelectedRowKeys", this.selectedRowKeys);
    },
    pagechange(e) {
      // let status = document.getElementsByClassName('orderStatus')
      // console.log(status[0])
      // for (var i = 0; i < status.length; i++) {
      // 	// status[i].style['backgroundColor'] = '#149BD5'
      // 	status[i].innerHTML = 'asas'+i
      // 	// status[i].parentNode.classList.add("parentNode")
      // 	// console.log(status[i].parentNode)
      // }
      // console.log(status[0])
    },
    handleClickRow(record, index) {
      return {
        on: {
          click: () => {
            this.$emit("clickRow", record);
          },
        },
      };
    },
  },
};
</script>

<style lang="less" scoped>
.warp {
  width: 100%;
}
</style>
