<template>
  <div
    class="nodeAttachmentContextMenu"
    :style="{
      left: this.left + 'px',
      top: this.top + 'px',
      visibility: show ? 'visible' : 'hidden'
    }"
    @click.stop="deleteAttachment"
  >
    <div class="menuItem">{{ $t('attachment.deleteAttachment') }}</div>
  </div>
</template>

<script>
export default {
  props: {
    mindMap: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      show: false,
      left: 0,
      top: 0,
      node: null,
      icon: null
    }
  },
  created() {
    this.$bus.$on('node_attachmentClick', this.onNodeAttachmentClick)
    this.$bus.$on('selectAttachment', this.onSelectAttachment)
    this.$bus.$on(
      'node_attachmentContextmenu',
      this.onNodeAttachmentContextmenu
    )
    this.$bus.$on('hide', this.hide)
    document.body.addEventListener('click', this.hide)
    this.$bus.$on('node_active', this.hide)
    this.$bus.$on('scale', this.onScale)
    this.$bus.$on('translate', this.onScale)
    this.$bus.$on('svg_mousedown', this.hide)
  },
  beforeDestroy() {
    this.$bus.$off('node_attachmentClick', this.onNodeAttachmentClick)
    this.$bus.$off('selectAttachment', this.onSelectAttachment)
    this.$bus.$off(
      'node_attachmentContextmenu',
      this.onNodeAttachmentContextmenu
    )
    this.$bus.$off('hide', this.hide)
    document.body.removeEventListener('click', this.hide)
    this.$bus.$off('node_active', this.hide)
    this.$bus.$off('scale', this.onScale)
    this.$bus.$off('translate', this.onScale)
    this.$bus.$off('svg_mousedown', this.hide)
  },
  methods: {
    // 选择附件
    onSelectAttachment(activeNodes) {
      // activeNodes.forEach(node => {
      //   node.setAttachment('/test.md', '我去')
      // })
    },

    // 点击附件图标，一般用来打开或下载附件
    onNodeAttachmentClick(node, e, icon) {
      // console.log(node.getData('attachmentUrl'))
      this.$message.info(this.$t('attachment.tip'))
    },

    // 显示删除浮层
    onNodeAttachmentContextmenu(node, e, icon) {
      e.stopPropagation()
      e.preventDefault()
      this.node = node
      this.icon = icon
      this.updatePosition()
      this.show = true
    },

    // 更新位置
    updatePosition() {
      const iconSize = this.mindMap.themeConfig.iconSize
      const { x, y } = this.icon.rbox()
      this.left = x + iconSize
      this.top = y
    },

    // 画布缩放事件
    onScale() {
      if (!this.node || !this.show) return
      this.updatePosition()
    },

    // 删除附件
    deleteAttachment() {
      if (!this.node || !this.show) return
      this.node.setAttachment('', '')
      this.hide()
    },

    // 隐藏浮层
    hide() {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.nodeAttachmentContextMenu {
  position: fixed;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);

  .menuItem {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1a1a1a;
    cursor: pointer;
    user-select: none;
  }
}
</style>
