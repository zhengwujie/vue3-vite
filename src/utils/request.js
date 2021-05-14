import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import config from '~/config'
import tokenUtils from './token-utils'



// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config.baseUrl
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
// axios.defaults.withCredentials = true
// 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['ctoken'] = tokenUtils.getToken() || ''
// 默认 post 请求，使用 application/json 形式
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求前置配置
axios.interceptors.request.use(
    config => {
      const ctoken = tokenUtils.getToken()
      if (ctoken) {
        config.headers['ctoken'] = ctoken
      }
      return config
    },
    function(err) {
      return Promise.reject(err)
    }
)

// 请求后置处理
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    ElMessage.error('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.message) ElMessage.error(res.data.message)
    if (res.data.code == 419) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data.data
})

export default axios
