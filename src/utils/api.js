// api接口
import request from './request'
export default {
    //demo
    demo(params) {
        return request.get('/list', {params: params})
    },
}
