<template>
  <el-dialog
    class="nodeExportDialog"
    :class="{ isMobile: isMobile, isDark: isDark }"
    :title="$t('export.title')"
    :visible.sync="dialogVisible"
    v-loading.fullscreen.lock="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :width="isMobile ? '90%' : '800px'"
    :top="isMobile ? '20px' : '15vh'"
  >
    <div class="exportContainer" :class="{ isDark: isDark }">
      <!-- 文件名称输入 -->
      <div class="nameInputBox">
        <span class="name">{{ $t('export.filename') }}</span>
        <el-input
          style="max-width: 300px"
          v-model="fileName"
          size="mini"
          @keydown.native.stop
        ></el-input>
      </div>
      <!-- 导出类型选择 -->
      <div class="downloadTypeSelectBox">
        <!-- 类型列表 -->
        <div class="downloadTypeList customScrollbar">
          <div
            class="downloadTypeItem"
            v-for="item in downTypeList"
            :key="item.type"
            :class="{ active: exportType === item.type }"
            @click="exportType = item.type"
          >
            <div class="icon iconfont" :class="[item.icon, item.type]"></div>
            <div class="name">{{ item.name }}</div>
            <div class="icon checked el-icon-check"></div>
          </div>
        </div>
        <!-- 类型内容 -->
        <div class="downloadTypeContent customScrollbar">
          <div class="contentRow">
            <div class="contentName">{{ $t('export.desc') }}</div>
            <div class="contentValue">
              {{ currentTypeData ? currentTypeData.desc : '' }}
            </div>
          </div>
          <div class="contentRow">
            <div class="contentName">{{ $t('export.options') }}</div>
            <div class="contentValue">
              <div
                class="valueItem"
                v-show="['smm', 'json'].includes(exportType)"
              >
                <el-checkbox v-model="widthConfig">{{
                  $t('export.include')
                }}</el-checkbox>
              </div>
              <div
                class="valueItem"
                v-show="['svg', 'png', 'pdf'].includes(exportType)"
              >
                <div class="valueSubItem">
                  <span class="name">{{ $t('export.paddingX') }}</span>
                  <el-input
                    style="width: 200px"
                    v-model="paddingX"
                    size="mini"
                    @change="onPaddingChange"
                    @keydown.native.stop
                  ></el-input>
                </div>
                <div class="valueSubItem">
                  <span class="name">{{ $t('export.paddingY') }}</span>
                  <el-input
                    style="width: 200px"
                    v-model="paddingY"
                    size="mini"
                    @change="onPaddingChange"
                    @keydown.native.stop
                  ></el-input>
                </div>
                <div class="valueSubItem">
                  <span class="name">{{
                    this.$t('export.addFooterText')
                  }}</span>
                  <el-input
                    style="width: 200px"
                    v-model="extraText"
                    size="mini"
                    :placeholder="$t('export.addFooterTextPlaceholder')"
                    @keydown.native.stop
                  ></el-input>
                </div>
                <div class="valueSubItem">
                  <el-checkbox
                    v-show="['png', 'pdf'].includes(exportType)"
                    v-model="isTransparent"
                    >{{ $t('export.isTransparent') }}</el-checkbox
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    },

    currentTypeData() {
      const cur = this.downTypeList.find(item => {
        return item.type === this.exportType
      })
      return cur
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
.nodeExportDialog {
  .exportContainer {
    &.isDark {
      .nameInputBox {
        .name {
          color: hsla(0, 0%, 100%, 0.6);
        }
      }

      .downloadTypeSelectBox {
        .downloadTypeList {
          .downloadTypeItem {
            background-color: #363b3f;

            &.active {
              background-color: #262a2e;
            }

            .name {
              color: hsla(0, 0%, 100%, 0.9);
            }
          }
        }

        .downloadTypeContent {
          .contentRow {
            .contentName {
              color: hsla(0, 0%, 100%, 0.6);
            }

            .contentValue {
              color: hsla(0, 0%, 100%, 0.6);
            }
          }
        }
      }
    }
  }
}

.nodeExportDialog {
  &.isDark {
    /deep/ .el-dialog__body {
      .el-checkbox {
        .el-checkbox__label {
          color: hsla(0, 0%, 100%, 0.6);
        }
      }
    }
  }

  /deep/ .el-dialog__body {
    padding: 0;
    border-top: 1px solid #f2f4f7;
    border-bottom: 1px solid #f2f4f7;

    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #409eff !important;
    }

    .el-checkbox {
      .el-checkbox__label {
        color: #1a1a1a;
      }
    }
  }

  &.isMobile {
    .exportContainer {
      .downloadTypeSelectBox {
        flex-direction: column;

        .downloadTypeList {
          width: 100%;
          display: flex;
          align-items: center;
          overflow-x: auto;
          height: 60px;

          .downloadTypeItem {
            width: 100px;
            flex-shrink: 0;
            padding-left: 10px;

            .icon {
              margin-right: 5px;

              &.checked {
                display: none !important;
              }
            }
          }
        }

        .downloadTypeContent {
          .contentRow {
            flex-direction: column;

            .contentName {
              margin-bottom: 10px;
            }

            .contentValue {
              .valueItem {
                .valueSubItem {
                  display: flex;
                  flex-direction: column;

                  .name {
                    margin-bottom: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .exportContainer {
    width: 100%;
    height: 450px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .nameInputBox {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: 50px;
      flex-shrink: 0;
      border-bottom: 1px solid #f2f4f7;

      .name {
        margin-right: 10px;
      }
    }

    .downloadTypeSelectBox {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;

      .downloadTypeList {
        width: 210px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f2f4f7;
        flex-shrink: 0;

        .downloadTypeItem {
          width: 100%;
          height: 60px;
          padding-left: 28px;
          overflow: hidden;
          display: flex;
          align-items: center;
          cursor: pointer;

          &.active {
            background-color: #fff;

            .icon {
              &.checked {
                display: block;
              }
            }
          }

          .icon {
            font-size: 25px;
            margin-right: 15px;
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

            &.checked {
              color: #409eff;
              font-size: 20px;
              margin-left: auto;
              display: none;
            }
          }

          .name {
            color: #1a1a1a;
            font-size: 15px;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .downloadTypeContent {
        padding: 30px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        .contentRow {
          display: flex;
          font-size: 14px;
          margin-bottom: 20px;

          .contentName {
            width: 80px;
            color: #666;
          }

          .contentValue {
            color: #1a1a1a;

            .valueItem {
              .valueSubItem {
                margin-bottom: 12px;

                &:last-of-type {
                  margin-right: 0;
                }

                .name {
                  margin-right: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
