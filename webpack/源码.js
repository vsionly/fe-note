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
    * 3、编译主要是以entry为入口，生成一个module对象，主要就是根据js代码生成ast语法树对象，分析语法树加载需
      要的依赖 dependency，如果存在import依赖，就会生成新的module，直到所有依赖加载完毕。
    * 4、make阶段完成之后会进入seal阶段，生成chunk 。编译结束后调用 compiler.emitAssets 输出打包好的资源

    **********************************************************
    * webpack懒加载的原理 import('moduleA').then(...) 异步加载 *
    **********************************************************

**********************************************************************************************************

    HMR(热更新)原理

    Hot Module Replacement(HMR)在web应用运行时，无需刷新整个页面，实现对特定模块替换、添加或者删除的操作。

    1、Webpack编译期，为需要热更新的 entry 注入热更新代码(EventSource通信)
    2、页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端
    3、客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash
    4、修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端
    5、客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档
    6、hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload方法，获取到 Vue 组件的 render方法，
      重新 render 组件， 继而实现 UI 无刷新更新。

    其他知识：
    1、HMR和热加载(live reload)的区别是：热加载是刷新整个页面。
    2、谢谢


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

       *关联的技术： AST*
**********************************************************************************************************
