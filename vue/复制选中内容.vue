<template>
    <div class="home" @mouseup="copyT">
        发发发发发付付付付付付付付付付
        <textarea v-model="copyTxt" ref="copy" style="display: none;"></textarea>
    </div>
</template>
<script>
    // @ is an alias to /src
    export default {
        name: '',
        data() {
            return {
                copyTxt: ''
            }
        },
        methods: {
            copyT() {
                this.copyTxt = window.getSelection().toString()
                const el = this.$refs.copy
                el.select(); // 选择对象
                document.execCommand('Copy');
            }
        }
    }
</script>
<style type="text/css" lang="stylus" scoped>

</style>
