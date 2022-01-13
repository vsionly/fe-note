*************
| interview |
*************
******************************************************************************
  html、css的个人见解
  不看代码 光看页面的话 css无法区分水平高低
  同样的效果可以用很多方式实现出来，
  怎么用最少的代码实现 就体现了个人水平
  充分利用 继承、默认属性、伪元素

  js
  最快的写法要根据使用场景来定

  vue的源码 根据双向绑定的源码 可以知道可以通过冻结对象优化大对象渲染页面， 前提是不需要双向绑定

******************************************************************************
  足够牛之后
    跟任何人联调 有错误 能定位到其他人的错误原因  不仅是自己知识范围内的
  头脑灵活
    一个任务来了 该让谁管理项目 谁参与 不能乱分 比如不给项目经理管理权限。。。

******************************************************************************
  大前端 FULL-STACK DEVELOPMENT
    1.理论上 fe be db

    2.真正能够支撑业务的full-stack架构，至少分为四层。
      第一层，是核心业务逻辑，前、后端功能、API、数据
      第二层，是业务架构，具体包括应用框架、技术架构、数据库等
      第三层：是业务运维，包括日志、监控告警、扩展性、负载均衡等
      第四层：是底层架构，包括计算资源、系统及网络安全、灾备等

******************************************************************************
  javascript
    1、Scope 作用域
      在js中可以理解为程序执行的当前环境，又称为上下文。 The current context of execution.
      作用域有层级的概念，子作用域可以访问父作用域，反之则不行。 Scopes can also be layered in a hierarchy

    2、closure 闭包
      函数及函数对其周围状态 (the lexical environment 词法环境) 的引用 (变量、子函数等函数内的代码块) 就称为闭包.
      函数创建时就创建了闭包。
      闭包使您可以从内部函数访问外部函数的作用域。
      词法（lexical）一词指的是，词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。

      * 闭包的主要表现 就是内部函数维持了一个对它的词法环境（外部函数的某个变量）的引用。

      *  这个例子中的name 每次调用 myFunc 都会累加一次
      *  function makeFunc() {
      *      var name = 10;
      *      function displayName() {
      *          console.log(name++);
      *      }
      *      displayName()
      *      return displayName;
      *  }
      *
      *  var myFunc = makeFunc();
      *  myFunc(); // 10
      *  myFunc(); // 11
      *  ...

      ******************************************************************************
        function makeAdder(x) {
          return function(y) {
            return x + y;
          };
        }

        var add5 = makeAdder(5);
        var add10 = makeAdder(10);

        console.log(add5(2));  // 7
        console.log(add10(2)); // 12

        从本质上讲，makeAdder 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。
        add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 add5 的
        环境中，x 为 5。而在add10 中，x 则为 10。

      ******************************************************************************
        实现面向对象
        function makeSizer(size) {
          return function() {
            document.body.style.fontSize = size + 'px';
          };
        }

        var size12 = makeSizer(12);
        var size14 = makeSizer(14);

      ******************************************************************************
        模拟私有方法，私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能
        力，避免非核心的方法弄乱了代码的公共接口部分。
        这样使用闭包可以提交许多与面向对象编程相关的好处 (特别是数据隐藏和封装.)
        var Counter = (function() {
          var privateCounter = 0;
          function changeBy(val) {
            privateCounter += val;
          }
          return {
            increment: function() {
              changeBy(1);
            },
            decrement: function() {
              changeBy(-1);
            },
            value: function() {
              return privateCounter;
            }
          }
        })();
        // privateCounter 相当于私有变量
        // changeBy 相当于私有方法
        console.log(Counter.value()); /* 0 */
        Counter.increment();
        Counter.increment();
        console.log(Counter.value()); /* 2 */
        Counter.decrement();
        console.log(Counter.value()); /* 1 */

      ******************************************************************************
    3、事件循环
      JS的代码执行是基于一种事件循环的机制，所以称作事件循环。

      程序运行时，同步任务进入主线程，即主执行栈，异步任务进入任务队列。主线程内的任务(宏任务) 执行完毕 (每个宏任务结束后,
      都要清空所有的微任务)，会去任务队列读取其中的任务，推入主线程执行，上述过程不断重复就是我们说的 EventLoop (事件循
      环) 每一次循环操作称为一次tick.

      macro task 宏任务  script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)
      micro task 微任务  Promise、MutaionObserver、process.nextTick(Node.js 环境)

      ** node环境中(依赖libuv引擎) process.nextTick会优先其他微任务先执行 **

      ******************************************************************************
      1、最好的js循环动画写法
        function render (argument) {
          动画处理代码
        }
        (function animloop() {
            render();
            window.requestAnimationFrame(animloop);
        })();

      2、

