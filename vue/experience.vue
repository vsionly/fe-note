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
