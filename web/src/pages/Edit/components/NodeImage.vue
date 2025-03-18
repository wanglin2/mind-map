<template>
  <el-dialog
    class="nodeImageDialog"
    :title="$t('nodeImage.title')"
    :visible.sync="dialogVisible"
    :width="isMobile ? '90%' : '600px'"
    :top="isMobile ? '20px' : '15vh'"
  >
    <div class="title">方式一</div>
    <ImgUpload
      ref="ImgUpload"
      v-model="img"
      style="margin-bottom: 12px;"
    ></ImgUpload>
    <div class="title">方式二</div>
    <div class="inputBox">
      <span class="label">请输入图片地址</span>
      <el-input
        v-model="imgUrl"
        size="mini"
        placeholder="http://xxx.com/xx.jpg"
        @keydown.native.stop
      ></el-input>
    </div>
    <div class="title">可选</div>
    <div class="inputBox">
      <span class="label">{{ $t('nodeImage.imgTitle') }}</span>
      <el-input v-model="imgTitle" size="mini" @keydown.native.stop></el-input>
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
import ImgUpload from '@/components/ImgUpload/index.vue'
import { getImageSize, isMobile } from 'simple-mind-map/src/utils/index'

// 节点图片内容设置
export default {
  components: {
    ImgUpload
  },
  data() {
    return {
      dialogVisible: false,
      img: '',
      imgUrl: '',
      imgTitle: '',
      activeNodes: null,
      isMobile: isMobile()
    }
  },
  created() {
    this.$bus.$on('node_active', this.handleNodeActive)
    this.$bus.$on('showNodeImage', this.handleShowNodeImage)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.handleNodeActive)
    this.$bus.$off('showNodeImage', this.handleShowNodeImage)
  },
  methods: {
    handleNodeActive(...args) {
      this.activeNodes = [...args[1]]
    },

    handleShowNodeImage() {
      this.reset()
      if (this.activeNodes.length > 0) {
        let firstNode = this.activeNodes[0]
        let img = firstNode.getData('image') || ''
        if (img) {
          if (/^https?:\/\//.test(img)) {
            this.imgUrl = img
          } else {
            this.img = img
          }
        }
        this.imgTitle = firstNode.getData('imageTitle') || ''
      }
      this.dialogVisible = true
    },

    cancel() {
      this.dialogVisible = false
      this.reset()
    },

    reset() {
      this.img = ''
      this.imgTitle = ''
      this.imgUrl = ''
    },

    async confirm() {
      try {
        // 删除图片
        if (!this.img && !this.imgUrl) {
          this.cancel()
          this.activeNodes.forEach(node => {
            node.setImage(null)
          })
          return
        }
        let res = null
        let img = ''
        if (this.img) {
          img = this.img
          res = await this.$refs.ImgUpload.getSize()
        } else if (this.imgUrl) {
          img = this.imgUrl
          res = await getImageSize(img)
        }
        this.activeNodes.forEach(node => {
          node.setImage({
            url: img || 'none',
            title: this.imgTitle,
            width: res.width || 100,
            height: res.height || 100
          })
        })
        this.cancel()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nodeImageDialog {
  .title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .inputBox {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .label {
      width: 150px;
    }
  }
}
</style>
