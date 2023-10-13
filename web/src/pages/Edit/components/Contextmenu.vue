<template>
  <div
    class="contextmenuContainer listBox"
    v-if="isShow"
    :style="{ left: left + 'px', top: top + 'px' }"
    :class="{ isDark: isDark }"
  >
    <template v-if="type === 'node'">
      <div
        class="item"
        @click="exec('INSERT_NODE', insertNodeBtnDisabled)"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        {{ $t('contextmenu.insertSiblingNode') }}
        <span class="desc">Enter</span>
      </div>
      <div
        class="item"
        @click="exec('INSERT_CHILD_NODE')"
        :class="{ disabled: isGeneralization }"
      >
        {{ $t('contextmenu.insertChildNode') }}
        <span class="desc">Tab</span>
      </div>
      <div
        class="item"
        @click="exec('INSERT_PARENT_NODE')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        {{ $t('contextmenu.insertParentNode') }}
        <span class="desc">Shift + Tab</span>
      </div>
      <div
        class="item"
        @click="exec('ADD_GENERALIZATION')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        {{ $t('contextmenu.insertSummary') }}
        <span class="desc">Ctrl + G</span>
      </div>
      <div
        class="item"
        @click="exec('UP_NODE')"
        :class="{ disabled: upNodeBtnDisabled }"
      >
        {{ $t('contextmenu.moveUpNode') }}
        <span class="desc">Ctrl + ↑</span>
      </div>
      <div
        class="item"
        @click="exec('DOWN_NODE')"
        :class="{ disabled: downNodeBtnDisabled }"
      >
        {{ $t('contextmenu.moveDownNode') }}
        <span class="desc">Ctrl + ↓</span>
      </div>
      <div class="item danger" @click="exec('REMOVE_NODE')">
        {{ $t('contextmenu.deleteNode') }}
        <span class="desc">Delete</span>
      </div>
      <div class="item danger" @click="exec('REMOVE_CURRENT_NODE')">
        {{ $t('contextmenu.deleteCurrentNode') }}
        <span class="desc">Shift + Backspace</span>
      </div>
      <div
        class="item"
        @click="exec('COPY_NODE')"
        :class="{ disabled: isGeneralization }"
      >
        {{ $t('contextmenu.copyNode') }}
        <span class="desc">Ctrl + C</span>
      </div>
      <div
        class="item"
        @click="exec('CUT_NODE')"
        :class="{ disabled: isGeneralization }"
      >
        {{ $t('contextmenu.cutNode') }}
        <span class="desc">Ctrl + X</span>
      </div>
      <div class="item" @click="exec('PASTE_NODE')">
        {{ $t('contextmenu.pasteNode') }}
        <span class="desc">Ctrl + V</span>
      </div>
      <div class="item" @click="exec('REMOVE_HYPERLINK')" v-if="hasHyperlink">
        {{ $t('contextmenu.removeHyperlink') }}
      </div>
      <div class="item" @click="exec('REMOVE_NOTE')" v-if="hasNote">
        {{ $t('contextmenu.removeNote') }}
      </div>
    </template>
    <template v-if="type === 'svg'">
      <div class="item" @click="exec('RETURN_CENTER')">
        {{ $t('contextmenu.backCenter') }}
        <span class="desc">Ctrl + Enter</span>
      </div>
      <div class="item" @click="exec('EXPAND_ALL')">
        {{ $t('contextmenu.expandAll') }}
      </div>
      <div class="item" @click="exec('UNEXPAND_ALL')">
        {{ $t('contextmenu.unExpandAll') }}
      </div>
      <div class="item">
        {{ $t('contextmenu.expandTo') }}
        <div class="subItems listBox" :class="{ isDark: isDark }">
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
        {{ $t('contextmenu.arrangeLayout') }}
        <span class="desc">Ctrl + L</span>
      </div>
      <div class="item" @click="exec('FIT_CANVAS')">
        {{ $t('contextmenu.fitCanvas') }}
        <span class="desc">Ctrl + i</span>
      </div>
      <div class="item" @click="exec('TOGGLE_ZEN_MODE')">
        {{ $t('contextmenu.zenMode') }}
        {{ isZenMode ? '√' : '' }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
      type: '',
      isMousedown: false,
      mosuedownX: 0,
      mosuedownY: 0
    }
  },
  computed: {
    ...mapState({
      isZenMode: state => state.localConfig.isZenMode,
      isDark: state => state.isDark
    }),
    expandList() {
      return [
        this.$t('contextmenu.level1'),
        this.$t('contextmenu.level2'),
        this.$t('contextmenu.level3'),
        this.$t('contextmenu.level4'),
        this.$t('contextmenu.level5'),
        this.$t('contextmenu.level6')
      ]
    },
    insertNodeBtnDisabled() {
      return !this.node || this.node.isRoot || this.node.isGeneralization
    },
    upNodeBtnDisabled() {
      if (!this.node || this.node.isRoot || this.node.isGeneralization) {
        return true
      }
      let isFirst =
        this.node.parent.children.findIndex(item => {
          return item === this.node
        }) === 0
      return isFirst
    },
    downNodeBtnDisabled() {
      if (!this.node || this.node.isRoot || this.node.isGeneralization) {
        return true
      }
      let children = this.node.parent.children
      let isLast =
        children.findIndex(item => {
          return item === this.node
        }) ===
        children.length - 1
      return isLast
    },
    isGeneralization() {
      return this.node.isGeneralization
    },
    hasHyperlink() {
      return !!this.node.getData('hyperlink')
    },
    hasNote() {
      return !!this.node.getData('note')
    }
  },
  created() {
    this.$bus.$on('node_contextmenu', this.show)
    this.$bus.$on('node_click', this.hide)
    this.$bus.$on('draw_click', this.hide)
    this.$bus.$on('expand_btn_click', this.hide)
    this.$bus.$on('svg_mousedown', this.onMousedown)
    this.$bus.$on('mouseup', this.onMouseup)
  },
  beforeDestroy() {
    this.$bus.$off('node_contextmenu', this.show)
    this.$bus.$off('node_click', this.hide)
    this.$bus.$off('draw_click', this.hide)
    this.$bus.$off('expand_btn_click', this.hide)
    this.$bus.$off('svg_mousedown', this.onMousedown)
    this.$bus.$off('mouseup', this.onMouseup)
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

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
          this.mindMap.renderer.copy()
          break
        case 'CUT_NODE':
          this.mindMap.renderer.cut()
          break
        case 'PASTE_NODE':
          this.mindMap.renderer.paste()
          break
        case 'RETURN_CENTER':
          this.mindMap.renderer.setRootNodeCenter()
          break
        case 'TOGGLE_ZEN_MODE':
          this.setLocalConfig({
            isZenMode: !this.isZenMode
          })
          break
        case 'FIT_CANVAS':
          this.mindMap.view.fit()
          break
        case 'REMOVE_HYPERLINK':
          this.node.setHyperlink('', '')
          break
        case 'REMOVE_NOTE':
          this.node.setNote('')
          break
        default:
          this.$bus.$emit('execCommand', key, ...args)
          break
      }
      this.hide()
    }
  }
}
</script>

<style lang="less" scoped>
.listBox {
  width: 240px;
  background: #fff;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;

  &.isDark {
    background: #363b3f;
  }
}
.contextmenuContainer {
  position: fixed;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1a1a1a;

  &.isDark {
    color: #fff;

    .item {
      &:hover {
        background: hsla(0, 0%, 100%, 0.05);
      }
    }
  }

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
