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
      <!-- 导出类型选择 -->
      <div class="downloadTypeSelectBox">
        <!-- 类型列表 -->
        <div class="downloadTypeList customScrollbar">
          <div
            class="downloadTypeItem"
            v-for="item in downTypeList"
            :key="item.type"
            :class="{
              active: exportType === item.type
            }"
            @click="exportType = item.type"
          >
            <div class="typeIcon" :class="[item.type]"></div>
            <div class="name">{{ item.name }}</div>
            <div class="icon checked el-icon-check"></div>
          </div>
        </div>
        <!-- 类型内容 -->
        <div class="downloadTypeContent">
          <!-- 文件名称输入 -->
          <div class="nameInputBox">
            <div class="nameInput">
              <span class="name">{{ $t('export.filename') }}</span>
              <el-input
                style="max-width: 250px"
                v-model="fileName"
                size="mini"
                @keydown.native.stop
              ></el-input>
            </div>
            <span class="closeBtn el-icon-close" @click="cancel"></span>
          </div>
          <!-- 配置 -->
          <div class="contentBox customScrollbar">
            <div class="contentRow">
              <div class="contentName">{{ $t('export.format') }}</div>
              <div class="contentValue info">
                {{ currentTypeData ? '.' + currentTypeData.type : '' }}
              </div>
            </div>
            <div class="contentRow">
              <div class="contentName">{{ $t('export.desc') }}</div>
              <div class="contentValue info">
                {{ currentTypeData ? currentTypeData.desc : '' }}
              </div>
            </div>
            <div class="contentRow">
              <div class="contentName">{{ $t('export.options') }}</div>
              <div class="contentValue info" v-if="noOptions">无</div>
              <div class="contentValue" v-else>
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
                  <div class="valueSubItem" v-if="['png'].includes(exportType)">
                    <span class="name">{{ $t('export.format') }}</span>
                    <el-radio-group v-model="imageFormat">
                      <el-radio label="png">PNG</el-radio>
                    </el-radio-group>
                  </div>
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
                  <div class="valueSubItem">
                    <el-checkbox v-show="showFitBgOption" v-model="isFitBg">{{
                      $t('export.isFitBg')
                    }}</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="btnList">
            <el-button @click="cancel" size="small">{{
              $t('dialog.cancel')
            }}</el-button>
            <el-button type="primary" @click="confirm" size="small">{{
              $t('export.confirm')
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { downTypeList } from '@/config'
import { isMobile } from 'simple-mind-map/src/utils/index'
import MarkdownIt from 'markdown-it'

// 导出
let md = null
export default {
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
      isMobile: isMobile(),
      isFitBg: true,
      imageFormat: 'png'
    }
  },
  computed: {
    ...mapState({
      openNodeRichText: state => state.localConfig.openNodeRichText,
      isDark: state => state.localConfig.isDark,
    }),

    downTypeList() {
      const list = downTypeList[this.$i18n.locale] || downTypeList.zh
      return list.filter(item => {
        if (item.type === 'mm') {
          return false
        }
        if (item.type === 'xlsx') {
          return false
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
    },

    showFitBgOption() {
      return ['png', 'pdf'].includes(this.exportType) && !this.isTransparent
    },

    noOptions() {
      return ['md', 'xmind', 'txt', 'xlsx', 'mm'].includes(this.exportType)
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

    cancel() {
      this.dialogVisible = false
    },

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
          this.imageFormat,
          true,
          this.fileName,
          this.isTransparent,
          null,
          this.isFitBg
        )
      } else if (this.exportType === 'pdf') {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName,
          this.isTransparent,
          this.isFitBg
        )
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
      .downloadTypeSelectBox {
        .downloadTypeList {
          background-color: #363b3f;

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
          .nameInputBox {
            border-bottom: 1px solid hsla(0, 0%, 100%, 0.6);

            .nameInput {
              .name {
                color: hsla(0, 0%, 100%, 0.6);
              }
            }

            .closeBtn {
              color: hsla(0, 0%, 100%, 0.6);
            }
          }

          .contentBox {
            .contentRow {
              .contentName {
                color: hsla(0, 0%, 100%, 0.6);
              }

              .contentValue {
                color: hsla(0, 0%, 100%, 0.6);

                &.info {
                  background-color: transparent;
                }
              }
            }
          }

          .btnList {
            border-top: 1px solid hsla(0, 0%, 100%, 0.6);
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

  /deep/ .el-dialog {
    border-radius: 10px;
    overflow: hidden;

    .el-dialog__header {
      display: none;
    }
  }

  /deep/ .el-dialog__body {
    padding: 0;

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
          overflow-y: hidden;

          .downloadTypeItem {
            width: 100px;
            flex-shrink: 0;
            padding-left: 5px;
            padding-right: 5px;

            .icon {
              margin-right: 5px;

              &.checked {
                display: none !important;
              }
            }
          }
        }

        .downloadTypeContent {
          .nameInputBox {
            height: 70px;

            .nameInput {
              .name {
                margin-bottom: 5px;
              }
            }
          }

          .contentBox {
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
  }

  .exportContainer {
    width: 100%;
    height: 552px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .downloadTypeSelectBox {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;

      .downloadTypeList {
        width: 208px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #f2f4f7;
        flex-shrink: 0;
        padding: 16px 0;

        .downloadTypeItem {
          width: 100%;
          height: 52px;
          padding: 0 30px;
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
            font-weight: 700;

            &.checked {
              color: #409eff;
              font-size: 20px;
              margin-left: auto;
              display: none;
            }
          }

          .typeIcon {
            margin-right: 18px;
            flex-shrink: 0;
            width: 23px;
            height: 26px;
            background-size: cover;

            &.png {
              background-image: url('../../../assets/img/foramt/2.png');
            }

            &.pdf {
              background-image: url('../../../assets/img/foramt/4.png');
            }

            &.md {
              background-image: url('../../../assets/img/foramt/5.png');
            }

            &.json {
              background-image: url('../../../assets/img/foramt/10.png');
            }

            &.svg {
              background-image: url('../../../assets/img/foramt/3.png');
            }

            &.smm {
              background-image: url('../../../assets/img/foramt/1.png');
            }

            &.xmind {
              background-image: url('../../../assets/img/foramt/6.png');
            }

            &.txt {
              background-image: url('../../../assets/img/foramt/7.png');
            }

            &.mm {
              background-image: url('../../../assets/img/foramt/8.png');
            }

            &.xlsx {
              background-image: url('../../../assets/img/foramt/9.png');
            }
          }

          .name {
            color: #333;
            font-size: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
          }
        }
      }

      .downloadTypeContent {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .nameInputBox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 67px;
          flex-shrink: 0;
          border-bottom: 1px solid #f2f4f7;
          padding-left: 40px;
          padding-right: 20px;
          padding-top: 16px;

          .nameInput {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width: 100%;
            font-weight: bold;

            .name {
              margin-right: 10px;
              font-size: 15px;
              color: #333;
              font-weight: bold;
            }
          }

          .closeBtn {
            font-size: 20px;
            cursor: pointer;
          }
        }

        .contentBox {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 15px 40px;

          .contentRow {
            display: flex;
            font-size: 14px;
            margin-bottom: 20px;

            &:last-of-type {
              margin-bottom: 0;
            }

            .contentName {
              min-width: 40px;
              color: #808080;
              flex-shrink: 0;
              font-size: 13px;
              font-weight: 500;
              line-height: 25px;
              margin-right: 12px;
            }

            .contentValue {
              color: #808080;
              line-height: 23px;
              font-weight: 500;
              border: 1px solid transparent;
              font-size: 14px;

              &.info {
                color: rgb(90, 158, 247);
                background-color: rgb(245, 248, 249);
                border: 1px solid rgb(90, 158, 247);
                border-radius: 5px;
                padding: 0 16px;
              }

              .valueItem {
                .valueSubItem {
                  margin-bottom: 12px;
                  display: flex;
                  align-items: center;

                  &:last-of-type {
                    margin-right: 0;
                  }

                  &.alignCenter {
                    align-items: center;
                  }

                  .name {
                    margin-right: 12px;
                    min-width: 85px;
                  }
                }
              }
            }
          }
        }

        .btnList {
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 69px;
          flex-shrink: 0;
          border-top: 1px solid #f2f4f7;

          /deep/ .el-button--small {
            height: 25px;
            padding: 0 30px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
