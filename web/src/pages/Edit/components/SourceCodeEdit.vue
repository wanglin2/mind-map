<template>
  <div
    class="sourceCodeEditContainer"
    :class="{ isDark: isDark }"
    ref="sourceCodeEditContainer"
    v-if="isSourceCodeEdit"
  >
    <div class="closeBtn">
      <el-tooltip
        effect="dark"
        :content="$t('sourceCodeEdit.copy')"
        placement="top"
      >
        <span
          class="icon iconfont iconfuzhi"
          style="font-size: 26px"
          @click="copy"
        ></span>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="$t('sourceCodeEdit.format')"
        placement="top"
      >
        <span
          class="icon iconfont icongeshihua"
          style="font-size: 24px"
          @click="format"
        ></span>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="$t('sourceCodeEdit.sourceCodeTip')"
        placement="top"
      >
        <span class="icon el-icon-info"></span>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="$t('sourceCodeEdit.confirm')"
        placement="top"
      >
        <span class="icon el-icon-circle-check" @click="onConfirm"></span>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="$t('sourceCodeEdit.close')"
        placement="top"
      >
        <span class="icon iconfont iconguanbi" @click="onClose"></span>
      </el-tooltip>
    </div>
    <div class="sourceCodeEditBox">
      <div class="outlineEdit" ref="outlineEditRef" @keydown.stop></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import { copy } from '@/utils/index'

let editor = null

// 源码编辑
export default {
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isReadonly: state => state.isReadonly,
      isDark: state => state.localConfig.isDark,
      isSourceCodeEdit: state => state.isSourceCodeEdit
    })
  },
  watch: {
    isSourceCodeEdit(val) {
      if (val) {
        this.$nextTick(() => {
          document.body.appendChild(this.$refs.sourceCodeEditContainer)
          this.initEditor()
          this.initData()
        })
      }
    }
  },
  methods: {
    ...mapMutations(['setIsSourceCodeEdit']),

    // 初始化编辑器
    initEditor() {
      editor = CodeMirror(this.$refs.outlineEditRef, {
        mode: { name: 'javascript', json: true },
        lineWrapping: true,
        lineNumbers: true
      })
    },

    // 初始化数据
    initData() {
      editor.setValue(JSON.stringify(this.mindMap.getData(), null, 2))
    },

    // 完成
    onConfirm() {
      try {
        const content = editor.getValue()
        const data = JSON.parse(content)
        this.setIsSourceCodeEdit(false)
        this.$bus.$emit('setData', data)
      } catch (error) {
        console.log(error)
        this.$message.error(this.$t('sourceCodeEdit.formatErrorTip'))
      }
    },

    // 关闭
    onClose() {
      this.setIsSourceCodeEdit(false)
    },

    // 复制
    copy() {
      const content = editor.getValue()
      copy(content)
      this.$message.success(this.$t('sourceCodeEdit.copyTip'))
    },

    // 格式化
    format() {
      try {
        const content = editor.getValue()
        const data = JSON.parse(content)
        editor.setValue(JSON.stringify(data, null, 2))
        this.$message.success(this.$t('sourceCodeEdit.formatTip'))
      } catch (error) {
        console.log(error)
        this.$message.error(this.$t('sourceCodeEdit.formatErrorTip'))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sourceCodeEditContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  background-color: #f5f5f5;
  overflow: hidden;

  &.isDark {
    background-color: #262a2e;

    .closeBtn {
      .icon {
        color: #fff;
      }
    }
  }

  .closeBtn {
    position: absolute;
    right: 40px;
    top: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .icon {
      font-size: 28px;
      margin-left: 10px;
    }
  }

  .sourceCodeEditBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 50px 0;

    .outlineEdit {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      font-size: 17px;
      background-color: #fff;
      font-family: Menlo, Monaco, Consolas, Andale Mono, Ubuntu Mono,
        Courier New, monospace;
      padding: 12px;
      border-radius: 5px;

      /deep/ .CodeMirror {
        height: 100%;
        font-family: Menlo, Monaco, Consolas, Andale Mono, Ubuntu Mono,
          Courier New, monospace;
      }
    }
  }
}
</style>
