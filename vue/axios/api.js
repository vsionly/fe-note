/**
 * author vsioly
 * email liwsh666@126.com
 */
import axios from '@/common/js/baseHttp.js'
// import { genUrl } from '../util.js'

let get = (url, p) => {
    return axios.get(url, {params: p})
}

let post = (url, p) => {
    return axios.post(url, p)
}

export function login (p) {
    return post('opdmp/purview/login', p)
}

export function getAuthority (p) {
    return get('opdmp/purview/functionlist', p)
}
