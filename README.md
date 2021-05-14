####目录结构描述

```
|-- build                           // 项目构建(webpack)相关代码
   |-- build.js                     // 生产环境构建代码
   |-- check-version.js             // 检查node、npm等版本
   |-- ip.js                        // 配置ip地址
   |-- utils.js                     // 构建配置公用工具相关
   |-- vue-loader.conf.js           // vue加载器
   |-- webpack.base.conf.js         // webpack基础配置
   |-- webpack.dev.conf.js          // webpack开发环境配置
   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                          // 项目开发环境配置
   |-- dev.env.js                   // 开发环境变量
   |-- index.js                     // 项目一些配置变量
   |-- prod.env.js                  // 生产环境变量
   |-- test.env.js                  // 测试环境变量
|-- node_modules                    // 项目依赖的模块
|-- src                             // 源码目录
   |-- assets                       // 静态资源
        |-- image                   // 图片库（jpg/png等等）
        |-- styles                  // css初始库、scss变量和方法等
   |-- common                       // 公共方法库
   |-- components                   // vue公共组件
        |-- basics                  // 基础组件
        |-- business                // 业务组件
        |-- index.js                // 部分组件统一入口（form表单组件）
   |-- config                       // （dev开发/sit测试/prod生产）环境配置
   |-- constant                     // 常量存储（字典、配置路径等等）
   |-- icons                        // icons(存svg图标)
   |-- mixins                       // 混入
   |-- router                       // 路由模块
        |-- config                  // 路由配置
        |-- modules                 // 路由url引入
        |-- index.js                // 路由注入
   |-- service                      // serve服务
        |-- api                     // 接口存储
        |-- ext                     // 接口二次封装处理
   |-- store                        // vuex的状态管理
   |-- view                         // 静态文件
        |-- system                  // 系统页面文件
        |-- business                // 业务页面文件
   |-- App.vue                      // 页面入口文件（根组件）
   |-- global.js                    // 全局入口
   |-- main.js                      // 程序入口文件，加载各种公共组件（入口js文件）
|-- static                          // 静态文件，比如一些图片，json数据等
|-- .babelrc                        // ES6语法编译配置
|-- .editorconfig                   // 定义代码格式
|-- .gitignore                      // git上传需要忽略的文件格式
|-- README.md                       // 项目说明
|-- index.html                      // 入口页面
|-- package.json                    // 项目基本信息
```

##开发规范



背景图片、字体图标
本地背景图片、字体图标的引用路径推荐使用以 ~@ 开头的绝对路径。

image 图标命名统一用 icon-拼音.png

css 单位统一使用 px,以 IPONE6 375 作为基准，设计稿 750 ，禁止使用 px 以外单位


##命名规范
除了函数、常量和缓存store使用驼峰式
路由命名：路由名称首字母大写+驼峰
所有文件夹命名/文件命名/样式命名必须以-(横杆)为准

Components 组件区块
features：功能组件（例如日期，字典组件....）
module:页面块组件
page：中间页组件（例如通讯录）

---

文件规则
edit 命名使用文件（新增、查看、编辑）
list 列表页面

### TODO

发布要注意根路径
参考文章：
https://blog.csdn.net/u012230055/article/details/98208065
