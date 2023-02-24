<template>
  <el-dialog
    class="nodeDialog"
    :title="$t('export.title')"
    :visible.sync="dialogVisible"
    width="700px"
    v-loading.fullscreen.lock="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div>
      <div class="nameInputBox">
        <span class="name">{{ $t('export.filename') }}</span>
        <el-input
          style="width: 300px"
          v-model="fileName"
          size="mini"
        ></el-input>
        <el-checkbox
          v-show="['smm', 'json'].includes(exportType)"
          v-model="widthConfig"
          style="margin-left: 12px"
          >{{ $t('export.include') }}</el-checkbox
        >
        <el-checkbox
          v-show="['svg'].includes(exportType)"
          v-model="domToImage"
          style="margin-left: 12px"
          >{{ $t('export.domToImage') }}</el-checkbox
        >
      </div>
      <el-radio-group v-model="exportType" size="mini">
        <el-radio-button label="smm"
          >{{ $t('export.dedicatedFile') }}（.smm）</el-radio-button
        >
        <el-radio-button label="json"
          >{{ $t('export.jsonFile') }}（.json）</el-radio-button
        >
        <el-radio-button label="png"
          >{{ $t('export.imageFile') }}（.png）</el-radio-button
        >
        <el-radio-button label="svg"
          >{{ $t('export.svgFile') }}（.svg）</el-radio-button
        >
        <el-radio-button label="pdf"
          >{{ $t('export.pdfFile') }}（.pdf）</el-radio-button
        >
      </el-radio-group>
      <div class="tip">{{ $t('export.tips') }}</div>
      <div class="tip warning" v-if="openNodeRichText && ['png', 'pdf'].includes(exportType)">{{ $t('export.pngTips') }}</div>
      <div class="tip warning" v-if="openNodeRichText && exportType === 'svg' && domToImage">{{ $t('export.svgTips') }}</div>
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
import { mapState } from 'vuex'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:54
 * @Desc: 导出
 */
export default {
  name: 'Export',
  data() {
    return {
      dialogVisible: false,
      exportType: 'smm',
      fileName: '思维导图',
      widthConfig: true,
      domToImage: false,
      loading: false,
      loadingText: ''
    }
  },
  computed: {
    ...mapState({
      openNodeRichText: state => state.localConfig.openNodeRichText,
    })
  },
  created() {
    this.$bus.$on('showExport', () => {
      this.dialogVisible = true
    })
    this.$bus.$on('transforming-dom-to-images', (index, len) => {
      this.loading = true
      this.loadingText = `${this.$t('export.transformingDomToImages')}${index + 1}/${len}`
      if (index >= len - 1) {
        this.loading = false
      }
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
    confirm() {
      if (this.exportType === 'svg') {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          this.domToImage,
          `* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }`
        )
      } else {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          this.widthConfig
        )
      }
      this.$notify.info({
        title: this.$t('export.notifyTitle'),
        message: this.$t('export.notifyMessage')
      })
      this.cancel()
    }
  }
}
</script>

<style lang="less" scoped>
.nodeDialog {
  .nameInputBox {
    margin-bottom: 20px;

    .name {
      margin-right: 10px;
    }
  }

  .tip {
    margin-top: 10px;

    &.warning {
      color: #F56C6C;
    }
  }
}
</style>
