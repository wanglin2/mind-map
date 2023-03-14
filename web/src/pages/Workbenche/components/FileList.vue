<template>
  <div class="workbencheFileListContainer">
    <div class="title">最近</div>
    <div class="fileListBox">
      <Empty></Empty>
    </div>
  </div>
</template>

<script>
import Empty from '../components/Empty.vue'

export default {
  components: {
    Empty
  }
}
</script>

<style lang="less" scoped>
.workbencheFileListContainer {
  flex-grow: 1;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #e4e7ed;
    height: 65px;
    line-height: 65px;
    flex-shrink: 0;
  }

  .fileListBox {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>
