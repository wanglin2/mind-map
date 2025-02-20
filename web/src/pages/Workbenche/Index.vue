<template>
  <div class="workbencheContainer">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Workbenche',
  created() {
    document.title = '思绪思维导图'
  }
}
</script>

<style lang="less" scoped>
.workbencheContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
