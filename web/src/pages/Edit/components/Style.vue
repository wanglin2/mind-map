<template>
  <Sidebar ref="sidebar" :title="$t('style.title')">
    <div
      class="styleBox"
      :class="{ isDark: isDark }"
      v-if="activeNodes.length > 0"
    >
      <div class="sidebarContent customScrollbar">
        <!-- 文字 -->
        <div class="title noTop">{{ $t('style.text') }}</div>
        <div class="row">
          <div class="rowItem">
            <!-- <span class="name">{{ $t('style.fontFamily') }}</span> -->
            <el-select
              size="mini"
              style="width: 100px"
              v-model="style.fontFamily"
              placeholder=""
              @change="update('fontFamily')"
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
          <div class="rowItem">
            <!-- <span class="name">{{ $t('style.fontSize') }}</span> -->
            <el-select
              size="mini"
              style="width: 60px"
              v-model="style.fontSize"
              placeholder=""
              @change="update('fontSize')"
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
          <div class="rowItem">
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.textAlign"
              placeholder=""
              @change="update('textAlign')"
            >
              <el-option
                v-for="item in alignList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="btnGroup">
            <el-tooltip :content="$t('style.color')" placement="bottom">
              <div class="styleBtn" v-popover:popover>
                A
                <span
                  class="colorShow"
                  :style="{ backgroundColor: style.color || '#eee' }"
                ></span>
              </div>
            </el-tooltip>
            <el-tooltip :content="$t('style.addFontWeight')" placement="bottom">
              <div
                class="styleBtn"
                :class="{
                  actived: style.fontWeight === 'bold'
                }"
                @click="toggleFontWeight"
              >
                B
              </div>
            </el-tooltip>
            <el-tooltip :content="$t('style.italic')" placement="bottom">
              <div
                class="styleBtn i"
                :class="{
                  actived: style.fontStyle === 'italic'
                }"
                @click="toggleFontStyle"
              >
                I
              </div>
            </el-tooltip>
            <el-tooltip
              :content="$t('style.textDecoration')"
              placement="bottom"
            >
              <div
                class="styleBtn u"
                :style="{ textDecoration: style.textDecoration || 'none' }"
                v-popover:popover2
              >
                U
              </div>
            </el-tooltip>
          </div>
          <el-popover ref="popover" placement="bottom" trigger="hover">
            <Color :color="style.color" @change="changeFontColor"></Color>
          </el-popover>
          <el-popover ref="popover2" placement="bottom" trigger="hover">
            <el-radio-group
              size="mini"
              v-model="style.textDecoration"
              @change="update('textDecoration')"
            >
              <el-radio-button label="none">{{
                $t('style.none')
              }}</el-radio-button>
              <el-radio-button label="underline">{{
                $t('style.underline')
              }}</el-radio-button>
              <el-radio-button label="line-through">{{
                $t('style.lineThrough')
              }}</el-radio-button>
              <el-radio-button label="overline">{{
                $t('style.overline')
              }}</el-radio-button>
            </el-radio-group>
          </el-popover>
        </div>
        <!-- 边框 -->
        <div class="title">{{ $t('style.border') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.color') }}</span>
            <span
              class="block"
              v-popover:popover3
              :style="{ width: '80px', backgroundColor: style.borderColor }"
            ></span>
            <el-popover ref="popover3" placement="bottom" trigger="hover">
              <Color
                :color="style.borderColor"
                @change="changeBorderColor"
              ></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('style.style') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderDasharray"
              placeholder=""
              @change="update('borderDasharray')"
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
                      style.borderDasharray === item.value
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
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.width') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderWidth"
              placeholder=""
              @change="update('borderWidth')"
            >
              <el-option
                v-for="item in borderWidthList"
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
          <div class="rowItem" v-show="style.shape === 'rectangle'">
            <span class="name">{{ $t('style.borderRadius') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderRadius"
              placeholder=""
              @change="update('borderRadius')"
            >
              <el-option
                v-for="item in borderRadiusList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 背景 -->
        <div class="title">{{ $t('style.background') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.color') }}</span>
            <span
              class="block"
              v-popover:popover4
              :style="{ backgroundColor: style.fillColor }"
            ></span>
            <el-popover ref="popover4" placement="bottom" trigger="hover">
              <Color :color="style.fillColor" @change="changeFillColor"></Color>
            </el-popover>
            <span class="name" style="margin-left: 20px;">{{
              $t('style.gradientStyle')
            }}</span>
            <el-checkbox
              v-model="style.gradientStyle"
              @change="update('gradientStyle')"
            ></el-checkbox>
          </div>
        </div>
        <div class="row" v-if="style.gradientStyle">
          <div class="rowItem">
            <span class="name">{{ $t('style.startColor') }}</span>
            <span
              class="block"
              v-popover:popover6
              :style="{ backgroundColor: style.startColor }"
            ></span>
            <el-popover ref="popover6" placement="bottom" trigger="hover">
              <Color
                :color="style.startColor"
                @change="changeStartColor"
              ></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('style.endColor') }}</span>
            <span
              class="block"
              v-popover:popover7
              :style="{ backgroundColor: style.endColor }"
            ></span>
            <el-popover ref="popover7" placement="bottom" trigger="hover">
              <Color :color="style.endColor" @change="changeEndColor"></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('style.direction') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.linearGradientDir"
              placeholder=""
              @change="update('linearGradientDir')"
            >
              <el-option
                v-for="item in linearGradientDirList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 形状 -->
        <div class="title">{{ $t('style.shape') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.shape') }}</span>
            <el-select
              size="mini"
              style="width: 120px"
              v-model="style.shape"
              placeholder=""
              @change="update('shape')"
            >
              <el-option
                v-for="item in shapeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
                <svg width="60" height="26" style="margin-top: 5px">
                  <path
                    :d="shapeListMap[item.value]"
                    fill="none"
                    :stroke="
                      style.shape === item.value
                        ? '#409eff'
                        : isDark
                        ? '#fff'
                        : '#000'
                    "
                    stroke-width="2"
                  ></path>
                </svg>
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 线条 -->
        <div class="title">{{ $t('style.line') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.color') }}</span>
            <span
              class="block"
              v-popover:popover5
              :style="{ width: '80px', backgroundColor: style.lineColor }"
            ></span>
            <el-popover ref="popover5" placement="bottom" trigger="hover">
              <Color :color="style.lineColor" @change="changeLineColor"></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('style.style') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.lineDasharray"
              placeholder=""
              @change="update('lineDasharray')"
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
                      style.lineDasharray === item.value
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
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.width') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.lineWidth"
              placeholder=""
              @change="update('lineWidth')"
            >
              <el-option
                v-for="item in borderWidthList"
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
          <div class="rowItem">
            <span class="name">{{ $t('style.arrowDir') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.lineMarkerDir"
              placeholder=""
              @change="update('lineMarkerDir')"
            >
              <el-option
                key="start"
                :label="$t('style.arrowDirStart')"
                value="start"
              ></el-option>
              <el-option
                key="end"
                :label="$t('style.arrowDirEnd')"
                value="end"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 流动效果 -->
        <div class="row" v-if="supportLineFlow">
          <div class="rowItem">
            <span class="name">{{ $t('style.openLineFlow') }}</span>
            <el-checkbox
              v-model="style.lineFlow"
              @change="update('lineFlow')"
            ></el-checkbox>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('style.direction') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.lineFlowForward"
              placeholder=""
              @change="update('lineFlowForward')"
            >
              <el-option
                key="1"
                :label="$t('style.forward')"
                :value="true"
              ></el-option>
              <el-option
                key="2"
                :label="$t('style.reverse')"
                :value="false"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="row" v-if="supportLineFlow">
          <div class="rowItem">
            <span class="name">{{ $t('style.lineFlowDuration') }}</span>
            <el-input-number
              v-model="style.lineFlowDuration"
              @change="update('lineFlowDuration')"
              :min="0.1"
              size="mini"
              :step="0.5"
            ></el-input-number>
          </div>
        </div>
        <!-- 节点内边距 -->
        <div class="title noTop">{{ $t('style.nodePadding') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.horizontal') }}</span>
            <el-slider
              style="width: 200px"
              v-model="style.paddingX"
              @change="update('paddingX')"
            ></el-slider>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.vertical') }}</span>
            <el-slider
              style="width: 200px"
              v-model="style.paddingY"
              @change="update('paddingY')"
            ></el-slider>
          </div>
        </div>
        <!-- 节点图片布局 -->
        <div class="title noTop">{{ $t('style.img') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.placement') }}</span>
            <el-radio-group
              v-model="style.imgPlacement"
              size="mini"
              @change="update('imgPlacement')"
            >
              <el-radio-button label="top">{{
                $t('style.top')
              }}</el-radio-button>
              <el-radio-button label="bottom">{{
                $t('style.bottom')
              }}</el-radio-button>
              <el-radio-button label="left">{{
                $t('style.left')
              }}</el-radio-button>
              <el-radio-button label="right">{{
                $t('style.right')
              }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 节点标签布局 -->
        <div class="title noTop">{{ $t('style.tag') }}</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('style.placement') }}</span>
            <el-radio-group
              v-model="style.tagPlacement"
              size="mini"
              @change="update('tagPlacement')"
            >
              <el-radio-button label="right">{{
                $t('style.right')
              }}</el-radio-button>
              <el-radio-button label="bottom">{{
                $t('style.bottom')
              }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="tipBox" v-else>
      <div class="tipIcon iconfont icontianjiazijiedian"></div>
      <div class="tipText">{{ $t('style.selectNodeTip') }}</div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Color from './Color.vue'
import {
  fontFamilyList,
  fontSizeList,
  borderWidthList,
  borderDasharrayList,
  borderRadiusList,
  shapeList,
  shapeListMap,
  linearGradientDirList,
  alignList
} from '@/config'
import { mapState } from 'vuex'

// 节点样式设置
export default {
  components: {
    Sidebar,
    Color
  },
  data() {
    return {
      fontSizeList,
      borderWidthList,
      borderRadiusList,
      activeNodes: [],
      style: {
        shape: '',
        paddingX: 0,
        paddingY: 0,
        color: '',
        fontFamily: '',
        fontSize: '',
        textDecoration: '',
        fontWeight: '',
        fontStyle: '',
        borderWidth: '',
        borderColor: '',
        fillColor: '',
        borderDasharray: '',
        borderRadius: '',
        lineColor: '',
        lineDasharray: '',
        lineWidth: '',
        lineMarkerDir: '',
        gradientStyle: false,
        startColor: '',
        endColor: '',
        linearGradientDir: '',
        lineFlow: false,
        lineFlowForward: true,
        lineFlowDuration: 1,
        textAlign: '',
        imgPlacement: '',
        tagPlacement: ''
      }
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark,
      activeSidebar: state => state.activeSidebar,
      supportLineFlow: state => state.supportLineFlow
    }),
    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    },
    borderDasharrayList() {
      return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
    },
    shapeList() {
      return shapeList[this.$i18n.locale] || shapeList.zh
    },
    shapeListMap() {
      return shapeListMap[this.$i18n.locale] || shapeListMap.zh
    },
    linearGradientDirList() {
      return (
        linearGradientDirList[this.$i18n.locale] || linearGradientDirList.zh
      )
    },
    alignList() {
      return alignList[this.$i18n.locale] || alignList.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'nodeStyle') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.$bus.$on('node_active', this.onNodeActive)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.onNodeActive)
  },
  methods: {
    // 监听节点激活事件
    onNodeActive(...args) {
      this.$nextTick(() => {
        this.activeNodes = [...args[1]]
        this.initNodeStyle()
      })
    },

    // 初始节点样式
    initNodeStyle() {
      if (this.activeNodes.length <= 0) {
        return
      }
      Object.keys(this.style).forEach(item => {
        this.style[item] = this.activeNodes[0].getStyle(item, false)
      })
      this.initLinearGradientDir()
    },

    // 初始化渐变方向样式
    initLinearGradientDir() {
      const startDir = this.activeNodes[0].getStyle('startDir', false)
      const endDir = this.activeNodes[0].getStyle('endDir', false)
      const target = this.linearGradientDirList.find(item => {
        return (
          item.start[0] === startDir[0] &&
          item.start[1] === startDir[1] &&
          item.end[0] === endDir[0] &&
          item.end[1] === endDir[1]
        )
      })
      if (target) {
        this.style.linearGradientDir = target.value
      }
    },

    // 修改样式
    update(prop) {
      if (prop === 'linearGradientDir') {
        const target = this.linearGradientDirList.find(item => {
          return item.value === this.style.linearGradientDir
        })
        this.activeNodes.forEach(node => {
          node.setStyles({
            startDir: [...target.start],
            endDir: [...target.end]
          })
        })
      } else {
        this.activeNodes.forEach(node => {
          node.setStyle(prop, this.style[prop])
        })
      }
    },

    // 切换加粗样式
    toggleFontWeight() {
      if (this.style.fontWeight === 'bold') {
        this.style.fontWeight = 'normal'
      } else {
        this.style.fontWeight = 'bold'
      }
      this.update('fontWeight')
    },

    // 切换字体样式
    toggleFontStyle() {
      if (this.style.fontStyle === 'italic') {
        this.style.fontStyle = 'normal'
      } else {
        this.style.fontStyle = 'italic'
      }
      this.update('fontStyle')
    },

    // 修改字体颜色
    changeFontColor(color) {
      this.style.color = color
      this.update('color')
    },

    // 修改边框颜色
    changeBorderColor(color) {
      this.style.borderColor = color
      this.update('borderColor')
    },

    // 修改线条颜色
    changeLineColor(color) {
      this.style.lineColor = color
      this.update('lineColor')
    },

    // 修改背景颜色
    changeFillColor(color) {
      this.style.fillColor = color
      this.update('fillColor')
    },

    // 切换渐变开始颜色
    changeStartColor(color) {
      this.style.startColor = color
      this.update('startColor')
    },

    // 切换渐变结束颜色
    changeEndColor(color) {
      this.style.endColor = color
      this.update('endColor')
    }
  }
}
</script>

<style lang="less" scoped>
.styleBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &.isDark {
    .sidebarContent {
      .title {
        color: #fff;
      }

      .row {
        .rowItem {
          .name {
            color: hsla(0, 0%, 100%, 0.6);
          }
        }

        .styleBtn {
          background-color: #363b3f;
          color: hsla(0, 0%, 100%, 0.6);
          border-color: hsla(0, 0%, 100%, 0.1);
        }
      }
    }
  }

  .tab {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 20px;
  }
}

.tipBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;

  .tipIcon {
    font-size: 100px;
  }
}

.sidebarContent {
  padding: 20px;
  padding-top: 10px;

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

    .btnGroup {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .rowItem {
      display: flex;
      align-items: center;

      .name {
        font-size: 12px;
        margin-right: 10px;
      }

      .block {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;

        &.disabled {
          background-color: #f5f7fa !important;
          border-color: #e4e7ed !important;
          color: #c0c4cc !important;
          cursor: not-allowed !important;
        }
      }
    }

    .styleBtn {
      position: relative;
      width: 50px;
      height: 30px;
      background: #fff;
      border: 1px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;

      &.actived {
        background-color: #eee;
      }

      &.disabled {
        background-color: #f5f7fa !important;
        border-color: #e4e7ed !important;
        color: #c0c4cc !important;
        cursor: not-allowed !important;
      }

      &.i {
        font-style: italic;
      }

      &.u {
      }

      .colorShow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
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
