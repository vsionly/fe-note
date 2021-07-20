<template>
    <el-form class="form-pop" ref="user" :model="user" :rules="rules" label-width="88px">
        <el-form-item prop="name" label="用户名：">
            <el-input
                placeholder="请输入用户名"
                v-model="user.name"
                clearable>
            </el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户名：">
            <el-radio-group v-model="kForm.visibility">
                <el-radio label="4">院内外通用</el-radio>
                <el-radio label="2">院内</el-radio>
                <el-radio label="1">院外</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="用户名：">
            <el-select v-model="form.role" placeholder="请输入角色">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="name" label="用户名：">
            <el-checkbox-group class="flex1" v-model="kForm.type">
                <el-checkbox label="美食餐线上活动" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="name" label="文本域">
            <el-input rows="4" :maxlength="200" type="textarea" show-word-limit v-model="vDesc"/>
        </el-form-item>
        <el-form-item prop="name" label="用户名：">
            <el-date-picker class="w240"
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
    </el-form>
</template>
<script type="text/javascript">
    this.$message.success('')
    this.$message.error('')
    if (res.status === 0) {
        this.$message.error('删除成功！')
    }
</script>