******************************************************************************

******************************************************************************
******************************************************************************
  完全冻结一个对象
  1、const obj 声明这个对象
  2、Object.freeze(obj) 遍历 Object.getOwnPropertyNames(obj)深冻结
  3、Object.create(null) 或者 冻结原型链的数据(比较复杂)

  其他知识：

  1、利用Object.freeze()提升性能
      当你把一个普通的 JavaScript 对象传给 Vue 实例的  data  选项，Vue 将遍历此对象所有的属性，并使用
      Object.defineProperty 把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，
      但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。
      但 Vue 在遇到像 Object.freeze() 这样被设置为不可配置之后的对象属性时，不会为对象加上 setter getter
      等数据劫持的方法。参考Vue源码(vue会检测对象键的prop.configurable false时 不设置双向绑定)

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

  1、o.a = 1;
    // 等同于：
    Object.defineProperty(o, "a", {
      value: 1,
      writable: true,
      configurable: true,
      enumerable: true
    });

  2、Object.defineProperty(o, "a", { value : 1 });
    // 等同于：
    Object.defineProperty(o, "a", {
      value: 1,
      writable: false,
      configurable: false,
      enumerable: false
    });
******************************************************************************
  AST(Abstract Syntax Tree)抽象语法树
    一、定义
    AST是源代码的抽象语法结构的树状表示，这种数据结构其实就是一个大的json对象。简单理解，就是把我们写的代码按照一定的规则
    转换成一种树形结构。
    二、AST的用途
    AST的作用不仅仅是用来在JavaScript引擎的编译上，我们在实际的开发过程中也是经常使用的，比如我们常用的babel插件将 ES6
    转化成ES5、使用 UglifyJS来压缩代码 、css预处理器、开发WebPack插件、Vue-cli前端自动化工具等等，这些底层原理都是基于
    AST来实现的，AST能力十分强大， 能够帮助开发者理解JavaScript这门语言的精髓。
