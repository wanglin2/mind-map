<template>
  <div class="toolbarContainer">
    <div class="toolbar">
      <!-- 节点操作 -->
      <div class="toolbarBlock">
        <div
          class="toolbarBtn"
          :class="{
            disabled: readonly || backEnd
          }"
          @click="$bus.$emit('execCommand', 'BACK')"
        >
          <span class="icon iconfont iconhoutui-shi"></span>
          <span class="text">{{ $t('toolbar.undo') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: readonly || forwardEnd
          }"
          @click="$bus.$emit('execCommand', 'FORWARD')"
        >
          <span class="icon iconfont iconqianjin1"></span>
          <span class="text">{{ $t('toolbar.redo') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0 || hasRoot || hasGeneralization
          }"
          @click="$bus.$emit('execCommand', 'INSERT_NODE')"
        >
          <span class="icon iconfont iconjiedian"></span>
          <span class="text">{{ $t('toolbar.insertSiblingNode') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0 || hasGeneralization
          }"
          @click="$bus.$emit('execCommand', 'INSERT_CHILD_NODE')"
        >
          <span class="icon iconfont icontianjiazijiedian"></span>
          <span class="text">{{ $t('toolbar.insertChildNode') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0
          }"
          @click="$bus.$emit('execCommand', 'REMOVE_NODE')"
        >
          <span class="icon iconfont iconshanchu"></span>
          <span class="text">{{ $t('toolbar.deleteNode') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0
          }"
          @click="$bus.$emit('showNodeImage')"
        >
          <span class="icon iconfont iconimage"></span>
          <span class="text">{{ $t('toolbar.image') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0
          }"
          @click="$bus.$emit('showNodeIcon')"
        >
          <span class="icon iconfont iconxiaolian"></span>
          <span class="text">{{ $t('toolbar.icon') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0
          }"
          @click="$bus.$emit('showNodeLink')"
        >
          <span class="icon iconfont iconchaolianjie"></span>
          <span class="text">{{ $t('toolbar.link') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0
          }"
          @click="$bus.$emit('showNodeNote')"
        >
          <span class="icon iconfont iconflow-Mark"></span>
          <span class="text">{{ $t('toolbar.note') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0
          }"
          @click="$bus.$emit('showNodeTag')"
        >
          <span class="icon iconfont iconbiaoqian"></span>
          <span class="text">{{ $t('toolbar.tag') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0 || hasRoot || hasGeneralization
          }"
          @click="$bus.$emit('execCommand', 'ADD_GENERALIZATION')"
        >
          <span class="icon iconfont icongaikuozonglan"></span>
          <span class="text">{{ $t('toolbar.summary') }}</span>
        </div>
        <div
          class="toolbarBtn"
          :class="{
            disabled: activeNodes.length <= 0 || hasGeneralization
          }"
          @click="$bus.$emit('createAssociativeLine')"
        >
          <span class="icon iconfont iconlianjiexian"></span>
          <span class="text">{{ $t('toolbar.associativeLine') }}</span>
        </div>
      </div>
      <!-- 导出 -->
      <div class="toolbarBlock">
        <div class="toolbarBtn" @click="createNewLocalFile">
          <span class="icon iconfont iconxinjian"></span>
          <span class="text">{{ $t('toolbar.newFile') }}</span>
        </div>
        <div class="toolbarBtn" @click="openLocalFile">
          <span class="icon iconfont icondakai"></span>
          <span class="text">{{ $t('toolbar.openFile') }}</span>
        </div>
        <div class="toolbarBtn" @click="saveLocalFile">
          <span class="icon iconfont iconlingcunwei"></span>
          <span class="text">{{ $t('toolbar.saveAs') }}</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showImport')">
          <span class="icon iconfont icondaoru"></span>
          <span class="text">{{ $t('toolbar.import') }}</span>
        </div>
        <div class="toolbarBtn" @click="$bus.$emit('showExport')">
          <span class="icon iconfont iconexport"></span>
          <span class="text">{{ $t('toolbar.export') }}</span>
        </div>
      </div>
    </div>
    <NodeImage></NodeImage>
    <NodeHyperlink></NodeHyperlink>
    <NodeIcon></NodeIcon>
    <NodeNote></NodeNote>
    <NodeTag></NodeTag>
    <Export></Export>
    <Import></Import>
  </div>
</template>

<script>
import NodeImage from './NodeImage'
import NodeHyperlink from './NodeHyperlink'
import NodeIcon from './NodeIcon'
import NodeNote from './NodeNote'
import NodeTag from './NodeTag'
import Export from './Export'
import Import from './Import'
import { mapState } from 'vuex'
import { Notification } from 'element-ui'
import exampleData from 'simple-mind-map/example/exampleData'
import { getData } from '../../../api'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:58
 * @Desc: 工具栏
 */
let fileHandle = null
export default {
  name: 'Toolbar',
  components: {
    NodeImage,
    NodeHyperlink,
    NodeIcon,
    NodeNote,
    NodeTag,
    Export,
    Import
  },
  data() {
    return {
      activeNodes: [],
      backEnd: false,
      forwardEnd: true,
      readonly: false,
      isFullDataFile: false,
      timer: null
    }
  },
  computed: {
    ...mapState(['isHandleLocalFile']),
    hasRoot() {
      return (
        this.activeNodes.findIndex(node => {
          return node.isRoot
        }) !== -1
      )
    },
    hasGeneralization() {
      return (
        this.activeNodes.findIndex(node => {
          return node.isGeneralization
        }) !== -1
      )
    }
  },
  watch: {
    isHandleLocalFile(val) {
      if (!val) {
        Notification.closeAll()
      }
    }
  },
  created() {
    this.$bus.$on('mode_change', this.onModeChange)
    this.$bus.$on('node_active', this.onNodeActive)
    this.$bus.$on('back_forward', this.onBackForward)
    this.$bus.$on('write_local_file', this.onWriteLocalFile)
  },
  beforeDestroy() {
    this.$bus.$off('mode_change', this.onModeChange)
    this.$bus.$off('node_active', this.onNodeActive)
    this.$bus.$off('back_forward', this.onBackForward)
    this.$bus.$off('write_local_file', this.onWriteLocalFile)
  },
  methods: {
    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:17:40
     * @Desc: 监听模式切换
     */
    onModeChange(mode) {
      this.readonly = mode === 'readonly'
    },

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:18:06
     * @Desc: 监听节点激活
     */
    onNodeActive(...args) {
      this.activeNodes = args[1]
    },

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:18:31
     * @Desc: 监听前进后退
     */
    onBackForward(index, len) {
      this.backEnd = index <= 0
      this.forwardEnd = index >= len - 1
    },

    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:19:14
     * @Desc: 监听本地文件读写
     */
    onWriteLocalFile(content) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.writeLocalFile(content)
      }, 1000)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:09
     * @Desc: 打开本地文件
     */
    async openLocalFile() {
      try {
        let [_fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: '',
              accept: {
                'application/json': ['.smm']
              }
            }
          ],
          excludeAcceptAllOption: true,
          multiple: false
        })
        if (!_fileHandle) {
          return
        }
        fileHandle = _fileHandle
        if (fileHandle.kind === 'directory') {
          this.$message.warning('请选择文件')
          return
        }
        this.readFile()
      } catch (error) {
        console.log(error)
        if (error.toString().includes('aborted')) {
          return
        }
        this.$message.warning(
          '你的浏览器可能不支持，建议使用最新版本的Chrome浏览器'
        )
      }
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:18
     * @Desc: 读取本地文件
     */
    async readFile() {
      let file = await fileHandle.getFile()
      let fileReader = new FileReader()
      fileReader.onload = async () => {
        this.$store.commit('setIsHandleLocalFile', true)
        this.setData(fileReader.result)
        Notification.closeAll()
        Notification({
          title: '提示',
          message: `当前正在编辑你本机的【${file.name}】文件`,
          duration: 0,
          showClose: false
        })
      }
      fileReader.readAsText(file)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:26
     * @Desc: 渲染读取的数据
     */
    setData(str) {
      try {
        let data = JSON.parse(str)
        if (typeof data !== 'object') {
          throw new Error('文件内容有误')
        }
        if (data.root) {
          this.isFullDataFile = true
        } else {
          this.isFullDataFile = false
          data = {
            ...exampleData,
            root: data
          }
        }
        this.$bus.$emit('setData', data)
      } catch (error) {
        console.log(error)
        this.$message.error('文件打开失败')
      }
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:42
     * @Desc: 写入本地文件
     */
    async writeLocalFile(content) {
      if (!fileHandle || !this.isHandleLocalFile) {
        return
      }
      if (!this.isFullDataFile) {
        content = content.root
      }
      let string = JSON.stringify(content)
      const writable = await fileHandle.createWritable()
      await writable.write(string)
      await writable.close()
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:40:48
     * @Desc: 创建本地文件
     */
    async createNewLocalFile() {
      await this.createLocalFile(exampleData)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:49:17
     * @Desc: 另存为
     */
    async saveLocalFile() {
      let data = getData()
      await this.createLocalFile(data)
    },

    /**
     * @Author: 王林
     * @Date: 2022-09-24 15:50:22
     * @Desc: 创建本地文件
     */
    async createLocalFile(content) {
      try {
        let _fileHandle = await window.showSaveFilePicker({
          types: [
            {
              description: '',
              accept: { 'application/json': ['.smm'] }
            }
          ],
          suggestedName: '思维导图'
        })
        if (!_fileHandle) {
          return
        }
        const loading = this.$loading({
          lock: true,
          text: '正在创建文件',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        fileHandle = _fileHandle
        this.$store.commit('setIsHandleLocalFile', true)
        this.isFullDataFile = true
        await this.writeLocalFile(content)
        await this.readFile()
        loading.close()
      } catch (error) {
        console.log(error)
        if (error.toString().includes('aborted')) {
          return
        }
        this.$message.warning(
          '你的浏览器可能不支持，建议使用最新版本的Chrome浏览器'
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.toolbarContainer {
  .toolbar {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    width: max-content;
    max-width: 100%;
    display: flex;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 26, 26, 0.8);
    z-index: 2;
    overflow-x: auto;

    .toolbarBlock {
      display: flex;
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
      margin-right: 20px;
      flex-shrink: 0;

      &:last-of-type {
        margin-right: 0;
      }
    }

    .toolbarBtn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }

      &:hover {
        &:not(.disabled) {
          .icon {
            background: #f5f5f5;
          }
        }
      }

      &.disabled {
        color: #bcbcbc;
        cursor: not-allowed;
        pointer-events: none;
      }

      .icon {
        display: flex;
        height: 26px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #e9e9e9;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        padding: 0 5px;
      }

      .text {
        margin-top: 3px;
      }
    }
  }
}
</style>
