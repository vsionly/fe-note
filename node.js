/*
 *  node服务 使用pm2传参时的参数使用方法 pm2 .... -- port=8000
 */
    let cmdArg = {}

    if(process.argv.slice(2).length) {
        process.argv.slice(2).map(v => {
            let args = v.split('=')
            if (args.length == 2) cmdArg[v.split('=')[0]] = v.split('=')[1]
        })
    }

    let port = cmdArg.port || 3000
