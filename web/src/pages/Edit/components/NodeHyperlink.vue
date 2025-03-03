<template>
  <el-dialog
    class="nodeHyperlinkDialog"
    :title="$t('nodeHyperlink.title')"
    :visible.sync="dialogVisible"
    :width="isMobile ? '90%' : '50%'"
    :top="isMobile ? '20px' : '15vh'"
  >
    <div class="item">
      <span class="name">{{ $t('nodeHyperlink.link') }}</span>
      <el-input
        v-model="link"
        size="mini"
        placeholder="http://xxxx.com/"
        @keyup.native.stop
        @keydown.native.stop
        @blur="handleUrl()"
      >
        <el-select v-model="protocol" slot="prepend" style="width: 80px;">
          <el-option label="https" value="https"></el-option>
          <el-option label="http" value="http"></el-option>
          <el-option label="无" value="none"></el-option>
        </el-select>
      </el-input>
    </div>
    <div class="item">
      <span class="name">{{ $t('nodeHyperlink.name') }}</span>
      <el-input
        v-model="linkTitle"
        size="mini"
        @keyup.native.stop
        @keydown.native.stop
      ></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{ $t('dialog.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{
        $t('dialog.confirm')
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isMobile } from 'simple-mind-map/src/utils/index'

// 节点超链接内容设置
export default {
  data() {
    return {
      dialogVisible: false,
      link: '',
      linkTitle: '',
      activeNodes: [],
      protocol: 'https',
      isMobile: isMobile()
    }
  },
  created() {
    this.$bus.$on('node_active', this.handleNodeActive)
    this.$bus.$on('showNodeLink', this.handleShowNodeLink)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.handleNodeActive)
    this.$bus.$off('showNodeLink', this.handleShowNodeLink)
  },
  methods: {
    handleNodeActive(...args) {
      this.activeNodes = [...args[1]]
      if (this.activeNodes.length > 0) {
        let firstNode = this.activeNodes[0]
        this.link = firstNode.getData('hyperlink') || ''
        this.handleUrl(true)
        this.linkTitle = firstNode.getData('hyperlinkTitle') || ''
      } else {
        this.link = ''
        this.linkTitle = ''
      }
    },

    removeProtocol(url) {
      return url.replace(/^https?:\/\//, '')
    },

    handleUrl(setProtocolNoneIfNotExist) {
      const res = this.link.match(/^(https?):\/\//)
      if (res && res[1]) {
        this.protocol = res[1]
      } else if (!this.link) {
        this.protocol = 'https'
      } else if (setProtocolNoneIfNotExist) {
        this.protocol = 'none'
      }
      this.link = this.removeProtocol(this.link)
    },

    handleShowNodeLink() {
      this.dialogVisible = true
    },

    cancel() {
      this.dialogVisible = false
    },

    confirm() {
      this.activeNodes.forEach(node => {
        node.setHyperlink(
          (this.protocol === 'none' ? '' : this.protocol + '://') + this.link,
          this.linkTitle
        )
        this.cancel()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nodeHyperlinkDialog {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .name {
      display: block;
      width: 50px;
    }
  }
}
</style>
