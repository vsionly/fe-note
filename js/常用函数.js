// 判断页面是 移动端还是PC端打开的
req.headers["user-agent"].toLowerCase().match(/(iphone|ipod|ipad|android)/); // node层判断端
navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/); // 前端判断端

**********************************************************************************
/*
 * 时间戳转年月日
 */
var date = new Date()
function dateFormat (argument) {
    const month = d.getMonth() > 8 ? '' : '0'
    const date = d.getDate() > 8 ? '' : '0'
    return `${d.getFullYear()}-${month}${d.getMonth() + 1}-${date}${d.date()}`
}
