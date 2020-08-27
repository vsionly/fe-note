// 判断页面是 移动端还是PC端打开的
req.headers["user-agent"].toLowerCase().match(/(iphone|ipod|ipad|android)/); // node层判断端
navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/); // 前端判断端
