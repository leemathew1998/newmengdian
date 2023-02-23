import moment from 'moment'
import {
	getAction,
	postAction
} from "@/api/manage"

export const caiji = async () => {
	let tem = await postAction('/acStation/selectBusiness?business=0')
	// tem.data.map(item => {
	// 	// item.workOrderCtime = moment(item.workOrderCtime).format('MM-DD HH:mm:ss')

	// })
	return tem.data
}
// 采集成功率
export const collect = async () => {
	let tem = await postAction('/ach/collall')
	console.log(tem)
	// tem.data.map(item => {
	// 	// item.workOrderCtime = moment(item.workOrderCtime).format('MM-DD HH:mm:ss')
	// })
	return tem.data
}

// 费控停电
export const control = async () => {
	let tem = await postAction('/mwo/feilmeterAll')
	// tem.data.map(item => { })
	return tem.data
}

// 费控复电

// 终止发行

// 低压线损

// 高损台区占比

// 负损台区占比

// 经济运行台区占比

// 电费结零率

// 配电异常台区次数

// 采集消缺及时率

// 现场复电及时率

// 投诉意见工单数量

// 运维抢修到达及时率

// 计量消缺及时率

// 高负损台区消缺及时率
