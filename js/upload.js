let fd = new FormData()
fd.append('rule_name', files.name)
fd.append('operater', 'liweisheng')
fd.append('file', files)

axios.post('http://211.154.163.112:6152/sniff_package_upload', fd).then(res => {
}).catch(e => {
    console.log(e)
})