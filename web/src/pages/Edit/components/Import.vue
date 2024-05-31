<template>
  <div>
    <el-dialog
      class="nodeImportDialog"
      :title="$t('import.title')"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <el-upload
        ref="upload"
        action="x"
        accept=".smm,.json,.xmind,.xlsx,.md"
        :file-list="fileList"
        :auto-upload="false"
        :multiple="false"
        :on-change="onChange"
        :on-remove="onRemove"
        :limit="1"
        :on-exceed="onExceed"
      >
        <el-button slot="trigger" size="small" type="primary">{{
          $t('import.selectFile')
        }}</el-button>
        <div slot="tip" class="el-upload__tip">
          {{ $t('import.supportFile') }}
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">{{ $t('dialog.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('dialog.confirm')
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="xmindCanvasSelectDialog"
      :title="$t('import.xmindCanvasSelectDialogTitle')"
      :visible.sync="xmindCanvasSelectDialogVisible"
      width="300px"
      :show-close="false"
    >
      <el-radio-group v-model="selectCanvas" class="canvasList">
        <el-radio v-for="(item, index) in canvasList" :key="index" :label="index">{{
          item.title
        }}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSelect">{{
          $t('dialog.confirm')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xmind from 'simple-mind-map/src/parse/xmind.js'
import markdown from 'simple-mind-map/src/parse/markdown.js'
import { fileToBuffer } from '@/utils'
import { read, utils } from 'xlsx'
import { mapMutations } from 'vuex'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:54
 * @Desc: 导入
 */
