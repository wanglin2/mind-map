<template>
  <div
    class="contextmenuContainer"
    v-if="isShow"
    :style="{ left: left + 'px', top: top + 'px' }"
  >
    <div
      class="item"
      @click="exec('INSERT_NODE', insertNodeBtnDisabled)"
      :class="{ disabled: insertNodeBtnDisabled }"
    >
      插入同级节点
    </div>
    <div class="item" @click="exec('INSERT_CHILD_NODE')">插入子级节点</div>
    <div
      class="item"
      @click="exec('UP_NODE')"
      :class="{ disabled: upNodeBtnDisabled }"
    >
      上移节点
    </div>
    <div
      class="item"
      @click="exec('DOWN_NODE')"
      :class="{ disabled: downNodeBtnDisabled }"
    >
      下移节点
    </div>
    <div class="item danger" @click="exec('REMOVE_NODE')">删除节点</div>
    <div class="item">复制节点</div>
    <div class="item">剪切节点</div>
    <div class="item">粘贴节点</div>
  </div>
</template>

<script>
/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 右键菜单
 */
export default {
  name: "Contextmenu",
  props: {
    mindMap: {
      type: Object,
    },
  },
  data() {
    return {
      isShow: false,
      left: 0,
      top: 0,
      node: null,
    };
  },
  computed: {
    insertNodeBtnDisabled() {
      return !this.node || this.node.isRoot;
    },
    upNodeBtnDisabled() {
      if (!this.node || this.node.isRoot) {
        return true;
      }
      let isFirst =
        this.node.parent.children.findIndex((item) => {
          return item === this.node;
        }) === 0;
      return isFirst;
    },
    downNodeBtnDisabled() {
      if (!this.node || this.node.isRoot) {
        return true;
      }
      let children = this.node.parent.children;
      let isLast =
        children.findIndex((item) => {
          return item === this.node;
        }) === children.length - 1;
      return isLast;
    },
  },
  created() {
    this.$bus.$on("node_contextmenu", this.show);
    this.$bus.$on("node_click", this.hide);
    this.$bus.$on("draw_click", this.hide);
    this.$bus.$on("expand_btn_click", this.hide);
  },
  beforeDestroy() {
    this.$bus.$off("node_contextmenu", this.show);
    this.$bus.$off("node_click", this.hide);
    this.$bus.$off("draw_click", this.hide);
    this.$bus.$off("expand_btn_click", this.hide);
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-07-14 21:38:50
     * @Desc: 显示
     */
    show(e, node) {
      this.left = e.clientX + 10;
      this.top = e.clientY + 10;
      this.isShow = true;
      this.node = node;
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-14 21:37:55
     * @Desc: 隐藏
     */
    hide() {
      this.isShow = false;
      this.left = 0;
      this.top = 0;
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-14 23:27:54
     * @Desc: 执行命令
     */
    exec(key, disabled) {
      if (disabled) {
        return;
      }
      this.$bus.$emit("execCommand", key);
      this.hide();
    },
  },
};
</script>

<style lang="less" scoped>
.contextmenuContainer {
  position: fixed;
  width: 161px;
  background: #fff;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1a1a1a;

  .item {
    height: 28px;
    line-height: 28px;
    padding-left: 16px;
    cursor: pointer;

    &.danger {
      color: #F56C6C;
    }

    &:hover {
      background: #f5f5f5;
    }

    &.disabled {
      color: grey;
      cursor: not-allowed;

      &:hover {
        background: #fff;
      }
    }
  }
}
</style>
