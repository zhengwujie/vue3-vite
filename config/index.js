const environmentConfiguration = {
  development: {
    baseUrl: 'http://192.168.0.239:8086/date-web-api' // 测试接口域名
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

export default environmentConfiguration[import.meta.env.MODE]
