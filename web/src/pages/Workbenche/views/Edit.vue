<template>
  <div class="workbencheEditContainer">
    <div class="workbencheEditHeader">
      <MacControl></MacControl>
      <WinControl></WinControl>
    </div>
    <Edit></Edit>
  </div>
</template>

<script>
import Edit from '../../Edit/Index.vue'
import WinControl from '../components/WinControl.vue'
import MacControl from '../components/MacControl.vue'

export default {
  components: {
    Edit,
    MacControl,
    WinControl
  },
}
</script>

<style lang="less" scoped>
.workbencheEditContainer {
  .workbencheEditHeader {
    width: 100%;
    height: 40px;
    background-color: #ebeef1;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
}
</style>
