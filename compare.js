  $ npm install HtmlWebpackPlugin -D
  $ npm install html-minifier -D
```
2.然后在Webpack的配置文件webpack.config.js进行如下配置：
```js
  plugins: [
     new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
         favicon:'./src/img/favicon.ico', //favicon路径
         filename:'/view/index.html', //生成的html存放路径
         template:'./src/view/index.html', //html模板路径
         inject:true, //允许插件修改哪些内容，包括head与body
        hash:true, //为静态资源生成hash值
        minify:{ //压缩HTML文件
            removeComments:true, //移除HTML中的注释
             collapseWhitespace:true //删除空白符与换行符
         }
    })
   ]
```
HtmlWebpackPlugin插件在生成HTML时调用了 html-minifier 插件来完成对HTML的压缩，这里我们使用两个配置来移除HTML中的注释以及空白符以达到压缩的效果。

## sass/less预编译
我们再来看看sass/less预编译，其实就sass/less的预编译来说，两者区别不是很大。Gulp是通过``gulp-sass``、``gulp-less``模块进行预处理；而Webpack是通过``scss-loader``、``less-loader``加载器（loader）进行预处理。我们还是分别来看一下两者对此的实现。

### Gulp预编译sass/less
以sass为例子：
1. 在项目中通过npm安装一个**gulp-sass**的模块
 ```js
    $ npm install gulp-sass -D
