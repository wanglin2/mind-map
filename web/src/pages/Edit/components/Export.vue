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
      </div>
      <div class="paddingInputBox" v-show="['svg', 'png', 'pdf'].includes(exportType)">
        <span class="name">{{ $t('export.paddingX') }}</span>
        <el-input
          style="width: 100px"
          v-model="paddingX"
          size="mini"
          @change="onPaddingChange"
        ></el-input>
        <span class="name" style="margin-left: 10px;">{{ $t('export.paddingY') }}</span>
        <el-input
          style="width: 100px"
          v-model="paddingY"
          size="mini"
          @change="onPaddingChange"
        ></el-input>
        <el-checkbox
          v-show="['png'].includes(exportType)"
          v-model="isTransparent"
          style="margin-left: 12px"
          >{{ $t('export.isTransparent') }}</el-checkbox
        >
      </div>
      <div class="downloadTypeList">
        <div 
          class="downloadTypeItem" 
          v-for="item in downTypeList" 
          :key="item.type" 
          :class="{active: exportType === item.type}" 
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
import { mapState } from 'vuex'
import { downTypeList } from '@/config'

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
      isTransparent: false,
      loading: false,
      loadingText: '',
      paddingX: 10,
      paddingY: 10
    }
  },
  computed: {
    ...mapState({
      openNodeRichText: state => state.localConfig.openNodeRichText,
    }),

    downTypeList() {
      return downTypeList[this.$i18n.locale] || downTypeList.zh
    },
  },
  created() {
    this.$bus.$on('showExport', () => {
      this.dialogVisible = true
    })
  },
  methods: {
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
      } else {
        this.$bus.$emit(
          'export',
          this.exportType,
          true,
          this.fileName
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
    margin-bottom: 10px;

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
      box-shadow: 0 0 20px 0 rgba(0,0,0,.02);
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
      }

      .info {
        .name {
          color: #1a1a1a;
          font-size: 15px;
          margin-bottom: 5px;
        }

        .desc {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
