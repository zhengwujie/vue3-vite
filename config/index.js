const environmentConfiguration = {
  development: {
    baseUrl: '/api' // 测试接口域名
  },
  beta: {
    baseUrl: 'xxxx'
    // baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 测试接口域名
  },
  release: {
    baseUrl: 'xxxx'
    // baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1' // 正式接口域名
  }
}

export default {
  environmentConfiguration:environmentConfiguration[import.meta.env.MODE]
}
