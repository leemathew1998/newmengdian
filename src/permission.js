import router from './router'
import store from './store'
import NProgress from 'nprogress'
NProgress.configure({
  showSpinner: false
})
const whiteList = ['/404', '/overView', '/overView1'] // no redirect whitelist

let solvePathAndQuery = null
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log('router enter', to)
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (store.getters.username || (to.query && to.query.forcedRouting)) {
      if (to.path === '/roleManagement') {
        if (store.getters.isManage) {
          next()
        } else {
          next({
            path: '/404'
          })
        }
      } else if (to.path.indexOf('achievements') !== -1) {
        // 进入绩效，需要判断用户角色进入相应的页面！
        next()
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
// 绩效判断
solvePathAndQuery = () => {
  let role = store.getters.role
  if (role == 1) {

  } else if (role == 2) {

  }
}
