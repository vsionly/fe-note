const t1 = '最近七日数据'
const t2 = '未来七日预测'
this.lineOpt.xAxis.data = []
this.lineOpt.legend.data = [t1, t2]
this.lineOpt.color =  ['#586AFF', '#FF6590']
this.lineOpt.series[0].name = t1
this.lineOpt.series[1].name = t2

this.lineTitle = res.t_trend.title
this.lineNote = res.t_trend.note

this.mapTitle = res.loc_trend.title
this.mapNote = res.loc_trend.note
let real = []
let forecast = []
res.t_trend.data.map(v => {
    this.lineOpt.xAxis.data.push(v.date)
    if (v.forecast === 0) {
        real.push(v.count)
        forecast.push(null)
    } else {
        forecast.push(v.count)
    }
})
forecast[6] = {
    symbol: 'none',
    value: real[6]
}
delete this.lineOpt.series[0].areaStyle
delete this.lineOpt.series[1].areaStyle

this.lineOpt.series[0].data = real
this.lineOpt.series[0].silent = true
this.lineOpt.series[0].hoverAnimation = false
this.lineOpt.series[0].symbol = 'circle'
this.lineOpt.series[0].symbolSize = '8'
this.lineOpt.series[0].label = {
    show: true
}
// 格式化折线图 hover的显示内容
this.lineOpt.tooltip = {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
        var htmlStr = ''
        var valMap = {}

        var param = params[0]
        var xName = param.name // x轴的名称
        var seriesName = param.seriesName // 图例名称
        var value = param.value // y轴值
        var color = param.color // 图例颜色

        htmlStr += xName + '<br/>' // x轴的名称
        htmlStr += '<div>'
        htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>'

        htmlStr += seriesName + '：' + value

        htmlStr += '</div>'
        valMap[seriesName] = value

        return htmlStr
    }
}
this.lineOpt.series[1].data = forecast
this.lineOpt.series[1].silent = true
this.lineOpt.series[1].hoverAnimation = false
this.lineOpt.series[1].symbol = 'circle'
this.lineOpt.series[1].symbolSize = '8'
this.lineOpt.series[1].lineStyle = {
    type: 'dashed'
}
this.lineBox.setOption(this.lineOpt, true)

res.loc_trend.data.map(v => {
    let obj = {}
    v.loc_data.map(val => {
        obj[val.loc_name] = {
            coordinate: [val.lon, val.lat],
            count: val.count
        }
    })
    this.mapData.push(obj)
})
this.handelMap(6)
this.loading = true
