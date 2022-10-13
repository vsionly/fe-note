<template>
    <div>
    </div>
</template>
<script>
import aidMix from '@/mixin/aidMix.js'

export default {
    name: 'UserIndex',
    data() {
        return {
            data: ''
        }
    },
    // 箭头函数写法更简洁
    data: () => ({
      activeInd: 0 // 是否内部活动
    }),
    mixins: [aidMix],
    methods: {
        fun() {

        }
    }
}
</script>
<style type="text/css" lang="stylus" scoped>

</style>
