/*
 *  sublime text3 设置项及插件
 * 	author：李伟生
 * 	email: liwsh666@126.com
 */
{
	"default_line_ending": "unix",
	"font_size": 14,
	"save_on_focus_lost": true,
	"show_encoding": true,
	"index_files": false, // 禁用hover字符时 在node_modules中搜索
    "translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true
}

/*
 *  跨系统开发的换行符
 *  Windows 、unix 、linux 的断行
 *  Windows/Dos的是 CRLF \r\n  Linux/Unix是LF \n    MacOS 是CR \r
 */
    统一配置为unix的换行
    修改git配置 在拉取代码时 不转换断行符git config --global core.autocrlf false
    编辑器也要修改为unix
    TortoiseGit 修改配置文件 core下面的autocrlf = false


// 需要的插件及其作用
Vue Syntax Highlight // vue开发支持vue的语法高亮
Stylus // vue文件中 stylus 的语法高亮
Emmet // 快速编写html、css、stylus、sass、scss
JavaScript-Completions // js预定义、自定义函数 快捷生成插件
SublimeCodeIntel // 代码提示插件
··
软件出现功能问题的解决方案 //  删除 C:\Users\liwsh\AppData\Roaming\Sublime Text 3的所有相关文件

'Packages\JavaScript Completions\sublime-completions' // 修改javascript completions插件的生成模板