****************************************************************************************************
// 生成10位随机数
function createNum () {
    const num = 1000000000
    const init = parseInt(Math.random()*num)
    const discut = parseInt(num/init)
    return init.toString() + discut.toString()
}
****************************************************************************************************
    // rem布局 页面中的字体根据设计图/100
    // 基准大小
    const baseSize = 100
    // 设置 rem 函数
    function setRem () {
        // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
        let w = document.documentElement.clientWidth
        if (w < 1400) w = 1400
        if (w > 2200) w = 2200
        let scale = w / 1920

        // 设置页面根节点字体大小 可使用（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
        document.documentElement.style.fontSize = baseSize *  + 'px'
    }

    // 初始化
    setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = function () {
        setRem()
    }
****************************************************************************************************
    // 判断页面是 移动端还是PC端打开的
    req.headers["user-agent"].toLowerCase().match(/(iphone|ipod|ipad|android)/); // node层判断端
    navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/); // 前端判断端

    // 判断浏览器
        (function () {
            let u = navigator.userAgent;
            let app = navigator.appVersion;
            return {   // 移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, // IE内核
                presto: u.indexOf('Presto') > -1, // opera内核
                webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, // 是否为微信浏览器
                qq: u.match(/\sQQ/i) !== null, // 是否QQ
                Safari: u.indexOf('Safari') > -1
            };
        }())

    /**
       * 判断是否为微信/微信小程序/支付宝 判断微信需要引入wx-sdk
       * @export
       * @returns
       */
        export function isWeChatMiniApp() {
            const ua = window.navigator.userAgent.toLowerCase();
            // if(userAgent.match(/Alipay/i)=="alipay"){
            return new Promise((resolve) => {
                if (ua.indexOf('micromessenger') == -1) {
                    console.log("不在微信或者小程序中")
                    resolve(false);
                } else {
                    wx.miniProgram.getEnv((res) => {
                        if (res.miniprogram) {
                            console.log("在小程序中")
                            resolve(true);
                        } else {//在微信中
                            console.log("在微信中")
                            resolve(false);
                        }
                    });
                }
            });
        }
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
        const second = cTime.getSeconds()

        return `${cTime.getFullYear()}-${month > 8 ? '' : '0'}${month + 1}-${date > 9 ? '' : '0'}${date} ${hour > 9 ? '' : '0'}${hour}:${minute > 9 ? '' : '0'}${minute}:${second > 9 ? '' : '0'}${second}`
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
    // 上传、导入
    let fd = new FormData()
    fd.append('rule_name', files.name)
    fd.append('operater', 'liweisheng')
    fd.append('file', files)

    axios.post('http://211.154.163.112:6152/sniff_package_upload', fd).then(res => {
    }).catch(e => {
        console.log(e)
    })

    // 下载、导出
    <iframe style="width: 0;height: 0;" name="download"></iframe> / 设置a的打开区域为ifram 内 防止部分浏览器跳转页面
    this.$api.get('/org/export', param).then(res => {
        console.log(res, 333)
        // if (res.status === 0) {
            var a = document.createElement('a')
            // a.download = '机构列表.xlsx'
            // a.href = 'http://211.154.163.104:7557/org/export?auth_code='+window.localStorage.getItem('auth_code') // 绑定a标签
            a.href = res // 绑定a标签
            a.target = 'download'
            a.click() // 模拟点击实现下载
            // setTimeout(function () { // 延时释放
            //     URL.revokeObjectURL(res) // 用URL.revokeObjectURL()来释放这个object URL
            // }, 100)
        // }
    })

