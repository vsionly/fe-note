<script type="text/javascript">
    // 接口写法
    export function postBlob(url, p = {}, type) {
        // return http.post(url, JSON.stringify(p), {
        return http.post(url, qs.stringify(p), {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    // vue组件内方法
    exportUnQA() {
        // let statu = -1
        let obj = {}
        let options = {
            action: 'get_unrecognized_qa',
            app_id: this.$route.query.app_id,
            page: this.curPage,
            times: this.curTimes,
            exported: this.curStatus,
            download: 1
        }
        this.$http.postBlob('/api/manage/get_unrecognized_qa', options).then(res => {
            if (res.size) {
                var a = document.createElement('a')
                a.download = '未识别语句.xlsx'
                a.href = URL.createObjectURL(res) // 绑定a标签
                a.click() // 模拟点击实现下载
                setTimeout(function () { // 延时释放
                    URL.revokeObjectURL(res) // 用URL.revokeObjectURL()来释放这个object URL
                }, 100)
            } else {
                this.$message.error('下载文件失败，请重试。')
            }
        })
    }

    // 后端 接口返回的数据类型
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    二、模拟表单
    // <iframe name="chartdata-download" id="chartdata-download" style="display: none;"></iframe>
    exportExcel(i) {
        const form = document.createElement('form')
        form.action = 'https://ywz.zuoshouyisheng.com/opdmp/getstatisticalfile'
        form.method = 'post'
        form.target = 'chartdata-download'

        let input = document.createElement('input')
        input.type = 'hidden'
        input.name = 'data'
        input.value = JSON.stringify({result: this.result, department_array: this.param.department_array})
        form.appendChild(input)

        input = document.createElement('input')
        input.name = 'export_type'
        input.value = i
        form.appendChild(input)

        input = document.createElement('input')
        input.name = 'appid'
        input.value = this.appid
        form.appendChild(input)

        document.body.appendChild(form)
        form.submit()
        document.body.removeChild(form)
    },
</script>