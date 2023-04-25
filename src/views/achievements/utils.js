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
		url: 'ach/getCouDetails',
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
	})
}
