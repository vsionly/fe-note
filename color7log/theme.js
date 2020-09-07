const color = {
    black: '\033[40;30m',
    red: '\033[40;31m',
    green: '\033[40;92m',
    yellow: '\033[40;33m',
    blue: '\033[40;94m',
    purple: '\033[40;95m',
    cyan: '\033[40;96m',
    white: '\033[40;37m',
    gray: '\033[40;90m'
};
let keys = Object.keys(color);
const log = {};

// 输出不同颜色的信息
for (let k of keys) {
    // 设置带颜色输出
    log[k] = (...txt) => {
        logFun(txt, k)
    }

    // 设置带颜色和以‘-’作为分隔符的输出
    log[k+'F'] = (...txt) => {
        // log[k+'Fmt'](...txt, '-')
        logFun(txt, k, '-')
    }

    // 设置带颜色和自定义分隔符(默认‘-’)的输出
    log[k+'Fmt'] = (...txt) => {
        let sign = txt.pop()
        logFun(txt, k, sign)
    }
}
let arr = []
arr.length = 15
const logFun = (txt, k, icon) => {
    txt.map((v, i) => {
        formatT(v, k, i, icon)
    })
}
function formatT(t, k, i, s){
    if (s) console.log(color[k], '\n' + arr.join(s) + ' 第' + i + '个参数开始 ' + arr.join(s))
    console.log(color[k], '\n', t, (s?'':'\033[40;37m'));
    if (s) console.log(color[k], '\n' + arr.join(s) + ' 第' + i + '个参数结束 ' + arr.join(s), '\033[40;37m')
}
// 支持多个组合输出 custom({cyan:'组合浅蓝色', red:'组合红', green:'组合绿'})
log.custom = (param) => {
    let logTxt = '';
    Object.keys(param).map((v, k) => {
        // log[v+'F'](param[v])
        formatT(param[v], v, k, '-')
    })
    // console.log(encodeURIComponent(logTxt));
    // console.log('\n' + logTxt);
}

log.autoC = (...param) => {
    let colors = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan', 'white', 'gray']
    param.map((v, k) => {
        formatT(v, colors.shift(), k, '-')
        if (!colors.length) colors = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan', 'white', 'gray']
    })
    // console.log(encodeURIComponent(logTxt));
    // console.log('\n' + logTxt);
}

module.exports = log;
