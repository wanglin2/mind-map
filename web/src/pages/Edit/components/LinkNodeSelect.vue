<template>
  <el-dialog
    class="nodeLinkSelectDialog"
    :title="$t('nodeLink.linkToNode')"
    :visible.sync="dialogVisible"
    :show-close="false"
    append-to-body
    width="400px"
  >
    <div class="nodeTreeWrap customScrollbar">
      <el-tree
        ref="treeRef"
        class="outlineTree"
        node-key="uid"
        default-expand-all
        :class="{ isDark: isDark }"
        :data="treeData"
        :props="defaultProps"
        :highlight-current="true"
        :expand-on-click-node="false"
        @current-change="onCurrentChange"
      >
      </el-tree>
    </div>
    <div slot="footer" class="footer">
      <el-checkbox v-model="isAddReturn" style="margin-right: auto;">{{
        $t('nodeLink.addReturn')
      }}</el-checkbox>
      <el-button @click="cancel">{{ $t('dialog.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{
        $t('dialog.confirm')
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  nodeRichTextToTextWithWrap,
  htmlEscape
} from 'simple-mind-map/src/utils'
import { mapState } from 'vuex'

export default {
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        label: 'label'
      },
      currentNodeData: null,
      node: null,
      isAddReturn: false
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    })
  },
  created() {
    this.$bus.$on('show_link_node', this.onShowDialog)
    this.mindMap.on('node_link_not_find', this.onNodeLinkNotFind)
  },
  beforeDestroy() {
    this.$bus.$off('show_link_node', this.onShowDialog)
    this.mindMap.off('node_link_not_find', this.onNodeLinkNotFind)
  },
  methods: {
    onShowDialog(node) {
      this.node = node
      let data = this.mindMap.getData()
      let walk = root => {
        let text = root.data.richText
          ? nodeRichTextToTextWithWrap(root.data.text)
          : root.data.text
        text = htmlEscape(text)
        text = text.replace(/\n/g, '<br>')
        root.label = text
        root.uid = root.data.uid
        if (root.children && root.children.length > 0) {
          root.children.forEach(item => {
            walk(item)
          })
        }
      }
      walk(data)
      this.treeData = [data]
      this.dialogVisible = true
      this.$nextTick(() => {
        const linkUid = node.getData('nodeLink')
        if (linkUid) {
          this.$refs.treeRef.setCurrentKey(linkUid)
        }
      })
    },

    close() {
      this.dialogVisible = false
      this.node = null
      this.treeData = []
      this.currentNodeData = null
      this.isAddReturn = false
    },

    // 当前选中的树节点变化事件
    onCurrentChange(data) {
      this.currentNodeData = data
    },

    cancel() {
      this.close()
    },

    confirm() {
      if (!this.currentNodeData) {
        this.$message.warning(this.$t('nodeLink.tip1'))
        return
      }
      if (this.currentNodeData.uid === this.node.getData('uid')) {
        this.$message.warning(this.$t('nodeLink.tip2'))
        return
      }
      this.$bus.$emit(
        'execCommand',
        'SET_NODE_LINK',
        this.node,
        this.currentNodeData.uid,
        this.isAddReturn
      )
      this.$message.success(this.$t('nodeLink.tip3'))
      this.close()
    },

    onNodeLinkNotFind(node) {
      this.$confirm(this.$t('nodeLink.tip5'), this.$t('edit.tip'), {
        confirmButtonText: this.$t('setting.confirm'),
        cancelButtonText: this.$t('setting.cancel'),
        type: 'warning'
      }).then(() => {
        this.$bus.$emit('execCommand', 'SET_NODE_LINK', node, null)
        this.$message({
          type: 'success',
          message: this.$t('nodeLink.tip4')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nodeLinkSelectDialog {
  /deep/ .el-dialog__body {
    padding: 0 20px;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.nodeTreeWrap {
  height: 400px;
  overflow: auto;
}
</style>
<style lang="less" scoped>
@import url('../../../style/outlineTree.less');
</style>
