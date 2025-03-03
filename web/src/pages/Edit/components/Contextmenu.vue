<template>
  <div
    class="contextmenuContainer listBox"
    v-if="isShow"
    ref="contextmenuRef"
    :style="{ left: left + 'px', top: top + 'px' }"
    :class="{ isDark: isDark }"
  >
    <template v-if="type === 'node'">
      <div
        class="item"
        @click="exec('INSERT_NODE', insertNodeBtnDisabled)"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        <span class="name">{{ $t('contextmenu.insertSiblingNode') }}</span>
        <span class="desc">Enter</span>
      </div>
      <div
        class="item"
        @click="exec('INSERT_CHILD_NODE')"
        :class="{ disabled: isGeneralization }"
      >
        <span class="name">{{ $t('contextmenu.insertChildNode') }}</span>
        <span class="desc">Tab</span>
      </div>
      <div
        class="item"
        @click="exec('INSERT_PARENT_NODE')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        <span class="name">{{ $t('contextmenu.insertParentNode') }}</span>
        <span class="desc">Shift + Tab</span>
      </div>
      <div
        class="item"
        @click="exec('ADD_GENERALIZATION')"
        :class="{ disabled: insertNodeBtnDisabled }"
      >
        <span class="name">{{ $t('contextmenu.insertSummary') }}</span>
        <span class="desc">Ctrl + G</span>
      </div>
      <div class="splitLine"></div>
      <div
        class="item"
        @click="exec('UP_NODE')"
        :class="{ disabled: upNodeBtnDisabled }"
      >
        <span class="name">{{ $t('contextmenu.moveUpNode') }}</span>
        <span class="desc">Ctrl + ↑</span>
      </div>
      <div
        class="item"
        @click="exec('DOWN_NODE')"
        :class="{ disabled: downNodeBtnDisabled }"
      >
        <span class="name">{{ $t('contextmenu.moveDownNode') }}</span>
        <span class="desc">Ctrl + ↓</span>
      </div>
      <div class="item" @click="exec('UNEXPAND_ALL')">
        <span class="name">{{ $t('contextmenu.unExpandNodeChild') }}</span>
      </div>
      <div class="item" @click="exec('EXPAND_ALL')">
        <span class="name">{{ $t('contextmenu.expandNodeChild') }}</span>
      </div>
      <div class="item" v-if="supportNumbers">
        <span class="name">{{ $t('contextmenu.number') }}</span>
        <span class="el-icon-arrow-right"></span>
        <div
          class="subItems listBox"
          :class="{ isDark: isDark, showLeft: subItemsShowLeft }"
          style="top: -170px"
        >
          <div
            class="item"
            v-for="item in numberTypeList"
            :key="'type' + item.value"
            @click="setNodeNumber('type', item.value)"
          >
            <span class="name">{{ item.name }}</span>
            {{ numberType === item.value ? '√' : '' }}
          </div>
          <div class="splitLine"></div>
          <div
            class="item"
            v-for="item in numberLevelList"
            :key="'level' + item.value"
            :class="{ disabled: numberType === '' }"
            @click="setNodeNumber('level', item.value)"
          >
            <span class="name">{{ item.name }}</span>
            {{ numberLevel === item.value ? '√' : '' }}
          </div>
        </div>
      </div>
      <div class="item" @click="setCheckbox" v-if="supportCheckbox">
        <span class="name">{{
          hasCheckbox ? $t('contextmenu.removeToDo') : $t('contextmenu.addToDo')
        }}</span>
      </div>
      <div class="splitLine"></div>
      <div class="item danger" @click="exec('REMOVE_NODE')">
        <span class="name">{{ $t('contextmenu.deleteNode') }}</span>
        <span class="desc">Delete</span>
      </div>
      <div class="item danger" @click="exec('REMOVE_CURRENT_NODE')">
        <span class="name">{{ $t('contextmenu.deleteCurrentNode') }}</span>
        <span class="desc">Shift + Backspace</span>
      </div>
      <div class="splitLine"></div>
      <div
        class="item"
        @click="exec('COPY_NODE')"
        :class="{ disabled: isGeneralization }"
      >
        <span class="name">{{ $t('contextmenu.copyNode') }}</span>
        <span class="desc">Ctrl + C</span>
      </div>
      <div
        class="item"
        @click="exec('CUT_NODE')"
        :class="{ disabled: isGeneralization }"
      >
        <span class="name">{{ $t('contextmenu.cutNode') }}</span>
        <span class="desc">Ctrl + X</span>
      </div>
      <div class="item" @click="exec('PASTE_NODE')">
        <span class="name">{{ $t('contextmenu.pasteNode') }}</span>
        <span class="desc">Ctrl + V</span>
      </div>
      <div class="splitLine"></div>
      <div class="item" @click="exec('REMOVE_HYPERLINK')" v-if="hasHyperlink">
        <span class="name">{{ $t('contextmenu.removeHyperlink') }}</span>
      </div>
      <div class="item" @click="exec('REMOVE_NOTE')" v-if="hasNote">
        <span class="name">{{ $t('contextmenu.removeNote') }}</span>
      </div>
      <div class="item" @click="exec('REMOVE_CUSTOM_STYLES')">
        <span class="name">{{ $t('contextmenu.removeCustomStyles') }}</span>
      </div>
      <div class="item" @click="exec('EXPORT_CUR_NODE_TO_PNG')">
        <span class="name">{{ $t('contextmenu.exportNodeToPng') }}</span>
      </div>
      <div class="splitLine" v-if="enableAi"></div>
      <div class="item" @click="aiCreate" v-if="enableAi">
        <span class="name">{{ $t('contextmenu.aiCreate') }}</span>
      </div>
    </template>
    <template v-if="type === 'svg'">
      <div class="item" @click="exec('RETURN_CENTER')">
        <span class="name">{{ $t('contextmenu.backCenter') }}</span>
        <span class="desc">Ctrl + Enter</span>
      </div>
      <div class="splitLine"></div>
      <div class="item" @click="exec('EXPAND_ALL')">
        <span class="name">{{ $t('contextmenu.expandAll') }}</span>
      </div>
      <div class="item" @click="exec('UNEXPAND_ALL')">
        <span class="name">{{ $t('contextmenu.unExpandAll') }}</span>
      </div>
      <div class="item">
        <span class="name">{{ $t('contextmenu.expandTo') }}</span>
        <span class="el-icon-arrow-right"></span>
        <div
          class="subItems listBox"
          :class="{ isDark: isDark, showLeft: subItemsShowLeft }"
          style="top: -10px"
        >
          <div
            class="item"
            v-for="(item, index) in expandList"
            :key="item"
            @click="exec('UNEXPAND_TO_LEVEL', false, index + 1)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="splitLine"></div>
      <div class="item" @click="exec('RESET_LAYOUT')">
        <span class="name">{{ $t('contextmenu.arrangeLayout') }}</span>
        <span class="desc">Ctrl + L</span>
      </div>
      <div class="item" @click="exec('FIT_CANVAS')">
        <span class="name">{{ $t('contextmenu.fitCanvas') }}</span>
        <span class="desc">Ctrl + i</span>
      </div>
      <div class="item" @click="exec('TOGGLE_ZEN_MODE')">
        <span class="name">{{ $t('contextmenu.zenMode') }}</span>
        {{ isZenMode ? '√' : '' }}
      </div>
      <div class="splitLine"></div>
      <div class="item" @click="exec('REMOVE_ALL_NODE_CUSTOM_STYLES')">
        <span class="name">{{
          $t('contextmenu.removeAllNodeCustomStyles')
        }}</span>
      </div>
      <div class="item">
        <span class="name">{{ $t('contextmenu.copyToClipboard') }}</span>
        <span class="el-icon-arrow-right"></span>
        <div
          class="subItems listBox"
          :class="{ isDark: isDark, showLeft: subItemsShowLeft }"
          style="top: -130px"
        >
          <div
            class="item"
            v-for="item in copyList"
            :key="item.value"
            @click="copyToClipboard(item.value)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getTextFromHtml, imgToDataUrl } from 'simple-mind-map/src/utils'
