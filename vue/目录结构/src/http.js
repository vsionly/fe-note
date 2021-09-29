/**
 * author vsioly
 * email liwsh666@126.com
 */
import http from '@/common/js/http.js'
// import { genUrl } from '../util.js'
export function get(url, p = {}) {
    p.request_no = +new Date() // 后端查问题的标识参数 感觉没必要
    return http.get(url, {params: p})
}

export function post(url, p = {}) {
    p.request_no = +new Date()
    return http.post(url, JSON.stringify(p))
    // return axios.post(url, p)
}

// 账户相关的接口
export function postAccount (url, p) {
    return post('/api/account/' + url, p)
}
export function getAccount (url, p) {
    let param = ['/api/account/' + url]
    if (p) param[1] = p
    return get(...param)
}

// 知识管理相关的接口
export function postOrder (url, p) {
    return post('/api/orders/' + url, p)
}
export function getOrder (url, p) {
    let param = ['/api/orders/' + url]
    if (p) param[1] = p
    return get(...param)
}
