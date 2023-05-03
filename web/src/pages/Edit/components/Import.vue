<template>
  <el-dialog
    class="nodeDialog"
    :title="$t('import.title')"
    :visible.sync="dialogVisible"
    width="300px"
  >
    <el-upload
      ref="upload"
      action="x"
      :file-list="fileList"
      :auto-upload="false"
      :multiple="false"
      :on-change="onChange"
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
</template>

<script>
import xmind from 'simple-mind-map/src/parse/xmind.js'
import markdown from 'simple-mind-map/src/parse/markdown.js'
import { fileToBuffer } from '@/utils'
import { read, utils } from 'xlsx'

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
      fileList: []
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
    this.$bus.$on('showImport', () => {
      this.dialogVisible = true
    })
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-08-03 22:48:42
     * @Desc: 文件选择
     */
    onChange(file) {
      let reg = /\.(smm|xmind|json|xlsx|md)$/
      if (!reg.test(file.name)) {
        this.$message.error('请选择.smm、.json、.xmind、.xlsx、.md文件')
        this.fileList = []
      } else {
        this.fileList.push(file)
      }
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-03 22:48:47
     * @Desc: 数量超出限制
     */
    onExceed() {
      this.$message.error('最多只能选择一个文件')
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
      if (this.fileList.length <= 0) {
        return this.$message.error('请选择要导入的文件')
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
    },

    /**
     * @Author: 王林25
     * @Date: 2022-10-24 14:19:33
     * @Desc: 处理.smm文件
     */
    handleSmm(file) {
      let fileReader = new FileReader()
      fileReader.readAsText(file.raw)
      fileReader.onload = evt => {
        try {
          let data = JSON.parse(evt.target.result)
          if (typeof data !== 'object') {
            throw new Error('文件内容有误')
          }
          this.$bus.$emit('setData', data)
          this.$message.success('导入成功')
        } catch (error) {
          console.log(error)
          this.$message.error('文件解析失败')
        }
      }
    },

    /**
     * @Author: 王林25
     * @Date: 2022-10-24 14:19:41
     * @Desc: 处理.xmind文件
     */
    async handleXmind(file) {
      try {
        let data = await xmind.parseXmindFile(file.raw)
        console.log(data);
        this.$bus.$emit('setData', data)
        this.$message.success('导入成功')
      } catch (error) {
        console.log(error)
        this.$message.error('文件解析失败')
      }
    },

    /**
     * @Author: 王林25
     * @Date: 2022-10-24 14:19:51
     * @Desc: 处理.xlsx文件
     */
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
        this.$message.success('导入成功')
      } catch (error) {
        console.log(error)
        this.$message.error('文件解析失败')
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
          this.$message.success('导入成功')
        } catch (error) {
          console.log(error)
          this.$message.error('文件解析失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nodeDialog {
}
</style>