*********************************************************************************************************
    /* vue tpl 下载excel等
    <template>
        <iframe name="download" id="download" style="display: none;"></iframe>
    </template>
    */

    export default {
        name: 'download',
        methods: {
            // 1、使用get请求方式直接进行下载（最简单的方法）
            getOpen() {
                // window.open(`${url}?${qs.stringify(param)}`, '_blank');
                this.$refs.iframe.contentWindow.open(`http://211.154.163.112:6152/sniff_package_download?rule_name=${this.activeName}`, '_self'); // 当前页面实现下载
            },
            // 2、模拟form表单post方式获取下载文件数据
            /*
             * 后端接口改为post方式 可以直接下载
             *
             */
            formPost(i) {
                const form = document.createElement('form')
                form.action = 'url' // 接口的地址
                form.method = 'post'
                form.target = 'download' // 在隐藏的iframe中打开action设置的页面

                let input = document.createElement('input') // 创建表单项
                input.type = 'hidden'
                input.name = 'data' // 表单项的键
                input.value = JSON.stringify({result: this.result, department_array: this.param.department_array}) // 表单项的值
                form.appendChild(input)

                input = document.createElement('input')
                input.name = 'export_type'
                input.value = 1
                form.appendChild(input)

                input = document.createElement('input')
                input.name = 'appid'
                input.value = 235123
                form.appendChild(input)

                document.body.appendChild(form)
                form.submit()
                document.body.removeChild(form)
            },

            /*
             * 3、使用FileReader转化数据流为下载文件
             * 后端接口可以是post 也可以是get
             *
             */
            fileReader{
                axios.post(url, param, {
                  responseType: 'blob'
                }).then((res) => {

                  console.log('res', res);
                  const blob = res.data;
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onload = (e) => {
                    const a = document.createElement('a');
                    // a.download = `文件名称.zip`;
                    // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  };
                }).catch((err) => {
                  console.log(err.message);
                });
            }
        }
    }

    /*
     * node后端代码 基于koa2
     *
     */
    const nodeExcel = require("node-xlsx");
    router.get('/api/exportExcel', async (ctx, next) => {
        autoC(ctx.request, '=', ctx.res)
        res = ctx.res
        const data = [
          ['序号', '申请人', '申请预约时间', '申请科室', '创建时间', '审核人', '审核时间', '处理人', '处理时间', '状态', '处理结果', '详情']
        ];
        result.map((v, k) => {
            data.push([
                ++k,
                v.applicant,
                v.visitdate,
                v.department,
                handleTime(v.create_time),
                v.reviewer && v.reviewer.name,
                v.review_time?handleTime(v.review_time):'',
                v.handler && v.handler.name,
                v.handle_time?handleTime(v.handle_time):'',
                ['未查看', '已查看', '处理中', '已拒绝', '已完成'][v.status],
                v.message,
                `${ctx.header['x-forwarded-proto']}://${ctx.header['x-forwarded-host']}?register_id${v.id}&app_id=5e4e332e42e6dfac97c309bf`
            ])
        })

        const sheetOptions = {'!cols': [{wch: 5}, {wch: 8}, {wch: 18}, {wch: 10},{wch: 18}, {wch: 10}, {wch: 18}, {wch: 10},{wch: 18}, {wch: 7}, {wch: 20}, {wch: 70}]}
        var buffer = xlsx.build([{name: 'mySheetName', data: data}], {sheetOptions});

        res.setHeader('Access-Control-Allow-Origin', '*');//设置响应头
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=user.xlsx");

        ctx.response.body = buffer
    });

    // 待验证
    const blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});

*********************************************************************************************************
    /*
     *  unicode、ascii转码
     *
     */

    // 字符转unicode
    function unicode(str){
        var value='';
        for (var i = 0; i < str.length; i++) {
            value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
        }
        return value;
    }

    function left_zero_4(str) {
        if (str != null && str != '' && str != 'undefined') {
            if (str.length == 2) {
                return '00' + str;
            }
        }
        return str;
    }

    // unicode 转字符
    function reconvert(str){
        str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
        });
        str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
        });
        str = str.replace(/(&#)(\d{1,6});/gi,function($0){
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
        });

        return str;
    }

    // Unicode转换ASCII
    function unicode1(str){
        var value='';
        for (var i = 0; i < str.length; i++)
            value += '&#' + str.charCodeAt(i) + ';';
        return value;
    }

    // 中文转换&#XXXX
    function ascii(str){
        var value='';
        for (var i = 0; i < str.length; i++) {
            value += '\&#x' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16))+';';
        }
        return value;
    }

*********************************************************************************************************
    /*
     * 前端安全
     *
     */

    1、CSRF(Cross Site Request Forgery) 跨站点请求伪造 利用用户的登录信息 伪造请求 获取机密信息、盗取资产等
    2、

*********************************************************************************************************
    /*
     * 模式
     *
     */
*********************************************************************************************************
