import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes
})

//强制用户登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (sessionStorage.user) { // 判断当前的user是否存在 ； 登录存入的user
      next();
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    next();
  }
})

export default router