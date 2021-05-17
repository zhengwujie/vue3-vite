
const constantRouterMap = [
    // 翻译
    {
        path: '/translations/index',
        name: 'TranslationsIndex',
        component: () => import('@/views/business/translations/index.vue')
    },
]
export default constantRouterMap
