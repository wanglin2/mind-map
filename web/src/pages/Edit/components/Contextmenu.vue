<template>
  <div
    class="contextmenuContainer listBox"
    v-if="isShow"
    :style="{ left: left + 'px', top: top + 'px' }"
  >
    <template v-if="type === 'node'">
      <div
        class="item"
        @click="exec('INSERT_NODE', insertNodeBtnDisabled)"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        插入同级节点
        <span class="desc">Enter</span>
      </div>
      <div class="item" @click="exec('INSERT_CHILD_NODE')">
        插入子级节点
        <span class="desc">Tab</span>
      </div>
      <div
        class="item"
        @click="exec('ADD_GENERALIZATION')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        插入概要
        <span class="desc">Ctrl + S</span>
      </div>
      <div
        class="item"
        @click="exec('UP_NODE')"
        :class="{ disabled: upNodeBtnDisabled }"
      >
        上移节点
        <span class="desc">Ctrl + ↑</span>
      </div>
      <div
        class="item"
        @click="exec('DOWN_NODE')"
        :class="{ disabled: downNodeBtnDisabled }"
      >
        下移节点
        <span class="desc">Ctrl + ↓</span>
      </div>
      <div class="item danger" @click="exec('REMOVE_NODE')">
        删除节点
        <span class="desc">Delete</span>
      </div>
      <div class="item" @click="exec('COPY_NODE')">
        复制节点
        <span class="desc">Ctrl + C</span>
      </div>
      <div class="item" @click="exec('CUT_NODE')">
        剪切节点
        <span class="desc">Ctrl + X</span>
      </div>
      <div
        class="item"
        :class="{ disabled: copyData === null }"
        @click="exec('PASTE_NODE')"
      >
        粘贴节点
        <span class="desc">Ctrl + V</span>
      </div>
    </template>
    <template v-if="type === 'svg'">
      <div class="item" @click="exec('RETURN_CENTER')">回到中心</div>
      <div class="item" @click="exec('EXPAND_ALL')">展开所有</div>
      <div class="item" @click="exec('UNEXPAND_ALL')">收起所有</div>
      <div class="item">
        展开到
        <div class="subItems listBox">
          <div
            class="item"
            v-for="(item, index) in expandList"
            :key="item"
            @click="exec('UNEXPAND_TO_LEVEL', false, index + 1)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="item" @click="exec('RESET_LAYOUT')">
        一键整理布局
        <span class="desc">Ctrl + L</span>
      </div>
    </template>
  </div>
</template>

<script>
/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 右键菜单
 */
