const environmentConfiguration = {
  development: {
    baseUrl: 'http://192.168.0.239:8086/date-web-api/app' // 测试接口域名
  },
  beta: {
    baseUrl: '/'
  },
  release: {
    baseUrl: '/'
  }
}

export default environmentConfiguration[import.meta.env.MODE]
