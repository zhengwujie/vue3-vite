import axios from 'axios'
import config from '~/config'
import tokenUtils from './token-utils'
import eltool from './el-utils'
import ext from './ext'
axios.defaults.baseURL = config.baseUrl


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
axios.interceptors.response.use(
    res => {
        if (res.status === 200) {
            if (!getCodeMsg(res.data)) {
                return Promise.reject(res.data)
            }
        }

        return res.data
    },
    err => {
        const errMsg = err.toString()
        const code = errMsg.substr(errMsg.indexOf('code') + 5)
        if (!getStatusMsg(parseInt(code))) {
            if (parseInt(code) === 401) {
                ext.loginOut()
            }
        }
        return Promise.reject(err)
    })

/**
 * 网络请求获取业务code 转移提醒
 * @param code
 * @returns {boolean}
 */
function getCodeMsg(data) {
    if (data.code === 0) {
        return true
    } else if (data.code === -1) {
        eltool.errorMsg('糟糕，网络开小差，请重新操作！')
        return false
    } else {
        eltool.errorMsg(data.message)
        return false
    }
}

/**
 * 获取响应状态 转义提醒
 * @param code
 * @returns {boolean}
 */
function getStatusMsg(code) {
    switch (code) {
        case 401:
            eltool.errorMsg('登录凭证已失效，请重新登录！')
            return false
        case 403:
            eltool.errorMsg('没有操作权限！')
            return false
        case 500:
            eltool.errorMsg('糟糕，网络开小差，请重新操作！')
            return false
        case 404:
            eltool.errorMsg('请求地址找不到！')
            return false
        default:
            return true
    }
}

export default axios
