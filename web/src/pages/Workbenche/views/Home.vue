<template>
  <div class="workbencheHomeContainer">
    <div class="workbencheHomeHeader">
      <MacControl></MacControl>
      <WinControl></WinControl>
    </div>
    <div class="workbencheHomeContent"></div>
  </div>
</template>

<script>
import WinControl from '../components/WinControl.vue'
import MacControl from '../components/MacControl.vue'

export default {
  components: {
    WinControl,
    MacControl
  }
}
</script>

<style lang="less" scoped>
.workbencheHomeContainer {
  background-color: #f6f8f9;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .workbencheHomeHeader {
    width: 100%;
    height: 40px;
    background-color: #ebeef1;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .workbencheHomeContent {
    flex-grow: 1;
    padding: 20px;
  }
}
</style>
