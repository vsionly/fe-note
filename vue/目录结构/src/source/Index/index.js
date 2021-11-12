import provinces from '@/common/js/district.js'
export default {
    name: 'IndexPage',
    data() {
        return {
            data: ''
        }
    },
    created() {
        this.id = this.$route.query.id
    },
    methods: {
        save() {
            this.$api.post('/kg_search', {terms: this.queryParam}).then(res => {
                if (res.status === 0) {
                    this.reasons = res.result
                    this.originData.reasons = JSON.parse(JSON.stringify(this.reasons))
                    if (!this.tabIndex) this.loading = false
                    this.reasonTip = this.originData.reasonTip = res.text
                }
            })
        }
    },
    // 组件内的路由守卫
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
