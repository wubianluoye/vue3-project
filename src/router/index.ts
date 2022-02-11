import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Layout = import('@/layout/index.vue')

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
    component: () => Layout,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/index/index.vue'),
        meta: { title: '首页', isTabBar: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('@/views/login/index.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/centerpage',
    name: 'CenterPage',
    redirect: '/center',
    component: () => Layout,
    children: [
      {
        path: '/center',
        name: 'Center',
        component: ()=> import('@/views/home/index.vue'),
        meta: { title: '个人中心', isTabBar: true  }
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})



router.beforeEach((to, from, next) =>{
  const token = localStorage.getItem('token')
  const hasLR = ['/login', '/register'].indexOf(to.path)
  
  if(!token && hasLR === -1) {
    return next('/login')
  }

  if(token && hasLR > -1){
    return next('/')
  }

  // 设置窗口标题
  document.title = to.meta.title as string
  next()
})

export default router