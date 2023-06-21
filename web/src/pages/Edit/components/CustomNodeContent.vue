<template>
  <div class="customNodeContent">
    <p>{{ title }}</p>
    <p v-html="html"></p>
    <p :style="{ backgroundColor: color }" @click="onClick">点击我会变色</p>
  </div>
</template>

<script>
export default {
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '我是自定义节点',
      color: ''
    }
  },
  methods: {
    onClick() {
      this.color = 'red'
    }
  }
}
</script>

<style lang="less" scoped>
.customNodeContent {
  padding: 10px;
  cursor: pointer;
}
</style>
