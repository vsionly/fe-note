**********************************************************************************************************
<!-- 阻止表单按enter自动提交 -->
<el-form size="medium" label-position="left" label-width="90px" @submit.native.prevent>
    <el-button size="medium" round type="primary" @click="save">确定</el-button>
</el-form>

**********************************************************************************************************
<!-- 上传图片、头像 配合el的上传组件 -->
<el-upload :auto-upload="false"
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-change="changeRobot">
    <img v-if="robot" :src="robot" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
<script>
export default {
    methods: {
        transImg(file, type) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this[type] = reader.result
            }
        },
        changeRobot(file) {
            this.transImg(file.raw, 'robot')
        },
    }
}
</script>
**********************************************************************************************************
<script>

    *变更方法

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
    你可以打开控制台，然后对前面例子的 items 数组尝试调用变更方法。比如 example1.items.push({ message: 'Baz' })。

    *替换数组

    变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组：

    example1.items = example1.items.filter(item => item.message.match(/Foo/))

</script>

**********************************************************************************************************
