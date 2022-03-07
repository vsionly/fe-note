****************************************************************************************************
    /*
     * node核心
     *
     */
    Node 使用了一个事件驱动、非阻塞式 I/O 的模型,使其轻量又高效。

    * 发布订阅模式 or 观察者模式 *

    events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
    EventEmitter背后体现的思想贯穿了Node整个架构。
    function EventEmitter() {
        this.listeners = {}
    }
    EventEmitter.prototype = {
        // 增加事件监听器
        addListener: function(eventName, callback) {
            if(typeof callback !== 'function')
                throw new TypeError('"listener" argument must be a function')

            if(typeof this.listeners[eventName] === 'undefined') {
                this.listeners[eventName] = []
            }
            this.listeners[eventName].push(callback) // 放到观察者对象中
        },
        // 取消监听某个回调
        removeListener: function(eventName, callback) {
            if(typeof callback !== 'function')
                throw new TypeError('"listener" argument must be a function')
            if(Array.isArray(this.listeners[eventName]) && this.listeners[eventName].length !== 0) {
                var callbackList = this.listeners[eventName]
                for (var i = 0, len=callbackList.length; i < len; i++) {
                    if(callbackList[i] === callback) {
                        this.listeners[eventName].splice(i,1)   // 找到监听器并从观察者对象中删除
                    }
                }

            }
        },
        // 触发事件：在观察者对象里找到这个事件对应的回调函数队列，依次执行
        triggerEvent: function(eventName,...args) {
            if(this.listeners[eventName]) {
                for(var i=0, len=this.listeners[eventName].length; i<len; i++){
                    this.listeners[eventName][i](...args)
                }
            }
        }
    }
****************************************************************************************************
