import { axios } from '@/utils/request'

export function upload(parameter) {
  return axios({
    url: '/excel/upload',
    method: 'post',
    data: parameter
  })
}
function getAllStationForCorg() {
  return axios({
    url: 'coll/getCorg',
    method: 'post'
  })
}
function getAllStationByCorg(orgNo) {
  return axios({
    url: 'coll/getSorg',
    method: 'post',
    params: {
      orgNo
    }
  })
}

export const getAllStation = async () => {
  const res = await getAllStationForCorg()
  let batchList = []
  let returnList = []
  res.forEach(item => {
    returnList.push({
      value: item.orgNo,
      label: item.orgName,
      children: []
    })
    batchList.push(getAllStationByCorg(item.orgNo))
  })
  console.warn('getAllStationForCorg', res)
  const allSorg = await Promise.all(batchList)
  allSorg.forEach((station, index) => {
    station.forEach(item => {
      returnList[index].children.push({
        value: item.orgNo,
        label: item.orgName
      })
    })
  })
  console.warn('returnList', returnList)
  return returnList
}