```
2. 然后在Gulp的配置文件gulpfile.js中通过CommonJs规范引入gulp-sass模块，并进行简单配置
```js
     //1.引入 gulp-sass模块
    var sass= require('gulp-sass');

    //2.css 预处理
    var cssFiles = [
      './src/styles/usage/page/**/*'
      //./src/styles/usage/page目录下的所有文件
    ];
    gulp.task('sass',function(){
        gulp.src(cssFiles)
        .pipe(sass().on('error',sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/prd/styles/'));//编译后的输出路径
    });

    //3.对sass文件的修改添加监听事件
    gulp.task('watch',function(){
       gulp.watch('./src/styles/**/*',['sass']);
    });

    gulp.task('default',['watch','webserver'],function(){
        console.log('所有任务队列执行完毕');
    });
```
这样，一个简单的sass预处理的task就配置完成了，然后我们还将该task加到gulp.watch()上实现了自动编译（即修改sass文件后保存，则立即执行sass预处理），配合Gulp启动的server则可以实现sass文件修改保存即可在浏览器中查看效果的目的。

### Webpack预编译sass/less
同样以sass为例子：
1. 在项目中通过npm安装一个**sass-loader**和**node-sass**模块，前者是用来加载sass相关文件的，后者是用来编译sass文件的。另外还需要安装另外两个模块**css-loader**和**style-loader**，前者是用来加载css相关文件的，后者是用来将css样式装填到html中的内联样式。
 ```js
    $ npm install sass-loader node-sass css-loader style-sass -D
```
2. 然后在Webpack的配置文件webpack.config.js中进行简单配置
```js
     module:{
          loaders:[
          {
              test: /\.css$/,//匹配以.css结尾的文件，如果你项目不需要刻意不配置
              loader: 'style!css'//这里顺序必须这样
          },
          {
              test: /\.scss$/,//匹配以.scss结尾的文件
              loader: 'style!css!sass'
          }
        ]
    }
```
前面提到过，Webpack是通过文件的依赖关系进行加载分析的，所以当程序从主入口（js文件）进入后，在依赖的资源文件中发现有sass文件后，就会利用我们配置的**sass-loader**去加载，然后用**node-sass**去解析编译成普通的css语法的样式文件，在然后就是利用**style-loader**将样式以内联样式的形式配置到html中（这里有一个问题，就是css-loader有什么用?我也没搞明白，但是不添加会报错，有知道的可以留言交流一下）。这样Webpack就完成了sass的预处理。

## 启动server
我们都知道在前端开发中，ajax请求是需要启动一个server的。特别是在前后端分离思想中，前端开发不再像以前一样过分依赖于后端开发，以前的那种前端测试ajax请求需要装个tomcat或者其它服务器来启动server的现象已经成为过去式，现在我们可以使用像Gulp这类前端自动构建工具启动一个本地server进行测试，再也不收后端程序员钳制了（开个玩笑，和后端好好沟通才能让前端开发更方便）。那么，我们来分别看一下Gulp和Webpack是怎样实现这个功能的。

### Gulp启动server
在Gulp中想要启动一个本地serve，只需要以下几步：
1. 在项目中通过npm安装一个**gulp-webserver**的模块
 ```js
    $ npm install gulp-webserver -D
```
2. 然后在Gulp的配置文件gulpfile.js中通过CommonJs规范引入gulp-webserver模块，并进行简单配置
```js
   //1.引入 gulp-webserver 模块
  var webserver = require('gulp-webserver');

  //2.配置server task
  gulp.task('webserver',function(){
    gulp.src('./')
    .pipe(webserver({
        host:'localhost',
        port:80,
        //浏览器自动刷新
        livereload:true,
        //显示文件目录
        directoryListing:{
          enable: true,
          path:'./'
        },
      }));
  });

  //3.配置默认task
  gulp.task('default',['webserver'],function(){
      console.log('启动任务队列执行完毕');
  })
```
3. 在命令行中启动server
```js
  $ gulp
```
启动成功：
![gulp cli 启动成功](http://upload-images.jianshu.io/upload_images/3333422-4e64d02bacb680de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. 在浏览器地址栏中输入**localhost**打开页面验证。

经过以上这三步，我们就在Gulp中启动了一个server了。在Gulp中启动本地服务有一个很方便的配置，就是``livereload:true``属性的设置，设置后浏览器会根据你项目中资源的变化自动刷新浏览器（如果你的chrome浏览器设置该属性后在你修改文件并保存时仍没有自动刷新，可能是你的chrome浏览器不支持，可以chrome扩展程序中搜索并安装LiveReload插件）

### Webpack启动server
在Webpack中也可以通过插件的形式安装一个**webpack-dev-server**来实现达到启动本地server的目的，具体步骤如下：
1. 在项目中通过npm安装一个**webpack-dev-server**的模块
 ```js
    $ npm install  -g webpack-dev-server -D
```
2. 然后在Webpack的配置文件webpack.config.js中进行简单配置
```js
    module.exports = {
      devtool: 'eval-source-map',
      //webpack入口文件配置
      entry: {
         app:__dirname + "/src/scripts/app.js",
      },
      //webpack出口文件配置
      output: {
          path: __dirname + "/prd/scripts/",//输出文件路径配置
          filename: "bundle.js"//输出文件名配置
      },
      //本地server配置
      devServer: {
        contentBase:  __dirname,//本地服务器所加载的页面所在的目录
        port:8089,//本地服务端口配置
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
      }
   }
```
3. 在命令行中启动server
```js
  $ webpack-dev-server
```
然后你就会看见命令行输出内容很多，只要看看保证没有Error就说明成功了。
4. 在浏览器地址栏中输入**localhost：8089**测试一下。

Webpack的启动本地服务也顺利实现了，是不是也想实现像Gulp一样浏览器自动刷新呀？那Webpack能不能实现呢？答案是肯定的，Webpack官方提供了一个辅助开发工具，它可以自动监控项目下的文件，一旦有修改保存操作，开发服务器就会自动运行Webpack 打包命令，帮我们自动将开发的代码重新打包。而且，如果需要的话，还能自动刷新浏览器，重新加载资源。理论上好像是这样，但是实现好像有不少限制，比如，HTML文件的自动刷新问题（html-webpack-plugin插件使用老是报错），当本地server启动在非output.path路径之外时则不能自动刷新等问题，等我再学习学习再说，或者有知道的可以留言讨论。

而这个辅助工具就是**webpack-dev-server**，它主要提供两个功能：一是为静态文件提供server服务，二是自动刷新和热替换(HMR)。所以想实现如Gulp一样的功能也是可以的，只需要在``$ webpack-dev-server``后面添加``--inline --hot``即可。需要注意的是``--inline``是自动刷新，同时在第二部中的devServer属性中有一个**inline:true**需要配置；而``--hot``是热替换（[详细了解热替换](https://segmentfault.com/a/1190000003872635)、[了解webpack-dev-server](https://segmentfault.com/a/1190000006964335)、[webpack-dev-server](http://www.07net01.com/2015/12/1004731.html)）。

通过对比来看，好像Webpack的**webpack-dev-server**比Gulp的**gulp-server**功能要强一些。因为通过上面可以看出**webpack-dev-server**有两个大功能：一是为静态文件提供server服务，二是自动刷新（**自动刷新其实需要两步：1.修改文件后，文件自动编译{包括合并压缩或者语法编译等}，2.刷新浏览器请求最新编译后的文件**）和热替换(HMR)；而**gulp-server**虽然提供了启动本地server的能力和仅自动刷新浏览器的能力，缺少一个文件自动编译的能力，这需要借助其他模块实现（上一小节已介绍，结合gulp.watch()实时监控文件变化，并编译）。

另外需要注意的是，实际开发中发现**webpack-dev-server**实现自动刷新的时候，并没有执行自动编译，只是将修改的内容合并压缩等处理后发送给了浏览器，并造成了已经编译的现象，但是通过build/prd/scripts目录下的bundle.js(合并压缩后的输出文件)文件，可以发现内容并没有编译（对于Webpack还是不熟悉，好多问题等待解决）。

## mock数据
在现在前后端分离的思想中，前端和后端耦合度越来越小，现在唯一需要前后端密切联系的就是借口的定义和数据格式的确定。一般在项目开始前，前端和后端将项目中的接口和数据格式全部确定下来（当然项目需求变更就需要临时确立这些共识了），然后前端就可以自己mock数据了。

### Gulp实现mock数据
Gulp中对mock数据的实现使通过NodeJS内置的fs模块和url模块实现的，因为Gulp本身就是基于NodeJS的。还记得第一小节“模块化开发”中目录结构中的那个mock目录吗？那就是用来储存``.json``文件的mock数据目录。

1. 配置Gulp的gulpfile.js文件

```js
  //1.引入 fs 和 url 模块
  var fs = require('fs');
  var url = require('url');

  //2.重新配置一下上一小节的server
  gulp.task('webserver',function(){
     gulp.src('./')
     .pipe(webserver({
        host:'localhost',
        port:80,
        livereload:true,
        directoryListing:{
          enable: true,
          path:'./'
      },

      //mock数据配置
      middleware:function(req,res,next){
        var urlObj = url.parse(req.url,true);
        switch (urlObj.pathname) {
            case '/pro/getPro':
              res.setHeader('Content-Type','application/json;charaset=utf-8');
              fs.readFile('./mock/list.json',function(err,data){
                //上面list.json路径使用相对路径，绝对路径前台无法获取数据
                res.end(data);
              });
              return;
            case '/web/getUser':
                //....
              return;
          }
          next();
        }
      }));
  });
```
具体来说，就是通过NodeJS拦截http请求，根据请求URL来模拟后端做出处理后返回不同的数据。

### Webpack实现mock数据
Webpack并没有自带实现mock数据的功能，毕竟Webpack人家本来就是用来打包的，人家并不是流程控制的,我们可以和Gulp对比实现其他功能，是因为其他功能都是在打包过程中实现的(启动server除外)。虽然Webpack没有自带mock数据的功能，但是我们可以借助一些其他手段来实现，比如说**[json-server](https://github.com/typicode/json-server)**，它的实现原理就是，启动一个本地3000端口作为mock数据的端口，然后我们在Webpack中配置一个代理，让所有请求代理到3000端口上去，就可以获取到数据了。
实现步骤：
1. 在项目中通过npm安装一个**json-server**的模块
 ```js
    $ npm install  -g json-server
```
可以将在任何一个目录下启动json-server,为了统一，我们建议直接在项目根目录启动，将mock数据也放在项目根目录下。
2. 启动json-server
```js
  $ json-server
```
json-server是一个非常强大的工具，感兴趣的可以自行google。
3. 然后在Webpack的配置文件webpack.config.js中进行简单配置
```js
    module.exports = {
      devtool: 'eval-source-map',
      entry: {
       app:__dirname + "/src/scripts/app.js",
      },
      output: {
          path: __dirname + "/prd/scripts/",
          filename: "bundle.js"
      },
      //本地server配置
      devServer: {
        contentBase:  __dirname,
        port:8089,
        colors: true,
        historyApiFallback: true,
        inline: true,
        //重点在这里
        proxy:{
          '/http://chping.website/*':{//为正则表达式，匹配以http://chping.website开头的url
            target: 'http://localhost:3000',//代理到本地3000端口
            pathRewrite:{
              '^/http://chping.website':''//将http://chping.website替换为空字符串
            }
          }
        }
      }
   }
```
说明：
配置项``'^/http://chping.website':''//将http://chping.website替换为空字符串``的目的，举例说明：
假设我们项目中访问的是``http://chping.website/userlist``去获取用户列表，经过此配置项后，url为``http://localhost:3000/userlist``,否则为``http://localhost:3000/http://chping.website/userlist/userlist``。
4. 在命令行中重新启动server
```js
  $ webpack-dev-server
```

## 版本控制
对于版本控制，我们在开发过程中，也是一个使用比较频繁的功能，特别是开发团队比较大的时候，这个功能就显得更加重要了。那么Gulp和Webpack是具体怎样实现的呢？

### Gulp实现版本控制
1. 在项目中通过npm安装**gulp-rev**和**gulp-rev-collector**模块，前者用于生成文件的MD5码文件和按MD5码命名的资源文件，后者是利用MD5码，对文件名进行替换。
 ```js
    $ npm install  gulp-rev gulp-rev-collector -D
```
2. 然后在Gulp的配置文件gulpfile.js中进行简单配置
```js
    //1.引入连个模块
    var rev = require('gulp-rev');
    var revCollector = require('gulp-rev-collector');
    // 2.版本号控制
    gulp.task('ver',function(){
      gulp.src(cssFiles)
      .pipe(rev())//产生MD5码
      .pipe(gulp.dest('./build/prd/styles/'))//重命名文件
      .pipe(rev.manifest())//产生版本信息的json文件
      .pipe(gulp.dest('./build/ver/styles/'));
    gulp.src(jsFiles)
    .pipe(rev())
    .pipe(gulp.dest('./build/prd/scripts/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/ver/scripts/'));
   })
   //动态修改html中对css和js文件的修改
   gulp.task('html',function(){
    gulp.src(['./build/ver/**/*','./build/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./build/'));
  })
```

Gulp实现版本控制很方便，将这两个task加入gulp.watch()中，即可实现修改保存文件实时自动修改版本的功能。

### Webpack实现版本控制
Webpack中需要版本控制的有css、js文件，不过Webpack的版本控制只实现了将css、js文件添加hash值方式命名的文件方式，修改引用路径中的文件名需手动实现。
不过实现确实很简单，只需要将webpack.config.js配置文件中的output.filename和plugins中的输出文件名称修改一下即可。
```js
  module.exports = {
      devtool: 'eval-source-map',
      entry: {
         app:__dirname + "/src/scripts/app.js",
      },
      output: {
          path: __dirname + "/prd/scripts/",
          filename: "[name]-[hash].js"//修改输出文件名
      },
      plugins: [
          new Et('./styles/[name]-[hash].css'),//修改输出文件名
      ]
   }
```
这样就解决了。

## 组件控制
组件控制原本应该放在模块化小节或者前后小节，但是由于实在不知道该怎样比较，其实也没啥可比较的，就放在最后了。
Gulp和Webpack对各自组件的管理都是使用的npm进行的组件管理，想了解更多npm组件的管理的可自行百度，或者看看这篇文章入个门[《npm介绍》](http://chping.website/2016/09/12/npm/)。

## 总结
通过以上八个方面的功能对比，Gulp和Webpack基本都能满足前端自动化构建工具的任务，但是还是看出两个工具的侧重点是不通的，Gulp侧重整个过程的控制，Webpack在模块打包方面有特别出众。所以，Gulp + Webpack 组合使用可能更方便。

很长的一篇总结文章，前前后后花了两天时间终于写完了，还有很多测试没做，并且还有很多疑问没解决。慢慢学习，慢慢在补充修改吧。