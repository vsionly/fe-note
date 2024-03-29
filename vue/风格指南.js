******************************************************************************
    一、组件
    1、自定义组件名 (字母全小写且必须包含一个连字符)
        import BaseItem from 'BaseItem.vue'
        Vue.component('my-component-name', BaseItem)

    2、基础组件名
        应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前
        缀开头，比如 Base、App 或 V。

    3、单例组件名
        只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。

    4、紧密耦合的组件名
        和父组件紧密耦合的子组件应该以父组件名作为前缀命名

    二、事件名
    1、 kebab-case