import { axios } from '@/utils/request'
export const sortRanking = (data) => {
	data.sort((prev, next) => {
		return Number(next.toPoint) - Number(prev.toPoint)
	})
	data.map((item, index) => {
		item['ranking'] = index + 1
	})
	return data
}
export const MAP_NAME_TO_FUNC = {
	'采集成功率': (params) => axios({
		url: 'ach/getCouDetails2',
		method: 'post',
		params: params
	}),
	'费控停电成功率': (params) => axios({
		url: 'ach/getFee3',
		method: 'post',
		params: params
	}),
	'费控复电成功率': (params) => axios({
		url: 'ach/getFee4',
		method: 'post',
		params: params
	}),
	'投诉意见工单数量': (params) => axios({
		url: 'ach/getSuper13',
		method: 'post',
		params: params
	}),
	'终止发行比例': (params) => axios({
		url: 'ach/getSuper5',
		method: 'post',
		params: params
	}),
	'高损台区占比': (params) => axios({
		url: 'ach/getLineLoss8',
		method: 'post',
		params: params
	}),
	'负损台区占比': (params) => axios({
		url: 'ach/getLineLoss9',
		method: 'post',
		params: params
	}),
	'经济运行台区占比': (params) => axios({
		url: 'ach/getLineLoss10',
		method: 'post',
		params: params
	}),
	'采集消缺及时率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'低压线损率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'高负损台区消缺及时率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'电费结零率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'配电异常台区次数': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'现场复电及时率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'运维抢修到达及时率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	},
	'计量消缺及时率': (params) => {
		return new Promise((resolve, reject) => {
			resolve({ num1: 0, num2: 0 })
		})
	}
}
export const MAP_NAME_TO_FUNC_TG_MANAGE = {
	'采集成功率': (params) => axios({
		url: 'ach/getPcManDetails1',
		method: 'post',
		params: params
	}),
	'采集消缺及时率': (params) => axios({
		url: 'ach/getPcManDetails2',
		method: 'post',
		params: params
	}),
	'费控停电成功率': (params) => axios({
		url: 'ach/getPcManDetails4',
		method: 'post',
		params: params
	}),
	'费控复电成功率': (params) => axios({
		url: 'ach/getPcManDetails3',
		method: 'post',
		params: params
	}),
	'终止发行比例': (params) => axios({
		url: 'ach/getPcManDetails5',
		method: 'post',
		params: params
	}),
	'低压线损率': (params) => axios({
		url: 'ach/getPcManDetails6',
		method: 'post',
		params: params
	}),
	'高损台区占比': (params) => axios({
		url: 'ach/getPcManDetails7',
		method: 'post',
		params: params
	}),
	'负损台区占比': (params) => axios({
		url: 'ach/getPcManDetails8',
		method: 'post',
		params: params
	}),
	'经济运行台区占比': (params) => axios({
		url: 'ach/getPcManDetails9',
		method: 'post',
		params: params
	}),
	'高负损台区消缺及时率': (params) => axios({
		url: 'ach/getPcManDetails10',
		method: 'post',
		params: params
	}),
	'电费结零率': (params) => axios({
		url: 'ach/getPcManDetails11',
		method: 'post',
		params: params
	}),
	'配电异常台区次数': (params) => axios({
		url: 'ach/getPcManDetails12',
		method: 'post',
		params: params
	}),
	'现场复电及时率': (params) => axios({
		url: 'ach/getPcManDetails13',
		method: 'post',
		params: params
	}),
	'投诉意见工单数量': (params) => axios({
		url: 'ach/getPcManDetails14',
		method: 'post',
		params: params
	}),
	'运维抢修到达及时率': (params) => axios({
		url: 'ach/getPcManDetails15',
		method: 'post',
		params: params
	}),
	'计量消缺及时率': (params) => axios({
		url: 'ach/getPcManDetails16',
		method: 'post',
		params: params
	})
}
