import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// router 3.2 next() 重定向 会报错 这是解决方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


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

router.beforeEach(async (to, from, next) => {
  console.log(to.name, from.name, 222)
  // 不需要登陆就能看的页面
  if (['home', 'topic', 'login'].includes(to.name)) {
    next()

  // 需要登陆才能看的页面
  } else {
    // 登录的心跳接口 随时检测登录是否有效
    const valid = await tokeninfo().then(res => {
      console.log(res, 111)
      return true
    }).catch(err => {
      return err.code !== -100 // false 登录状态失效
    })
    if (!valid) {
      // 将用户重定向到登录页面
      from.name !== 'login' ? next({ name: 'login' }) : next(false)
    } else {
      next()
    }
  }
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