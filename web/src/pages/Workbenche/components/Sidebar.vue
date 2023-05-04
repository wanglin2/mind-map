<template>
  <div class="workbencheSidebarContainer">
    <div class="createBtn" @click="create">开始新建</div>
    <div class="line"></div>
    <div class="btn" @click="openLocalFile">
      <span class="icon iconfont icondakai"></span>
      <span class="text">打开本地文件</span>
    </div>
    <div class="btn active">
      <span class="icon iconfont iconzuijinliulan"></span>
      <span class="text">最近文件</span>
    </div>
  </div>
</template>

<script>
import { create } from '../utils'

export default {
  methods: {
    create,

    openLocalFile() {
      window.electronAPI.selectOpenFile()
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheSidebarContainer {
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 20px;
  padding: 15px 20px;

  .createBtn {
    width: 100%;
    height: 30px;
    background-color: #409eff;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    user-select: none;

    &:hover {
      opacity: 0.9;
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    margin: 20px 0;
  }

  .btn {
    width: 100%;
    height: 30px;
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
    padding: 0 10px;
    margin-bottom: 10px;

    &.active,
    &:hover {
      background-color: rgba(64, 158, 255, 0.3);
      color: rgba(64, 158, 255, 1);
    }

    .icon {
      margin-right: 10px;
    }
  }
}
</style>
