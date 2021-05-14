import { createRouter, createWebHashHistory } from 'vue-router'
import pkg from '../../package.json'


import system from './modules/system'
import business from './modules/business'

const routes = [...system, ...business]


// base 处理
let base = '/'
if (process.env.NODE_ENV === 'test') {
  base = `/${pkg.name}/`
}


const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: routes,
  base:base
})

export default router
