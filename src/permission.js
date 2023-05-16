import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
NProgress.configure({
  showSpinner: false
})
const whiteList = ['/user/login', '/404', '/overView', '/overView1'] // no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log('router enter', to)
  if (whiteList.includes(to.path)) {
    next()
  } else {
    console.log(store.getters.username)
    if (store.getters.username) {
      if (to.path === '/roleManagement') {
        if (store.getters.isManage == 1) {
          next()
        } else {
          next({
            path: '/404'
          })
        }
      } else {
        next()
      }
    } else if (to.query && to.query.forcedRouting) {
      if (to.path === '/roleManagement') {
        if (store.getters.isManage == 1) {
          next()
        } else {
          next({
            path: '/404'
          })
        }
      } else {
        next()
      }
    } else {
      next()
      // next({
      //   path: '/overView?redirect=' + to.path
      // })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 *         // if (to.path == '/achievements') {
        //   next({
        //     path: '/achievements/manger'
        //   })
        // } else {
        //   next({
        //     path: '/404'
        //   })
        // }
 */
