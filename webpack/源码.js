**********************************************************************************************************
    /*
     * Webpack源码分析
     *
     */
    Webpack源码分析.

    Webpack 的整个骨架是基于Tapable,Tapable 是 Eventemitter 的升级版本，它包含了 同步/异步 发布订阅模型，
    异步模型里又区分了串行和并行

    ***********Tapable 的基本用法******************************
    * // 定义一个事件/钩子
    * this.hooks.eventname = new SyncHook(['arg1', 'arg2'])
    * // 监听一个事件/钩子
    * this.hooks.eventName.tab('监听理由'，fn)
    * // 触发一个事件/钩子
    * this.hooks.eventName.call('arg1', arg2)
    **********************************************************

    hook.some.call(pluginName,fn) 都是依赖 Tapabel

    Compiler
      可以看成 Webpack 的实例，整个编译流程都是挂载这个对象上，它整个生命周期里暴露了很多方法，常见的 run,make,
      compile,finish,seal,emit等，我们写的插件就是作用在这些暴露的方法的hook上。

    Compilation
      控制从输入命令到完成输出的这整个生命周期，Compilation是把所有处理成 modules 的过程，所以一个 Compiler周期
      内会反复触发 Compilation 实例

    Modules
      一个文件就是一个module。Webpack最开始先加载 entry 入口文件，然后通过 acorn( babel 的解析引擎是 Babylon)
      转换成AST，这个过程叫 Parser。
      常见的 module 有RawModule、NormalModule、MultiModule、ContextModule、DllModule，ModuleFactory决定用那种
      Modul来加载处理，
      最常用的是 NormalModule (对应的Factory 是由 normalModuleFactory.create创建的，主要作用是收集 loaders
      和生成 module 对象，然后：

      1、通过 addModule 添加到 compilation.modules
      2、然后调用 buildModule -> normalModule.build -> 自身的doBuild -> runLoaders（通过loader将一些非js
        的文件，比如css、html、img, 转成js） -> acorn库的parse方法把 js 转成 ast
      3、遍历 ast 语法树分析和收集依赖


    Loaders
      图片、css等资源类型，需要经过处理才能使用，这个就是loader完成的，不同的资源，对应不同的loader。

    dependencys
      接着往下走，经过AST处理后的文件，引入时假设用的是 import，amd，json，是不是都需要对应的代码逻辑处理，
      Webpack 把这个抽象成了 dependencys，每个 module 都有不同的 dependencys，modules终于要组装完成了,常见的
      有AMDRequireDependency,AMDDefineDependency,AMDRequireArrayDependency, CommonJsRequireDependency,
      SystemImportDependency。

    chunk，template
      开始组装，优化这些 modules，这个时候就出现了chunk的概念，根据规则把 modules 合并，优化，所以会说 chunk 是
      由一些 modules 组成的，接下来_webpack_require_该出场了，_webpack_require_替换 require,这个叫模版替换，有
      ModuleTemplate,MainTemplate,ChunkTemplate,HotUpdateChunkTemplate，这些 模版 都有一个 render 方法

      最后通过 emitAssets 输出到 output 目录，完成真个过程。

    * 整个流程 *

       * webpack 的编译可以分为 :
       * env > init > run > compile > compilation > make > finishMake > afterCompile > seal > emit

    一、env 和 init 阶段，获取webpack配置，加载内置插件
       1、validation(configOPtion) 校验option参数
         * compiler.hooks.environment
         * compiler.hooks.afterEnvironment
       2、WebpackOptionsDefaulter().process(options) 添加默认参数
       3、new Compiler(options.context) 创建compiler对象
       4、new WebpackOptionsApply().process(options，compiler) 添加一大堆默认插件

    二、调用 compiler.run 进入编译阶段
       1、hooks.beforeRun -> hooks.run
       2、run
       3、hooks.beforeCompile -> hooks.compile hooks.thisCompilation hooks.compilation
       4、new compile 创建compilation对象
       5、调用hook make，这里在 SingleEntryPlugin或者MultiEntryPlugin 调用 compilation 的 addEntry 方法也就是
         开始通过 webpack.config.js配置的entry 开始解析模块
       6、modules=moduleFactory.create() 使用loader、 plugin处理对应资源，把json、css、img转换成js，然后通过
         acorn库的 parse 转换成 AST(抽象语法树)，然后递归遍历AST节点，resolve 分析和收集依赖 ，然后把所有文件
         组装成一个modules 数组，每个Module里包含对应的dependencys

    三、seal、emit阶段 处理编译后文件，合并module，chunk
       1、build完成，调用seal方法开始组装编译后内容，这里会把modules组合成一个个chunk，很多优化模块大小的插件都是
         在这个时候调用的。
       2、通过Template生成代码 createChunkAssets方法，比方ChunkTemplate、HotUpdateTemplate。 require 替换成
         _webpack_require。
       3、调用emitAssets()，将生成后的文件输出到dist目录。

    * 总结：
    * 1、webpack初始化compiler对象和注册插件
    * 2、编译的过程中插件主要是挂载一些回调函数到compiler的生命周期上，当执行到该阶段时触发（事件的发布订阅，
      继承自tapable）。
    * 3、编译主要是以entry为入口，生成module对象，根据js代码生成ast语法树对象，分析语法树加载需要的依赖
      dependency，如果存在import依赖，就会生成新的module，直到所有依赖加载完毕。
    * 4、make阶段完成之后会进入seal阶段，生成chunk 。编译结束后调用 compiler.emitAssets 输出打包好的资源

**********************************************************************************************************

    HMR(热更新)原理

    Hot Module Replacement(HMR)在web应用运行时，无需刷新整个页面，实现对特定模块替换、添加或者删除的操作。

    ****************************************************************************************************
    *  主要是通过以下几种方式，来显著加快开发速度：
    *
    *  1、保留应用程序完全重新加载页面时会丢失的状态。
    *  2、只更新变更内容，以节省宝贵的开发时间。
    *  3、在源代码中 CSS/JS 修改时，立刻在浏览器中更新，这几乎相当于在浏览器 devtools 直接更改样式。
    *****************************************************************************************************

    如何运行：

    一、在应用程序中
    1、应用程序要求 HMR runtime 检查更新。
    2、HMR runtime 异步地下载更新，然后通知应用程序。
    3、应用程序要求 HMR runtime 应用更新。
    4、HMR runtime 同步地应用更新。
    你可以设置 HMR，以使此进程自动触发更新，或者你可以选择要求在用户交互时进行更新

    *****************************************************************************************************
    概念

    runtime
        runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。
        它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延
        迟加载逻辑。

    manifest
        webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射。

        当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包
        并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。

        无论你选择哪种 模块语法，那些 import 或 require语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块
        标识符 (module identifier)。通过使用 manifest中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的
        模块。

        通过使用内容散列(content hash)作为 bundle 文件的名称，可以更好地利用缓存。
    **********************************************************************************************************
    1、Webpack编译期，为需要热更新的 entry 注入热更新代码，也就是HMR Runtime代码
    2、页面首次打开时，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回客户端

      ********************************************************************************************************
      * webpack-dev-server 通过 sockjs 使 浏览器端. 和 服务端. 建立 websocket 长连接 将 webpack 编译打包的各个
      * 阶段的状态信息告知浏览器端，包括后续文件修改重新编译的信息。
      *
      * webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack。
      *
      * webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定
      * 是刷新浏览器呢还是进行模块热更新，没配置热更新就直接刷新页面。
      ********************************************************************************************************

    3、客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.json 和 hot-update.js 的hash
    4、修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端

      ********************************************************************************************************
      * webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控
      ********************************************************************************************************

    5、客户端获取 hot-update.json（修改的chunks id 和 下次的 hash）和 hot-update.js，成功后客户端构造hot-update.js
      script链接，然后插入主文档。

      ********************************************************************************************************
      * HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的 hash 值，通过
      * JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了
      * 所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。
      ********************************************************************************************************

    6、hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，
      重新 render 组件， 继而实现 UI 无刷新更新。

        ******************************************************************************************************
        *  检查 hot update 的细节
        *
        *  变更过的module将被发往HMR runtime。 HMR runtime将试图应用这个hot update.首先runtime检查被更新的module是
        *  否能够accept这个hot update.如果不能，则runtime继续检查required这个update module的module是否能够accept。
        *  如果还不能accept,则继续bubble up往上冒泡，直到找到能够accept的module，或者直到app entry point，而这种情况
        *  下，hot update将会fail掉，执行  live reload 浏览器刷新。
        *******************************************************************************************************

    其他知识：
    1、HMR和热加载(live reload)的区别是：热加载是刷新整个页面。
    2、专栏文章 https://zhuanlan.zhihu.com/p/30669007


    ***********
    * 相关代码 *
    ***********
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {},
            hot: hotCreateModule(moduleId),
            parents: (hotCurrentParentsTemp = hotCurrentParents,
            hotCurrentParents = [],
            hotCurrentParentsTemp),
            children: []
        };
        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
        // Flag the module as loaded
        module.l = true;
        // Return the exports of the module
        return module.exports;
    }

    hotCreateModule -> {
        check: hotCheck,
        apply: hotApply
    }

    1、moudle.hot.check 触发热更新
    2、利用上一次保存的hash值，调用hotDownloadManifest发送xxx/hash.hot-update.json的ajax请求
      获取热更新模块，以及下次热更新的Hash 标识，并进入热更新准备阶段。
    3、调用hotDownloadUpdateChunk发送xxx/hash.hot-update.js 请求，通过JSONP方式(JSONP获取的代码可以直接执行)。
        function hotDownloadUpdateChunk(chunkId) {
            var script = document.createElement("script");
            script.charset = "utf-8";
            script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
            if (null) script.crossOrigin = null;
            document.head.appendChild(script);
        }
    hash.hot-update.js 包含新编译后的代码, 在webpackHotUpdate函数体内部, 要立即执行webpackHotUpdate这个方法。

    window["webpackHotUpdate"] = function (chunkId, moreModules) {
        hotAddUpdateChunk(chunkId, moreModules);
    };

    function hotAddUpdateChunk(chunkId, moreModules) {
        // 更新的模块moreModules赋值给全局全量hotUpdate
        for (var moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            hotUpdate[moduleId] = moreModules[moduleId];
            }
        }
        // 调用hotApply进行模块的替换
        hotUpdateDownloaded();
    }
    hotAddUpdateChunk()方法会把更新的模块moreModules赋值给全局全量hotUpdate

    热更新的核心逻辑 hotApply()
    1、删除过期的模块，就是需要替换的模块
    var queue = outdatedModules.slice();
    while (queue.length > 0) {
        moduleId = queue.pop();
        // 从缓存中删除过期的模块
        module = installedModules[moduleId];
        // 删除过期的依赖
        delete outdatedDependencies[moduleId];

        // 存储了被删掉的模块id，便于更新代码
        outdatedSelfAcceptedModules.push({
            module: moduleId
        });
    }
    2、将新的模块添加到 modules 中
    appliedUpdate[moduleId] = hotUpdate[moduleId];
    for (moduleId in appliedUpdate) {
        if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
            modules[moduleId] = appliedUpdate[moduleId];
        }
    }
    3、通过__webpack_require__执行相关模块的代码
    for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
        var item = outdatedSelfAcceptedModules[i];
        moduleId = item.module;
        try {
            // 执行最新的代码
            __webpack_require__(moduleId);
        } catch (err) {
            // ...容错处理
        }
    }

