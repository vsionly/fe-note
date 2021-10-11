******************************************************************************
html、css的个人见解
不看代码 光看页面的话 css无法区分水平高低
同样的效果可以用很多方式实现出来，
怎么用最少的代码实现 就体现了个人水平
充分利用 继承、默认属性、伪元素

******************************************************************************
完全冻结一个对象
1、const obj 声明这个对象
2、Object.freeze(obj) 遍历 Object.getOwnPropertyNames(obj)深冻结
3、Object.create(null) 或者 冻结原型链的数据(难度很大)

其他知识：

1、利用Object.freeze()提升性能
    当你把一个普通的 JavaScript 对象传给 Vue 实例的  data  选项，Vue 将遍历此对象所有的属性，并使用  Object.defineProperty  把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。
    但 Vue 在遇到像 Object.freeze() 这样被设置为不可配置之后的对象属性时，不会为对象加上 setter getter 等数据劫持的方法。参考Vue源码(vue会检测对象键的prop.configurable false时 不设置双向绑定)

2、锁定对象的方法

    Object.preventExtensions()

    no new properties or methods can be added to the project
    对象不可扩展, 即不可以新增属性或方法, 但可以修改/删除

    Object.seal()

    same as prevent extension, plus prevents existing properties and methods from being deleted
    在上面的基础上，对象属性不可删除, 但可以修改

    Object.freeze()

    same as seal, plus prevent existing properties and methods from being modified
    在上面的基础上，对象所有属性只读, 不可修改
    以上三个方法分别可用Object.isExtensible(), Object.isSealed(), Object.isFrozen()来检测，都可以设置configurable为false

    function getConfigurable (o, k) {
        var prop = Object.getOwnPropertyDescriptor(o, k)
        return prop && prop.configurable
    }
******************************************************************************

******************************************************************************
