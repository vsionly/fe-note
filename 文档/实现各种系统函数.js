****************************************************************************************
    /*
     * 实现new
     */
    function mockNew() {
        // 创建一个空对象
        let emptyObj = new Object();
        // 取传入的第一个参数，即构造函数，并删除第一个参数。
        // 关于为什么要用 Array.prototype.shift.call 的形式，见之前的博客文章 《JavaScript之arguments》
        let constructor =  Array.prototype.shift.call(arguments);
        // 类型判断，错误处理
        if(typeof constructor !== "function") {
            throw("构造函数第一个参数应为函数");
        }

        // 绑定 constructor 属性
        emptyObj.constructor = constructor;
        // 关联 __proto__ 到 constructor.prototype
        emptyObj.__proto__ = constructor.prototype;

        // 将构造函数的 this 指向返回的对象
        let resultObj = constructor.apply(emptyObj, arguments);

        // 返回类型判断, 如果是对象，则返回构造函数返回的对象
        if (typeof resultObj === "object") {
            return resultObj
        }
        // 返回对象
        return emptyObj;
    }
    function Person(name) {
        this.name = name;
        return {
            age: 40,
            name: this.name
        }
    }
    var person = mockNew(Person, "jayChou");
    console.log(person);

****************************************************************************************
    /*
     * 实现call, apply同理
       obj.myFun.call(db,'成都','上海')
       obj.myFun.apply(db,['成都','上海'])
     */

    Function.prototype.myCall = function() {
      //obj即相当于上面的k
      var [obj, ...args] = arguments;
      console.log({arguments})

      //this相当于上面的a
      obj['fn'] = this;
      //获取call第二个开始的参数

      //相当于k.a, 即将a的this指向k
      obj['fn'](...args);
      delete obj['fn'];
    }
    function a(n){
      console.log(this.m, n);
    }
    var k = {
      m: 2
    }
    a.myCall(k, 1);

    ****************************************************************************************
    Function.prototype.myCall = function() {
        let [context, ...args] = arguments
        let funNane = Symbol('fn')
        context[funNane] = this
        context[funNane](...args)
        delete context[funNane]
    }

    ****************************************************************************************
    Function.prototype.myOwnCall = function(context) {
        context = context || window;
        var uniqueID = "00" + Math.random();
        while (context.hasOwnProperty(uniqueID)) {
          uniqueID = "00" + Math.random();
        }
        context[uniqueID] = this;

        var args = [];
        for (var i = 1; i < arguments.length; i++) {
          args.push("arguments[" + i + "]");
        }
        var result = eval("context[uniqueID](" + args + ")");
        delete context[uniqueID];
        return result;
    }

    // es6简化版
    Function.prototype.myOwnCall = function(context) {
        context = context || window;
        context.fun = this;
        var result = context.fun(...arguments.slice(1))
        delete context.fun;
        return result;
    }

    var person = {
        firstName: 'll',
        fullName: function() {
            return this.firstName
        }
    }
    var person1 = {
        firstName: "Bill",
    }
    person.fullName.apply(person1);
****************************************************************************************
****************************************************************************************
    instanceof的大致效果是：当左边是基本类型值时，一律返回false。 当左边是引用类型值时，如果
    右边的原型对象，在左边的原型链上存在，返回真，否则假。
    function myInstanceof(leftVal, rightFunc) {
      if (typeof rightFunc !== 'function') throw new Error('第二个参数请传入构造函数名');
      return rightFunc.prototype.isPrototypeOf(leftVal);
      // F.prototype.isPrototypeOf(obj)判断obj的原型指针是否指向传入构造函数的原型对象，这个过程
      // 会往上层层判断。比如，以下验证myInstanceof(xm, Object);xm的原型指针指向Person.prototype,Person.prototype
      // 的原型指针指向Object.prototype。所以返回true
    }

    // 利用浏览器在对象上布置的__proto__属性、加递归调用实现判断
    function myInstanceof(leftVal, rightFunc) {
      if (typeof rightFunc !== 'function') throw new Error('第二个参数请传入构造函数名');
      if (typeof leftVal !== 'object' || leftVal === null) return false;
      if (leftVal.__proto__ === rightFunc.prototype) {// __proto__原型指针
        return true;
      } else {
        return myInstanceof(leftVal.__proto__, rightFunc);
      }
    }

    // 利用Object.getPrototypeOf()方法获取对象的原型，利用while循环层层递进。
    // 都没有，最后Object.getPrototypeOf()值为null。
    function myInstanceof(leftVal, rightFunc) {
      if (typeof rightFunc !== 'function') throw new Error('第二个参数请传入构造函数名');
      if (typeof leftVal !== 'object' || leftVal === null) return false;
      let _proto = Object.getPrototypeOf(leftVal);
      while (_proto) {
        if (_proto === rightFunc.prototype) {
          return true;
        }
        _proto = Object.getPrototypeOf(_proto);
      }
      return false;
    }
