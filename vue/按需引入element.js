// npm 依赖
    "babel-plugin-component": "^1.1.1",
    "element-ui": "^2.14.1",


//  main.js
import { Menu, MenuItem, Submenu } from 'element-ui'
Vue.use(Menu).use(MenuItem).use(Submenu)

// .babelrc 配置文件
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}