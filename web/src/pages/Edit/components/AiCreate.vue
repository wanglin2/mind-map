<template>
  <div>
    <!-- 客户端连接失败提示弹窗 -->
    <el-dialog
      class="clientTipDialog"
      title="客户端连接失败提示"
      :visible.sync="clientTipDialogVisible"
      width="400px"
      append-to-body
    >
      <div class="tipBox">
        <p>客户端连接失败，请检查：</p>
        <p>
          1.是否安装了思绪思维导图客户端，如果没有请点此安装：<a
            href="https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3"
            >百度网盘</a
          >、<a href="https://github.com/wanglin2/mind-map/releases">Github</a>
        </p>
        <p>2.如果安装了客户端，请确认是否打开了客户端。</p>
        <P>3.如果已经安装并启动了，那么可以尝试关闭然后重新启动。</P>
        <p>
          完成以上步骤后可点击：<el-button size="small" @click="testConnect"
            >连接检测</el-button
          >
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clientTipDialogVisible = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <!-- ai内容输入弹窗 -->
    <el-dialog
      class="createDialog"
      title="一键生成思维导图"
      :visible.sync="createDialogVisible"
      width="450px"
      append-to-body
    >
      <div class="inputBox">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入一个主题，AI会根据你的主题生成思维导图，如：杭州周末出游计划。"
          v-model="aiInput"
        >
        </el-input>
        <div class="tip warning">
          重要提示：一键生成会覆盖现有数据，建议先导出当前数据。
        </div>
        <div class="tip">
          想要修改AI配置？请点击：<el-button
            size="small"
            @click="aiConfigDialogVisible = true"
            >修改配置</el-button
          >
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAiCreateDialog">取消</el-button>
        <el-button type="primary" @click="doAiCreate">确认</el-button>
      </div>
    </el-dialog>
    <!-- ai生成中添加一个透明层，防止期间用户进行操作 -->
    <div
      class="aiCreatingMask"
      ref="aiCreatingMaskRef"
      v-show="aiCreatingMaskVisible"
    >
      <el-button type="warning" class="btn" @click="stopCreate"
        >停止生成</el-button
      >
    </div>
    <AiConfigDialog v-model="aiConfigDialogVisible"></AiConfigDialog>
  </div>
</template>

<script>
import Ai from '@/utils/ai'
import { transformMarkdownTo } from 'simple-mind-map/src/parse/markdownTo'
import {
  createUid,
  isUndef,
  checkNodeOuter,
  getStrWithBrFromHtml
} from 'simple-mind-map/src/utils'
import { mapState } from 'vuex'
import AiConfigDialog from './AiConfigDialog.vue'

