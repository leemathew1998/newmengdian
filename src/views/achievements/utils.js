export const sortRanking = (data) => {
	data.sort((prev, next) => {
		return Number(next.toPoint) - Number(prev.toPoint)
	})
	data.map((item, index) => {
		item['ranking'] = index + 1
	})
	return data
}
