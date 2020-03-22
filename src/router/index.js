import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// next 表示放行
//   next() 放行
//   next('/login') 强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  } else {
    next()
  }
})

export default router
