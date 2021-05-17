// 接口二次封装包装
import common from '@/utils/main'
import tokenUtils from '@/utils/token-utils'
import router from '@/router'
import api from '@/utils/api'
import $validate from '@/utils/validate'
import {ElMessage} from 'element-plus'
export default {
    // 退出登录
    loginOut() {
        // 需要清除的存储数据
        // const storeArr = ['token', 'ctoken', 'userInfo', 'system']
        // storeArr.forEach(key => {
        //     if (key) {
        //         common.setKeyVal(key, '', true)
        //     }
        // })
        // 删除token
        // tokenUtils.removeToken()
        // common.setKeyVal('system', 'userInfo', {}, true)
        // common.setKeyVal('system', 'avatar', '', true)
        // common.setKeyVal('system', 'nickName', '', true)
        router.push({ name: 'Login' })
        ElMessage({
            type: 'success',
            message: 'login out success!'
        })
        // return Promise.resolve()
    },
}
