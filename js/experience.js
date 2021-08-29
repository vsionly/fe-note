/*
 *  获取scroll的滚动高度 兼容写法
 */
    var scrollH = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

*********************************************************************************************************

/*
 *  node服务 使用pm2传参时的参数使用方法 pm2 .... -- port=8000
 */
    let cmdArgv = {}
    const Argvs = process.argv.slice(2)

    if(Argvs.length) {
        Argvs.map(v => {
            let args = v.split('=')
            if (args.length == 2) cmdArgv[v.split('=')[0]] = v.split('=')[1]
        })
    }

    let port = cmdArgv.port || 3000

*********************************************************************************************************

/*
 *  密码包含字符 数字 字母中的至少两种
 */
    function _pwdRule(d) {
        let hasd = /\d/.test(this.vPassword) // 包含数字
        let hasl = /[A-Za-z]/.test(this.vPassword) // 包含字母
        let hass = /\S/.test(this.vPassword.replace(/\d|[A-Za-z]/g, '')) // 包含字符
        return hasd + hasl + hass > 1
    }

*********************************************************************************************************

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
*********************************************************************************************************

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
*********************************************************************************************************
    /*
     * 实现file对象在img标签中展示
     */
    const file = '文件对象'

    //  1、 通过 base64 假设file 是上传的文件对象

    var reader = new FileReader();
    reader.readAsDataURL(file.raw);
    var imageSrc = '图片的src属性'

    reader.onload = e => {
        console.log(reader.result, 9)
        imageSrc = reader.result
    }

    // 2、 通过 base64 假设file 是上传的文件对象
    URL.createObjectURL(file.raw);
    img.onload = function (e) {
        URL.revokeObjectURL(img.src); // 图片加载后 要清楚内存的数据
    };
    以blob开头的地址。以window.URL.createObjectURL()这种方式每次 需要使用revokeObjectURL释放URL对象。

*********************************************************************************************************
    /*
     * 实现img标签转base64
     */
    const image = '图片元素'

    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    let quality = 0.8; //清晰度
    // 这里的dataurl就是base64类型
    let dataURL = canvas.toDataURL('image/jpeg', quality);
