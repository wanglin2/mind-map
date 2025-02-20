<template>
  <el-dialog
    class="settingDialog"
    title="设置"
    :visible.sync="dialogVisible"
    width="480px"
    @close="onClose"
  >
    <div class="settingBox" :class="{ isDark: isDark }">
      <div class="row">
        <div class="label">默认结构</div>
        <el-select
          v-model="config.layout"
          placeholder="请选择"
          size="mini"
          @change="onChange"
        >
          <el-option
            v-for="item in layoutList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <img
          v-if="layoutImgMap[config.layout]"
          :src="layoutImgMap[config.layout]"
          alt=""
        />
      </div>
      <div class="row">
        <div class="label">默认主题</div>
        <el-select
          v-model="config.theme"
          placeholder="请选择"
          size="mini"
          @change="onChange"
        >
          <el-option
            v-for="item in themeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <img
          v-if="themeImgMap[config.theme]"
          :src="themeImgMap[config.theme]"
          alt=""
        />
      </div>
      <div class="row">
        <div class="label">拖动画布触发自动保存</div>
        <el-checkbox
          v-model="config.viewTranslateChangeTriggerAutoSave"
          @change="onChange"
        ></el-checkbox>
      </div>
      <div class="row">
        <div class="label">暗黑模式</div>
        <el-checkbox
          v-model="otherConfig.isDark"
          @change="toggleDark"
        ></el-checkbox>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { layoutList } from 'simple-mind-map/src/constants/constant'
import { layoutImgMap } from '@/config/constant.js'
import themeList from 'simple-mind-map-plugin-themes/themeList'
import themeImgMap from 'simple-mind-map-plugin-themes/themeImgMap'
import { mapState, mapMutations } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      layoutList,
      layoutImgMap,
      themeList: [
        {
          name: '默认主题',
          value: 'default',
          dark: false
        },
        ...themeList
      ].reverse(),
      themeImgMap,
      dialogVisible: false,
      config: {
        layout: '',
        theme: '',
        viewTranslateChangeTriggerAutoSave: false
      },
      clientConfig: null,
      otherConfig: {
        isDark: false
      }
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    })
  },
  watch: {
    value(val, oldVal) {
      this.dialogVisible = val
      if (val && !oldVal) {
        this.getConfig()
        this.getOtherConfig()
      }
    }
  },
  beforeDestroy() {
    this.onClose()
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

    onClose() {
      this.$emit('change', false)
    },

    async getConfig() {
      this.clientConfig = await window.electronAPI.getClientConfig()
      this.config.layout = this.clientConfig.layout || 'logicalStructure'
      this.config.theme = this.clientConfig.theme || 'classic4'
      this.config.viewTranslateChangeTriggerAutoSave =
        this.clientConfig.viewTranslateChangeTriggerAutoSave || false
    },

    onChange() {
      window.electronAPI.saveClientConfig({
        ...this.clientConfig,
        ...this.config
      })
    },

    getOtherConfig() {
      this.otherConfig.isDark = this.isDark
    },

    toggleDark(val) {
      this.setLocalConfig({
        isDark: val
      })
    }
  }
}
</script>

<style lang="less" scoped>
.settingDialog {
  /deep/ .el-dialog__body {
    padding: 0;
  }

  .settingBox {
    padding: 20px;

    &.isDark {
      .row {
        .label {
          color: hsla(0, 0%, 100%, 0.6);
        }
      }
    }

    .row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .label {
        width: 90px;
        margin-right: 12px;
      }

      img {
        width: 100px;
        margin-left: 20px;
      }
    }
  }
}
</style>
