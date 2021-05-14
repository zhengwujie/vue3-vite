// 接口二次封装包装
import common from '@/utils/main'
import tokenUtils from '@/utils/token-utils'
import router from '@/router'
import api from '@/utils/api'
import $validate from '@/utils/validate'

export default {
    extDemo(param) {
        api.demo(param || {}).then((res) => {
            if (res.code == 0) {
                // xxxxxx
                return Promise.resolve(res)
            } else {
                // xxxxxx
                return Promise.reject(res)
            }
        }).catch((err) => {
            // xxxxxx
            return Promise.reject()
        })
    }
}