**********************************************************************************************************

    获取当前模块热替换进程的状态

    module.hot.status(); // 返回以下字符串之一...
    // 或者
    import.meta.webpackHot.status();

    idle:    该进程正在等待调用 check（见下文）
    check:   该进程正在检查以更新
    prepare: 该进程正在准备更新（例如，下载已更新的模块）
    ready:   此更新已准备并可用
    dispose: 该进程正在调用将被替换模块的 dispose 处理函数
    apply:   该进程正在调用 accept 处理函数，并重新执行自我接受(self-accepted)的模块
    abort:   更新已中止，但系统仍处于之前的状态
    fail:    更新已抛出异常，系统状态已被破坏

**********************************************************************************************************

    webpack-dev-server 原理

    1、启动一个express的Http服务器, 作为资源服务器, 并与客户端建立websocket链接(模块位置 webpack-dev-server/client/
        index.js)
    2、调用 webpack-dev-middleware。
      源文件改动后，webpack-dev-server会调用webpack实时的编译，再用webpack-dev-middleware将webpack编译后文件会
      输出到内存中。

**********************************************************************************************************
    source map
    ******************************************************************************************************
    1、source map 文件是否影响网页性能
      正常情况下不受影响，source map 只有在 dev tools 模式下才会下载。抓包工具能看到source map 的下载。

    2、source map 标准
     {
       version: 3,
       file: "min.js",
       names: ["bar", "baz", "n"],
       sources: ["one.js", "two.js"],
       sourceRoot: "http://example.com/www/js/",
       mappings: "CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA"
     }

     version：顾名思义，指代了版本号，目前 source map 标准的版本为 3，也就是说这份 source map 使用的是第三版标准产出的
     file：编译后的文件名
     names：一个优化用的字段，后续会在 mappings 中用到
     sources：多个源文件名
     mappings：这是最重要的内容，表示了源代码及编译后代码的关系，但是先略过这块，下文中会详细解释

     *重点 mappings 内容其实是 Base64 VLQ 的编码表示
      1、英文，表示源码及压缩代码的位置关联
      2、逗号，分隔一行代码中的内容。比如说 console.log(a) 就由 console 、log 及 a 三部分组成，所以存在两个逗号。
      3、分号，代表换行

      **********************************
       {
         sources:["webpack://webpack-source-demo/./src/index.js"],
         names: ['console', 'log'],
         mappings: 'AACAA,QAAQC,IADE',
       }

       每串英文中的字母都代表了一个位置：

       压缩代码的第几列
       哪个源代码文件，毕竟可以多个文件打包成一个，对应 sources 字段
       源代码第几行
       源代码第几列
       names 字段里的索引

       比如 AACAA 对应了 [0,0,1,0,0]，表示：
         压缩代码的第一列
         第一个源代码文件，也就是 index.js 文件了
         源代码第二行了
         源代码的第一列
         names 数组中的第一个索引，也就是 console

       *关联的技术： AST（Abstract Syntax Tree）*
