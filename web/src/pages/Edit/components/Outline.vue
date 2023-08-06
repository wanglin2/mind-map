<template>
  <el-tree
    ref="tree"
    class="outlineTree"
    node-key="uid"
    draggable
    default-expand-all
    :class="{ isDark: isDark }"
    :data="data"
    :props="defaultProps"
    :highlight-current="true"
    :expand-on-click-node="false"
    :allow-drag="checkAllowDrag"
    @node-drop="onNodeDrop"
    @current-change="onCurrentChange"
    @mouseenter.native="isInTreArea = true"
    @mouseleave.native="isInTreArea = false"
  >
    <span
      class="customNode"
      slot-scope="{ node, data }"
      :data-id="data.uid"
      @click="onClick($event, data)"
    >
      <span
        class="nodeEdit"
        contenteditable="true"
        :key="getKey()"
        @keydown.stop="onNodeInputKeydown($event, node)"
        @keyup.stop
        @blur="onBlur($event, node)"
        @paste="onPaste($event, node)"
        v-html="node.label"
      ></span>
    </span>
  </el-tree>
</template>

<script>
import { mapState } from 'vuex'
import {
  nodeRichTextToTextWithWrap,
  textToNodeRichTextWithWrap,
  getTextFromHtml,
  createUid
} from 'simple-mind-map/src/utils'

