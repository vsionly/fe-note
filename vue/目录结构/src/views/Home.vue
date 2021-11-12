<template>
    <div class="container">
        <div class="main-head">
            <img src="~assets/img/logo-txt.png" class="logo">
            <div class="user-info">
                <svg-icon name="user"></svg-icon>
                <ul class="user-menu">
                    <li class="center middle-in" @click="logout"><svg-icon name="logout"/><span>退出登录</span></li>
                </ul>
            </div>
        </div>
        <div class="main-body">
            <el-menu
                class="left-nav"
                :default-active="activeMenu"
                :router="true">
                <!-- @select="handleSelect" -->
                <template v-for="(v,k) of menuList">
                    <el-menu-item :index="v.path" :key="k" v-if="!v.child && v.roles.indexOf(role)>-1">
                        <svg-icon :name="v.icon"></svg-icon>
                        <span>{{v.label}}</span>
                    </el-menu-item>
                    <el-submenu :index="`${k}`" :key="k"  v-if="v.child && v.child.length && v.roles.indexOf(role)>-1">
                        <template slot="title">
                            <svg-icon :name="v.icon"></svg-icon>
                            <span>{{v.label}}</span>
                        </template>
                        <el-menu-item v-for="(val,key) of v.child" :index="val.path" :key="key">
                            {{val.label}}
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
            <div class="main-content">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HomePage',
    data() {
        return {
            name: '',
            menuList: [
                {
                    label: '用户管理',
                    path: '/user',
                    icon: 'users',
                    roles: [1, 2, 3]
                },
                {
                    label: '科室管理',
                    path: '/department',
                    icon: 'department',
                    roles: [1]
                },
                {
                    label: '知识管理',
                    path: '/knowledge',
                    icon: 'knowledge',
                    roles: [1, 2, 3, 4]
                },
                {
                    label: '系统管理',
                    path: '/systom',
                    icon: 'systom',
                    roles: [1],
                    child: [
                        {
                            label: '技能管理',
                            path: '/skill',
                            child: [
                                { label: '技能管理', path: 'index' },
                                { label: '数据中心', path: 'data' },
                            ]
                        },
                    ]
                },
                {
                    label: '个人中心',
                    path: '/person',
                    icon: 'person',
                    roles: [1, 2, 3, 4]
                }
            ],
            listActive: [],
            curIndex: 0,
            canScroll: false
        }
    },
    created() {
        this.name = window.localStorage.getItem('name')
        this.role = parseInt(window.localStorage.getItem('role'))

        // 左侧导航选中及验证登录的跳转处理
        if (['index', 'ui', 'guide', 'url', 'preview', 'optimize'].indexOf(this.$route.name) > -1) {
            this.activeMenu = "/skill"
        } else {
            this.activeMenu = this.$route.path
        }
        if (localStorage.getItem('token')) {
            this.$http.getAccount('login/verify', this.form).then(res => {
                if (res.status === 0 && this.$route.name === 'home') {
                    this.$router.push(this.role === 4 ? 'knowledge' : 'user')
                }
            })
        } else {
            // 拦截器中有登陆失效则跳转登录页的逻辑 则不重复跳转 负责页面有报错 但不影响使用
            this.$route.name === 'home' && this.$router.push('login')
        }
    },
    computed: {
        curKey() {
            return this.menuList[this.curIndex].key
        },
        userName() {
            return this.$route.query.user_name
        }
    },
    methods: {
        logout() {
            window.localStorage.setItem('token', '')
            window.localStorage.setItem('name', '')
            window.localStorage.setItem('role', '')
            this.$router.push({
                path: '/login'
            })
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.activeMenu = to.path
        next()
    }
}
</script>
<style lang="stylus" scoped>
    .container
        height 100%
        display flex
        flex-direction column
    .main-head
        position relative
        text-align left
        padding 10px 32px 0 32px
        height 64px
        border-bottom 1px solid #EBEDF8;

    .logo
        height 40px
        width 256px

    .main-body
        flex 1
        overflow hidden
    .main-content
        height 100%
        border 20px solid  $gray
        // background-color $gray
        overflow-y auto

    .left-menu
        float left
        height 100%

    .user-info
        float right
        padding-bottom 10px
        margin-top 2px
        line-height 40px
        cursor pointer
        font-size 40px
        &:hover .user-menu
            display block
    .user-menu
        display none
        position absolute
        font-size 14px
        z-index 2
        bottom -42px
        right 20px
        padding 6px 0
        width 110px
        line-height 30px
        background white
        border-radius 4px
        box-shadow 0px 2px 10px 0px rgba(0,0,0,0.3)
        li:hover
            background #F0F2F5
        svg
            margin-right 2px
    .left-nav
        float: left;
        height: 100%;
        width: 180px;
</style>
