import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/view'
import iview from 'iview'
import { getToken } from '@/libs/util'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: Page.Login
  }, {
    path: '/',
    name: 'index',
    component: Page.Main,
    redirect: '/home',
    meta: {
      requireAuth: true // 是否需要认证
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: 'home - 首页', // title属性
        },        
        component: Page.Home
      }
    ]
  }, {
    path: '*',
    name: 'error-404',
    meta: {
      title: '404 - 访问错误'
    },
    component: Page.Error_404
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})

// 进入页面之前执行的操纵
router.beforeEach((to, from, next) => {
  iview.LoadingBar.start()
  // 动态改变页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 获取token
  const token = getToken()
  // 验证访问页面是否需要授权
  if (to.matched.some(record => record.meta.requireAuth)) {
    if(!token && to.path != '/login') {
      // 未登录
      next({
        name: 'login'
      })
    }else {
      next()
    }
  } else if(token && to.path == '/login') { // token存在，并且访问login
    next({
      name: 'index'
    })
  } else {
    next()
  }
  
})

// 完成页面跳转之后关掉加载进度条，页面滚动条复位
router.afterEach(to => {
  iview.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
