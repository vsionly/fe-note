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
******************************************************************************
