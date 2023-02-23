import { postAction } from '@/api/manage'

// 我看了一下api底下的文件，感觉这种比较好一些，目前上传文件是用的这种模式来请求的。
export function uploadFile(parameter) {
  return postAction({
    url: '/excel/upload',
    method: 'post',
    data: parameter
  })
}
