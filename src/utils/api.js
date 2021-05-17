// api接口
import request from './request'
export default {
    //demo
    appLogin(params) {
        return request.post('/app/login', params)
    },
}
