import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import router from '@/router/index'
import cookie from '@/utils/cookie.js'
import { ACCESS_TOKEN, TENANT_ID } from '@/store/mutation-types'
import { notification } from 'ant-design-vue'
/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/jeecg-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
// let apiBaseUrl = window._CONFIG['domianURL'] || '/jeecg-boot'
let apiBaseUrl = '/api/'
// console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  // baseURL: '/jeecg-boot',
  baseURL: apiBaseUrl, // api base_url
  timeout: 90000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    console.log('------异常响应------', token)
    console.log('------异常响应------', error.response.status)
    switch (error.response.status) {
      case 403:
        Vue.prototype.$Jnotification.error({
          message: '系统提示',
          description: '拒绝访问',
          duration: 4
        })
        break
      case 500:
        console.log('------error.response------', error.response)
        // update-begin- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
        let type = error.response.request.responseType
        if (type === 'blob') {
          blobToJson(data)
          break
        }
        // update-end- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
        if (token && data.message.includes('Token失效')) {
          // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
          if (/wxwork|dingtalk/i.test(navigator.userAgent)) {
            Vue.prototype.$Jmessage.loading('登录已过期，正在重新登陆', 0)
          } else {
            Vue.prototype.$Jmodal.error({
              title: '登录已过期',
              content: '很抱歉，登录已过期，请重新登录',
              okText: '重新登录',
              mask: false,
              onOk: () => {
                store.dispatch('Logout').then(() => {
                  Vue.ls.remove(ACCESS_TOKEN)
                  try {
                    let path = window.document.location.pathname
                    console.log('location pathname -> ' + path)
                    if (path != '/' && path.indexOf('/user/login') == -1) {
                      window.location.reload()
                    }
                  } catch (e) {
                    window.location.reload()
                  }
                })
              }
            })
          }
          // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
        }
        break
      case 404:
        Vue.prototype.$Jnotification.error({
          message: '系统提示',
          description: '很抱歉，资源未找到!',
          duration: 4
        })
        break
      case 504:
        Vue.prototype.$Jnotification.error({
          message: '系统提示',
          description: '网络超时'
        })
        break
      case 401:
        Vue.prototype.$Jnotification.error({
          message: '系统提示',
          description: '很抱歉，登录已过期，请重新登录',
          duration: 4
        })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
        break
      default:
        Vue.prototype.$Jnotification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  } else if (error.message) {
    if (error.message.includes('timeout')) {
      Vue.prototype.$Jnotification.error({
        message: '系统提示',
        description: '网络超时'
      })
    } else {
      Vue.prototype.$Jnotification.error({
        message: '系统提示',
        description: error.message
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {}
    }
    if (!store.getters.username && config.url.indexOf('SysUser') === -1) {
      // store.commit('clearUserInfo', [])
      // notification['warning']({
      //   message: '登录异常！请重新登录！但是先不处理',
      //   duration: 4
      // })
      // router.push({
      //   name: '/overView',
      //   params: {
      //     needLogin: false
      //   }
      // })
    }
    // console.log('request config', config)
    let userName = cookie.getCookie('userName')
    config.params['loginName'] = userName || 'test'
    config.params['loName2'] = store.getters.username || 'test'
    config.params['role'] = store.getters.role || 'test'
    config.headers['Authorization'] = store.getters.token // 让每个请求携带自定义 token 请根据实际情况自行修改
    // if (config.url.indexOf("/file/upload") !== -1) {
    //   config.headers["Content-Type"] = "multipart/form-data";
    // }
    return config
  },
  (error) => {
    console.log(error, 'request error')
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use((response) => {
  // if (response.data.code == '20001' || response.data.code == '30000' ||
  // 	response.data.code == '40040' || response.data.code == '50000') {
  if (
    response.data.code == '30000' ||
    response.data.code == '40040' ||
    response.data.code == '50000'
  ) {
    // token 失效，重新登陆
    console.log('token失效')
    console.log('response', response)
    store.commit('clearUserInfo', [])
    console.log('与张升测试ISC，在此处修改跳转，如需要改变，直接切换即可！')
    router.push('/overView')
    // router.push("/user/login");
  } else {
    // console.log('else')
    return response.data
  }
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}
/**
 * Blob解析
 * @param data
 */
function blobToJson(data) {
  let fileReader = new FileReader()
  let token = Vue.ls.get(ACCESS_TOKEN)
  fileReader.onload = function () {
    try {
      let jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
      console.log('jsonData', jsonData)
      if (jsonData.status === 500) {
        console.log('token----------》', token)
        if (token && jsonData.message.includes('Token失效')) {
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              store.dispatch('Logout').then(() => {
                Vue.ls.remove(ACCESS_TOKEN)
                window.location.reload()
              })
            }
          })
        }
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      console.log('blob解析fileReader返回err', err)
    }
  }
  fileReader.readAsText(data)
}

export { installer as VueAxios, service as axios }
