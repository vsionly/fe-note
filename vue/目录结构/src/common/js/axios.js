/**
 * axios的封装
 * vsionly
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../../router'
// import qs from 'qs' // 可能需要对参数处理 qs.stringify(config.data)
import { Message } from 'element-ui'

Vue.prototype.$message = Message

const vm = new Vue({
    router
})
const instance = axios.create({
    baseURL: process.env.VUE_APP_API, // 设置跨域代理接口统一的前置地址
    timeout: 0,
    headers: {
        'Content-Type': 'application/json'
    }
})
// 请求拦截器
instance.interceptors.request.use(config => {
    if (config.url !== 'api/account/login') {
        config.headers.authorization = localStorage.getItem('token')
    }
    return config
}, error => {
    return Promise.reject(error)
})

let flag = false
// 添加响应拦截器
instance.interceptors.response.use(res => {
    if (res.data && res.data.status && !flag) {
        flag = true
        if (res.data.errno === 100){
            vm.$message.error('登录状态已失效，请重新登陆！')
            vm.$router.push('login')
        }
        setTimeout(() => {
            flag = false
        }, 2000)
    }
    return res.data
}, function (error) {
    return Promise.reject(error);
})

export default instance
