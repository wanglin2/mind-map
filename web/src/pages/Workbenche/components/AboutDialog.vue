<template>
  <el-dialog
    class="aboutDialog"
    title="关于"
    :visible.sync="dialogVisible"
    width="480px"
    @close="onClose"
  >
    <div class="aboutBox">
      <img src="../../../assets/img/icon.png" alt="" />
      <h2>思绪思维导图</h2>
      <p>版本：{{ version }}</p>
      <p>
        获取源码：<a href="https://github.com/wanglin2/mind-map/tree/electron"
          >mind-map</a
        >
      </p>
      <p>
        下载最新版本：<a href="https://github.com/wanglin2/mind-map/releases"
          >releases</a
        >
      </p>
    </div>
  </el-dialog>
</template>

<script>
import pkg from '../../../../package.json'

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
  watch: {
    value(val, oldVal) {
      this.dialogVisible = val
    }
  },
  methods: {
    onClose() {
      this.$emit('change', false)
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

  img {
    width: 100px;
    height: 100px;
  }

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;

    a {
      text-decoration: none;
      color: #409eff;
    }
  }
}
</style>
