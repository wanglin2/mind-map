<template>
  <Sidebar ref="sidebar" :title="$t('baseStyle.title')">
    <div class="sidebarContent" :class="{ isDark: isDark }" v-if="data">
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
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 连线 -->
      <div class="title noTop">{{ $t('baseStyle.line') }}</div>
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
        <div class="rowItem">
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
              v-for="item in lineStyleList"
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
        <div class="rowItem" v-if="style.lineStyle === 'curve'">
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
      </div>
      <!-- 概要连线 -->
      <div class="title noTop">{{ $t('baseStyle.lineOfOutline') }}</div>
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
      <!-- 节点边框风格 -->
      <div class="title noTop">{{ $t('baseStyle.nodeBorderType') }}</div>
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
      <!-- 内边距 -->
      <div class="title noTop">{{ $t('baseStyle.nodePadding') }}</div>
      <div class="row">
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
      <div class="title noTop">{{ $t('baseStyle.image') }}</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.maximumWidth') }}</span>
          <el-slider
            style="width: 140px"
            v-model="style.imgMaxWidth"
            :min="10"
            :max="300"
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
            :max="300"
            @change="
              value => {
                update('imgMaxHeight', value)
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 图标 -->
      <div class="title noTop">{{ $t('baseStyle.icon') }}</div>
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
      <div class="title noTop">{{ $t('baseStyle.nodeMargin') }}</div>
      <div class="row column">
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
      <!-- 水印 -->
      <div class="title noTop">{{ $t('baseStyle.watermark') }}</div>
      <div class="row">
        <!-- 是否显示水印 -->
        <div class="rowItem">
          <el-checkbox
            v-model="watermarkConfig.show"
            @change="watermarkShowChange"
            >{{ $t('baseStyle.showWatermark') }}</el-checkbox
          >
        </div>
      </div>
      <template v-if="watermarkConfig.show">
        <!-- 水印文字 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('baseStyle.watermarkText') }}</span>
            <el-input
              v-model="watermarkConfig.text"
              size="small"
              @change="updateWatermarkConfig"
              @keydown.native.stop
            ></el-input>
          </div>
        </div>
        <!-- 水印文字颜色 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('baseStyle.watermarkTextColor') }}</span>
            <span
              class="block"
              v-popover:popover3
              :style="{ backgroundColor: watermarkConfig.textStyle.color }"
            ></span>
            <el-popover ref="popover3" placement="bottom" trigger="click">
              <Color
                :color="watermarkConfig.textStyle.color"
                @change="
                  value => {
                    watermarkConfig.textStyle.color = value
                    updateWatermarkConfig()
                  }
                "
              ></Color>
            </el-popover>
          </div>
        </div>
        <!-- 水印文字透明度 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('baseStyle.watermarkTextOpacity') }}</span>
            <el-slider
              v-model="watermarkConfig.textStyle.opacity"
              style="width: 170px"
              :min="0"
              :max="1"
              :step="0.1"
              @change="updateWatermarkConfig"
            ></el-slider>
          </div>
        </div>
        <!-- 水印文字字号 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{
              $t('baseStyle.watermarkTextFontSize')
            }}</span>
            <el-input-number
              v-model="watermarkConfig.textStyle.fontSize"
              size="small"
              :min="0"
              :max="50"
              :step="1"
              @change="updateWatermarkConfig"
              @keydown.native.stop
            ></el-input-number>
          </div>
        </div>
        <!-- 旋转角度 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('baseStyle.watermarkAngle') }}</span>
            <el-input-number
              v-model="watermarkConfig.angle"
              size="small"
              :min="0"
              :max="90"
              :step="10"
              @change="updateWatermarkConfig"
              @keydown.native.stop
            ></el-input-number>
          </div>
        </div>
        <!-- 水印行间距 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('baseStyle.watermarkLineSpacing') }}</span>
            <el-input-number
              v-model="watermarkConfig.lineSpacing"
              size="small"
              :step="10"
              @change="updateWatermarkConfig"
              @keydown.native.stop
            ></el-input-number>
          </div>
        </div>
        <!-- 水印文字间距 -->
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('baseStyle.watermarkTextSpacing') }}</span>
            <el-input-number
              v-model="watermarkConfig.textSpacing"
              size="small"
              :step="10"
              @change="updateWatermarkConfig"
              @keydown.native.stop
            ></el-input-number>
          </div>
        </div>
      </template>
      <!-- 其他配置 -->
      <div class="title noTop">{{ $t('baseStyle.otherConfig') }}</div>
      <!-- 配置开启自由拖拽 -->
      <div class="row">
        <div class="rowItem">
          <el-checkbox
            v-model="config.enableFreeDrag"
            @change="
              value => {
                updateOtherConfig('enableFreeDrag', value)
              }
            "
            >{{ $t('baseStyle.enableFreeDrag') }}</el-checkbox
          >
        </div>
      </div>
      <!-- 配置是否启用富文本编辑 -->
      <div class="row">
        <div class="rowItem">
          <el-checkbox
            v-model="enableNodeRichText"
            @change="enableNodeRichTextChange"
            >{{ $t('baseStyle.isEnableNodeRichText') }}</el-checkbox
          >
        </div>
      </div>
      <!-- 配置鼠标滚轮行为 -->
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.mousewheelAction') }}</span>
          <el-select
            size="mini"
            style="width: 120px"
            v-model="config.mousewheelAction"
            placeholder=""
            @change="
              value => {
                updateOtherConfig('mousewheelAction', value)
              }
            "
          >
            <el-option
              :label="$t('baseStyle.zoomView')"
              value="zoom"
            ></el-option>
            <el-option
              :label="$t('baseStyle.moveViewUpDown')"
              value="move"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 配置鼠标缩放行为 -->
      <div class="row" v-if="config.mousewheelAction === 'zoom'">
        <div class="rowItem">
          <span class="name">{{
            $t('baseStyle.mousewheelZoomActionReverse')
          }}</span>
          <el-select
            size="mini"
            style="width: 120px"
            v-model="config.mousewheelZoomActionReverse"
            placeholder=""
            @change="
              value => {
                updateOtherConfig('mousewheelZoomActionReverse', value)
              }
            "
          >
            <el-option
              :label="$t('baseStyle.mousewheelZoomActionReverse1')"
              :value="false"
            ></el-option>
            <el-option
              :label="$t('baseStyle.mousewheelZoomActionReverse2')"
              :value="true"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 配置创建新节点时的行为 -->
      <div class="row">
        <div class="rowItem">
          <span class="name">{{ $t('baseStyle.createNewNodeBehavior') }}</span>
          <el-select
            size="mini"
            style="width: 120px"
            v-model="config.createNewNodeBehavior"
            placeholder=""
            @change="
              value => {
                updateOtherConfig('createNewNodeBehavior', value)
              }
            "
          >
            <el-option
              :label="$t('baseStyle.default')"
              value="default"
            ></el-option>
            <el-option
              :label="$t('baseStyle.notActive')"
              value="notActive"
            ></el-option>
            <el-option
              :label="$t('baseStyle.activeOnly')"
              value="activeOnly"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 是否显示滚动条 -->
      <div class="row">
        <div class="rowItem">
          <el-checkbox
            v-model="localConfigs.isShowScrollbar"
            @change="updateLocalConfig('isShowScrollbar', $event)"
            >{{ $t('baseStyle.isShowScrollbar') }}</el-checkbox
          >
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import Color from './Color'
import {
  lineWidthList,
  lineStyleList,
  backgroundRepeatList,
  backgroundPositionList,
  backgroundSizeList,
  fontFamilyList,
  fontSizeList,
  rootLineKeepSameInCurveList,
  lineStyleMap
} from '@/config'
import ImgUpload from '@/components/ImgUpload'
import { storeConfig } from '@/api'
import { mapState, mapMutations } from 'vuex'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:52:56
 * @Desc: 基础样式
 */
