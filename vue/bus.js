// on emit实现原理
class Bus{
    constructor(){
        this.evt = {}
    }
    $on(name, fn) {
        if (!this.evt[name]) {
            this.evt[name] = []
        }
        this.evt[name].push(fn)

    }
    $emit(name, arg) {
        // this.evt[name](arg)
        this.evt[name].forEach(v => {
            console.log(v, 1111111111)
        })
    }
}

// Vue.prototype.$bus = new Vue()
Vue.prototype.$bus = new Bus()