// 大纲树
export default {
  name: 'Outline',
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'label'
      },
      currentData: null,
      notHandleDataChange: false,
      handleNodeTreeRenderEnd: false,
      beInsertNodeUid: '',
      isInTreArea: false
    }
  },
  computed: {
    ...mapState(['isDark', 'isOutlineEdit'])
  },
  created() {
    window.addEventListener('keydown', this.onKeyDown)
    this.$bus.$on('data_change', () => {
      // 激活节点会让当前大纲失去焦点
      if (this.notHandleDataChange) {
        this.notHandleDataChange = false
        return
      }
      this.refresh()
    })
    this.$bus.$on('node_tree_render_end', () => {
      // 激活节点会让当前大纲失去焦点
      if (this.handleNodeTreeRenderEnd) {
        this.handleNodeTreeRenderEnd = false
        this.notHandleDataChange = false
        this.refresh()
        this.$nextTick(() => {
          this.afterCreateNewNode()
        })
      }
    })
  },
  mounted() {
    this.refresh()
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    // 刷新树数据
    refresh() {
      let data = this.mindMap.getData()
      data.root = true // 标记根节点
      let walk = root => {
        const text = (root.data.richText
          ? nodeRichTextToTextWithWrap(root.data.text)
          : root.data.text
        ).replaceAll(/\n/g, '<br>')
        root.textCache = text // 保存一份修改前的数据，用于对比是否修改了
        root.label = text
        root.uid = root.data.uid
        if (root.children && root.children.length > 0) {
          root.children.forEach(item => {
            walk(item)
          })
        }
      }
      walk(data)
      this.data = [data]
    },

    // 插入了新节点之后
    afterCreateNewNode() {
      // 如果是新插入节点，那么需要手动高亮该节点、定位该节点及聚焦
      let id = this.beInsertNodeUid
      if (id && this.$refs.tree) {
        // 高亮树节点
        this.$refs.tree.setCurrentKey(id)
        let node = this.$refs.tree.getNode(id)
        this.onCurrentChange(node.data)
        // 定位该节点
        this.onClick(null, node.data)
        // 聚焦该树节点的编辑框
        const el = document.querySelector(
          `.customNode[data-id="${id}"] .nodeEdit`
        )
        if (el) {
          let selection = window.getSelection()
          let range = document.createRange()
          range.selectNodeContents(el)
          selection.removeAllRanges()
          selection.addRange(range)
          let offsetTop = el.offsetTop
          this.$emit('scrollTo', offsetTop)
        }
      }
    },

    // 根节点不允许拖拽
    checkAllowDrag(node) {
      return !node.data.root
    },

    // 失去焦点更新节点文本
    onBlur(e, node) {
      if (node.data.textCache === e.target.innerHTML) {
        return
      }
      const richText = node.data.data.richText
      const text = richText ? e.target.innerHTML : e.target.innerText
      const targetNode = this.mindMap.renderer.findNodeByUid(node.data.uid)
      if (!targetNode) return
      if (richText) {
        targetNode.setText(textToNodeRichTextWithWrap(text), true, true)
      } else {
        targetNode.setText(text)
      }
    },

    // 拦截粘贴事件
    onPaste(e) {
      e.preventDefault()
      const selection = window.getSelection()
      if (!selection.rangeCount) return
      selection.deleteFromDocument()
      let text = (e.clipboardData || window.clipboardData).getData('text')
      // 去除格式
      text = getTextFromHtml(text)
      // 去除换行
      text = text.replaceAll(/\n/g, '')
      const node = document.createTextNode(text)
      selection.getRangeAt(0).insertNode(node)
      selection.collapseToEnd()
    },

    // 生成唯一的key
    getKey() {
      return Math.random()
    },

    // 节点输入区域按键事件
    onNodeInputKeydown(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.insertNode()
      }
      if (e.keyCode === 9) {
        e.preventDefault()
        this.insertChildNode()
      }
    },

    // 插入兄弟节点
    insertNode() {
      this.notHandleDataChange = true
      this.handleNodeTreeRenderEnd = true
      this.beInsertNodeUid = createUid()
      this.mindMap.execCommand('INSERT_NODE', false, [], {
        uid: this.beInsertNodeUid
      })
    },

    // 插入下级节点
    insertChildNode() {
      this.notHandleDataChange = true
      this.handleNodeTreeRenderEnd = true
      this.beInsertNodeUid = createUid()
      this.mindMap.execCommand('INSERT_CHILD_NODE', false, [], {
        uid: this.beInsertNodeUid
      })
    },

    // 激活当前节点且移动当前节点到画布中间
    onClick(e, data) {
      this.notHandleDataChange = true
      const targetNode = this.mindMap.renderer.findNodeByUid(data.uid)
      if (targetNode && targetNode.nodeData.data.isActive) return
      this.mindMap.renderer.textEdit.stopFocusOnNodeActive()
      this.mindMap.execCommand('GO_TARGET_NODE', data.uid, () => {
        this.mindMap.renderer.textEdit.openFocusOnNodeActive()
      })
    },

    // 拖拽结束事件
    onNodeDrop(data, target, postion) {
      this.notHandleDataChange = true
      const node = this.mindMap.renderer.findNodeByUid(data.data.uid)
      const targetNode = this.mindMap.renderer.findNodeByUid(target.data.uid)
      if (!node || !targetNode) {
        return
      }
      switch (postion) {
        case 'before':
          this.mindMap.execCommand('INSERT_BEFORE', node, targetNode)
          break
        case 'after':
          this.mindMap.execCommand('INSERT_AFTER', node, targetNode)
          break
        case 'inner':
          this.mindMap.execCommand('MOVE_NODE_TO', node, targetNode)
          break
        default:
          break
      }
    },

    // 当前选中的树节点变化事件
    onCurrentChange(data) {
      this.currentData = data
    },

    // 删除节点
    onKeyDown(e) {
      if (!this.isInTreArea) return
      if ([46, 8].includes(e.keyCode) && this.currentData) {
        e.stopPropagation()
        this.mindMap.renderer.textEdit.hideEditTextBox()
        const node = this.mindMap.renderer.findNodeByUid(this.currentData.uid)
        if (node && !node.isRoot) {
          this.notHandleDataChange = true
          this.$refs.tree.remove(this.currentData)
          this.mindMap.execCommand('REMOVE_NODE', [node])
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.customNode {
  width: 100%;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;

  .nodeEdit {
    outline: none;
    white-space: normal;
    padding-right: 20px;
  }
}

.outlineTree {
  &.isDark {
    background-color: #262a2e;
  }

  /deep/ .el-tree-node > .el-tree-node__children {
    overflow: inherit;
  }

  /deep/ .el-tree-node__content {
    height: auto;
    margin: 5px 0;

    .el-tree-node__expand-icon {
      color: #262a2e;

      &.is-leaf {
        color: transparent;
        position: relative;

        &::after {
          background-color: #262a2e;
          position: absolute;
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
