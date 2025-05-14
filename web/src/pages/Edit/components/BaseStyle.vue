<template>
  <Sidebar ref="sidebar" :title="$t('baseStyle.title')">
    <div
      class="sidebarContent customScrollbar"
      :class="{ isDark: isDark }"
      v-if="data"
    >
      <!-- 背景 -->
      <div class="title noTop">{{ $t('baseStyle.background') }}</div>
      <div class="row">
        <el-tabs class="tab" v-model="activeTab">
          <el-tab-pane :label="$t('baseStyle.color')" name="color">
            <Color
              :color="style.backgroundColor"
              @change="
                color => {
                  update('backgroundColor', color)
                }
              "
            ></Color>
          </el-tab-pane>
          <el-tab-pane :label="$t('baseStyle.image')" name="image">
            <ImgUpload
              class="imgUpload"
              v-model="style.backgroundImage"
              @change="
                img => {
                  update('backgroundImage', img)
                }
              "
            ></ImgUpload>
            <!-- 图片重复方式 -->
            <div class="rowItem">
              <span class="name">{{ $t('baseStyle.imageRepeat') }}</span>
              <el-select
                size="mini"
                style="width: 120px"
                v-model="style.backgroundRepeat"
                placeholder=""
                @change="
                  value => {
                    update('backgroundRepeat', value)
                  }
                "
              >
                <el-option
                  v-for="item in backgroundRepeatList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- 图片位置 -->
            <div class="rowItem">
              <span class="name">{{ $t('baseStyle.imagePosition') }}</span>
              <el-select
                size="mini"
                style="width: 120px"
                v-model="style.backgroundPosition"
                placeholder=""
                @change="
                  value => {
                    update('backgroundPosition', value)
                  }
                "
              >
                <el-option
                  v-for="item in backgroundPositionList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- 图片大小 -->
            <div class="rowItem">
              <span class="name">{{ $t('baseStyle.imageSize') }}</span>
              <el-select
                size="mini"
                style="width: 120px"
                v-model="style.backgroundSize"
                placeholder=""
                @change="
                  value => {
                    update('backgroundSize', value)
                  }
                "
              >
                <el-option
                  v-for="item in backgroundSizeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <!-- 内置背景图片 -->
            <div
              class="rowItem spaceBetween"
              style="margin-top: 8px; margin-bottom: 8px;"
              v-if="bgList.length > 0"
            >
              <div class="name">{{ $t('baseStyle.builtInBackgroundImage') }}</div>
              <div
                class="iconBtn el-icon-arrow-down"
                :class="{ top: !bgListExpand }"
                @click="bgListExpand = !bgListExpand"
              ></div>
            </div>
            <div class="bgList" :class="{ expand: bgListExpand }">
              <div
                class="bgItem"
                v-for="(item, index) in bgList"
                :key="index"
                :class="{active: style.backgroundImage === item}"
                @click="useBg(item)"
              >
                <img :src="item" alt="" />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 连线 -->
      <div class="title">{{ $t('baseStyle.line') }}</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.color') }}</span>
          <span
            class="block"
            v-popover:popover
            :style="{ backgroundColor: style.lineColor }"
          ></span>
          <el-popover ref="popover" placement="bottom" trigger="click">
            <Color
              :color="style.lineColor"
              @change="
                color => {
                  update('lineColor', color)
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.width') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.lineWidth"
            placeholder=""
            @change="
              value => {
                update('lineWidth', value)
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
        <!-- 线宽 -->
        <div class="rowItem" v-if="lineStyleListShow.length > 1">
          <span class="name">{{ $t('baseStyle.style') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.lineStyle"
            placeholder=""
            @change="
              value => {
                update('lineStyle', value)
              }
            "
          >
            <el-option
              v-for="item in lineStyleListShow"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              class="lineStyleOption"
              :class="{
                isDark: isDark,
                isSelected: style.lineStyle === item.value
              }"
              v-html="lineStyleMap[item.value]"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 根节点连线样式 -->
        <div
          class="rowItem"
          v-if="
            style.lineStyle === 'curve' && showRootLineKeepSameInCurveLayouts
          "
        >
          <span class="name">{{ $t('baseStyle.rootStyle') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.rootLineKeepSameInCurve"
            placeholder=""
            @change="
              value => {
                update('rootLineKeepSameInCurve', value)
              }
            "
          >
            <el-option
              v-for="item in rootLineKeepSameInCurveList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="rowItem" v-if="showLineRadius">
          <!-- 连线圆角大小 -->
          <span class="name">{{ $t('baseStyle.lineRadius') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.lineRadius"
            placeholder=""
            @change="
              value => {
                update('lineRadius', value)
              }
            "
          >
            <el-option
              v-for="item in [0, 2, 5, 7, 10, 12, 15]"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <!-- 根节点连线起始位置 -->
        <div
          class="rowItem"
          v-if="
            style.lineStyle === 'curve' && showRootLineKeepSameInCurveLayouts
          "
        >
          <span class="name">{{ $t('baseStyle.rootLineStartPos') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.rootLineStartPositionKeepSameInCurve"
            placeholder=""
            @change="
              value => {
                update('rootLineStartPositionKeepSameInCurve', value)
              }
            "
          >
            <el-option
              key="center"
              :label="$t('baseStyle.center')"
              :value="false"
            >
            </el-option>
            <el-option key="right" :label="$t('baseStyle.edge')" :value="true">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <el-checkbox
            v-model="style.showLineMarker"
            @change="
              value => {
                update('showLineMarker', value)
              }
            "
            >{{ $t('baseStyle.showArrow') }}</el-checkbox
          >
        </div>
      </div>
      <!-- 彩虹线条 -->
      <div class="title">{{ $t('baseStyle.rainbowLines') }}</div>
      <div class="row">
        <div class="rowItem">
          <el-popover
            placement="right"
            trigger="click"
            v-model="rainbowLinesPopoverVisible"
          >
            <div class="rainbowLinesOptionsBox" :class="{ isDark: isDark }">
              <div
                class="optionItem"
                v-for="item in rainbowLinesOptions"
                :key="item.value"
              >
                <div
                  class="colorsBar"
                  v-if="item.list"
                  @click="updateRainbowLinesConfig(item)"
                >
                  <span
                    class="colorItem"
                    v-for="color in item.list"
                    :style="{ backgroundColor: color }"
                  ></span>
                </div>
                <span v-else @click="updateRainbowLinesConfig(item)">{{
                  $t('baseStyle.notUseRainbowLines')
                }}</span>
              </div>
            </div>
            <div slot="reference" class="curRainbowLine">
              <div class="colorsBar" v-if="curRainbowLineColorList">
                <span
                  class="colorItem"
                  v-for="color in curRainbowLineColorList"
                  :style="{ backgroundColor: color }"
                ></span>
              </div>
              <span v-else>{{ $t('baseStyle.notUseRainbowLines') }}</span>
            </div>
          </el-popover>
        </div>
      </div>
      <!-- 概要连线 -->
      <div class="title">{{ $t('baseStyle.lineOfOutline') }}</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.color') }}</span>
          <span
            class="block"
            v-popover:popover2
            :style="{ backgroundColor: style.generalizationLineColor }"
          ></span>
          <el-popover ref="popover2" placement="bottom" trigger="click">
            <Color
              :color="style.generalizationLineColor"
              @change="
                color => {
                  update('generalizationLineColor', color)
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.width') }}</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.generalizationLineWidth"
            placeholder=""
            @change="
              value => {
                update('generalizationLineWidth', value)
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
      <!-- 关联线 -->
      <div class="title">{{ $t('baseStyle.associativeLine') }}</div>
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
      <div class="title">{{ $t('baseStyle.associativeLineText') }}</div>
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
      <!-- 节点边框风格 -->
      <template v-if="showNodeUseLineStyle">
        <div class="title">{{ $t('baseStyle.nodeBorderType') }}</div>
        <div class="row">
          <div class="rowItem">
            <el-checkbox
              v-model="style.nodeUseLineStyle"
              @change="
                value => {
                  update('nodeUseLineStyle', value)
                }
              "
              >{{ $t('baseStyle.nodeUseLineStyle') }}</el-checkbox
            >
          </div>
        </div>
      </template>
      <!-- 内边距 -->
      <div class="title">{{ $t('baseStyle.nodePadding') }}</div>
      <div class="row noBottom">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.horizontal') }}</span>
          <el-slider
            style="width: 200px"
            v-model="style.paddingX"
            @change="
              value => {
                update('paddingX', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.vertical') }}</span>
          <el-slider
            style="width: 200px"
            v-model="style.paddingY"
            @change="
              value => {
                update('paddingY', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 图片 -->
      <div class="title">{{ $t('baseStyle.image') }}</div>
      <div class="row noBottom">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.maximumWidth') }}</span>
          <el-slider
            style="width: 140px"
            v-model="style.imgMaxWidth"
            :min="10"
            :max="500"
            @change="
              value => {
                update('imgMaxWidth', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.maximumHeight') }}</span>
          <el-slider
            style="width: 140px"
            v-model="style.imgMaxHeight"
            :min="10"
            :max="500"
            @change="
              value => {
                update('imgMaxHeight', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 图标 -->
      <div class="title">{{ $t('baseStyle.icon') }}</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.size') }}</span>
          <el-slider
            style="width: 200px"
            v-model="style.iconSize"
            :min="12"
            :max="50"
            @change="
              value => {
                update('iconSize', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 二级节点外边距 -->
      <div class="title">{{ $t('baseStyle.nodeMargin') }}</div>
      <div class="row column noBottom">
        <el-tabs
          class="tab"
          v-model="marginActiveTab"
          @tab-click="initMarginStyle"
        >
          <el-tab-pane
            :label="$t('baseStyle.level2Node')"
            name="second"
          ></el-tab-pane>
          <el-tab-pane
            :label="$t('baseStyle.belowLevel2Node')"
            name="node"
          ></el-tab-pane>
        </el-tabs>
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.horizontal') }}</span>
          <el-slider
            :max="200"
            style="width: 200px"
            v-model="style.marginX"
            @change="
              value => {
                updateMargin('marginX', value)
              }
            "
          ></el-slider>
        </div>
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.vertical') }}</span>
          <el-slider
            :max="200"
            style="width: 200px"
            v-model="style.marginY"
            @change="
              value => {
                updateMargin('marginY', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 外框内边距 -->
      <div class="title">{{ $t('baseStyle.outerFramePadding') }}</div>
      <div class="row noBottom">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.horizontal') }}</span>
          <el-slider
            style="width: 200px"
            v-model="outerFramePadding.outerFramePaddingX"
            @change="
              value => {
                updateOuterFramePadding('outerFramePaddingX', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.vertical') }}</span>
          <el-slider
            style="width: 200px"
            v-model="outerFramePadding.outerFramePaddingY"
            @change="
              value => {
                updateOuterFramePadding('outerFramePaddingY', value)
              }
            "
          ></el-slider>
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
  lineStyleList,
  backgroundRepeatList,
  backgroundPositionList,
  backgroundSizeList,
  fontFamilyList,
  fontSizeList,
  rootLineKeepSameInCurveList,
  lineStyleMap,
  borderDasharrayList
} from '@/config'
import ImgUpload from '@/components/ImgUpload/index.vue'
import { storeData, storeConfig } from '@/api'
import { mapState } from 'vuex'
import {
  supportLineStyleLayoutsMap,
  supportLineRadiusLayouts,
  supportNodeUseLineStyleLayouts,
  supportRootLineKeepSameInCurveLayouts,
  rainbowLinesOptions
} from '@/config/constant'

// 基础样式
export default {
  components: {
    Sidebar,
    Color,
    ImgUpload
  },
  props: {
    data: {
      type: [Object, null]
    },
    configData: {
      type: Object
    },
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      rainbowLinesOptions,
      lineWidthList,
      fontSizeList,
      lineStyleMap,
      activeTab: 'color',
      marginActiveTab: 'second',
      style: {
        backgroundColor: '',
        lineColor: '',
        lineWidth: '',
        lineStyle: '',
        showLineMarker: '',
        rootLineKeepSameInCurve: '',
        rootLineStartPositionKeepSameInCurve: '',
        lineRadius: 0,
        lineFlow: false,
        lineFlowForward: true,
        lineFlowDuration: 1,
        generalizationLineWidth: '',
        generalizationLineColor: '',
        associativeLineColor: '',
        associativeLineWidth: 0,
        associativeLineActiveWidth: 0,
        associativeLineDasharray: '',
        associativeLineActiveColor: '',
        associativeLineTextFontSize: 0,
        associativeLineTextColor: '',
        associativeLineTextFontFamily: '',
        paddingX: 0,
        paddingY: 0,
        imgMaxWidth: 0,
        imgMaxHeight: 0,
        iconSize: 0,
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '',
        backgroundSize: '',
        marginX: 0,
        marginY: 0,
        nodeUseLineStyle: false
      },
      rainbowLinesPopoverVisible: false,
      curRainbowLineColorList: null,
      currentLayout: '', // 当前结构
      outerFramePadding: {
        outerFramePaddingX: 0,
        outerFramePaddingY: 0
      },
      bgListExpand: true
    }
  },
  computed: {
    ...mapState({
      activeSidebar: state => state.activeSidebar,
      localConfig: state => state.localConfig,
      isDark: state => state.localConfig.isDark,
      bgList: state => state.bgList
    }),
    lineStyleList() {
      return lineStyleList[this.$i18n.locale] || lineStyleList.zh
    },
    rootLineKeepSameInCurveList() {
      return (
        rootLineKeepSameInCurveList[this.$i18n.locale] ||
        rootLineKeepSameInCurveList.zh
      )
    },
    backgroundRepeatList() {
      return backgroundRepeatList[this.$i18n.locale] || backgroundRepeatList.zh
    },
    backgroundPositionList() {
      return (
        backgroundPositionList[this.$i18n.locale] || backgroundPositionList.zh
      )
    },
    backgroundSizeList() {
      return backgroundSizeList[this.$i18n.locale] || backgroundSizeList.zh
    },
    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    },
    showNodeUseLineStyle() {
      return supportNodeUseLineStyleLayouts.includes(this.currentLayout)
    },
    showLineRadius() {
      return (
        this.style.lineStyle === 'straight' &&
        supportLineRadiusLayouts.includes(this.currentLayout)
      )
    },
    lineStyleListShow() {
      const res = []
      this.lineStyleList.forEach(item => {
        const list = supportLineStyleLayoutsMap[item.value]
        if (list) {
          if (list.includes(this.currentLayout)) {
            res.push(item)
          }
        } else {
          res.push(item)
        }
      })
      return res
    },
    showRootLineKeepSameInCurveLayouts() {
      return supportRootLineKeepSameInCurveLayouts.includes(this.currentLayout)
    },
    borderDasharrayList() {
      return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'baseStyle') {
        this.$refs.sidebar.show = true
        this.initStyle()
        this.initRainbowLines()
        this.initOuterFramePadding()
        this.currentLayout = this.mindMap.getLayout()
      } else {
        this.$refs.sidebar.show = false
      }
    },
    lineStyleListShow: {
      deep: true,
      handler() {
        const has = this.lineStyleListShow.find(item => {
          return item.value === this.style.lineStyle
        })
        if (!has) {
          this.style.lineStyle = this.lineStyleListShow[0].value
        }
      }
    }
  },
  created() {
    this.$bus.$on('setData', this.onSetData)
  },
  beforeDestroy() {
    this.$bus.$off('setData', this.onSetData)
  },
  methods: {
    onSetData() {
      if (this.activeSidebar !== 'baseStyle') return
      setTimeout(() => {
        this.initStyle()
      }, 0)
    },

    // 初始样式
    initStyle() {
      Object.keys(this.style).forEach(key => {
        this.style[key] = this.mindMap.getThemeConfig(key)
        if (key === 'backgroundImage' && this.style[key] === 'none') {
          this.style[key] = ''
        }
      })
      this.initMarginStyle()
    },

    // 初始化彩虹线条配置
    initRainbowLines() {
      const config = this.mindMap.getConfig('rainbowLinesConfig') || {}
      this.curRainbowLineColorList = config.open
        ? this.mindMap.rainbowLines
          ? this.mindMap.rainbowLines.getColorsList()
          : null
        : null
    },

    // 外框
    initOuterFramePadding() {
      this.outerFramePadding.outerFramePaddingX = this.mindMap.getConfig(
        'outerFramePaddingX'
      )
      this.outerFramePadding.outerFramePaddingY = this.mindMap.getConfig(
        'outerFramePaddingX'
      )
    },

    // margin初始值
    initMarginStyle() {
      ;['marginX', 'marginY'].forEach(key => {
        this.style[key] = this.mindMap.getThemeConfig()[this.marginActiveTab][
          key
        ]
      })
    },

    // 更新配置
    update(key, value) {
      if (key === 'backgroundImage' && value === 'none') {
        this.style[key] = ''
      } else {
        this.style[key] = value
      }
      this.data.theme.config[key] = value
      this.$bus.$emit('showLoading')
      this.mindMap.setThemeConfig(this.data.theme.config)
      storeData({
        theme: {
          template: this.mindMap.getTheme(),
          config: this.data.theme.config
        }
      })
    },

    // 更新彩虹线条配置
    updateRainbowLinesConfig(item) {
      this.rainbowLinesPopoverVisible = false
      this.curRainbowLineColorList = item.list || null
      let newConfig = null
      if (item.list) {
        newConfig = {
          open: true,
          colorsList: item.list
        }
      } else {
        newConfig = {
          open: false
        }
      }
      this.configData.rainbowLinesConfig = newConfig
      this.mindMap.rainbowLines.updateRainLinesConfig(newConfig)
      storeConfig(this.configData)
    },

    // 更新外框
    updateOuterFramePadding(prop, value) {
      this.outerFramePadding[prop] = value
      this.configData[prop] = value
      this.mindMap.updateConfig({
        [prop]: value
      })
      storeConfig(this.configData)
      this.mindMap.render()
    },

    // 设置margin
    updateMargin(type, value) {
      this.style[type] = value
      if (!this.data.theme.config[this.marginActiveTab]) {
        this.data.theme.config[this.marginActiveTab] = {}
      }
      this.data.theme.config[this.marginActiveTab][type] = value
      this.mindMap.setThemeConfig(this.data.theme.config)
      storeData({
        theme: {
          template: this.mindMap.getTheme(),
          config: this.data.theme.config
        }
      })
    },

    useBg(bg) {
      this.update('backgroundImage', bg)
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
        .name,
        .curRainbowLine {
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
    margin-top: 35px;

    &.noTop {
      margin-top: 0;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &.noBottom {
      margin-bottom: 0;
    }

    &.column {
      flex-direction: column;
    }

    .tab {
      width: 100%;
    }

    .imgUpload {
      margin-bottom: 5px;
    }

    .btnGroup {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .rowItem {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      &.spaceBetween {
        justify-content: space-between;
      }

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

      .curRainbowLine {
        height: 24px;
        border: 1px solid #dcdfe6;
        font-size: 12px;
        width: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .iconBtn {
        cursor: pointer;
        transition: all 0.3s;

        &.top {
          transform: rotateZ(-180deg);
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

      .colorShow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
      }
    }

    .bgList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 75px;

      &.expand {
        height: max-content;
      }

      .bgItem {
        width: 120px;
        height: 73px;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
        overflow: hidden;
        padding: 5px;
        margin-bottom: 8px;
        cursor: pointer;

        &.active {
          border-color: #409eff;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
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

.lineStyleOption {
  &.isDark {
    svg {
      path {
        stroke: #fff;
      }
    }
  }

  &.isSelected {
    svg {
      path {
        stroke: #409eff;
      }
    }
  }

  svg {
    margin-top: 4px;

    path {
      stroke: #000;
    }
  }
}

.rainbowLinesOptionsBox {
  width: 200px;

  &.isDark {
    .optionItem {
      color: hsla(0, 0%, 100%, 0.6);

      &:hover {
        background-color: hsla(0, 0%, 100%, 0.05);
      }
    }
  }

  .optionItem {
    width: 100%;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.colorsBar {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  .colorItem {
    flex: 1;
    height: 15px;
  }
}
</style>