import { transformToMarkdown } from 'simple-mind-map/src/parse/toMarkdown'
import { transformToTxt } from 'simple-mind-map/src/parse/toTxt'
import { setDataToClipboard, setImgToClipboard, copy } from '@/utils'
import { numberTypeList, numberLevelList } from '@/config'

// 右键菜单
export default {
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false,
      left: 0,
      top: 0,
      node: null,
      type: '',
      isMousedown: false,
      mosuedownX: 0,
      mosuedownY: 0,
      enableCopyToClipboardApi: navigator.clipboard,
      numberType: '',
      numberLevel: '',
      subItemsShowLeft: false,
      isNodeMousedown: false
    }
  },
  computed: {
    ...mapState({
      isZenMode: state => state.localConfig.isZenMode,
      isDark: state => state.localConfig.isDark,
      supportNumbers: state => state.supportNumbers,
      supportCheckbox: state => state.supportCheckbox,
      enableAi: state => state.localConfig.enableAi
    }),
    expandList() {
      return [
        this.$t('contextmenu.level1'),
        this.$t('contextmenu.level2'),
        this.$t('contextmenu.level3'),
        this.$t('contextmenu.level4'),
        this.$t('contextmenu.level5'),
        this.$t('contextmenu.level6')
      ]
    },
    copyList() {
      const list = [
        {
          name: this.$t('contextmenu.copyToSmm'),
          value: 'smm'
        },
        {
          name: this.$t('contextmenu.copyToJson'),
          value: 'json'
        },
        {
          name: this.$t('contextmenu.copyToMarkdown'),
          value: 'md'
        },
        {
          name: this.$t('contextmenu.copyToTxt'),
          value: 'txt'
        }
      ]
      if (this.enableCopyToClipboardApi) {
        list.push({
          name: this.$t('contextmenu.copyToPng'),
          value: 'png'
        })
      }
      return list
    },
    insertNodeBtnDisabled() {
      return !this.node || this.node.isRoot || this.node.isGeneralization
    },
    upNodeBtnDisabled() {
      if (!this.node || this.node.isRoot || this.node.isGeneralization) {
        return true
      }
      let isFirst =
        this.node.parent.children.findIndex(item => {
          return item === this.node
        }) === 0
      return isFirst
    },
    downNodeBtnDisabled() {
      if (!this.node || this.node.isRoot || this.node.isGeneralization) {
        return true
      }
      let children = this.node.parent.children
      let isLast =
        children.findIndex(item => {
          return item === this.node
        }) ===
        children.length - 1
      return isLast
    },
    isGeneralization() {
      return this.node.isGeneralization
    },
    hasHyperlink() {
      return !!this.node.getData('hyperlink')
    },
    hasNote() {
      return !!this.node.getData('note')
    },
    numberTypeList() {
      return numberTypeList[this.$i18n.locale] || numberTypeList.zh
    },
    numberLevelList() {
      return numberLevelList[this.$i18n.locale] || numberLevelList.zh
    },
    hasCheckbox() {
      return !!this.node.getData('checkbox')
    }
  },
  created() {
    this.$bus.$on('node_contextmenu', this.show)
    this.$bus.$on('node_click', this.hide)
    this.$bus.$on('draw_click', this.hide)
    this.$bus.$on('expand_btn_click', this.hide)
    this.$bus.$on('svg_mousedown', this.onMousedown)
    this.$bus.$on('mouseup', this.onMouseup)
    this.$bus.$on('translate', this.hide)
    this.$bus.$on('node_mousedown', this.onNodeMousedown)
  },
  beforeDestroy() {
    this.$bus.$off('node_contextmenu', this.show)
    this.$bus.$off('node_click', this.hide)
    this.$bus.$off('draw_click', this.hide)
    this.$bus.$off('expand_btn_click', this.hide)
    this.$bus.$off('svg_mousedown', this.onMousedown)
    this.$bus.$off('mouseup', this.onMouseup)
    this.$bus.$off('translate', this.hide)
    this.$bus.$off('node_mousedown', this.onNodeMousedown)
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

    // 计算右键菜单元素的显示位置
    getShowPosition(x, y) {
      const rect = this.$refs.contextmenuRef.getBoundingClientRect()
      if (x + rect.width > window.innerWidth) {
        x = x - rect.width - 20
      }
      this.subItemsShowLeft = x + rect.width + 150 > window.innerWidth
      if (y + rect.height > window.innerHeight) {
        y = window.innerHeight - rect.height - 10
      }
      return { x, y }
    },

    // 节点右键显示
    show(e, node) {
      this.type = 'node'
      this.isShow = true
      this.node = node
      const number = this.node.getData('number')
      if (number) {
        this.numberType = number.type || 1
        this.numberLevel = number.level === '' ? 1 : number.level
      }
      this.$nextTick(() => {
        const { x, y } = this.getShowPosition(e.clientX + 10, e.clientY + 10)
        this.left = x
        this.top = y
      })
    },

    onNodeMousedown() {
      this.isNodeMousedown = true
    },

    // 鼠标按下事件
    onMousedown(e) {
      if (e.which !== 3) {
        return
      }
      this.mosuedownX = e.clientX
      this.mosuedownY = e.clientY
      this.isMousedown = true
    },

    // 鼠标松开事件
    onMouseup(e) {
      if (!this.isMousedown) {
        return
      }
      if (this.isNodeMousedown) {
        this.isNodeMousedown = false
        return
      }
      this.isMousedown = false
      if (
        Math.abs(this.mosuedownX - e.clientX) > 3 ||
        Math.abs(this.mosuedownY - e.clientY) > 3
      ) {
        this.hide()
        return
      }
      this.show2(e)
    },

    // 画布右键显示
    show2(e) {
      this.type = 'svg'
      this.isShow = true
      this.$nextTick(() => {
        const { x, y } = this.getShowPosition(e.clientX + 10, e.clientY + 10)
        this.left = x
        this.top = y
      })
    },

    // 隐藏
    hide() {
      this.isShow = false
      this.left = -9999
      this.top = -9999
      this.type = ''
      this.node = ''
      this.numberType = ''
      this.numberLevel = ''
    },

    // 执行命令
    exec(key, disabled, ...args) {
      if (disabled) {
        return
      }
      switch (key) {
        case 'COPY_NODE':
          this.mindMap.renderer.copy()
          break
        case 'CUT_NODE':
          this.mindMap.renderer.cut()
          break
        case 'PASTE_NODE':
          this.mindMap.renderer.paste()
          break
        case 'RETURN_CENTER':
          this.mindMap.renderer.setRootNodeCenter()
          break
        case 'TOGGLE_ZEN_MODE':
          this.setLocalConfig({
            isZenMode: !this.isZenMode
          })
          break
        case 'FIT_CANVAS':
          this.mindMap.view.fit()
          break
        case 'REMOVE_HYPERLINK':
          this.node.setHyperlink('', '')
          break
        case 'REMOVE_NOTE':
          this.node.setNote('')
          break
        case 'EXPORT_CUR_NODE_TO_PNG':
          this.mindMap.export(
            'png',
            true,
            getTextFromHtml(this.node.getData('text')),
            false,
            this.node
          )
          break
        case 'UNEXPAND_ALL':
          const uid = this.node ? this.node.uid : ''
          this.$bus.$emit('execCommand', key, !uid, uid)
          break
        case 'EXPAND_ALL':
          this.$bus.$emit('execCommand', key, this.node ? this.node.uid : '')
          break
        default:
          this.$bus.$emit('execCommand', key, ...args)
          break
      }
      this.hide()
    },

    // 设置节点编号
    setNodeNumber(prop, value) {
      if (prop === 'type') {
        this.numberType = value
        if (value === '') {
          // 无编号
          this.numberLevel = ''
          this.mindMap.execCommand('SET_NUMBER', [], null)
          return
        } else {
          // 有编号
          if (this.numberLevel === '') {
            this.numberLevel = 1
          }
        }
      }
      if (prop === 'level') {
        this.numberLevel = value
      }
      this.mindMap.execCommand('SET_NUMBER', [], {
        [prop]: value
      })
      this.hide()
    },

    // 设置待办
    setCheckbox() {
      this.mindMap.execCommand(
        'SET_CHECKBOX',
        [],
        this.hasCheckbox
          ? null
          : {
              done: false
            }
      )
      this.hide()
    },

    // 复制到剪贴板
    async copyToClipboard(type) {
      try {
        this.hide()
        let data
        let str
        switch (type) {
          case 'smm':
          case 'json':
            data = this.mindMap.getData(true)
            str = JSON.stringify(data)
            break
          case 'md':
            data = this.mindMap.getData()
            str = transformToMarkdown(data)
            break
          case 'txt':
            data = this.mindMap.getData()
            str = transformToTxt(data)
            break
          case 'png':
            const png = await this.mindMap.export('png', false)
            const blob = await imgToDataUrl(png, true)
            setImgToClipboard(blob)
            break
          default:
            break
        }
        if (str) {
          if (this.enableCopyToClipboardApi) {
            setDataToClipboard(str)
          } else {
            copy(str)
          }
        }
        this.$message.success(this.$t('contextmenu.copySuccess'))
      } catch (error) {
        console.log(error)
        this.$message.error(this.$t('contextmenu.copyFail'))
      }
    },

    // AI续写
    aiCreate() {
      this.$bus.$emit('ai_create_part', this.node)
      this.hide()
    }
  }
}
</script>

<style lang="less" scoped>
.listBox {
  width: 250px;
  background: #fff;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 69%, 0.5);
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;

  &.isDark {
    background: #363b3f;
  }
}
.contextmenuContainer {
  position: fixed;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1a1a1a;

  &.isDark {
    color: #fff;

    .item {
      &:hover {
        background: hsla(0, 0%, 100%, 0.05);
      }
    }
  }

  .splitLine {
    width: 95%;
    height: 1px;
    background-color: #e9edf2;
    margin: 2px auto;
  }

  .item {
    position: relative;
    height: 28px;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.danger {
      color: #f56c6c;
    }

    &:hover {
      background: #f5f5f5;

      .subItems {
        visibility: visible;
      }
    }

    &.disabled {
      color: grey;
      cursor: not-allowed;
      pointer-events: none;

      &:hover {
        background: #fff;
      }
    }

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .desc {
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subItems {
      position: absolute;
      left: 100%;
      visibility: hidden;
      width: 150px;
      cursor: auto;

      &.showLeft {
        left: -150px;
      }
    }
  }
}
</style>
