/*
 * excel表格解析库
 * 把excel表格转换为数组
 */
const fs = require('fs');
const xlsx = require('node-xlsx');

// const data = JSON.stringify(xlsx.parse(fs.readFileSync(`${__dirname}/data.xlsx`)))
const data = xlsx.parse(fs.readFileSync(`${__dirname}/dpt.xlsx`))
// console.log(data[0].data.length, typeof data[0].data, data[0].data[0]);
data[0].data.shift()
data[0].data.pop()
let outdata = []
data[0].data.map( (v, k) => {
    outdata.push(v[1])
    // excel 表格中每一行的数据
})
console.log(outdata)
// console.log(data[0].data.length, Object.keys(outdata).length, 555)

fs.writeFile('./data.js',JSON.stringify(outdata), function(err) {
    if (err) {
        throw err;
    }

    console.log('Hello.');
})