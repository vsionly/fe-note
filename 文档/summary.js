*************
| interview |
*************
******************************************************************************
  html、css的个人见解
  不看代码 光看页面的话 css无法区分水平高低
  同样的效果可以用很多方式实现出来，
  怎么用最少的代码实现 就体现了个人水平
  充分利用 继承、默认属性、伪元素

******************************************************************************
  足够牛之后
  跟任何人联调 有错误 能定位到其他人的错误 原因  不仅是自己知识范围内的

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
  对象的属性描述符
  1、数据描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的
  Object.defineProperty(obj, "key", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "static"
  });

  2、存取描述符。存取描述符是由 getter 函数和 setter 函数所描述的属性。

  **一个对象属性的描述符只能是其中之一；不能同时是两者。**

  function withValue(value) {
      * 高效写法，提升对象的赋值速度，有值后直接寻址，
      * 无值的时候，创建对象既要在栈内存存指针，又要在堆内存存值
      var d = withValue.d || (
          withValue.d = {
              enumerable: false,
              writable: false,
              configurable: false,
              value: null
          }
      );
      d.value = value;
      return d;
  }

             | configurable | enumerable |  value | writable |   get  |  set
  ----------------------------------------------------------------------------
  数据描述符  |   可以       |    可以    |  可以   |   可以   |  不可以 | 不可以
  ----------------------------------------------------------------------------
  存取描述符  |   可以       |    可以    |  不可以 |   不可以  |  可以  |  可以


  使用点运算符和 Object.defineProperty() 为对象的属性赋值时，数据描述符中的属性默认值是不同的

  o.a = 1;
  // 等同于：
  Object.defineProperty(o, "a", {
    value: 1,
    writable: true,
    configurable: true,
    enumerable: true
  });


Object.defineProperty(o, "a", { value : 1 });
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
******************************************************************************
  vue源码解读
  一、模板到真实节点的过程
    模板解析成AST树;
    AST树生成可执行的render函数;
    render函数转换为Vnode对象;
    根据Vnode对象生成真实的Dom节点。
******************************************************************************
