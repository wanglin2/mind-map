<template>
  <div class="workbencheEmptyContainer">
    <div class="icon iconfont iconwushuju"></div>
    <div class="tip">暂时没有内容</div>
    <div class="desc">没有最近使用的文件记录</div>
    <div class="createBtn" @click="create">立即创建</div>
  </div>
</template>

<script>
import { create } from '../utils'

export default {
  methods: {
    create
  }
}
</script>

<style lang="less" scoped>
.workbencheEmptyContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .icon {
    font-size: 100px;
    margin-bottom: 20px;
  }

  .tip {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .desc {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .createBtn {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #409eff;
    color: #409eff;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgba(64, 158, 255, 0.3);
    }
  }
}
</style>
