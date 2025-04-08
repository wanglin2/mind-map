<template>
  <Sidebar ref="sidebar" :title="$t('nodeOuterFrame.nodeOuterFrameStyle')">
    <div class="sidebarContent" :class="{ isDark: isDark }">
      <div class="panelHeader">
        <span class="name">{{ $t('nodeOuterFrame.outerFrameSetting') }}</span>
        <span class="deleteBtn" @click="deleteOuterFrame">
          {{ $t('nodeOuterFrame.deleteOuterFrame') }}
          <span class="iconfont iconshanchu"></span>
        </span>
      </div>
      <div class="panelBody">
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.boxStyle') }}</span>
            <!-- 宽度 -->
            <el-select
              size="mini"
              style="width: 80px"
              v-model="styleConfig.strokeWidth"
              placeholder=""
              @change="
                value => {
                  updateOuterFrame('strokeWidth', value)
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
            <!-- 实现虚线 -->
            <el-select
              size="mini"
              style="width: 80px;margin-left: 4px;"
              v-model="styleConfig.strokeDasharray"
              placeholder=""
              @change="
                value => {
                  updateOuterFrame('strokeDasharray', value)
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
                      styleConfig.strokeDasharray === item.value
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
            <span class="name">{{ $t('nodeOuterFrame.boxColor') }}</span>
            <span
              class="block"
              v-popover:popover
              :style="{ backgroundColor: styleConfig.strokeColor }"
            ></span>
            <el-popover ref="popover" placement="bottom" trigger="click">
              <Color
                :color="styleConfig.strokeColor"
                @change="
                  color => {
                    updateOuterFrame('strokeColor', color)
                  }
                "
              ></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.radius') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="styleConfig.radius"
              placeholder=""
              @change="
                value => {
                  updateOuterFrame('radius', value)
                }
              "
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
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.fillColor') }}</span>
            <span
              class="block"
              v-popover:popover2
              :style="{ backgroundColor: styleConfig.fill }"
            ></span>
            <el-popover ref="popover2" placement="bottom" trigger="click">
              <Color
                :color="styleConfig.fill"
                @change="
                  color => {
                    updateOuterFrame('fill', color)
                  }
                "
              ></Color>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="panelHeader" style="margin-top: 12px;">
        <span class="name">{{ $t('nodeOuterFrame.outerFrameText') }}</span>
        <span class="deleteBtn" @click="deleteOuterFrameText">
          {{ $t('nodeOuterFrame.deleteOuterFrameText') }}
          <span class="iconfont iconshanchu"></span>
        </span>
      </div>
      <div class="panelBody">
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.fontFamily') }}</span>
            <el-select
              size="mini"
              v-model="styleConfig.fontFamily"
              placeholder=""
              @change="
                value => {
                  updateOuterFrame('fontFamily', value)
                }
              "
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
          <div class="btnGroup">
            <el-tooltip
              :content="$t('nodeOuterFrame.color')"
              placement="bottom"
            >
              <div class="styleBtn" v-popover:popover3>
                A
                <span
                  class="colorShow"
                  :style="{ backgroundColor: styleConfig.color }"
                ></span>
              </div>
            </el-tooltip>
            <el-tooltip
              :content="$t('nodeOuterFrame.fontBold')"
              placement="bottom"
            >
              <div
                class="styleBtn"
                :class="{
                  actived: styleConfig.fontWeight === 'bold'
                }"
                @click="toggleFontWeight"
              >
                B
              </div>
            </el-tooltip>
            <el-tooltip
              :content="$t('nodeOuterFrame.italic')"
              placement="bottom"
            >
              <div
                class="styleBtn i"
                :class="{
                  actived: styleConfig.fontStyle === 'italic'
                }"
                @click="toggleFontStyle"
              >
                I
              </div>
            </el-tooltip>
          </div>
          <el-popover ref="popover3" placement="bottom" trigger="hover">
            <Color
              :color="styleConfig.color"
              @change="
                color => {
                  updateOuterFrame('color', color)
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.lineHeight') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="styleConfig.lineHeight"
              placeholder=""
              @change="
                value => {
                  updateOuterFrame('lineHeight', value)
                }
              "
            >
              <el-option
                v-for="item in lineHeightList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.fontSize') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="styleConfig.fontSize"
              placeholder=""
              @change="
                color => {
                  updateOuterFrame('fontSize', color)
                }
              "
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
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.textFill') }}</span>
            <span
              class="block"
              v-popover:popover4
              :style="{ backgroundColor: styleConfig.textFill }"
            ></span>
            <el-popover ref="popover4" placement="bottom" trigger="click">
              <Color
                :color="styleConfig.textFill"
                @change="
                  color => {
                    updateOuterFrame('textFill', color)
                  }
                "
              ></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.textFillRadius') }}</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="styleConfig.textFillRadius"
              placeholder=""
              @change="
                value => {
                  updateOuterFrame('textFillRadius', value)
                }
              "
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
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.textAlign') }}</span>
            <el-radio-group
              v-model="styleConfig.textAlign"
              size="mini"
              @change="
                value => {
                  updateOuterFrame('textAlign', value)
                }
              "
            >
              <el-radio-button label="left">{{
                $t('nodeOuterFrame.left')
              }}</el-radio-button>
              <el-radio-button label="center">{{
                $t('nodeOuterFrame.center')
              }}</el-radio-button>
              <el-radio-button label="right">{{
                $t('nodeOuterFrame.right')
              }}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.paddingX') }}</span>
            <el-slider
              style="width: 180px"
              v-model="paddingStyle.paddingX"
              @change="
                value => {
                  updatePadding('x', value)
                }
              "
            ></el-slider>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">{{ $t('nodeOuterFrame.paddingY') }}</span>
            <el-slider
              style="width: 180px"
              v-model="paddingStyle.paddingY"
              @change="
                value => {
                  updatePadding('y', value)
                }
              "
            ></el-slider>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Color from './Color.vue'
import { mapState, mapMutations } from 'vuex'
import {
  lineWidthList,
  borderDasharrayList,
  fontFamilyList,
  fontSizeList,
  borderRadiusList,
  lineHeightList
} from '@/config'
import OuterFrame from 'simple-mind-map/src/plugins/OuterFrame'

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
      lineHeightList,
      fontSizeList,
      borderRadiusList,
      styleConfig: {
        ...OuterFrame.defaultStyle
      },
      paddingStyle: {
        paddingX: 0,
        paddingY: 0
      }
    }
  },
  computed: {
    ...mapState({
      activeSidebar: state => state.activeSidebar,
      isDark: state => state.localConfig.isDark,
      borderDasharrayList() {
        return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
      }
    }),

    fontFamilyList() {
      return fontFamilyList[this.$i18n.locale] || fontFamilyList.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'nodeOuterFrameStyle') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.mindMap.on('outer_frame_active', this.onOuterFrameActive)
    this.mindMap.on('outer_frame_delete', this.hide)
    this.mindMap.on('outer_frame_deactivate', this.hide)
  },
  beforeDestroy() {
    this.mindMap.off('outer_frame_active', this.onOuterFrameActive)
    this.mindMap.off('outer_frame_delete', this.hide)
    this.mindMap.off('outer_frame_deactivate', this.hide)
  },
  methods: {
    ...mapMutations(['setActiveSidebar']),

    onOuterFrameActive(el, parentNode, range) {
      // 取范围内第一个节点的外框样式
      const firstNode = parentNode.children[range[0]]
      const firstNodeOuterFrame = firstNode.getData('outerFrame')
      Object.keys(this.styleConfig).forEach(key => {
        if (typeof firstNodeOuterFrame[key] !== 'undefined') {
          this.styleConfig[key] = firstNodeOuterFrame[key]
        } else {
          this.styleConfig[key] = OuterFrame.defaultStyle[key]
        }
      })
      const [pl, pt] = this.styleConfig.textFillPadding
      this.paddingStyle.paddingX = pl
      this.paddingStyle.paddingY = pt
      this.setActiveSidebar('nodeOuterFrameStyle')
    },

    updateOuterFrame(key, val) {
      this.styleConfig[key] = val
      this.mindMap.outerFrame.updateActiveOuterFrame({
        [key]: val
      })
    },

    // 切换加粗样式
    toggleFontWeight() {
      const newValue =
        this.styleConfig.fontWeight === 'bold' ? 'normal' : 'bold'
      this.updateOuterFrame('fontWeight', newValue)
    },

    // 切换字体样式
    toggleFontStyle() {
      const newValue =
        this.styleConfig.fontStyle === 'italic' ? 'normal' : 'italic'
      this.updateOuterFrame('fontStyle', newValue)
    },

    updatePadding(dir, value) {
      const [pl, pt] = this.styleConfig.textFillPadding
      if (dir === 'x') {
        this.updateOuterFrame('textFillPadding', [value, pt, value, pt])
      } else if (dir === 'y') {
        this.updateOuterFrame('textFillPadding', [pl, value, pl, value])
      }
    },

    deleteOuterFrame() {
      this.mindMap.outerFrame.removeActiveOuterFrame()
    },

    deleteOuterFrameText() {
      this.mindMap.outerFrame.removeActiveOuterFrameText()
    },

    hide() {
      if (this.activeSidebar !== 'nodeOuterFrameStyle') {
        return
      }
      this.setActiveSidebar(null)
    }
  }
}
</script>

<style lang="less">
.el-select-dropdown__item.selected {
  .borderLine {
    background-color: #409eff;
  }
}
</style>
<style lang="less" scoped>
.sidebarContent {
  padding: 20px;

  &.isDark {
    .panelHeader {
      .name {
        color: #fff;
      }
    }

    .panelBody {
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

  .btn {
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .panelHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .name {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(26, 26, 26, 0.9);
    }

    .deleteBtn {
      display: flex;
      align-items: center;
      color: #909090;
      font-size: 14px;
      cursor: pointer;
      user-select: none;

      .iconfont {
        margin-left: 2px;
        font-size: 14px;
      }
    }
  }

  .panelBody {
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      &:last-of-type {
        margin-bottom: 0px;
      }

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
          white-space: nowrap;
        }

        .block {
          display: inline-block;
          width: 20px;
          height: 20px;
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

        &.disabled {
          background-color: #f5f7fa !important;
          border-color: #e4e7ed !important;
          color: #c0c4cc !important;
          cursor: not-allowed !important;
        }

        &.i {
          font-style: italic;
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