export default {
  name: 'Contextmenu',
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false,
      left: 0,
      top: 0,
      node: null,
      copyData: null,
      type: '',
      isMousedown: false,
      mosuedownX: 0,
      mosuedownY: 0,
      expandList: [
        '一级主题',
        '二级主题',
        '三级主题',
        '四级主题',
        '五级主题',
        '六级主题'
      ]
    }
  },
  computed: {
    insertNodeBtnDisabled() {
      return !this.node || this.node.isRoot
    },
    upNodeBtnDisabled() {
      if (!this.node || this.node.isRoot) {
        return true
      }
      let isFirst =
        this.node.parent.children.findIndex(item => {
          return item === this.node
        }) === 0
      return isFirst
    },
    downNodeBtnDisabled() {
      if (!this.node || this.node.isRoot) {
        return true
      }
      let children = this.node.parent.children
      let isLast =
        children.findIndex(item => {
          return item === this.node
        }) ===
        children.length - 1
      return isLast
    }
  },
  created() {
    this.$bus.$on('node_contextmenu', this.show)
    this.$bus.$on('node_click', this.hide)
    this.$bus.$on('draw_click', this.hide)
    this.$bus.$on('expand_btn_click', this.hide)
    this.$bus.$on('svg_mousedown', this.onMousedown)
    this.$bus.$on('mouseup', this.onMouseup)
    // 注册快捷键
    this.mindMap.keyCommand.addShortcut('Control+c', this.copy)
    this.mindMap.keyCommand.addShortcut('Control+v', this.paste)
    this.mindMap.keyCommand.addShortcut('Control+x', this.cut)
  },
  beforeDestroy() {
    this.$bus.$off('node_contextmenu', this.show)
    this.$bus.$off('node_click', this.hide)
    this.$bus.$off('draw_click', this.hide)
    this.$bus.$off('expand_btn_click', this.hide)
    this.$bus.$on('svg_mousedown', this.onMousedown)
    this.$bus.$on('mouseup', this.onMouseup)
    // 移除快捷键
    this.mindMap.keyCommand.removeShortcut('Control+c', this.copy)
    this.mindMap.keyCommand.removeShortcut('Control+v', this.paste)
    this.mindMap.keyCommand.removeShortcut('Control+x', this.cut)
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-07-14 21:38:50
     * @Desc: 节点右键显示
     */
    show(e, node) {
      this.type = 'node'
      this.left = e.clientX + 10
      this.top = e.clientY + 10
      this.isShow = true
      this.node = node
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-16 13:27:48
     * @Desc: 鼠标按下事件
     */
    onMousedown(e) {
      if (e.which !== 3) {
        return
      }
      this.mosuedownX = e.clientX
      this.mosuedownY = e.clientY
      this.isMousedown = true
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-16 13:27:53
     * @Desc: 鼠标松开事件
     */
    onMouseup(e) {
      if (!this.isMousedown) {
        return
      }
      this.isMousedown = false
      if (
        Math.abs(this.mosuedownX - e.clientX) > 3 ||
        Math.abs(this.mosuedownY - e.clientY) > 3
      ) {
        this.hide()
        return
      }
      this.show2(e)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-15 22:54:08
     * @Desc: 画布右键显示
     */
    show2(e) {
      this.type = 'svg'
      this.left = e.clientX + 10
      this.top = e.clientY + 10
      this.isShow = true
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-14 21:37:55
     * @Desc: 隐藏
     */
    hide() {
      this.isShow = false
      this.left = 0
      this.top = 0
      this.type = ''
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-14 23:27:54
     * @Desc: 执行命令
     */
    exec(key, disabled, ...args) {
      if (disabled) {
        return
      }
      switch (key) {
        case 'COPY_NODE':
          this.copyData = this.mindMap.renderer.copyNode()
          break
        case 'CUT_NODE':
          this.$bus.$emit('execCommand', key, copyData => {
            this.copyData = copyData
          })
          break
        case 'PASTE_NODE':
          this.$bus.$emit('execCommand', key, this.copyData)
          break
        case 'RETURN_CENTER':
          this.mindMap.view.reset()
          break
        default:
          this.$bus.$emit('execCommand', key, ...args)
          break
      }
      this.hide()
    },

    /**
     * @Author: 王林25
     * @Date: 2022-08-04 14:25:45
     * @Desc: 复制
     */
    copy() {
      this.exec('COPY_NODE')
    },

    /**
     * @Author: 王林25
     * @Date: 2022-08-04 14:26:43
     * @Desc: 粘贴
     */
    paste() {
      this.exec('PASTE_NODE')
    },

    /**
     * @Author: 王林25
     * @Date: 2022-08-04 14:27:32
     * @Desc: 剪切
     */
    cut() {
      this.exec('CUT_NODE')
    }
  }
}
</script>

<style lang="less" scoped>
.listBox {
  width: 200px;
  background: #fff;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.contextmenuContainer {
  position: fixed;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1a1a1a;

  .item {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &.danger {
      color: #f56c6c;
    }

    &:hover {
      background: #f5f5f5;

      .subItems {
        visibility: visible;
      }
    }

    &.disabled {
      color: grey;
      cursor: not-allowed;
      pointer-events: none;

      &:hover {
        background: #fff;
      }
    }

    .desc {
      color: #999;
    }

    .subItems {
      position: absolute;
      left: 100%;
      top: 0;
      visibility: hidden;
    }
  }
}
</style>
