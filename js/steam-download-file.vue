<template>
    <iframe name="chartdata-download" id="chartdata-download" style="display: none;"></iframe>
</template>
<script type="text/babel">

export default {
    name: 'download',
    methods: {
        // 使用get请求方式直接进行下载（最简单的方法）
        getOpen() {
            window.open(`${url}?${qs.stringify(param)}`, '_blank');
        },
        // 模拟form表单post方式获取下载文件数据
        formPost(i) {
            const form = document.createElement('form')
            form.action = 'url' // 接口的地址
            form.method = 'post'
            form.target = 'chartdata-download' // 在隐藏的iframe中打开action设置的页面

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
        // 使用FileReader转化数据流为下载文件
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
                a.download = `文件名称.zip`;
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

</script>
