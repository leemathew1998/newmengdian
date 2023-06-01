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
export const MAP_NAME_TO_SORT = {
  '国网内蒙古东部电力有限公司满洲里市供电分公司': '国网满洲里市供电公司',
  '国网内蒙古东部电力有限公司根河市供电分公司': '国网根河市供电公司',
  '国网内蒙古东部电力有限公司扎兰屯市供电分公司': '国网扎兰屯市供电公司',
  '国网内蒙古东部电力有限公司牙克石市供电分公司': '国网牙克石市供电公司',
  '国网内蒙古东部电力有限公司伊敏供电分公司': '国网伊敏供电公司',
  '国网内蒙古东部电力有限公司阿荣旗供电分公司': '国网阿荣旗供电公司',
  '国网内蒙古东部电力有限公司莫力达瓦达斡尔族自治旗供电分公司': '国网莫力达瓦达斡尔族自治旗供电公司',
  '国网内蒙古东部电力有限公司额尔古纳市供电分公司': '国网额尔古纳市供电公司',
  '国网内蒙古东部电力有限公司鄂伦春自治旗供电分公司': '国网鄂伦春自治旗供电公司',
  '国网内蒙古东部电力有限公司陈巴尔虎旗供电分公司': '国网陈巴尔虎旗供电公司',
  '国网内蒙古东部电力有限公司新巴尔虎左旗供电分公司': '国网新巴尔虎左旗供电公司',
  '国网内蒙古东部电力有限公司鄂温克族自治旗供电分公司': '国网鄂温克族自治旗供电公司',
  '国网内蒙古东部电力有限公司新巴尔虎右旗供电分公司': '国网新巴尔虎右旗供电公司'
}
export const getAllStation = async () => {
  const res = await getAllStationForCorg()
  let batchList = []
  let returnList = []
  res.forEach(item => {
    let orgName = ''
    if (MAP_NAME_TO_SORT[item.orgName]) {
      orgName = MAP_NAME_TO_SORT[item.orgName]
    } else {
      orgName = item.orgName.replace('国网内蒙古东部电力有限公司', '国网').replace('分', '')
    }
    returnList.push({
      value: item.orgNo,
      label: orgName,
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
