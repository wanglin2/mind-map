<template>
  <el-dialog
    class="nodeDialog"
    :title="$t('nodeImage.title')"
    :visible.sync="dialogVisible"
    width="500"
  >
    <ImgUpload ref="ImgUpload" v-model="img"></ImgUpload>
    <div class="imgTitleBox">
      <span class="title">{{ $t('nodeImage.imgTitle') }}</span>
      <el-input v-model="imgTitle" size="mini"></el-input>
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
import ImgUpload from '@/components/ImgUpload'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:45
 * @Desc: 节点图片内容设置
 */
export default {
  name: 'NodeImage',
  components: {
    ImgUpload
  },
  data() {
    return {
      dialogVisible: false,
      img: '',
      imgTitle: '',
      activeNodes: null
    }
  },
  created() {
    this.$bus.$on('node_active', (...args) => {
      this.activeNodes = args[1]
      if (this.activeNodes.length > 0) {
        let firstNode = this.activeNodes[0]
        this.img = firstNode.getData('image')
        this.imgTitle = firstNode.getData('imageTitle')
      } else {
        this.img = ''
        this.imgTitle = ''
      }
    })
    this.$bus.$on('showNodeImage', () => {
      this.dialogVisible = true
    })
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-06-22 22:08:11
     * @Desc: 取消
     */
    cancel() {
      this.dialogVisible = false
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 22:28:20
     * @Desc:  确定
     */
    async confirm() {
      try {
        let { width, height } = await this.$refs.ImgUpload.getSize()
        this.activeNodes.forEach(node => {
          node.setImage({
            url: this.img || 'none',
            title: this.imgTitle,
            width,
            height
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
.nodeDialog {
  .imgTitleBox {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .title {
      width: 100px;
    }
  }
}
</style>
