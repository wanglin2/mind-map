<template>
  <el-popover placement="bottom" width="200" trigger="click">
    <div class="annotationConfigBox" :class="{ isDark: isDark }">
      <div class="annotationConfigItem">
        <span class="name">{{ $t('annotation.show') }}</span>
        <el-switch
          v-model="show"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="onChange"
        >
        </el-switch>
      </div>
      <template v-if="show">
        <div class="annotationConfigItem">
          <span class="name">{{ $t('annotation.type') }}</span>
          <el-select
            size="mini"
            v-model="annotationConfig.type"
            @change="onChange"
          >
            <el-option
              v-for="item in annotationTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="annotationConfigItem">
          <span class="name">{{ $t('annotation.color') }}</span>
          <span
            class="block"
            v-popover:popover
            :style="{ backgroundColor: annotationConfig.color }"
          ></span>
          <el-popover ref="popover" placement="bottom" trigger="hover">
            <Color
              :color="annotationConfig.color"
              @change="onColorChange"
            ></Color>
          </el-popover>
        </div>
        <div class="annotationConfigItem">
          <span class="name">{{ $t('annotation.lineWidth') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="annotationConfig.strokeWidth"
            placeholder=""
            @change="onChange"
          >
            <el-option
              v-for="item in lineWidthList"
              :key="item"
              :label="item"
              :value="item"
            >
              <span
                v-if="item > 0"
                class="borderLine"
                :class="{ isDark: isDark }"
                :style="{ height: item + 'px' }"
              ></span>
            </el-option>
          </el-select>
        </div>
        <div class="annotationConfigItem">
          <span class="name">{{ $t('annotation.padding') }}</span>
          <el-input-number
            v-model="annotationConfig.padding"
            :step="5"
            size="mini"
            @change="onChange"
          ></el-input-number>
        </div>
        <div class="annotationConfigItem">
          <span class="name">{{ $t('annotation.animate') }}</span>
          <el-switch
            v-model="annotationConfig.animate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onChange"
          >
          </el-switch>
        </div>
      </template>
    </div>
    <div
      slot="reference"
      class="toolbarBtn vip"
      :style="{
        marginLeft: dir === 'v' || rightHasBtn ? '0px' : '20px',
        marginTop: dir === 'v' ? '10px' : '0px',
        marginRight: rightHasBtn ? '20px' : '0px',
        marginBottom: dir === 'v' && rightHasBtn ? '10px' : '0px'
      }"
      :class="{
        disabled: activeNodes.length <= 0 || hasGeneralization
      }"
    >
      <span class="icon iconfont iconhighlight"></span>
      <span class="text">{{ $t('annotation.mark') }}</span>
    </div>
  </el-popover>
</template>

<script>
import { lineWidthList } from '@/config'
import Color from './Color.vue'

const defaultConfig = {
  type: 'circle',
  color: '',
  strokeWidth: 1,
  animate: true,
  padding: 20
}

export default {
  components: {
    Color
  },
  props: {
    isDark: {
      type: Boolean,
      default: false
    },
    dir: {
      type: String,
      default: ''
    },
    rightHasBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lineWidthList: lineWidthList.slice(1),
      activeNodes: [],
      show: false,
      annotationConfig: {
        ...defaultConfig
      },
      annotationTypeList: [
        {
          label: '圆',
          value: 'circle'
        },
        {
          label: '边框',
          value: 'box'
        },
        {
          label: '高亮',
          value: 'highlight'
        },
        {
          label: '下划线',
          value: 'underline'
        },
        {
          label: '删除线',
          value: 'strike-through'
        },
        {
          label: '叉',
          value: 'crossed-off'
        }
      ]
    }
  },
  computed: {
    hasGeneralization() {
      return (
        this.activeNodes.findIndex(node => {
          return node.isGeneralization
        }) !== -1
      )
    }
  },
  mounted() {
    this.$bus.$on('node_active', this.onNodeActive)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.onNodeActive)
  },
  methods: {
    onNodeActive(...args) {
      this.activeNodes = [...args[1]]
      const node = this.activeNodes[0]
      if (node) {
        const notationData = node.getData('notation')
        if (notationData) {
          const { show, config } = notationData
          this.show = show
          this.annotationConfig = {
            ...defaultConfig,
            ...config
          }
        } else {
          this.reset()
        }
      } else {
        this.reset()
      }
    },

    reset() {
      this.show = false
      this.annotationConfig = {
        ...defaultConfig
      }
    },

    onChange() {
      this.$emit('setAnnotation', this.show, {
        ...this.annotationConfig
      })
    },

    onColorChange(color) {
      this.annotationConfig.color = color
      this.onChange()
    }
  }
}
</script>

<style lang="less" scoped>
.annotationConfigBox {
  &.isDark {
    .annotationConfigItem {
      .name {
        color: hsla(0, 0%, 100%, 0.9);
      }
    }
  }

  .annotationConfigItem {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    &:last-of-type {
      margin-bottom: 0px;
    }

    .name {
      flex-shrink: 0;
      margin-right: 10px;
    }

    .block {
      width: 30px;
      height: 30px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.borderLine {
  display: inline-block;
  width: 100%;
  background-color: #000;

  &.isDark {
    background-color: #fff;
  }
}
</style>
