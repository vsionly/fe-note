module.exports = {
    // 配置打包后静态资源存放的目录
    assetsDir: 'static',
    // 全局引入stylus变量
    css: {
        loaderOptions: {
            stylus: {
                import: [
                    '~@/common/css/variable.styl',
                    '~@/common/css/mixin.styl'
                ]
            }
        }
    },
    chainWebpack (config) {
        // svg组件的打包逻辑
        const svgRule = config.module.rule('svg')

        // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()

        // 添加要替换的 loader
        svgRule.use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },

    devServer: {
        open: true,
        port: 80,
        proxy: 'http://localhost:8765' // 接口代理
    }
}
