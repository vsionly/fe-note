// 判断页面是 移动端还是PC端打开的
req.headers["user-agent"].toLowerCase().match(/(iphone|ipod|ipad|android)/); // node层判断端
navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/); // 前端判断端

****************************************************************************************************
/*
 * 时间戳转年月日
 */
var date = new Date()
function dateFormat (d) {
    const month = d.getMonth()
    const date = d.getDate()
    return `${d.getFullYear()}-${month > 8 ? '' : '0'}${month + 1}-${date > 9 ? '' : '0'}${date}`
}

function handleTime(d) {
    var cTime = new Date(parseInt(d))
    const month = cTime.getMonth()
    const date = cTime.getDate()
    const hour = cTime.getHours()
    const minute = cTime.getMinutes()

    return `${cTime.getFullYear()}-${month > 8 ? '' : '0'}${month + 1}-${date > 9 ? '' : '0'}${date} ${hour > 9 ? '' : '0'}${hour}:${minute > 9 ? '' : '0'}${minute}`
}
*********************************************************************************************************

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

*********************************************************************************************************
    /*
     * 内存泄漏避坑
     */
    特别vue这类框架的SPA应用 使用第三方库时 new Choices()的变量一定要指定载体，最后要销毁(一般放在beforeDestroy钩子中)。 eg(https://vuejs.bootcss.com/cookbook/avoiding-memory-leaks.html)

    1、console导致的内存泄漏 因为打印后的对象需要支持在控制台上查看，所以传递给console.log方法的对象是不能被垃圾回收的。我们需要避免在生产环境用console打印对象。
    2、框架配合第三方库使用时，没有及时执行销毁 这点可以参考vue cookbook里的例子：避免内存泄漏 — Vue.js 中文文档
    3、被遗忘的定时器 例如在组件初始化的时候设置了setInterval，那么在组件销毁之前记得调用clearInterval方法取消定时器。
    4、没有正确移除事件监听器（各种EventBus, dom事件监听等） 这应该是最容易犯的一个错误，无论新手老手都有可能栽在这里。
    特征：performance里，监听器数量会持续上升

    // 移除监听器的正确方法
    mounted() {
        this.debounceWidthChange = debounce(this.handleWidthChange, 100)
        window.addEventListener('resize', this.debounceWidthChange)
    },
    beforeDestroyed() {
        window.removeEventListener('resize', this.debounceWidthChange)
    }

    // 移除监听器的错误方法
    mounted() {
        window.addEventListener('resize', debounce(this.handleWidthChange, 100))
    },
    beforeDestroy() {
        window.removeEventListener('resize', debounce(this.handleWidthChange, 100))
    }
*********************************************************************************************************



