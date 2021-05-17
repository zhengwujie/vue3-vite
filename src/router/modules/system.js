const constantRouterMap = [
  // { path: '*', component: () => import('@/views/system/error-page/404') },
  // {
  //   name: 'login',
  //   path: '/login',
  //   component: () => import('@/views/system/login'),
  //   hidden: true
  // }
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login.vue')
  },
]
export default constantRouterMap
