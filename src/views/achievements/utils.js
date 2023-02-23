export const sortRanking = (data) => {
	data.sort((prev, next) => {
		prev.toPoint - next.toPoint
	})
	data.map((item, index) => {
		item['ranking'] = index + 1
	})
	return data
}
