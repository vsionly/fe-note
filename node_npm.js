/*
 *  node 版本管理
 *
 */

********************************************************************************************

`
npm start === npm run start
npm stop === npm run stop
npm test === npm run test
npm restart === npm run stop && npm run restart && npm run start

`

// 发布npm 包相关命令
/*
 *  1、whoami 查询登录的账号
 *  2、npm info 查看npm相关信息
 *  3、npm publish 发布最新的npm包
 *
 */
`
npm i -production  安装生产环境依赖

`

// 查询项目的浏览器兼容性
`
npx browserslist
`

*********************************************************************************************
    常用npm 命令
    npm ls 包名  查看本地包的安装信息
    npm info  包名 查看包的远程信息 包括各种版本

*********************************************************************************************
    常用包整理
    NODEMAILER nodejs 发送邮件
*********************************************************************************************

    安装node:  nvm install v1.v2.v3 v2、v3可省略
    查看本地node版本  nvm ls

    nvm install stable ## 安装最新稳定版 node
    nvm install <version> ## 安装指定版本
    nvm uninstall <version> ## 删除已安装的指定版本
    nvm use <version> ## 切换使用指定的版本node
    nvm ls ## 列出所有安装的版本
    nvm ls-remote ## 列出所有远程服务器的版本
    nvm current ## 显示当前的版本
    nvm alias <name> <version> ## 给不同的版本号添加别名
    nvm unalias <name> ## 删除已定义的别名
    nvm reinstall-packages <version> ## 在当前版本 node 环境下，重新   全局安装指定版本号的 npm 包
    nvm alias default [node版本号] ##设置默认版本
