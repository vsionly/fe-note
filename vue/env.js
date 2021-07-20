// 获取
process.env.VUE_APP_ID

// .env 设置
VUE_APP_DEV=1

process.env.VUE_APP_CDN
// 设置favicon 为cdn 上的图片
VUE_APP_CDN=https://web-cdn.zuoshouyisheng.com/static/image/
Vue.prototype.$cdn = process.env.VUE_APP_CDN

https://web-cdn.zuoshouyisheng.com/static/image/favicon/favicon-16.ico

    <link rel="shortcut icon" href="<%= process.env.VUE_APP_CDN %>favicon/favicon-16.ico">
