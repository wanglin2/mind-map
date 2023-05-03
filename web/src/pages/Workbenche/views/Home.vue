<template>
  <div class="workbencheHomeContainer">
    <div class="workbencheHomeHeader">
      <MacControl></MacControl>
      <WinControl></WinControl>
    </div>
    <div class="workbencheHomeContent">
      <Sidebar></Sidebar>
      <FileList></FileList>
    </div>
  </div>
</template>

<script>
import WinControl from '../components/WinControl.vue'
import MacControl from '../components/MacControl.vue'
import Sidebar from '../components/Sidebar.vue'
import FileList from '../components/FileList.vue'

export default {
  components: {
    WinControl,
    MacControl,
    Sidebar,
    FileList
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
    display: flex;
    overflow: hidden;
  }
}
</style>
