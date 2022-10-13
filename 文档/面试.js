******************************************************************************
    入行、学习成长的方法

    1、小程序 公众号h5跳转小程序
    2、vue 用.env的 高级用法
         写vue的 样式的时候 有什么遵守的规则 么 比如 通用的样式怎么写 组件内的样式怎么写
         vue自定义组件的  v-model

    3、element-ui 配合vue router 选默认选中  http://211.154.163.93:8126/
    4、vue的生命周期函数、axios前置钩子统一加anthor code 统一参数、路由守卫
    5、怎么确保操作是 dom更新完后  和 某个变量造成的dom更完新
    6、js方法 点击多次 是顺序输入还是 会乱序
    7、es6
    8、说说你对节流 防抖的 理解 平时用的多吗
    // 例一
    ({[Symbol.toStringTag]: 'Foo'}.toString())
    // "[object Foo]"

    // 例二
    class Collection {
      get [Symbol.toStringTag]() {
        return 'xxx';
      }
    }
    let x = new Collection();
    Object.prototype.toString.call(x)  // "[object xxx]"
    8、管理项目 pm2 或者其他
    9、启动web服务
    11、css 继承思想 ，举例那些是可继承的
    12、查css 文档 在哪里查
    13、怎么破解密码 md5为例
    14、axios 统一处理返回  如果同时请求几个接口 报错了 怎么避免页面出现多个提示


    高阶
    1、scoped 的原理 ; 为啥scoped 里的样式 有时候怎么e ui 里不生效
    2、material里 input的标题怎么实现的
    3、Object.assign()方法实行的是浅拷贝，而不是深拷贝 而且不能拷贝 不可枚举属性 (属性名为 Symbol 除外)
    可枚举属性 影响 for in 、 Object.keys()、 JSON.stringify 其他函数可以自测

    const obj1 = {a: {b: 1}};
    const obj2 = Object.assign({}, obj1);

    obj1.a.b = 2;
    obj2.a.b // 2
    4、scoped css 为啥能生效
    5、svg name 引入 原理 xlink:href
    6、npm ls xx 查看项目下的某个包的版本
      npm view xxx 查看官方的包的信息 稳定版  测试版 等
      怎么确认某个包依赖的另一个包的版本
******************************************************************************
  简介
    1、js css html 基础扎实 灵活的实现各种布局页面、浏览器兼容
    2、主导所有项目的readme 内容优化，一个项目的readme 是最基础的东西 比如怎么启动项目 怎么部署测试、正式环境。优化项目的
     package.json 增加便捷命令 编译打包 部署 编译文件复制到view目录，防止打包期间项目不可用
    3、我的优势我觉得主要是知识面很广、基础很扎实，也不是说基础都能记得住，可以指导新人一些好的技巧，提高开发效率，包括但不限于从
    编辑器快捷键、组件功能的复用、怎么调试更方便、怎么写代码最好，但都知道对于怎么实现css最简单、写的代码最少有
    自己的经验总结，比如在父级的样式自己会复用，这些样式就不用再写了，比如定义的类怎么做到最好的复用，像mt10这样是自己总
    结出来的，不像很多人是从教程里学的，结合设计的模块化定义响应的模块化class，实现最小改动修改整个项目的样式。在我面试的
    过程中发现，其实现在很多人高级知识背的很熟，以为现在很多面试题给大家背，但其实基础一般，而且问一些思维性的东西就答不上来。

    1、了解serverless、faas、wasm
    2、知道mui、element ui等ui组件库部分组件的实现原理，对未使用到的组件也能通过读其源码研究他们的实现原理


    1、个人介绍：从年龄、工作年限、学历、最近2、3年做过的项目情况
      你好 面试官  我叫李伟生 来自山东潍坊 毕业于青岛理工大学
    2、具体的VUE项目有哪些功能、每个功能有哪些模块，自己做的哪个功能模块？
    3、某个功能模块的页面布局（页面设计图）是什么样的？代码是怎么实现？
    4、编译打包时不同环境是怎么区分相同变量的不同值的？原理是什么？底层是怎么实现的?
      在node中，有全局变量process表示的是当前的node进程。
      process.env包含着关于系统环境的信息
      DefinePlugin
      vue cli3 创建的项目
      "dev": "vue-cli-service serve", //本地开发运行，会把process.env.NODE_ENV设置为'development'
      "build": "vue-cli-service build", //默认打包模式，会把process.env.NODE_ENV设置为'production'

    5、iframe(跨端解决方案)使用过吗？使用iframe怎么进行通信？
      子级页面调用父级页面 window.parent.父级页面方法(args)
      document.getElementById("iframeID").contentWindow.子级页面方法(args)

      window.postMessage()  使用origin和source属性来检查消息的发送者的身份

    6、自定义组件需要定义哪些文件？怎么传递参数？如果要定义成样式可以变化的，应该怎么定义？
      load.vue 和 load.js
      load.js 核心是 引入load.vue 并实现  install（对象写法）或者 一个函数（函数写法） 它会被作为 install 方法
      install: function (Vue) {
        Vue.component('loading', loadCpt)
      }

    7、使用过哪些组件库？
    8、是否有动画效果经验？轮播图平滑切换效果应该怎么实现？
    9、Elenment-UI的form表单对某一个单独的字段进行校验，点击按钮手工进行校验？代码怎么实现？
    10、Elenment-UI的表格自定义过滤应该怎么实现？