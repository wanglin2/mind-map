<template>
  <div
    class="nodeOuterFrameContainer"
    ref="elRef"
    :style="position"
    v-show="show"
    :class="{ isDark: isDark }"
  >
    <div class="btn" @click="showPanel = !showPanel">
      <span class="iconfont iconjingzi"></span>
    </div>
    <div class="panel" v-if="showPanel">
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
    </div>
  </div>
</template>

<script>
import Color from './Color.vue'
import { mapState } from 'vuex'
import { lineWidthList, borderDasharrayList } from '@/config'

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
      lineWidthList,
      show: false,
      showPanel: false,
      position: {
        left: 0,
        top: 0
      },
      styleConfig: {
        radius: 5,
        strokeWidth: 2,
        strokeColor: '#0984e3',
        strokeDasharray: '5,5',
        fill: 'rgba(9,132,227,0.05)'
      }
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark,
      borderDasharrayList() {
        return borderDasharrayList[this.$i18n.locale] || borderDasharrayList.zh
      }
    })
  },
  created() {
    this.mindMap.on('outer_frame_active', this.onOuterFrameActive)
    this.mindMap.on('scale', this.hide)
    this.mindMap.on('translate', this.hide)
    this.mindMap.on('svg_mousedown', this.hide)
    this.mindMap.on('expand_btn_click', this.hide)
    this.mindMap.on('outer_frame_delete', this.hide)
  },
  beforeDestroy() {
    this.mindMap.off('outer_frame_active', this.onOuterFrameActive)
    this.mindMap.off('scale', this.hide)
    this.mindMap.off('translate', this.hide)
    this.mindMap.off('svg_mousedown', this.hide)
    this.mindMap.off('expand_btn_click', this.hide)
    this.mindMap.off('outer_frame_delete', this.hide)
  },
  mounted() {
    document.body.appendChild(this.$refs.elRef)
  },
  methods: {
    onOuterFrameActive(el, parentNode, range) {
      // 取范围内第一个节点的外框样式
      const firstNode = parentNode.children[range[0]]
      const firstNodeOuterFrame = firstNode.getData('outerFrame')
      Object.keys(firstNodeOuterFrame).forEach(key => {
        this.styleConfig[key] = firstNodeOuterFrame[key]
      })
      // 获取外框的位置大小信息
      const { x, y, width } = el.rbox()
      this.position.left = x + width + 'px'
      this.position.top = y + 'px'
      this.show = true
    },

    updateOuterFrame(key, val) {
      this.styleConfig[key] = val
      this.mindMap.outerFrame.updateActiveOuterFrame({
        [key]: val
      })
      this.hide()
    },

    deleteOuterFrame() {
      this.mindMap.outerFrame.removeActiveOuterFrame()
    },

    hide() {
      this.show = false
      this.showPanel = false
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
.nodeOuterFrameContainer {
  position: fixed;
  transform: translate(-12px, -12px);

  &.isDark {
    .panel {
      background-color: #262a2e;
      border-left-color: hsla(0, 0%, 100%, 0.1);

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

  .panel {
    position: absolute;
    left: 0;
    top: 24px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.06);
    width: 250px;
    padding: 12px;

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
