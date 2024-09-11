<template>
  <el-dialog
    class="nodeExportDialog"
    :title="$t('export.title')"
    :visible.sync="dialogVisible"
    v-loading.fullscreen.lock="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :width="isMobile ? '90%' : '50%'"
    :top="isMobile ? '20px' : '15vh'"
  >
    <div class="exportContainer" :class="{ isDark: isDark }">
      <div class="nameInputBox">
        <span class="name">{{ $t('export.filename') }}</span>
        <el-input
          style="max-width: 300px"
          v-model="fileName"
          size="mini"
          @keydown.native.stop
        ></el-input>
        <el-checkbox
          v-show="['smm', 'json'].includes(exportType)"
          v-model="widthConfig"
          style="margin-left: 12px"
          >{{ $t('export.include') }}</el-checkbox
        >
      </div>
      <div
        class="paddingInputBox"
        v-show="['svg', 'png', 'pdf'].includes(exportType)"
      >
        <div class="paddingInputGroup">
          <span class="name">{{ $t('export.paddingX') }}</span>
          <el-input
            style="max-width: 100px"
            v-model="paddingX"
            size="mini"
            @change="onPaddingChange"
            @keydown.native.stop
          ></el-input>
        </div>
        <div class="paddingInputGroup">
          <span class="name">{{ $t('export.paddingY') }}</span>
          <el-input
            style="width: 100px"
            v-model="paddingY"
            size="mini"
            @change="onPaddingChange"
            @keydown.native.stop
          ></el-input>
        </div>
        <div class="paddingInputGroup">
          <span class="name">{{ this.$t('export.addFooterText') }}</span>
          <el-input
            style="width: 200px"
            v-model="extraText"
            size="mini"
            :placeholder="$t('export.addFooterTextPlaceholder')"
            @keydown.native.stop
          ></el-input>
        </div>
        <div class="paddingInputGroup">
          <el-checkbox
            v-show="['png', 'pdf'].includes(exportType)"
            v-model="isTransparent"
            >{{ $t('export.isTransparent') }}</el-checkbox
          >
        </div>
      </div>
      <div class="downloadTypeList">
        <div
          class="downloadTypeItem"
          v-for="item in downTypeList"
          :key="item.type"
          :class="{ active: exportType === item.type }"
          @click="exportType = item.type"
        >
          <div class="icon iconfont" :class="[item.icon, item.type]"></div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
      <div class="tip">{{ $t('export.tips') }}</div>
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
import { mapState, mapMutations } from 'vuex'
import { downTypeList } from '@/config'
import { isMobile } from 'simple-mind-map/src/utils/index'
import MarkdownIt from 'markdown-it'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:54
 * @Desc: 导出
 */
let md = null
export default {
  name: 'Export',
  data() {
    return {
      dialogVisible: false,
      exportType: 'smm',
      fileName: this.$t('export.defaultFileName'),
      widthConfig: true,
      isTransparent: false,
      loading: false,
      loadingText: '',
      paddingX: 10,
      paddingY: 10,
      extraText: '',
      isMobile: isMobile()
    }
  },
  computed: {
    ...mapState({
      openNodeRichText: state => state.localConfig.openNodeRichText,
      isDark: state => state.localConfig.isDark,
      supportFreemind: state => state.supportFreemind,
      supportExcel: state => state.supportExcel
    }),

    downTypeList() {
      const list = downTypeList[this.$i18n.locale] || downTypeList.zh
      return list.filter(item => {
        if (item.type === 'mm') {
          return this.supportFreemind
        }
        if (item.type === 'xlsx') {
          return this.supportExcel
        } else {
          return true
        }
      })
    }
  },
  created() {
    this.$bus.$on('showExport', this.handleShowExport)
  },
  beforeDestroy() {
    this.$bus.$off('showExport', this.handleShowExport)
  },
  methods: {
    ...mapMutations(['setExtraTextOnExport']),

    handleShowExport() {
      this.dialogVisible = true
    },

    onPaddingChange() {
      this.$bus.$emit('paddingChange', {
        exportPaddingX: Number(this.paddingX),
        exportPaddingY: Number(this.paddingY)
      })
    },

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
      this.setExtraTextOnExport(this.extraText)
      if (this.exportType === 'svg') {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          `* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }`
        )
      } else if (['smm', 'json'].includes(this.exportType)) {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          this.widthConfig
        )
      } else if (this.exportType === 'png') {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          this.isTransparent
        )
      } else if (this.exportType === 'pdf') {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          this.isTransparent
        )
      } else if (this.exportType === 'mm') {
        this.$bus.$emit('export', this.exportType, true, this.fileName, {
          transformNote: note => {
            if (!md) {
              md = new MarkdownIt()
            }
            return md.render(note)
          },
          transformImage: img => {
            if (/^https?:\/\//.test(img)) {
              return img
            } else {
              return ''
            }
          }
        })
      } else {
        this.$bus.$emit('export', this.exportType, true, this.fileName)
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
.exportContainer {
  &.isDark {
    .downloadTypeList {
      .downloadTypeItem {
        background-color: #363b3f;

        .info {
          .name {
            color: hsla(0, 0%, 100%, 0.9);
          }
        }
      }
    }
  }
}

.nodeExportDialog {
  /deep/ .el-dialog__body {
    background-color: #f2f4f7;
  }

  .nameInputBox {
    margin-bottom: 20px;

    .name {
      margin-right: 10px;
    }
  }

  .paddingInputBox {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .paddingInputGroup {
      margin-right: 12px;
      margin-bottom: 12px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .name {
      margin-right: 10px;
    }
  }

  .tip {
    margin-top: 10px;

    &.warning {
      color: #f56c6c;
    }
  }

  .downloadTypeList {
    display: flex;
    flex-wrap: wrap;
    .downloadTypeItem {
      width: 200px;
      height: 88px;
      padding: 22px;
      overflow: hidden;
      margin: 10px;
      border-radius: 11px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.02);
      background-color: #fff;
      display: flex;
      align-items: center;
      cursor: pointer;
      border: 2px solid transparent;

      &.active {
        border-color: #409eff;
      }

      .icon {
        font-size: 30px;
        margin-right: 10px;
        flex-shrink: 0;

        &.png {
          color: #ffc038;
        }

        &.pdf {
          color: #ff6c4d;
        }

        &.md {
          color: #2b2b2b;
        }

        &.json {
          color: #12c87e;
        }

        &.svg {
          color: #4380ff;
        }

        &.smm {
          color: #409eff;
        }

        &.xmind {
          color: #f55e5e;
        }

        &.txt {
          color: #70798e;
        }
      }

      .info {
        width: 100%;
        overflow: hidden;

        .name {
          color: #1a1a1a;
          font-size: 15px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .desc {
          color: #999;
          font-size: 12px;
          display: -webkit-box; /* 必须设置display属性为-webkit-box */
          overflow: hidden; /* 超出部分隐藏 */
          text-overflow: ellipsis; /* 显示省略号 */
          -webkit-line-clamp: 2; /* 限制显示两行 */
          -webkit-box-orient: vertical; /* 垂直方向上的换行 */
        }
      }
    }
  }
}
</style>