**********************************************************************************************************
    /*
     * webpack性能调优
       https://zhuanlan.zhihu.com/p/150731200
     *
     */
    一、提高构建速度
        1、缩小文件搜索范围（如合理配置 resolve）
        * a、通过exclude、include 缩小搜索范围
          rules:[
              {
                  test:/\.js$/,
                  loader:'babel-loader',
                  // 只在src文件夹中查找
                  include:[resolve('src')],
                  // 排除的路径
                  exclude:/node_modules/
              }
          ]
        * b、resolve.modules:[path.resolve(__dirname,'node_modules')]避免层层查找

          其中 resolve.modules会告诉webpack去哪些目录寻找第三方模块，如果不配置 path.resolve(__dirname,
          'node_modules')，则会依次查找./node_module、../node_modules，一层一层网上找，这显然效率不高。

        * c、对庞大的第三方模块设置 resolve.alias，使webpack直接使用库的min文件，避免库内解析
            副作用是会影响Tree-Shaking

          resolve.alias:{
              'react':patch.resolve(__dirname, './node_modules/react/dist/react.min.js')
          }

        * c、 resolve.extensions ，减少文件查找

          resolve.alias:{
              'react':patch.resolve(__dirname, './node_modules/react/dist/react.min.js')
          }

        * d、module.noParse
            防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 import,
            require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

          resolve.alias:{
              'react':patch.resolve(__dirname, './node_modules/react/dist/react.min.js')
          }

        2、缓存之前构建过的js
          如：
          将Babel编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间。
          loader:'babel-loader?cacheDirectory=true'

        3、提前构建第三方库 利用dllplugin抽离基础模块 提高打包速度

          处理第三方库的方法有很多种，其中，Externals不够聪明，一些情况下会引发重复打包的问题；而
          CommonsChunkPlugin 每次构建时都会重新构建一次 vendor；处于效率考虑还是考虑使用DllPlugin。

          DLL全称Dynamic-link library，（动态链接库）。到底怎么个动态法。原理是将网页依赖的基础模块抽离
          出来打包到dll文件中，当需要导入的模块存在于某个dll中时，这个模块不再被打包，而是去dll中获取，而且
          通常都是第三方库。那么为什么能提升构建速度，原因在于这些第三方模块如果不升级，那么只需要被构建一次。

        4、并行构建而不是同步构建 HappyPack、ThreadLoader、parallel-webpack
          HappyPack和ThreadLoader作用是一样的，都是同时执行多个进程，从而加快构建速度。而Thread-Loader是
          webpack4提出的。

          a.多进程、多实例构建
          b.多进程并行压缩代码

          ******************************************************************************************************
          *  thread-loader(官方推荐)
          *  原理：每次 webpack 解析一个模块，thread-loader 会将它及它的依赖分配给 worker 线程中。
          *
          *  parallel-webpack
          *  原理：parallel-webpack允许您并行运行多个Webpack构建，从而将工作分散到各个处理器上，从而有助于显着加快
          *  构建速度。
          *
          *  HappyPack
          *  原理：每次 webapck 解析一个模块时，HappyPack 会将它及它的依赖分配到worker线程中。
          *  提示：由于HappyPack 对file-loader、url-loader 支持的不友好，所以不建议对该loader使用。
          *
          *******************************************************************************************************

          * vue-cli3构建的项目，会自动开启多线程打包。

        5、对图片资源提前压缩，利用在线图片压缩网站，或者在webpack中配置

        6、利用分析工具分析打包信息
          a、使用webpack内置得stats分析构建的统计信息
            vue-cli3搭建的项目工程  "build:stats": "vue-cli-service build --mode prod --json > stats.json"

          b、使用speed-measure-webpack-plugin进行速度分析

          c、使用webpack-bundle-analyzer进行体积分析

            // 使用
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

            module.exports = {
              plugins: [
                new BundleAnalyzerPlugin()
              ]
            }
            构建完成后，会在'http://127.0.0.1:8888'展示相关文件大小。按照提示就可以分析依赖的第三方模块文件大
            小和业务里面的组件代码大小。

        7、及时更新node、npm、yarn的版本

        8、在尽可能少的模块上应用loader 如 剔除 node_modules 文件夹下的包

        9、保证plugin的精简（少用）并保证plugin的可靠性（如写的代码严谨、执行效率高等），尽量使用官方推荐的plugin
          开发模式下 不用代码压缩的plugin
          生产模式下 不用生成sourcemap的plugin（视需求而定 有的可能要求线上要开启 sourcemap 但一般不会）

        10、 控制包文件的大小 不要引入无用的代码

    二、压缩打包体积
        1、Tree Shaking 删除无用代码
        * 依赖ES6的import、export模块化语法
        * webpack.config.js 的 mode:'production'

        *************************************************************************************************
          Tree Shaking 原理

          无用代码消除广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码未被使用，然后消除这些代码，这个称
          之为DCE（dead code elimination），Tree-shaking 是 DCE 的一种新的实现，与传统的DCE方法存在一些差异。

          Dead Code 一般具有以下几个特征：
          1、代码不会被执行，不可到达
          2、代码执行的结果不会被用到
          3、代码只会影响死变量（只写不读）

          Tree Shaking 的消除原理是 依赖于ES6的模块特性
          实现：
          1、保证引用的模块都是ES6规范的
          2、项目中，注意要把babel设置module: false，避免babel将模块转为CommonJS规范
          3、webpack4 以上版本中，在 package.json 中定义 sideEffect: false，意思是对所有模块都shaking
            为了避免误删需要的代码，如 import 'index.css' 还有一些模块引入后会影响全局环境，可以如下配置
            sideEffect: [
                '*.css'
            ]
          4、使用 mode 为 "production" 的配置项以启用更多优化项，包括压缩代码与 tree shaking。

          对于深层的依赖，可以使用 webpack-deep-scope-analysis-plugin 分析更底层的引用，是否被真正使用。

        *************************************************************************************************

        2、压缩代码
          // 配置说明：webpack4
          module.exports = {
              plugins:[
                  // 压缩css
                  new OptimizeCssAssetWebpackPlugin(),
                  // 压缩html
                  new HtmlWebpackPlugin({
                        // html无所谓压缩,只是去掉空格和注释
                        minify:{
                          collapseWhitespace:true,
                          removeComments:true,
                        },
                        template:'./src/index.html'
                   })
              ],
              // 模式设置为生产环境就可以直接压缩js了
              mode:'production'
          }

        3、代码分割实现 按需加载/懒加载

        *************************************************************************************************
        * 代码分割的实现（与 webpack 无关，是一个打包时的通用概念）
        * 1、同步引入模块 import A from 'moduleA'
        *   配置
        *   optimization: {
        *       splitChunks: {
        *           chunks: 'all'
        *       }
        *   }
        *
        * 2、异步引入模块
        *   a、import('moduleA').then(...)
        *     不要滥用动态导入，静态引入能更好的初始化依赖，而且更有利于静态分析工具 和 tree shaking 发挥作用
        *   b、require.ensure()
        *     无须配置
        **************************************************************************************************

        4、Scope Hoisting

    三、优化运行速度
        1、资源文件缓存
          module.exports = {
              // 单入口
              entry : './src/js/index.js',
              output : {
                  filename : 'js/built.[contenthash:10].js',
                  path: resolve(__dirname,'build')
              },
              plugins:[
                  // 独立输出css代码
                  new MiniCssExtractPlugin({
                      filename:'css/built.[contenthash:10].css'
                  }),
              ]
          }

        2、预加载

    四、优化开发体验
        1、Dev-Server 自动刷新
        2、sourceMap提高调试体验

    vue-cli3构建项目的过程中，vue-cli3本身其实也做了很多优化，上面的优化手段vue-cli3这个工具其实已经帮我们做过了，
    我们就不用重复配置了
**********************************************************************************************************
    require和import的区别
    1、出现的时间点不同
      require、exports   2009    CommonJS
      import、export     2015    ECMAScript2015(ES6)

    2、客户端、服务器 的 兼容 不同
    3、 require、exports 是运行时动态加载，import、export 是静态编译（仅限写法：import A from 'moduleA'）
    4、 require、exports 输出的是一个值的拷贝，import、export 模块输出的是值的引用