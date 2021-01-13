/**
 * axios的封装
 * vsionly
 */
import axios from 'axios'
import Vue from 'vue'
import router from '../../router' // 需要根据拦截器结果 做页面跳转的
import qs from 'qs' // 可能需要对参数处理 qs.stringify(config.data)

const vm = new Vue({
    router
})
console.log(process.env.VUE_APP_API, 'process.env.VUE_API')
const instance = axios.create({
    baseURL: process.env.VUE_APP_API, // 设置跨域代理接口统一的前置地址
    timeout: 0,
    headers: {
        'Content-Type': 'application/json' // 默认值application/x-www-form-urlencoded
    }
})

// 请求拦截器
instance.interceptors.request.use(config => {
    if (config.xx) {
        console.log('')
    } else {
        /*
         *  如果请求被阻断 需要在调用api的时候 加catch 函数
         *  .catch(err => {
                console.log(err)
            })
         */
        vm.$message.error('登录状态已失效，请重新登陆！')
        return Promise.reject('登录状态已失效，请重新登陆！')
    }
    return config

}, error => {
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(res => {

    return res.data

}, function (error) {
    return Promise.reject(error);
})

export default instance
