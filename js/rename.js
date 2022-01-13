/*
 * 文件重命名
 * 作者： 李伟生
 * email： liwsh666@126.com
 */
const fs = require('fs')
const files = fs.readdirSync('./img');
console.log(files)
files.map((v, k) => {
    console.log(v, k)
    fs.rename(`./img/${v}`, `./img/core${k}.png`, (err) => {
        if (err) throw err
        console.log('重命名完成')
    });
})
