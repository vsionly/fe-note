热更新原理
1、Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)
2、页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端
3、客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash
4、修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端
5、客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档
6、hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，重新 render 组件， 继而实现 UI 无刷新更新。