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

/*
 * 实现call, apply同理
 */
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
