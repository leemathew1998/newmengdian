import { axios } from '@/utils/request'

export function list(parameter) {
    return axios({
      url: 'api/collect/list',
      method: 'get',
      data: parameter
    })
  }

  export function records(parameter) {
    return axios({
      url: 'api/superiorOriginal/selectAll',
      method: 'get',
      data: parameter
    })
  }
  