export default {
  name: 'BaseStyle',
  components: {
    Sidebar,
    Color,
    ImgUpload
  },
  props: {
    data: {
      type: [Object, null],
      default: null
    },
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      lineWidthList,
      fontSizeList,
      activeTab: 'color',
      marginActiveTab: 'second',
      style: {
        backgroundColor: '',
        lineColor: '',
        lineWidth: '',
        lineStyle: '',
        rootLineKeepSameInCurve: '',
        generalizationLineWidth: '',
        generalizationLineColor: '',
        associativeLineColor: '',
        associativeLineWidth: 0,
        associativeLineActiveWidth: 0,
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
      config: {
        enableFreeDrag: false,
        mousewheelAction: 'zoom',
        mousewheelZoomActionReverse: false,
        createNewNodeBehavior: 'default'
      },
      watermarkConfig: {
        show: false,
        text: '',
        lineSpacing: 100,
        textSpacing: 100,
        angle: 30,
        textStyle: {
          color: '',
          opacity: 0,
          fontSize: 1
        }
      },
      updateWatermarkTimer: null,
      enableNodeRichText: true,
      localConfigs: {
        isShowScrollbar: false
      }
    }
  },
  computed: {
    ...mapState(['activeSidebar', 'localConfig', 'isDark']),

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
    lineStyleMap() {
      return lineStyleMap[this.$i18n.locale] || lineStyleMap.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'baseStyle') {
        this.$refs.sidebar.show = true
        this.initStyle()
        this.initConfig()
        this.initWatermark()
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.initLoacalConfig()
    this.$bus.$on('setData', this.onSetData)
  },
  beforeDestroy() {
    this.$bus.$off('setData', this.onSetData)
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

    onSetData() {
      if (this.activeSidebar !== 'baseStyle') return
      setTimeout(() => {
        this.initStyle()
      }, 0)
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 14:02:12
     * @Desc: 初始样式
     */
    initStyle() {
      ;[
        'backgroundColor',
        'lineWidth',
        'lineStyle',
        'rootLineKeepSameInCurve',
        'lineColor',
        'generalizationLineWidth',
        'generalizationLineColor',
        'associativeLineColor',
        'associativeLineWidth',
        'associativeLineActiveWidth',
        'associativeLineActiveColor',
        'associativeLineTextFontSize',
        'associativeLineTextColor',
        'associativeLineTextFontFamily',
        'paddingX',
        'paddingY',
        'imgMaxWidth',
        'imgMaxHeight',
        'iconSize',
        'backgroundImage',
        'backgroundRepeat',
        'backgroundPosition',
        'backgroundSize',
        'nodeUseLineStyle'
      ].forEach(key => {
        this.style[key] = this.mindMap.getThemeConfig(key)
        if (key === 'backgroundImage' && this.style[key] === 'none') {
          this.style[key] = ''
        }
      })
      this.initMarginStyle()
    },

    // 初始化其他配置
    initConfig() {
      ;[
        'enableFreeDrag',
        'mousewheelAction',
        'mousewheelZoomActionReverse',
        'createNewNodeBehavior'
      ].forEach(key => {
        this.config[key] = this.mindMap.getConfig(key)
      })
    },

    // 初始化本地配置
    initLoacalConfig() {
      this.enableNodeRichText = this.localConfig.openNodeRichText
      this.mousewheelAction = this.localConfig.mousewheelAction
      this.mousewheelZoomActionReverse = this.localConfig.mousewheelZoomActionReverse
      ;['isShowScrollbar'].forEach(key => {
        this.localConfigs[key] = this.localConfig[key]
      })
    },

    // 初始化水印配置
    initWatermark() {
      let config = this.mindMap.getConfig('watermarkConfig')
      ;['text', 'lineSpacing', 'textSpacing', 'angle'].forEach(key => {
        this.watermarkConfig[key] = config[key]
      })
      this.watermarkConfig.show = !!config.text
      this.watermarkConfig.textStyle = { ...config.textStyle }
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-03 22:27:32
     * @Desc: margin初始值
     */
    initMarginStyle() {
      ;['marginX', 'marginY'].forEach(key => {
        this.style[key] = this.mindMap.getThemeConfig()[this.marginActiveTab][
          key
        ]
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 14:05:40
     * @Desc: 更新配置
     */
    update(key, value) {
      if (key === 'backgroundImage' && value === 'none') {
        this.style[key] = ''
      } else {
        this.style[key] = value
      }
      this.data.theme.config[key] = value
      this.$bus.$emit('showLoading')
      this.mindMap.setThemeConfig(this.data.theme.config)
      storeConfig({
        theme: {
          template: this.mindMap.getTheme(),
          config: this.data.theme.config
        }
      })
    },

    // 更新其他配置
    updateOtherConfig(key, value) {
      this.mindMap.updateConfig({
        [key]: value
      })
      this.data.config = this.data.config || {}
      this.data.config[key] = value
      storeConfig({
        config: this.data.config
      })
    },

    // 更新水印配置
    updateWatermarkConfig() {
      clearTimeout(this.updateWatermarkTimer)
      this.updateWatermarkTimer = setTimeout(() => {
        let { show, ...config } = this.watermarkConfig
        this.mindMap.watermark.updateWatermark({
          ...config
        })
        this.data.config = this.data.config || {}
        this.data.config.watermarkConfig = this.mindMap.getConfig(
          'watermarkConfig'
        )
        storeConfig({
          config: this.data.config
        })
      }, 300)
    },

    // 设置margin
    updateMargin(type, value) {
      this.style[type] = value
      if (!this.data.theme.config[this.marginActiveTab]) {
        this.data.theme.config[this.marginActiveTab] = {}
      }
      this.data.theme.config[this.marginActiveTab][type] = value
      this.mindMap.setThemeConfig(this.data.theme.config)
      storeConfig({
        theme: {
          template: this.mindMap.getTheme(),
          config: this.data.theme.config
        }
      })
    },

    // 切换显示水印与否
    watermarkShowChange(value) {
      if (value) {
        let text =
          this.watermarkConfig.text || this.$t('baseStyle.watermarkDefaultText')
        this.watermarkConfig.text = text
      } else {
        this.watermarkConfig.text = ''
      }
      this.updateWatermarkConfig()
    },

    // 切换是否开启节点富文本编辑
    enableNodeRichTextChange(e) {
      this.mindMap.renderer.textEdit.hideEditTextBox()
      this.setLocalConfig({
        openNodeRichText: e
      })
    },

    // 本地配置
    updateLocalConfig(key, value) {
      this.setLocalConfig({
        [key]: value
      })
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
</style>