export default {
  name: 'Import',
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      selectPromiseResolve: null,
      xmindCanvasSelectDialogVisible: false,
      selectCanvas: '',
      canvasList: []
    }
  },
  watch: {
    dialogVisible(val, oldVal) {
      if (!val && oldVal) {
        this.fileList = []
      }
    }
  },
  created() {
    this.$bus.$on('showImport', this.handleShowImport)
    this.$bus.$on('handle_file_url', this.handleFileURL)
    this.$bus.$on('importFile', this.handleImportFile)
  },
  beforeDestroy() {
    this.$bus.$off('showImport', this.handleShowImport)
    this.$bus.$off('handle_file_url', this.handleFileURL)
    this.$bus.$off('importFile', this.handleImportFile)
  },
  methods: {
    ...mapMutations(['setActiveSidebar']),

    handleShowImport() {
      this.dialogVisible = true
    },

    // 检查url中是否操作需要打开的文件
    async handleFileURL() {
      try {
        const fileURL = this.$route.query.fileURL
        if (!fileURL) return
        const macth = /\.(smm|json|xmind|md|xlsx)$/.exec(fileURL)
        if (!macth) {
          return
        }
        const type = macth[1]
        const res = await fetch(fileURL)
        const file = await res.blob()
        const data = {
          raw: file
        }
        if (type === 'smm' || type === 'json') {
          this.handleSmm(data)
        } else if (type === 'xmind') {
          this.handleXmind(data)
        } else if (type === 'xlsx') {
          this.handleExcel(data)
        } else if (type === 'md') {
          this.handleMd(data)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 文件选择
    onChange(file) {
      let reg = /\.(smm|xmind|json|xlsx|md)$/
      if (!reg.test(file.name)) {
        this.$message.error(this.$t('import.enableFileTip'))
        this.fileList = []
      } else {
        this.fileList.push(file)
      }
    },

    // 移除文件
    onRemove(file, fileList) {
      this.fileList = fileList
    },

    // 数量超出限制
    onExceed() {
      this.$message.error(this.$t('import.maxFileNum'))
    },

    // 取消
    cancel() {
      this.dialogVisible = false
    },

    // 确定
    confirm() {
      if (this.fileList.length <= 0) {
        return this.$message.error(this.$t('import.notSelectTip'))
      }
      this.$store.commit('setIsHandleLocalFile', false)
      let file = this.fileList[0]
      if (/\.(smm|json)$/.test(file.name)) {
        this.handleSmm(file)
      } else if (/\.xmind$/.test(file.name)) {
        this.handleXmind(file)
      } else if (/\.xlsx$/.test(file.name)) {
        this.handleExcel(file)
      } else if (/\.md$/.test(file.name)) {
        this.handleMd(file)
      }
      this.cancel()
      this.setActiveSidebar(null)
    },

    // 处理.smm文件
    handleSmm(file) {
      let fileReader = new FileReader()
      fileReader.readAsText(file.raw)
      fileReader.onload = evt => {
        try {
          let data = JSON.parse(evt.target.result)
          if (typeof data !== 'object') {
            throw new Error(this.$t('import.fileContentError'))
          }
          this.$bus.$emit('setData', data)
          this.$message.success(this.$t('import.importSuccess'))
        } catch (error) {
          console.log(error)
          this.$message.error(this.$t('import.fileParsingFailed'))
        }
      }
    },

    // 处理.xmind文件
    async handleXmind(file) {
      try {
        let data = await xmind.parseXmindFile(file.raw, content => {
          this.showSelectXmindCanvasDialog(content)
          return new Promise(resolve => {
            this.selectPromiseResolve = resolve
          })
        })
        this.$bus.$emit('setData', data)
        this.$message.success(this.$t('import.importSuccess'))
      } catch (error) {
        console.log(error)
        this.$message.error(this.$t('import.fileParsingFailed'))
      }
    },

    // 显示xmind文件的多个画布选择弹窗
    showSelectXmindCanvasDialog(content) {
      this.canvasList = content
      this.selectCanvas = 0
      this.xmindCanvasSelectDialogVisible = true
    },

    // 确认导入指定的画布
    confirmSelect() {
      this.selectPromiseResolve(this.canvasList[this.selectCanvas])
      this.xmindCanvasSelectDialogVisible = false
      this.canvasList = []
      this.selectCanvas = 0
    },

    // 处理.xlsx文件
    async handleExcel(file) {
      try {
        const wb = read(await fileToBuffer(file.raw))
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
          header: 1
        })
        if (data.length <= 0) {
          return
        }
        let max = 0
        data.forEach(arr => {
          if (arr.length > max) {
            max = arr.length
          }
        })
        let layers = []
        let walk = layer => {
          if (!layers[layer]) {
            layers[layer] = []
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i][layer]) {
              let node = {
                data: {
                  text: data[i][layer]
                },
                children: [],
                _row: i
              }
              layers[layer].push(node)
            }
          }
          if (layer < max - 1) {
            walk(layer + 1)
          }
        }
        walk(0)
        let getParent = (arr, row) => {
          for (let i = arr.length - 1; i >= 0; i--) {
            if (row >= arr[i]._row) {
              return arr[i]
            }
          }
        }
        for (let i = 1; i < layers.length; i++) {
          let arr = layers[i]
          for (let j = 0; j < arr.length; j++) {
            let item = arr[j]
            let parent = getParent(layers[i - 1], item._row)
            if (parent) {
              parent.children.push(item)
            }
          }
        }
        this.$bus.$emit('setData', layers[0][0])
        this.$message.success(this.$t('import.importSuccess'))
      } catch (error) {
        console.log(error)
        this.$message.error(this.$t('import.fileParsingFailed'))
      }
    },

    // 处理markdown文件
    async handleMd(file) {
      let fileReader = new FileReader()
      fileReader.readAsText(file.raw)
      fileReader.onload = async evt => {
        try {
          let data = await markdown.transformMarkdownTo(evt.target.result)
          this.$bus.$emit('setData', data)
          this.$message.success(this.$t('import.importSuccess'))
        } catch (error) {
          console.log(error)
          this.$message.error(this.$t('import.fileParsingFailed'))
        }
      }
    },

    // 导入指定文件
    handleImportFile(file) {
      this.onChange({
        raw: file,
        name: file.name
      })
      if (this.fileList.length <= 0) return
      this.confirm()
    }
  }
}
</script>

<style lang="less" scoped>
.nodeImportDialog {
}

.canvasList {
  display: flex;
  flex-direction: column;

  /deep/ .el-radio {
    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
