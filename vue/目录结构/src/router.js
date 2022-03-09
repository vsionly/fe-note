import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            beforeEnter: (to, from, next) => {
                // ...
            }
        },
        {
            path: '/index',
            name: 'index',
            component: () => import( /* webpackChunkName: "index" */ '../views/Home.vue')
            // 实现懒加载，另注释内容不可省略 配合output.chunkFilename使用 chunkFilename: '[name].bundle.js',
        },
        {
            path: '/*',
            name: 'default',
            component: resolve => require(['./views/Lost.vue'], resolve)
        },
    ]
})
/*
    首次进入时的导航解析流程
    1、导航被触发。
    2、调用全局的 beforeEach 守卫。
    3、在路由配置里调用 beforeEnter。
    4、解析异步路由组件。
    5、在被激活的组件里调用 beforeRouteEnter。
    6、调用全局的 beforeResolve 守卫 (2.5+)。
    7、导航被确认。
    8、调用全局的 afterEach 钩子。
    9、触发 DOM 更新。
    10、调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
*/
/*
    完整的导航解析流程
    1、导航被触发。
    2、在失活的组件里调用 beforeRouteLeave 守卫。
    3、调用全局的 beforeEach 守卫。
    4、在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
    5、在路由配置里调用 beforeEnter。
    6、解析异步路由组件。
    7、在被激活的组件里调用 beforeRouteEnter。
    8、调用全局的 beforeResolve 守卫 (2.5+)。
    9、导航被确认。
    10、调用全局的 afterEach 钩子。
    11、触发 DOM 更新。
    12、调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
*/
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

// 全局解析守卫 导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

// 全局后置钩子 不会接受 next 函数也不会改变导航本身
router.afterEach((to, from) => {
  // ...
})