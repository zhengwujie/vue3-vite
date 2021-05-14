import router from '@/router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import tokenUtils from '@/common/utils/token-utils'

NProgress.configure({ showSpinner: true })

/**
 * 白名单配置
 * @type {string[]}
 */
const whiteList = ['/login']

/**
 * 路由前置事件
 */
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 判断是否登录
    if (tokenUtils.checkAuth()) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            console.info('checkAuth true')
            if (to.path === '/') {
                next(`/stream-summary/index`)
            }
            if (/index.html/.test(to.path)) {
                next(`/stream-summary/index`)
            }
            next()
        }
    } else {
        console.info('checkAuth false')
        // 白名单
        if (to.path && whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next(`/login`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
