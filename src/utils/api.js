// api接口
import request from './request'

export default {
    //登录
    appLogin(params) {
        return request.post('/login', params)
    },
    //翻译列表
    appGetTranslationsList(params) {
        return request.get('/getTranslationsList', {params: params})
    },
    //保存Note
    appSaveTranslationsNote(params) {
        return request.post('/saveTranslationsNote', params)
    },
    //保存附件
    appSaveTranslationsAttachment(params) {
        return request.post('/saveTranslationsAttachment', params)
    },
    //保存翻译list
    appSaveTranslations(params) {
        return request.post('/saveTranslations', params)
    },
    //查询对比线上数据
    appGetChangeTranslations(params) {
        return request.get('/getChangeTranslations', {params: params})
    },
    //发布到线上
    appReleaseTranslations(params) {
        return request.post('/releaseTranslations', params)
    },
    //发布到线上
    appFileAttachment(params) {
        return request.post('/file/attachment', params)
    },
}
