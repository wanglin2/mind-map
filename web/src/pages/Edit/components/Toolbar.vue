<template>
  <div class="toolbarContainer">
    <div class="toolbar">
      <!-- 节点操作 -->
      <div class="toolbarBlock">
        <div
          class="toolbarBtn"
          :class="{
            disabled: backEnd,
          }"
          @click="$bus.$emit('execCommand', 'BACK')"
        >
          <span class="icon iconfont iconhoutui-shi"></span>
          <span class="text">回退</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: forwardEnd,
          }"
          @click="$bus.$emit('execCommand', 'FORWARD')"
        >
          <span class="icon iconfont iconqianjin1"></span>
          <span class="text">前进</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0 || hasRoot,
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
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0,
          }"
          @click="$bus.$emit('showNodeNote')"
        >
          <span class="icon iconfont iconflow-Mark"></span>
          <span class="text">备注</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0,
          }"
          @click="$bus.$emit('showNodeTag')"
        >
          <span class="icon iconfont iconbiaoqian"></span>
          <span class="text">标签</span>
        </div>
      </div>
      <!-- 通用操作 -->
      <div class="toolbarBlock">
        <div class="toolbarBtn" @click="$bus.$emit('showOutline')">
          <span class="icon iconfont iconfuhao-dagangshu"></span>
          <span class="text">显示大纲</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showBaseStyle')">
          <span class="icon iconfont iconyangshi"></span>
          <span class="text">基础样式</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showTheme')">
          <span class="icon iconfont iconjingzi"></span>
          <span class="text">主题</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showStructure')">
          <span class="icon iconfont iconjiegou"></span>
          <span class="text">结构</span>
        </div>
      </div>
      <!-- 导出 -->
      <div class="toolbarBlock">
        <div class="toolbarBtn" @click="$bus.$emit('showExport')">
          <span class="icon iconfont icondaochu"></span>
          <span class="text">导出</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showShortcutKey')">
          <span class="icon iconfont iconjianpan"></span>
          <span class="text">快捷键</span>
        </div>
      </div>
    </div>
    <NodeImage></NodeImage>
    <NodeHyperlink></NodeHyperlink>
    <NodeIcon></NodeIcon>
    <NodeNote></NodeNote>
    <NodeTag></NodeTag>
    <Export></Export>
  </div>
</template>

<script>
import NodeImage from "./NodeImage";
import NodeHyperlink from "./NodeHyperlink";
import NodeIcon from "./NodeIcon";
import NodeNote from "./NodeNote";
import NodeTag from "./NodeTag";
import Export from "./Export";

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:58
 * @Desc: 工具栏
 */
export default {
  name: "Toolbar",
  components: {
    NodeImage,
    NodeHyperlink,
    NodeIcon,
    NodeNote,
    NodeTag,
    Export,
  },
  data() {
    return {
      activeNodes: [],
      backEnd: false,
      forwardEnd: true
    };
  },
  computed: {
    hasRoot() {
      return this.activeNodes.find((node) => {
        return node.isRoot;
      });
    },
  },
  created() {
    this.$bus.$on("node_active", (...args) => {
      this.activeNodes = args[1];
    });
    this.$bus.$on("back_forward", (index, len) => {
      this.backEnd = index <= 0
      this.forwardEnd = index >= len - 1
    });
  },
};
</script>

<style lang="less" scoped>
.toolbarContainer {
  .toolbar {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    padding: 0 20px;
    padding-top: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 26, 26, 0.8);
    z-index: 2;

    .toolbarBlock {
      display: flex;
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .toolbarBtn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }

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
