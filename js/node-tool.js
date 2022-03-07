****************************************************************************************************
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

****************************************************************************************************
    /*
     * 文件写入内容
     * 作者： 李伟生
     * email： liwsh666@126.com
     */
    const fs = require("fs");
    fs.writeFile(path.resolve(".") + '/param.txt', contxt, { flag: 'a' },  function(err) {
        if (err) {
            return console.error(err);
        }
    });

****************************************************************************************************
    /*
     * 预览项目svg图标
     * 作者： 李伟生
     * email： liwsh666@126.com
     */
    const fs = require('fs');
    const filepath = __dirname + '/src/common/icons/svg';
    const data = fs.readdirSync(`${filepath}`);

    console.log(data)
    var imgs = '';
    var syspath = filepath.replace(/\\/g, '/')
    for (var i = 0; i < data.length; i++) {
        imgs += `
        <div class="svg-panel">
            <div class="svg-item"><img style="height:30px" src="${syspath + '/' + data[i]}"> <span>${data[i]}</span></div>
            <div class="svg-item" style="background:#000;color:#fff"><img style="height:30px" src="${syspath + '/' + data[i]}"> <span>${data[i]}</span></div>
        </div>`  ;
    }
    var html = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style type="text/css">
            body {
                padding: 30px;
            }
            *{
                margin: 0;
            }
            .svg-panel {
                display:inline-block;
                margin-right: 10px;
                margin-bottom: 6px;
                width: 200px;
                box-sizing: border-box;
                border: 1px solid #000;
                border-radius: 8px;
                overflow: hidden;
            }
            .svg-item {
                height: 40px;
                line-height: 36px;
                padding-left: 16px;
                padding-right: 16px;
                width: 200px;
                box-sizing: border-box;
                white-space: nowrap;
            }
            .svg-item img, .svg-item span{
                vertical-align: middle;
            }
            #tip {
                display: none;
                position: fixed;
                top: 50px;
                left: 50%;
                padding: 16px;
                margin-left: -50px;
                color: red;
                background: #fff;
                border: 1px solid #ccc;
                border-radius: 6px;
            }
        </style>
    </head>
    <body>${imgs}
        <div id="tip">icon名字已复制！</div>
    </body>
    <script type="text/javascript">
        document.querySelector('body').onclick = (e) => {
            var svgClass = ''
            if (e.target.className == 'svg-item') {
                svgClass = e.target.innerText.split('.')[0]
            } else if (e.target.localName == 'span') {
                svgClass = e.target.innerText.split('.')[0]
            } else if (e.target.localName == 'img') {
                svgClass = e.target.nextElementSibling.innerText.split('.')[0]
            }
            console.log(svgClass)
            const input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', svgClass);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                document.querySelector("#tip").style.display = 'block'
                setTimeout(()=> {
                    document.querySelector("#tip").style.display = 'none'
                }, 2000)
            }
            document.body.removeChild(input);
        }
    </script>
    </html>
    `
    fs.writeFile('./svgs.html',html, function(err) {
        if (err) {
            throw err;
        }

        console.log('Hello.');
    })
****************************************************************************************************
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
****************************************************************************************************
****************************************************************************************************
