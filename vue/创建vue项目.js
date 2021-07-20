/*
 * vue-cli3 创建项目流程
 */

// windows系统
`winpty vue.cmd create hello-world`

// 新建webpack配置 vue.config.js
`
module.exports = {
    devServer: {
        open: true, // 自动打开浏览器
        port: 80 // 设置默认端口 localhost 就可访问
    }
}
`