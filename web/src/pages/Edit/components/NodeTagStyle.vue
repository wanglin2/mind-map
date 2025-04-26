<template>
  <div
    class="nodeTagStyleContainer"
    ref="elRef"
    :style="position"
    v-show="show"
    :class="{ isDark: isDark }"
  >
    <div class="row">
      <el-input
        v-model="text"
        :placeholder="$t('nodeTagStyle.placeholder')"
        size="mini"
        @blur="updateTagText"
        @keydown.native.stop
        @keyup.native.enter.stop="updateTagText"
      ></el-input>
      <div class="deleteBtn" @click.stop="deleteTag">
        <span class="iconfont iconshanchu"></span>
        <span class="text">{{ $t('nodeTagStyle.delete') }}</span>
      </div>
    </div>
    <div class="row">
      <Color :color="fill" @change="updateTagFill"></Color>
    </div>
  </div>
</template>

<script>
import Color from './Color.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Color
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      position: {
        left: 0,
        top: 0
      },
      node: null,
      index: 0,
      text: '',
      fill: ''
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    })
  },
  created() {
    this.mindMap.on('node_tag_click', this.onNodeTagClick)
    this.mindMap.on('scale', this.hide)
    this.mindMap.on('translate', this.hide)
    this.mindMap.on('svg_mousedown', this.hide)
    this.mindMap.on('expand_btn_click', this.hide)
  },
  beforeDestroy() {
    this.mindMap.off('node_tag_click', this.onNodeTagClick)
    this.mindMap.off('scale', this.hide)
    this.mindMap.off('translate', this.hide)
    this.mindMap.off('svg_mousedown', this.hide)
    this.mindMap.off('expand_btn_click', this.hide)
  },
  mounted() {
    document.body.appendChild(this.$refs.elRef)
  },
  methods: {
    onNodeTagClick(node, tag, index, el) {
      this.node = node
      this.index = index
      if (typeof tag === 'string') {
        this.text = tag
      } else {
        // v0.10.3+版本支持对象类型
        this.text = tag.text
        this.fill = tag.style && tag.style.fill ? tag.style.fill : ''
      }
      // 获取外框的位置大小信息
      const { x, y, width, height } = el.rbox()
      const boxWidth = 260
      const boxHeight = 152
      let left = x + width / 2 - boxWidth / 2
      if (left < 0) {
        left = 0
      }
      if (left + boxWidth > window.innerWidth) {
        left = window.innerWidth - boxWidth
      }
      this.position.left = left + 'px'
      let top = y + height + 5
      if (top + boxHeight > window.innerHeight) {
        top = window.innerHeight - boxHeight
      }
      this.position.top = top + 'px'
      this.show = true
    },

    updateTagText() {
      const text = this.text.trim()
      if (!text) {
        return
      }
      this.updateTagInfo({
        text
      })
    },

    updateTagFill(color) {
      this.updateTagInfo({
        style: {
          fill: color
        }
      })
      this.fill = color
    },

    updateTagInfo({ text, style }) {
      if (!this.node) return
      const tagData = [...this.node.getData('tag')]
      let item = null
      if (typeof tagData[this.index] === 'string') {
        item = {
          text: tagData[this.index],
          style: {}
        }
      } else {
        item = tagData[this.index]
        if (!item.style) {
          item.style = {}
        }
      }
      if (text) {
        item.text = text
      }
      if (style) {
        Object.keys(style).forEach(key => {
          item.style[key] = style[key]
        })
      }

      tagData[this.index] = item
      this.mindMap.execCommand('SET_NODE_TAG', this.node, tagData)
    },

    deleteTag() {
      if (!this.node) return
      const tagData = [...this.node.getData('tag')]
      tagData.splice(this.index, 1)
      this.mindMap.execCommand('SET_NODE_TAG', this.node, tagData)
      this.hide()
    },

    hide() {
      this.show = false
      this.node = null
      this.index = 0
      this.text = ''
      this.fill = ''
    }
  }
}
</script>

<style lang="less" scoped>
.nodeTagStyleContainer {
  position: fixed;
  width: 260px;
  padding: 12px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);

  &.isDark {
    background-color: #262a2e;
    border-left-color: hsla(0, 0%, 100%, 0.1);
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0px;
    }

    .colorItem {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      cursor: pointer;
    }

    .colorItemBox {
      height: 20px;
      cursor: pointer;

      .colorTriggerBtn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .colorItem {
          height: 5px;
        }
      }
    }

    .deleteBtn {
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-left: 5px;
      cursor: pointer;
      color: #9aa5b8;
      font-size: 12px;
      user-select: none;

      &:hover {
        color: #eb5555;
      }

      .iconfont {
        font-size: 12px;
        margin-right: 2px;
      }

      .text {
      }
    }
  }
}
</style>
