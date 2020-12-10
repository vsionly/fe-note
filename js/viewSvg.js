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
<html lang="en">
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
        }
        .svg-item img, .svg-item span{
            vertical-align: middle;
        }
    </style>
</head>
<body>${imgs}
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