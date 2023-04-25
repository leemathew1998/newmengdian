import moment from 'moment'
import {
	getAction,
	postAction
} from '@/api/manage'

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
export const reasonList = {
	'采集成功率': `采集失败的用户数量/该客户经理所管辖的所有用户数量`,
	'采集消缺及时率': `当天未处理采集失败工单数/所有采集失败工单数`,
	'费控复电成功率': `从系统单独获取（指令类型为复电，结果为执行成功）/指令类型为复电`,
	'费控停电成功率': `从系统单独获取（指令类型为停电，结果为执行成功）/指令类型为停电`,
	'自动发行比例': `中止（站长手动归档的客户数）/该台区经理或者该营业所站/旗县所有的营业户数`,
	'低压线损率': `台区经理所管辖台区的损耗电量/台区经理所管辖台区的供电量`,
	'高损台区占比': `高损台区（线损为6及以上）个数以上/台区经理管辖的所有台区个数`,
	'负损台区占比': `负损台区个数（线损小于等于-1）/台区经理管辖的所有台区个数`,
	'经济运行台区占比': `线损率在0-4（包含0，4）的台区数量/客户经理管辖的所有台区个数`,
	'高负损台区消缺及时率': `三天以上未处理的高负损台区工单数/所有高负损台区工单数`,
	'电费结零率': `1-（欠费金额包含偏差考核与价差收益/发行金额）`,
	'配电异常台区次数': `异常台区次数`,
	'现场复电及时率': `复电时间小于45分钟的工单数/所有现场复电工单数`,
	'投诉意见工单数量': `投诉意见工单数量`,
	'运维抢修到达及时率': `45min到达现场（app需要加上签到功能，获取定位以及时间）以内的包含45/所有工单数量`,
	'计量消缺及时率': `1-三天以上未处理计量异常工单数/所有计量异常工单数`
}
