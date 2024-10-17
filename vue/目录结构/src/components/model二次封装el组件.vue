<template>
  <!-- /* 外层 v-model 绑定显示/隐藏的变量 */ -->
  <div>
    <label :for="id">{{ label }}</label>
    <el-dialog @close="updateClose"
      title="提示"
      :visible.sync="visiable"
    />
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    customValue: {
      type: String,
      default: ''
    },
  },
  model: { 
    prop: 'customValue',
    event: 'update:customValue'
  },
  data() {
    return {
      visiable: false
    }
  },
  watch: {
    customValue(newValue) {
      this.visiable = newValue
    }
  },
  methods: {
    updateClose() {
      this.$emit('update:customValue', false)
    }
  },
}
</script>

<style scoped>
/* 你的样式 */
</style>