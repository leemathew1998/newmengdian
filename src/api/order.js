import { axios } from '@/utils/request'

export function upload(parameter) {
  return axios({
    url: '/excel/upload',
    method: 'post',
    data: parameter
  })
}
export function getAllStationForCorg() {
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
      label: item.orgName.replace('国网内蒙古东部电力有限公司', '国网'),
      children: []
    })
    batchList.push(getAllStationByCorg(item.orgNo))
  })
  const allSorg = await Promise.all(batchList)
  allSorg.forEach((station, index) => {
    station.forEach(item => {
      returnList[index].children.push({
        value: item.orgNo,
        label: item.orgName
      })
    })
  })
  return returnList
}
