<template>
  <el-dialog
    class="nodeLinkSelectDialog"
    title="链接到指定节点"
    :visible.sync="dialogVisible"
    :show-close="false"
    append-to-body
    width="400px"
  >
    <div class="nodeTreeWrap">
      <el-tree
        ref="tree"
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
      <el-checkbox v-model="isAddReturn" style="margin-right: auto;">是否添加反向链接</el-checkbox>
      <el-button  @click="cancel">{{
        $t('dialog.cancel')
      }}</el-button>
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
  },
  beforeDestroy() {
    this.$bus.$off('show_link_node', this.onShowDialog)
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
        this.$message.warning('请选择要链接到的节点')
        return
      }
      if (this.currentNodeData.uid === this.node.getData('uid')) {
        this.$message.warning('不能链接自己')
        return
      }
      this.$bus.$emit(
        'execCommand',
        'SET_NODE_LINK',
        this.node,
        this.currentNodeData.uid,
        this.isAddReturn
      )
      this.$message.success('链接成功')
      this.close()
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
