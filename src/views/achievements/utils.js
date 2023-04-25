import {
  postAction
} from '@/api/manage'
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
	'采集成功率': (url) => postAction(url)
}
