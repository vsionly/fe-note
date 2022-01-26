function blue(){
    // ie 不过会提示无权限
    if(document.all){ // document.createStyleSheet(url)
        window.style="body{background-color:blue;";
        document.createStyleSheet("javascript:style"); // 此方法会直接往head中追加后面的字符串 没测试

    // firefox chrome
    }else{ //document.createElement(style)
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML="body{ background-color:blue }";
        document.querySelector('head').appendChild(style);
    }
}