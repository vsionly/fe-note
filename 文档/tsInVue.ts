**********************
| Typescript Vue 学习笔记 |
**********************
******************************************************************************
  1、通过类型声明定义props

    <script setup>
        const props = defineProps<{
          handle: "add" | "update"
          parentId: number | null
          flag: boolean
          isDir: boolean
        }>()
    </script>/

    使用默认值就得用withDefaults
    interface Props {
      msg?: string
      labels?: string[]
    }

    const props = withDefaults(defineProps<Props>(), {
      msg: 'hello',
      labels: () => ['one', 'two']
    })

    但是如果在 defineProps 使用外部引入的interface或者type会报错的,它提醒我们要使用字面量
    类型，当前在github上vue的issue已经有这个问题了，目前还没解决，期待早日完善，目前的方法
    就是类型只能写在当前的vue文件中
******************************************************************************
