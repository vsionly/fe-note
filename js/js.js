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


/*
 *  密码包含字符 数字 字母中的至少两种
 */
    function _pwdRule(d) {
        let hasd = /\d/.test(this.vPassword) // 包含数字
        let hasl = /[A-Za-z]/.test(this.vPassword) // 包含字母
        let hass = /\S/.test(this.vPassword.replace(/\d|[A-Za-z]/g, '')) // 包含字符
        return hasd + hasl + hass > 1
    }


/*
 *  邮箱验证
 */
    function _checkEmail(val) {
        const myReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
        if (myReg.test(val)) {
            return true;
        } else {
            return false;
        }
    }

/*
 *  动态加载js 并监听js的加载
 */
    function loadJs(url,callback){
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = 'https://robot-lib-cdn.zuoshouyisheng.com/sdk/znxy-1.0.0.js';
        document.body.appendChild(script);
        if (typeof(callback) !== "undefined") {
            if (script.readyState) { // 兼容ie
                script.onreadystatechange = function() {
                    if(script.readyState  ===  "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            } else {
                script.onload = function(){
                    callback();
                    script.onload = null;
                    script.onerror = null;
                }
                script.onerror = function () {
                    alert('加载失败！')
                    script.onload = null;
                    script.onerror = null;
                };
            }
        }
    }
    loadJs("test.js",function(){
        alert('done');

    });
