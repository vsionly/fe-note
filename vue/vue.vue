<!-- 阻止表单按enter自动提交 -->
<el-form size="medium" label-position="left" label-width="90px" @submit.native.prevent>
    <el-button size="medium" round type="primary" @click="save">确定</el-button>
</el-form>
<!-- 单文件引入js -->
<script src="@/source/PatternQuery/index.js"></script>
<!-- 单文件引入css -->
<style lang="stylus" src="@/source/PatternQuery/index.styl" scoped></style>
