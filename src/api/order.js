import api from './index'
import { axios } from '@/utils/request'

export function upload(parameter) {
    return axios({
      url: '/excel/upload',
      method: 'post',
      data: parameter
    })
  }