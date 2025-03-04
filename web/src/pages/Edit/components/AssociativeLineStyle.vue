<template>
  <Sidebar ref="sidebar" :title="'关联线样式'">
    <div class="sidebarContent" :class="{ isDark: isDark }">
      <div class="title noTop">{{ $t('baseStyle.associativeLine') }}</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.associativeLineColor') }}</span>
          <span
            class="block"
            v-popover:popover4
            :style="{ backgroundColor: style.associativeLineColor }"
          ></span>
          <el-popover ref="popover4" placement="bottom" trigger="click">
            <Color
              :color="style.associativeLineColor"
              @change="
                color => {
                  update('associativeLineColor', color)
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.associativeLineWidth') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.associativeLineWidth"
            placeholder=""
            @change="
              value => {
                update('associativeLineWidth', value)
              }
            "
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
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{
            $t('baseStyle.associativeLineActiveColor')
          }}</span>
          <span
            class="block"
            v-popover:popover5
            :style="{ backgroundColor: style.associativeLineActiveColor }"
          ></span>
          <el-popover ref="popover5" placement="bottom" trigger="click">
            <Color
              :color="style.associativeLineActiveColor"
              @change="
                color => {
                  update('associativeLineActiveColor', color)
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">{{
            $t('baseStyle.associativeLineActiveWidth')
          }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.associativeLineActiveWidth"
            placeholder=""
            @change="
              value => {
                update('associativeLineActiveWidth', value)
              }
            "
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
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('style.style') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.associativeLineDasharray"
            placeholder=""
            @change="
              value => {
                update('associativeLineDasharray', value)
              }
            "
          >
            <el-option
              v-for="item in borderDasharrayList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
              <svg width="120" height="34">
                <line
                  x1="10"
                  y1="17"
                  x2="110"
                  y2="17"
                  stroke-width="2"
                  :stroke="
                    style.associativeLineDasharray === item.value
                      ? '#409eff'
                      : isDark
                      ? '#fff'
                      : '#000'
                  "
                  :stroke-dasharray="item.value"
                ></line>
              </svg>
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 关联线文字 -->
      <div class="title noTop">{{ $t('baseStyle.associativeLineText') }}</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.fontFamily') }}</span>
          <el-select
            size="mini"
            v-model="style.associativeLineTextFontFamily"
            placeholder=""
            @change="update('associativeLineTextFontFamily', $event)"
          >
            <el-option
              v-for="item in fontFamilyList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              :style="{ fontFamily: item.value }"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.color') }}</span>
          <span
            class="block"
            v-popover:popover6
            :style="{ backgroundColor: style.associativeLineTextColor }"
          ></span>
          <el-popover ref="popover6" placement="bottom" trigger="click">
            <Color
              :color="style.associativeLineTextColor"
              @change="
                color => {
                  update('associativeLineTextColor', color)
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.fontSize') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.associativeLineTextFontSize"
            placeholder=""
            @change="update('associativeLineTextFontSize', $event)"
          >
            <el-option
              v-for="item in fontSizeList"
              :key="item"
              :label="item"
              :value="item"
              :style="{ fontSize: item + 'px' }"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Color from './Color.vue'
import {
  lineWidthList,
  fontFamilyList,
  fontSizeList,
  borderDasharrayList
} from '@/config'
import { mapState, mapMutations } from 'vuex'

const defaultStyle = {
  associativeLineColor: '',
  associativeLineWidth: 0,
  associativeLineActiveWidth: 0,
  associativeLineDasharray: '',
  associativeLineActiveColor: '',
  associativeLineTextFontSize: 0,
  associativeLineTextColor: '',
  associativeLineTextFontFamily: ''
}

export default {
  components: {
    Sidebar,
    Color
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      lineWidthList,
      fontSizeList,
      activeLineNode: null,
      activeLineToNode: null,
      style: {
        ...defaultStyle
      }
    }
  },
  computed: {
    ...mapState({
      activeSidebar: state => state.activeSidebar,
      isDark: state => state.localConfig.isDark
    }),

    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    },

    borderDasharrayList() {
      return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'associativeLineStyle') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.mindMap.on('associative_line_click', this.onAssociativeLineClick)
    this.mindMap.on(
      'associative_line_deactivate',
      this.associativeLineDeactivate
    )
  },
  methods: {
    ...mapMutations(['setActiveSidebar']),

    onAssociativeLineClick(a, b, node, toNode) {
      this.activeLineNode = node
      this.activeLineToNode = toNode
      const styleConfig = this.mindMap.associativeLine.getStyleConfig(
        node,
        toNode
      )
      Object.keys(this.style).forEach(item => {
        this.style[item] = styleConfig[item]
      })
      this.setActiveSidebar('associativeLineStyle')
    },

    associativeLineDeactivate() {
      this.setActiveSidebar('')
      this.activeLineNode = null
      this.activeLineToNode = null
      this.style = {
        ...defaultStyle
      }
    },

    update(prop, value) {
      this.style[prop] = value
      const associativeLineStyle =
        this.activeLineNode.getData('associativeLineStyle') || {}
      const toNodeUid = this.activeLineToNode.getData('uid')
      const lineStyle = associativeLineStyle[toNodeUid] || {}
      this.activeLineNode.setData({
        associativeLineStyle: {
          ...associativeLineStyle,
          [toNodeUid]: {
            ...lineStyle,
            ...this.style
          }
        }
      })
      this.mindMap.associativeLine.updateActiveLineStyle()
    }
  }
}
</script>

<style lang="less" scoped>
.sidebarContent {
  padding: 20px;
  padding-top: 10px;

  &.isDark {
    .title {
      color: #fff;
    }

    .row {
      .rowItem {
        .name {
          color: hsla(0, 0%, 100%, 0.6);
        }
      }
    }
  }

  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(26, 26, 26, 0.9);
    margin-bottom: 10px;
    margin-top: 20px;

    &.noTop {
      margin-top: 0;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .rowItem {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .name {
        font-size: 12px;
        margin-right: 10px;
        white-space: nowrap;
      }

      .block {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;
      }
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
<style lang="less">
.el-select-dropdown__item.selected {
  .borderLine {
    background-color: #409eff;
  }
}
</style>
