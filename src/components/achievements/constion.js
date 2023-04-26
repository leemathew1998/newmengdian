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

export const reasonList = {
	'采集成功率': `采集失败的用户数量/该客户经理所管辖的所有用户数量`,
	'采集消缺及时率': `当天未处理采集失败工单数/所有采集失败工单数`,
	'费控复电成功率': `从系统单独获取（指令类型为复电，结果为执行成功）/指令类型为复电`,
	'费控停电成功率': `从系统单独获取（指令类型为停电，结果为执行成功）/指令类型为停电`,
	'终止发行比例': `中止（站长手动归档的客户数）/该台区经理或者该营业所站/旗县所有的营业户数`,
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

export const reasonListV2 = {
	'采集成功率': `目标值定为99.97%，每低0.01%，扣1分。直到0。`,
	'采集消缺及时率': `目标值定为100%，每低10%，扣1分。直到0。`,
	'费控复电成功率': `/`,
	'费控停电成功率': `/`,
	'终止发行比例': `目标值定为0.01%，每高0.01%，扣1分，直到为0。`,
	'低压线损率': `目标值定为上一月的低压线损率，每高0.5%，扣1分，直到0`,
	'高损台区占比': `目标值定为0%，每高5%，扣1分，直到0。`,
	'负损台区占比': `目标值定为0%，每高5%，扣1分，直到0。`,
	'经济运行台区占比': `/`,
	'高负损台区消缺及时率': `目标值定为100%，每低10%，扣1分，直到0。`,
	'电费结零率': `标准完成100%，少于1%扣1分。直到0，月考核以18号23：59:59为准。`,
	'配电异常台区次数': `同一个台区连续两周出现三相不平衡或低电压，扣2分，连续三周出现三相不平衡或低电压不开展治理的，扣3分，连续四周及以上出现三相不平衡或低电压，扣5分。`,
	'现场复电及时率': `目标值定为100%，每低10%，扣1分，直到0。`,
	'投诉意见工单数量': `投诉工单扣5分每个，意见工单每个扣1分，直到0。`,
	'运维抢修到达及时率': `目标值定为100%，每低10%，扣1分。直到0。`,
	'计量消缺及时率': `目标值定为100%，每低10%，扣1分，直到0。`
}

export const tableColumnList = {
	'采集成功率': [
		{
			title: '供电营业所',
			dataIndex: 'orgName',
			align: 'center'
		},
		{
			title: '采集成功',
			dataIndex: 'collSuccNum',
			align: 'center'
		},
		{
			title: '采集失败',
			dataIndex: 'collFailNum',
			align: 'center'
		},
		{
			title: '采集总数',
			dataIndex: 'collAllNum',
			align: 'center'
		}
	],
	'费控复电成功率': [
		{
			title: '复电工单数',
			dataIndex: 'feeNumAll',
			align: 'center'
		},
		{
			title: '复电执行成功工单数',
			dataIndex: 'feeNumSuc',
			align: 'center'
		}
	],
	'费控停电成功率': [
		{
			title: '停电工单数',
			dataIndex: 'feeNumAll',
			align: 'center'
		},
		{
			title: '停电执行成功工单数',
			dataIndex: 'feeNumSuc',
			align: 'center'
		}
	],
	'投诉意见工单数量': [
		{
			title: '投诉意见工单数量',
			dataIndex: 'num',
			align: 'center'
		}
	],
	'终止发行比例': [
		{
			title: '站长手动归档客户数',
			dataIndex: 'noop',
			align: 'center'
		},
		{
			title: '该旗县所有用户数',
			dataIndex: 'num',
			align: 'center'
		}
	],
	'高损台区占比': [
		{
			title: '高损台区个数',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有台区个数',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'负损台区占比': [
		{
			title: '负损台区个数',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有台区个数',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'经济运行台区占比': [
		{
			title: '线损率在0-4的台区个数',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有台区个数',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'采集消缺及时率': [
		{
			title: '采集失败工单数',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '采集失败工单总数',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'低压线损率': [
		{
			title: '损耗电量',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '供电量',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'高负损台区消缺及时率': [
		{
			title: '未处理高损台区工单数',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有高损台区工单数',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'电费结零率': [
		{
			title: '欠费金额',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '发行金额',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'配电异常台区次数': [
		{
			title: '异常台区次数',
			dataIndex: 'num1',
			align: 'center'
		}
	],
	'现场复电及时率': [
		{
			title: '复电时间小于45分钟',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有复电工单数',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'运维抢修到达及时率': [
		{
			title: '45min到达现场的工单数',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有工单数量',
			dataIndex: 'num2',
			align: 'center'
		}
	],
	'计量消缺及时率': [
		{
			title: '三天以上未处理',
			dataIndex: 'num1',
			align: 'center'
		},
		{
			title: '所有计量异常工单',
			dataIndex: 'num2',
			align: 'center'
		}
	]
}
