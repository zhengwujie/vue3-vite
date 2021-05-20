import {createApp} from 'vue'
import {
    ElButton,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElSubmenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElForm,
    ElFormItem,
    ElInput,
    ElPopover,
    ElTag,
    ElCard,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElPopconfirm,
    ElUpload,
    ElLoading,
    ElSelect,
    ElOption,
    ElRadioGroup,
    ElRadio,
    ElCascader,
    ElCheckbox,
    ElInputNumber
} from 'element-plus'
import App from './App.vue'


// 修改后的主题样式必须放在最后面
// import '../theme/index.css'

// 业务样式
import '@/assets/styles/index.scss'

import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

// 工具类
import utils from './utils/index'

Object.keys(utils).forEach(key => {
    app.config.globalProperties[key] = utils[key]
})

import store from "@/store"

app.use(store)

import $router from '@/router/index'

app.use($router)

import PageFrame from '@/component/layout/page-frame.vue'
app.component('PageFrame', PageFrame)

// 引入组件库组件
import customerBaseComponents from 'customer-base-components'
Object.keys(customerBaseComponents).forEach(key => {
    app.component(key, customerBaseComponents[key])
})

app.use(ElButton)
    .use(ElContainer)
    .use(ElAside)
    .use(ElHeader)
    .use(ElMain)
    .use(ElFooter)
    .use(ElMenu)
    .use(ElSubmenu)
    .use(ElMenuItemGroup)
    .use(ElMenuItem)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElPopover)
    .use(ElTag)
    .use(ElCard)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElPagination)
    .use(ElDialog)
    .use(ElPopconfirm)
    .use(ElUpload)
    .use(ElLoading)
    .use(ElSelect)
    .use(ElOption)
    .use(ElRadioGroup)
    .use(ElRadio)
    .use(ElCascader)
    .use(ElCheckbox)
    .use(ElInputNumber)

app.mount('#app')

