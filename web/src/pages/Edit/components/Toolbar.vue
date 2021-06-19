<template>
  <div class="toolbarContainer">
    <div class="toolbar">
      <div
        class="toolbarBtn"
        :class="{
          disabled: activeNodes.length <= 0,
        }"
        @click="$bus.$emit('execCommand', 'INSERT_NODE')"
      >
        <span class="icon iconfont iconjiedian"></span>
        <span class="text">插入同级节点</span>
      </div>
      <div
        class="toolbarBtn"
        :class="{
          disabled: activeNodes.length <= 0,
        }"
        @click="$bus.$emit('execCommand', 'INSERT_CHILD_NODE')"
      >
        <span class="icon iconfont icontianjiazijiedian"></span>
        <span class="text">插入子节点</span>
      </div>
      <div
        class="toolbarBtn"
        :class="{
          disabled: activeNodes.length <= 0,
        }"
        @click="$bus.$emit('execCommand', 'REMOVE_NODE')"
      >
        <span class="icon iconfont iconshanchu"></span>
        <span class="text">删除节点</span>
      </div>
      <div
        class="toolbarBtn"
        :class="{
          disabled: activeNodes.length <= 0,
        }"
        @click="$bus.$emit('showNodeImage')"
      >
        <span class="icon iconfont iconimage"></span>
        <span class="text">图片</span>
      </div>
      <div
        class="toolbarBtn"
        :class="{
          disabled: activeNodes.length <= 0,
        }"
        @click="$bus.$emit('showNodeIcon')"
      >
        <span class="icon iconfont iconxiaolian"></span>
        <span class="text">图标</span>
      </div>
      <div
        class="toolbarBtn"
        :class="{
          disabled: activeNodes.length <= 0,
        }"
        @click="$bus.$emit('showNodeLink')"
      >
        <span class="icon iconfont iconchaolianjie"></span>
        <span class="text">超链接</span>
      </div>
      <div class="toolbarBtn" @click="$bus.$emit('showOutline')">
        <span class="icon iconfont iconfuhao-dagangshu"></span>
        <span class="text">显示大纲</span>
      </div>
      <div class="toolbarBtn" @click="$bus.$emit('showTheme')">
        <span class="icon iconfont iconyangshi"></span>
        <span class="text">基础样式</span>
      </div>
    </div>
    <NodeImage></NodeImage>
  </div>
</template>

<script>
import NodeImage from "./NodeImage";

export default {
  name: "Toolbar",
  components: {
    NodeImage,
  },
  data() {
    return {
      activeNodes: [],
    };
  },
  created() {
    this.$bus.$on("node_active", (...args) => {
      this.activeNodes = args[1];
    });
  },
};
</script>

<style lang="less" scoped>
.toolbarContainer {
  height: 62px;
  background: #fafafa;
  padding-left: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(26, 26, 26, 0.8);

  .toolbar {
    display: flex;
    align-items: center;

    .toolbarBtn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      margin-right: 20px;

      &:hover {
        &:not(.disabled) {
          .icon {
            background: #f5f5f5;
          }
        }
      }

      &.disabled {
        color: #bcbcbc;
        cursor: not-allowed;
      }

      .icon {
        display: flex;
        height: 26px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 0 5px;
      }

      .text {
        margin-top: 3px;
      }
    }
  }
}
</style>
