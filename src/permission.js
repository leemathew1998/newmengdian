import Vue from "vue";
import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { constantRouterMap, roleOne } from "@/config/router.config";
NProgress.configure({
  showSpinner: false,
});
const whiteList = ["/user/login", "/404", "/overView", "/overView1"]; // no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  console.log("router enter", to.path);
  if (whiteList.includes(to.path)) {
    next();
  } else {
    // next()
    if (store.getters.token) {
      if (to.meta.roles.includes(store.getters.role)) {
        next();
      } else {
        // 此处证明他为台区经理，跳转到他台区经理绩效界面
        if (to.path == "/achievements") {
          next({
            path: "/achievements/manger",
          });
        } else {
          next({
            path: "/404",
          });
        }
      }
    } else {
      // next();
      // next({
      //   path: "/overView?redirect=" + to.path,
      // });
      next({
        path: "/user/login?redirect=" + to.path,
      });
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