export default {
  components: {
    AiConfigDialog
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      aiInstance: null,
      isAiCreating: false,
      aiCreatingContent: '',

      isLoopRendering: false,
      uidMap: {},
      latestUid: '',

      clientTipDialogVisible: false,
      createDialogVisible: false,
      aiInput: '',
      aiCreatingMaskVisible: false,
      aiConfigDialogVisible: false,

      mindMapDataCache: '',
      beingAiCreateNodeUid: ''
    }
  },
  computed: {
    ...mapState(['aiConfig'])
  },
  created() {
    this.$bus.$on('ai_create_all', this.aiCrateAll)
    this.$bus.$on('ai_create_part', this.aiCreatePart)
    this.$bus.$on('ai_chat', this.aiChat)
  },
  mounted() {
    document.body.appendChild(this.$refs.aiCreatingMaskRef)
  },
  beforeDestroy() {
    this.$bus.$off('ai_create_all', this.aiCrateAll)
    this.$bus.$off('ai_create_part', this.aiCreatePart)
    this.$bus.$off('ai_chat', this.aiChat)
  },
  methods: {
    // 客户端连接检测
    async testConnect() {
      try {
        await fetch(`http://localhost:${this.aiConfig.port}/ai/test`, {
          method: 'GET'
        })
        this.$message.success('连接成功')
        this.clientTipDialogVisible = false
        this.createDialogVisible = true
      } catch (error) {
        console.log(error)
        this.$message.error('连接失败')
      }
    },

    // 检测ai是否可用
    async aiTest() {
      // 检查配置
      if (
        !(
          this.aiConfig.api &&
          this.aiConfig.key &&
          this.aiConfig.model &&
          this.aiConfig.port
        )
      ) {
        this.aiConfigDialogVisible = true
        return
      }
      // 检查连接
      await fetch(`http://localhost:${this.aiConfig.port}/ai/test`, {
        method: 'GET'
      })
    },

    // AI生成整体
    async aiCrateAll() {
      try {
        await this.aiTest()
        this.createDialogVisible = true
      } catch (error) {
        console.log(error)
        this.clientTipDialogVisible = true
      }
    },

    // 关闭ai内容输入弹窗
    closeAiCreateDialog() {
      this.createDialogVisible = false
      this.aiInput = ''
    },

    // 确认生成
    doAiCreate() {
      const aiInputText = this.aiInput.trim()
      if (!aiInputText) {
        this.$message.warning('请输入内容')
        return
      }
      this.closeAiCreateDialog()
      this.aiCreatingMaskVisible = true
      // 发起请求
      this.isAiCreating = true
      this.aiInstance = new Ai({
        port: this.aiConfig.port
      })
      this.aiInstance.init('huoshan', this.aiConfig)
      this.mindMap.renderer.setRootNodeCenter()
      this.mindMap.setData(null)
      this.aiInstance.request(
        {
          messages: [
            {
              role: 'user',
              content: `帮我写一个【${aiInputText}】，需要以Markdown格式返回，并且只能使用Markdown的标题和无序列表两种语法，可以支持多层嵌套。只需返回内容即可。`
            }
          ]
        },
        content => {
          if (content && /\n$/.test(content)) {
            this.aiCreatingContent = content
          }
          this.loopRenderOnAiCreating()
        },
        content => {
          this.aiCreatingContent = content
          this.resetOnAiCreatingStop()
          this.$message.success('AI生成完成')
        },
        () => {
          this.resetOnAiCreatingStop()
          this.resetOnRenderEnd()
          this.$message.error('生成失败')
        }
      )
    },

    // AI请求完成或出错后需要复位的数据
    resetOnAiCreatingStop() {
      this.aiCreatingMaskVisible = false
      this.isAiCreating = false
      this.aiInstance = null
    },

    // 渲染结束后需要复位的数据
    resetOnRenderEnd() {
      this.isLoopRendering = false
      this.uidMap = {}
      this.aiCreatingContent = ''
      this.mindMapDataCache = ''
      this.beingAiCreateNodeUid = ''
    },

    // 停止生成
    stopCreate() {
      this.aiInstance.stop()
      this.isAiCreating = false
      this.aiCreatingMaskVisible = false
      this.$message.success('已停止生成')
    },

    // 轮询进行渲染
    loopRenderOnAiCreating() {
      if (!this.aiCreatingContent.trim() || this.isLoopRendering) return
      this.isLoopRendering = true
      const treeData = transformMarkdownTo(this.aiCreatingContent)
      this.addUid(treeData)
      let lastTreeData = JSON.stringify(treeData)

      // 在当前渲染完成时再进行下一次渲染
      const onRenderEnd = () => {
        // 处理超出画布的节点
        this.checkNodeOuter()

        // 如果生成结束数据渲染完毕，那么解绑事件
        if (!this.isAiCreating && !this.aiCreatingContent) {
          this.mindMap.off('node_tree_render_end', onRenderEnd)
          this.latestUid = ''
          return
        }

        const treeData = transformMarkdownTo(this.aiCreatingContent)
        this.addUid(treeData)
        // 正在生成中
        if (this.isAiCreating) {
          // 如果和上次数据一样则不触发重新渲染
          const curTreeData = JSON.stringify(treeData)
          if (curTreeData === lastTreeData) {
            setTimeout(() => {
              onRenderEnd()
            }, 500)
            return
          }
          lastTreeData = curTreeData
          this.mindMap.updateData(treeData)
        } else {
          // 已经生成结束
          // 还要触发一遍渲染，否则会丢失数据
          this.mindMap.updateData(treeData)
          this.resetOnRenderEnd()
        }
      }
      this.mindMap.on('node_tree_render_end', onRenderEnd)

      this.mindMap.setData(treeData)
    },

    // 处理超出画布的节点
    checkNodeOuter() {
      if (this.latestUid) {
        const latestNode = this.mindMap.renderer.findNodeByUid(this.latestUid)
        if (latestNode) {
          const { isOuter, offsetLeft, offsetTop } = checkNodeOuter(
            this.mindMap,
            latestNode,
            100,
            100
          )
          if (isOuter) {
            this.mindMap.view.translateXY(offsetLeft, offsetTop)
          }
        }
      }
    },

    // 给AI生成的数据添加uid
    addUid(data) {
      const checkRepeatUidMap = {}
      const walk = (node, pUid = '') => {
        if (!node.data) {
          node.data = {}
        }
        if (isUndef(node.data.uid)) {
          // 根据pUid+文本内容来复用上一次生成数据的uid
          const key = pUid + '-' + node.data.text
          node.data.uid = this.uidMap[key] || createUid()
          // 当前uid和之前的重复，那么重新生成一个。这种情况很少，但是以防万一
          if (checkRepeatUidMap[node.data.uid]) {
            node.data.uid = createUid()
          }
          this.latestUid = this.uidMap[key] = node.data.uid
          checkRepeatUidMap[node.data.uid] = true
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach(child => {
            walk(child, node.data.uid)
          })
        }
      }
      walk(data)
    },

    // AI生成部分
    async aiCreatePart(node) {
      try {
        await this.aiTest()
        this.beingAiCreateNodeUid = node.getData('uid')
        const currentMindMapData = this.mindMap.getData()
        this.mindMapDataCache = JSON.stringify(currentMindMapData)
        this.aiCreatingMaskVisible = true
        // 发起请求
        this.isAiCreating = true
        this.aiInstance = new Ai({
          port: this.aiConfig.port
        })
        this.aiInstance.init('huoshan', this.aiConfig)
        this.aiInstance.request(
          {
            messages: [
              {
                role: 'user',
                content: `我有一个主题为【${getStrWithBrFromHtml(
                  currentMindMapData.data.text
                )}】的思维导图，帮我续写其中一个内容为【${getStrWithBrFromHtml(
                  node.getData('text')
                )}】的节点的下级内容，需要以Markdown格式返回，并且只能使用Markdown的标题和无序列表两种语法，可以支持多层嵌套。只需返回内容即可。`
              }
            ]
          },
          content => {
            if (content && /\n$/.test(content)) {
              this.aiCreatingContent = content
            }
            this.loopRenderOnAiCreatingPart()
          },
          content => {
            this.aiCreatingContent = content
            this.resetOnAiCreatingStop()
            this.$message.success('AI生成完成')
          },
          () => {
            this.resetOnAiCreatingStop()
            this.resetOnRenderEnd()
            this.$message.error('生成失败')
          }
        )
      } catch (error) {
        console.log(error)
      }
    },

    // 将生成的数据添加到指定节点上
    addToTargetNode(newChildren = []) {
      const initData = JSON.parse(this.mindMapDataCache)
      const walk = node => {
        if (node.data.uid === this.beingAiCreateNodeUid) {
          if (!node.children) {
            node.children = []
          }
          node.children.push(...newChildren)
          return
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach(child => {
            walk(child)
          })
        }
      }
      walk(initData)
      return initData
    },

    // 轮询进行部分渲染
    loopRenderOnAiCreatingPart() {
      if (!this.aiCreatingContent.trim() || this.isLoopRendering) return
      this.isLoopRendering = true
      const partData = transformMarkdownTo(this.aiCreatingContent)
      this.addUid(partData)
      let lastPartData = JSON.stringify(partData)
      const treeData = this.addToTargetNode(partData.children || [])

      // 在当前渲染完成时再进行下一次渲染
      const onRenderEnd = () => {
        // 处理超出画布的节点
        this.checkNodeOuter()

        // 如果生成结束数据渲染完毕，那么解绑事件
        if (!this.isAiCreating && !this.aiCreatingContent) {
          this.mindMap.off('node_tree_render_end', onRenderEnd)
          this.latestUid = ''
          return
        }

        const partData = transformMarkdownTo(this.aiCreatingContent)
        this.addUid(partData)
        const treeData = this.addToTargetNode(partData.children || [])

        if (this.isAiCreating) {
          // 如果和上次数据一样则不触发重新渲染
          const curPartData = JSON.stringify(partData)
          if (curPartData === lastPartData) {
            setTimeout(() => {
              onRenderEnd()
            }, 500)
            return
          }
          lastPartData = curPartData
          this.mindMap.updateData(treeData)
        } else {
          this.mindMap.updateData(treeData)
          this.resetOnRenderEnd()
        }
      }
      this.mindMap.on('node_tree_render_end', onRenderEnd)
      // 因为是续写，所以首次也直接使用updateData方法渲染
      this.mindMap.updateData(treeData)
    },

    // AI对话
    async aiChat(text, progress = () => {}, end = () => {}, err = () => {}) {
      try {
        await this.aiTest()
        // 发起请求
        this.isAiCreating = true
        this.aiInstance = new Ai({
          port: this.aiConfig.port
        })
        this.aiInstance.init('huoshan', this.aiConfig)
        this.aiInstance.request(
          {
            messages: [
              {
                role: 'user',
                content: text
              }
            ]
          },
          content => {
            progress(content)
          },
          content => {
            end(content)
          },
          error => {
            err(error)
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.clientTipDialog,
.createDialog {
  /deep/ .el-dialog__body {
    padding: 12px 20px;
  }
}

.tipBox {
  p {
    margin-bottom: 12px;

    a {
      color: #409eff;
    }
  }
}

.inputBox {
  .tip {
    margin-top: 12px;

    &.warning {
      color: #f56c6c;
    }
  }
}

.aiCreatingMask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: transparent;

  .btn {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
  }
}
</style>