******************************************************************************
  vue源码解读
  一、模板到真实节点的过程
    模板解析成AST树;
    AST树生成可执行的render函数;
    render函数转换为Vnode对象;
    根据Vnode对象生成真实的Dom节点。

  二、Vue组件复用使用V-slot，其中包含了匿名插槽、具名插槽、作用域插槽

    首先，进行 initRender 初始化
    然后，进行 renderSlot 挂载
    最后，进行 template 编译

    1、// 初始化生命周期、初始化事件、初始化render函数等
      Vue.prototype._init = function(){
          ...
          vm._self = vm
          initLifecycle(vm)
          initEvents(vm)
          initRender(vm)
          callHook(vm, 'beforeCreate')
          initInjections(vm) // resolve injections before data/props
          initState(vm)
          initProvide(vm) // resolve provide after data/props
          callHook(vm, 'created')
          ...
      }

      初始化：在initRender中,$slots与 $scopedSlots 挂载到了vdom 上，并对slot中的
      children进行遍历,并组合成slots对象并返回 resolveSlots()。

      // initRender 初始化
      initRender (vm: Component) {
          ...
          vm.$slots = resolveSlots(options._renderChildren, renderContext)
          vm.$scopedSlots = emptyObject
           ...
      }

      // resolveSlots 遍历，并组合成 slots 对象并返回
      function resolveSlots (
        children: ?Array<VNode>,
        context: ?Component
      ): { [key: string]: Array<VNode> } {
        const slots = {}
        for (let i = 0, l = children.length; i < l; i++) {
          const child = children[i]
          ...
          if ((child.context === context || child.fnContext === context) &&
            data && data.slot != null
          ) {
            // 具名插槽
            const name = data.slot
            const slot = (slots[name] || (slots[name] = []))
            if (child.tag === 'template') {
              slot.push.apply(slot, child.children || [])
            } else {
              // 匿名插槽
              slot.push(child)
            }
          } else {
            (slots.default || (slots.default = [])).push(child)
          }
          ...
          return slots
        }
      }

    **************************************************************************
    2、挂载：通过步骤1 生成了slots 对象，再经过renderSlot函数，分别处理对象或函数，
      生成nodes节点

      export function renderSlot (
        // 子组件中slot的name，匿名default
        name: string,
        fallbackRender: ?((() => Array<VNode>) | Array<VNode>),
        props: ?Object,
        bindObject: ?Object
      ): ?Array<VNode> {
        ...
        const target = props && props.slot
        if (target) {
            return this.$createElement('template', { slot: target }, nodes)
        } else {
            return nodes
        }
      }

    3、 编译：将nodes 进行编译并渲染到页面

  三、Vue 逻辑的复用 mixin

    1、minxin内部的合并逻辑及相关函数的执行顺序
      入口在 'global-api/index.js' initGlobalAPI -> initMixin -> mergeOptions -> strats

      1、mergeOptions 的逻辑
        ① 优先判断有没有mixin里面挂mixin的情况 有的话递归进行合并，最终形成一层嵌套关系。
        ② 优先遍历 parent 的key, 再遍历child中的key
        ③ 调用对应的 strats[XXX]方法进行合并

      strats[key]是合并的核心逻辑
      1、data中 若没有值则重新set，若存在则进行合并，最终返回处理后的数据对象。
      2、生命周期执行逻辑是一样的, 将函数存入一个新的数组队列，并正序遍历，依次执行。
        执行顺序为：全局 mixin -> 组件 mixin的mixin -> 组件mixin -> 组件 options
      3、ASSET_TYPES中包括component、directive、filter，它们通过原型链进行叠加
      4、strats.props = strats.methods = strats.inject = strats.computed 直接替换。

    ******************************************************************************
    随着项目结构的复杂，引用大量mixin会带来一些使用缺陷，比如：隐式依赖、命名冲突、侵入式等问题。
    因此，在vue3中出现了一个更好的组合式API，使组件及逻辑复用更加清晰，可读性更优。

      vue3 与 vue2 的区别: 构造函数、响应式以及Composition Api
        1、vue2中需要 new Vue()来创建根实例并进行数据和方法的初始化；而vue3中则直接使用createApp来
          创建对象，去掉了Vue 构造函数，避免非必要功能集成，减小体积。
        2、Vue3 使用 Proxy代理 取代 Vue2的 Object.defineProperty劫持，且响应式模块拆出，可单独使
          用，即reactivity
        3、Composition Api 使得组件化 更加内聚，将零散分布的逻辑组合在一起，也可以将单独的功能逻辑拆
          分成单独的文件。在写法上更贴近于react的纯函数思想

      **************************************************************************
      Composition Api重点函数setup，setup是何时被注册的

        // 1- 初始化：通过 ensureRenderer来 创建 app 对象
        const createApp = ((...args) => {
          const app = ensureRenderer().createApp(...args)
        }
        // 2 - ensureRenderer 调用 createRenderer 渲染函数
        function ensureRenderer() {
          return renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
        }
        // 3- createRenderer 调用 baseCreateRenderer
        function createRenderer(options: RendererOptions<HostNode, HostElement>) {
          return baseCreateRenderer<HostNode, HostElement>(options)
        }
        // 4-  baseCreateRenderer在这个方法中将vnode进行diff和patch操作并挂载到 container 上，
        // 最终返回 render hydrate createApp三个函数
        function baseCreateRenderer(
          options: RendererOptions,
          createHydrationFns?: typeof createHydrationFunctions
        ): any { ...
        return {
            render,
            hydrate,
            createApp: createAppAPI(render, hydrate)
          }
        ...
        // 5- `patch`中出现了 processComponent 函数，继而调用了 mountComponent，进入了
        // setupComponent中,先解析属性，再解析slots，之后调用了setup函数。
        function setupComponent() {
            const propsOptions = Comp.props
            resolveProps(instance, initialVNode.props, propsOptions)
            resolveSlots(instance, initialVNode.children)
            setupStatefulComponent(instance, parentSuspense)
        }
        // 6- 最终的执行结果 handleSetupResult，如果是函数，则赋值给实例对象render，如果是对象，则创建响应式。
        export function handleSetupResult(
          instance: ComponentInternalInstance,
          setupResult: unknown,
          parentSuspense: SuspenseBoundary | null
        ) {
          if (isFunction(setupResult)) {
            instance.render = setupResult as RenderFunction
          } else if (isObject(setupResult)) {
            instance.renderContext = reactive(setupResult)
          }
          finishComponentSetup(instance, parentSuspense)
        }

  四、Vue 2.0 的更新机制(虚拟dom、diff算法)
    虚拟dom是由一个个Vnode节点组成的，核心代码位于 patch.js, 大体流程为：
    1、新的Vnode节点不存在并且老的Vnode存在，只调用销毁Vnode节点的Hook; 如果老的Vnode节点不存在，
      则直接调用新建函数生成节点。如果新老节点都存在并且通过sameVnode函数判断为true，则再进行diff操作，
      否则也直接去新建节点并替换。

      *************************************************************************
      function sameVnode (a, b) {
        return (
          a.key === b.key && (
            (
              a.tag === b.tag &&
              a.isComment === b.isComment &&
              isDef(a.data) === isDef(b.data) &&
              sameInputType(a, b)
            ) || (
              isTrue(a.isAsyncPlaceholder) &&
              a.asyncFactory === b.asyncFactory &&
              isUndef(b.asyncFactory.error)
            )
          )
        )
      }
      sameVnode主要逻辑:
      首先判断key是否一致，其次同步组件需要判断是否同为注释节点或都不是注释节点、数据信息是否存在、Input类型是否一致，
      而异步组件需要判断工厂函数是否一致。
    2、diff的核心在updateChildren函数

  五、双向绑定的更新机制
    1、Object.defineProperty - get ，用于 依赖收集
    2、Object.defineProperty - set，用于 依赖更新
    3、每个 data 声明的属性，都拥有一个的专属依赖收集器 subs (包括页面的依赖、compute、watch等)
    4、依赖收集器 subs 保存着依赖的 watcher
    5、watcher 用于 进行视图更新

  六、v-model
    <input v-model="searchText"> 相当于
    <input v-bind:value="searchText" v-on:input="searchText = $event.target.value">
    *****************************************************************************************************

      自定义组件上 <custom-input v-bind:value="searchText" v-on:input="searchText = $event"></custom-input> /

      具体实现
      Vue.component('custom-input', {
        props: ['value'],
        template: `
          <input
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
          >
        `
      })
      使用 <custom-input v-model="searchText"></custom-input> /

    ***************************************************************************************************

    **** 非input元素封装的自定义组件 ****

      一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件
      可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突：

      Vue.component('base-checkbox', {
        model: {
          prop: 'checked',
          event: 'change'
        },
        props: {
          checked: Boolean
        },
        template: `
          <input
            type="checkbox"
            v-bind:checked="checked"
            v-on:change="$emit('change', $event.target.checked)"
          >
        `
      })

      使用 <base-checkbox v-model="lovingVue"></base-checkbox> /

******************************************************************************
  vue 3.0 diff算法解读
    一、什么地方用到了diff
      1、存在children的vnode
        ① element vnode 元素类型的
          用 patchElement() 处理
        ② fragment vnode 碎片类型的
          `<Fragment>
            <span> 苹果 </span>
            <span> 香蕉 </span>
            <span> 鸭梨 </span>
          </Fragment>`
          用 processFragment() 处理

      2、patchChildren 处理 1 中的vnode, patchChildren时，发现children还有自己的children，会递归向下patch

        根据是否存在key进行真正的diff patchKeyedChildren() 或者直接patch patchUnkeyedChildren()

    二、diff算法
      在vue2 diff算法的基础上 使用 最长增长子序列算法 做了优化，大大提高了效率。以下是实现方法

      1、动态规划
        var arr = [2,3,5,10,7,20,100,0];
        let dp =[];
        for(let i=0;i<arr.length;i++){
            dp[i]=1;
        }
        let res = 0;
        for(let i=1;i<arr.length;i++){
            for(let j=0;j<i;j++){
                if(arr[j]<arr[i]){
                    dp[i] = Math.max(dp[i],dp[j]+1)  // dp[i]代表第i个位置上升子序列中元素的长度
                }
            }
            res = Math.max(res,dp[i])
        }
        console.log(res)
      2、最小二分法
        let arr = [1, 5, 6, 7, 8, 2, 3, 4, 9]
        let subArr = [0]
        let prevIndex=[0];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > arr[subArr[subArr.length - 1]]) {
            prevIndex.push(subArr[subArr.length - 1])
            subArr.push(i)
          } else {// arr[i] 较小
            let u = 0;
            let c= 0;
            let v = subArr.length - 1
            // 二分搜索，查找比 arrI 小的节点，更新 result 的值
            while (u < v) {
              c = ((u + v) / 2) | 0
              if (arr[i] > arr[subArr[c]]) {
                u = c + 1
              } else {
                v = c
              }
            }
            if (arr[i] < arr[subArr[u]]) {
              prevIndex.push(subArr[u-1])
              subArr[u] = i
            }
          }
          // 利用前驱节点重新计算subArr
          let length = subArr.length; //总长度
          let  prev = subArr[length - 1] // 最后一项
          while (length-- > 0) {// 根据前驱节点一个个向前查找
            subArr[length] = prev
            prev = prevIndex[subArr[length]]
          }
        }
