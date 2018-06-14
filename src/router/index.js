import Vue from 'vue'
import Router from 'vue-router'
import Components from '@/view'
import iview from 'iview'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: Components.Login
  }, {
    path: '/',
    name: 'index',
    meta: {
      title: 'index - 首页'
    },
    component: Components.Index
  }, {
    path: '*',
    name: 'error-404',
    meta: {
      title: '404 - 访问错误'
    },
    component: Components.Error_404
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  iview.LoadingBar.start()  
})

router.afterEach(to => {
  iview.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