****************************************************************************************
    /*
     * 实现rquire 依赖的node主要模块 path、fs、vm

        * 使用`Module._load`方法加载模块
        * 使用`Module.__resolveFilename`，将相对路径=>绝对路径+文件后缀
        * 缓存机制`Module._cache`,缓存模块
        * 新建一个模块 `new Module`;Module有两个主要属性id(路径)， exports={}
        * 使用`tryModuleLoad`尝试加载模块
        * 获取文件后缀
        * 通过`Module._extensions`上后缀对应的方法加载模块->读取文件
        * `Module.wrap`包裹读取的字符串内容；
        * `runInThisContext`运行包裹后的字符串；将字符串转为函数
        * 运行函数，并将this.exports（默认空对象）作为this绑定到函数的this上
     */
    let path = require('path');
    let fs = require('fs');
    let vm = require('vm');
    function Module(id){
        this.id = id;
        this.exports = {}
    }
    Module._extensions = {};
    Module._cache = {};
    let wrapper = [
        '(function(exports,module,require,__dirname,__filename){'
        ,
        '})'
    ]
    Module._extensions['.js'] = function(module){
        let script = fs.readFileSync(module.id,'utf8');
        let functStr = wrapper[0] + script + wrapper[1];
        let fn = vm.runInThisContext(functStr);
        fn.call(module.exports,module.exports,module,myRequire);
    }
    Module._extensions['.json']= function(module){
        let script = fs.readFileSync(module.id,'utf8');
        module.exports = JSON.parse(script);
    }
    Module.prototype.load = function(){
        let ext = path.extname(this.id);
        Module._extensions[ext](this)
    }
    function myRequire(filePath){
        let absPath = path.resolve(__dirname,filePath);
        let p = '';
        try{
            // 判断当前路径是否存在
            fs.accessSync(absPath)
            p = absPath;
        }catch(e){
            // 增加逻辑 看是否存在
            let extensions = Object.keys(Module._extensions);
            extensions.some(ext=>{
              let url = absPath + ext;
              try{
                fs.accessSync(url);p = url;
                return true;
              }catch(e){
                return false;
              }
            });
        }
        if(p){
            // 单例模式
            if( Module._cache[p]){ // 如果缓存中有直接将缓存中的exports属性返回回去即可
                return  Module._cache[p].exports;
            }
            let module = new Module(p); // 创建一个模块对象
            Module._cache[p] = module
            // 加载模块
            module.load(); // 加载这个模块
            return module.exports; // 只需要返回module.exports 属性
        }else{
            throw new Error('file not access')
        }
    }
    let r = myRequire('./a1');
    console.log(r);

****************************************************************************************
    /**
     * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
     * 2. executor 接受两个参数，分别是 resolve 和 reject
     * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
     * 4. promise 的状态一旦确认，就不会再改变
     * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
     *      和 promise 失败的回调 onRejected
     * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
     *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
     *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
     * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
     * 8. promise 可以then多次，promise 的then 方法返回一个 promise
     * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
     * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
     * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
     *   就走下一个then的成功，如果失败，就走下一个then的失败
     */

    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    function Promise(executor) {
        let self = this;
        self.status = PENDING;
        self.onFulfilled = [];//成功的回调
        self.onRejected = []; //失败的回调
        //PromiseA+ 2.1
        function resolve(value) {
            if (self.status === PENDING) {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled.forEach(fn => fn());//PromiseA+ 2.2.6.1
            }
        }

        function reject(reason) {
            if (self.status === PENDING) {
                self.status = REJECTED;
                self.reason = reason;
                self.onRejected.forEach(fn => fn());//PromiseA+ 2.2.6.2
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    Promise.prototype.then = function (onFulfilled, onRejected) {
        //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        let self = this;
        //PromiseA+ 2.2.7
        let promise2 = new Promise((resolve, reject) => {
            if (self.status === FULFILLED) {
                //PromiseA+ 2.2.2
                //PromiseA+ 2.2.4 --- setTimeout
                setTimeout(() => {
                    try {
                        //PromiseA+ 2.2.7.1
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        //PromiseA+ 2.2.7.2
                        reject(e);
                    }
                });
            } else if (self.status === REJECTED) {
                //PromiseA+ 2.2.3
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (self.status === PENDING) {
                self.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(self.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
                self.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(self.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });
        return promise2;
    }

    function resolvePromise(promise2, x, resolve, reject) {
        let self = this;
        //PromiseA+ 2.3.1
        if (promise2 === x) {
            reject(new TypeError('Chaining cycle'));
        }
        if (x && typeof x === 'object' || typeof x === 'function') {
            let used; //PromiseA+2.3.3.3.3 只能调用一次
            try {
                let then = x.then;
                if (typeof then === 'function') {
                    //PromiseA+2.3.3
                    then.call(x, (y) => {
                        //PromiseA+2.3.3.1
                        if (used) return;
                        used = true;
                        resolvePromise(promise2, y, resolve, reject);
                    }, (r) => {
                        //PromiseA+2.3.3.2
                        if (used) return;
                        used = true;
                        reject(r);
                    });

                }else{
                    //PromiseA+2.3.3.4
                    if (used) return;
                    used = true;
                    resolve(x);
                }
            } catch (e) {
                //PromiseA+ 2.3.3.2
                if (used) return;
                used = true;
                reject(e);
            }
        } else {
            //PromiseA+ 2.3.3.4
            resolve(x);
        }
    }

    module.exports = Promise;

****************************************************************************************
