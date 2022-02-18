****************************************************************************************************
    /*
     *  sublime text3 设置项及插件
     * 	author：李伟生
     * 	email: liwsh666@126.com
     */
{
    "default_line_ending": "unix",
    "font_size": 17,
    "save_on_focus_lost": true,
    "show_encoding": true,
    "index_files": false, // 禁用hover字符时 在node_modules中搜索
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true,
    "color_scheme": "auto",
    "dark_color_scheme": "Monokai.sublime-color-scheme",
    "light_color_scheme": "Monokai.sublime-color-scheme",
}

****************************************************************************************************
   /*
    *  跨系统开发的换行符
    *  Windows 、unix 、linux 的断行
    *  Windows/Dos的是 CRLF \r\n  Linux/Unix是LF \n    MacOS 是CR \r
    */
       统一配置为unix的换行
       修改git配置 在拉取代码时 不转换断行符git config --global core.autocrlf false
       编辑器也要修改为unix
       TortoiseGit 修改配置文件 core下面的autocrlf = false
****************************************************************************************************
   在安装插件之前，需要让sublime安装Package Control。首先，按CTRL+`，打开控制台     粘贴下面的代码，之后回车
   import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
   手动安装：
   可能由于各种原因，无法使用代码安装，那可以通过以下步骤手动安装Package Control：
   1.点击Preferences > Browse Packages菜单
   2.进入打开的目录的上层目录，然后再进入Installed Packages/目录
   3.下载 Package Control.sublime-package 并复制到Installed Packages/目录
   4.重启Sublime Text。
****************************************************************************************************
   // 需要的插件及其作用
   Vue Syntax Highlight // vue开发支持vue的语法高亮
   Stylus // vue文件中 stylus 的语法高亮
   Emmet // 快速编写html、css、stylus、sass、scss
   JavaScript-Completions // js预定义、自定义函数 快捷生成插件
   SublimeCodeIntel // 代码提示插件
   ··
   软件出现功能问题的解决方案 //  删除 C:\Users\liwsh\AppData\Roaming\Sublime Text 3的所有相关文件
   'Packages\JavaScript Completions\sublime-completions' // 修改javascript completions插件的生成模板