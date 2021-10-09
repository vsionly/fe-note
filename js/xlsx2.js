/*
 * excel表格解析库
 * 把excel表格转换为数组
 */
const fs = require('fs');
const xlsx = require('node-xlsx');

// const data = JSON.stringify(xlsx.parse(fs.readFileSync(`${__dirname}/data.xlsx`)))
const data = xlsx.parse(fs.readFileSync(`${__dirname}/dpt.xlsx`))
data[0].data.shift()
// data[0].data.pop()
let outdata = {}
data[0].data.map( (v, k) => {
    outdata[v[0]] = v[2]
    console.log(v[0], v[2], 33)
    // excel 表格中每一行的数据
})
// outdata = JS

fs.writeFile('./data.js',JSON.stringify(outdata), function(err) {
    if (err) {
        throw err;
    }

    console.log('Hello.');
})