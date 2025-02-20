<template>
  <el-dialog
    class="aboutDialog"
    title="关于"
    :visible.sync="dialogVisible"
    width="480px"
    @close="onClose"
  >
    <div class="aboutBox" :class="{ isDark: isDark }">
      <img src="../../../assets/img/icon.png" alt="" />
      <h2>思绪思维导图</h2>
      <p>版本：{{ version }}</p>
      <p>
        官网：
        <span @click="open('homepage')">思绪思维导图</span>
      </p>
      <p>
        获取源码：
        <span @click="open('mind-map')">mind-map</span>
      </p>
      <p>
        下载最新版本：
        <span @click="open('baiduNet')">百度云</span>
        <span @click="open('releases')">releases</span>
      </p>
      <p>如需进微信交流群参与讨论，可微信添加：wanglinguanfang。备注：客户端</p>
    </div>
  </el-dialog>
</template>

<script>
import pkg from '../../../../package.json'
import { mapState } from 'vuex'

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
      dialogVisible: false,
      version: pkg.version
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
    }
  },
  methods: {
    onClose() {
      this.$emit('change', false)
    },

    open(type) {
      let url = ''
      switch (type) {
        case 'homepage':
          url = 'https://wanglin2.github.io/mind-map-docs/'
          break
        case 'mind-map':
          url = 'https://github.com/wanglin2/mind-map/tree/electron'
          break
        case 'baiduNet':
          url = 'https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3'
          break
        case 'releases':
          url = 'https://github.com/wanglin2/mind-map/releases'
          break
        default:
          break
      }
      window.electronAPI.openUrl(url)
    }
  }
}
</script>

<style lang="less" scoped>
.aboutDialog {
  /deep/ .el-dialog__body {
    padding: 0;
  }
}

.aboutBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;

  &.isDark {
    .h2,
    p {
      color: hsla(0, 0%, 100%, 0.6);
    }
  }

  img {
    width: 100px;
    height: 100px;
  }

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;

    span {
      cursor: pointer;
      color: #409eff;
      margin-right: 10px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
