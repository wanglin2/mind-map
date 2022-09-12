<template>
  <Sidebar ref="sidebar" title="节点样式">
    <div class="styleBox">
      <el-tabs class="tab" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="常态" name="normal"></el-tab-pane>
        <el-tab-pane label="选中状态" name="active"></el-tab-pane>
      </el-tabs>
      <div class="sidebarContent" v-if="activeNodes.length > 0">
        <!-- 文字 -->
        <div class="title noTop">文字</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">字体</span>
            <el-select
              size="mini"
              v-model="style.fontFamily"
              placeholder=""
              :disabled="checkDisabled('fontFamily')"
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
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">字号</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.fontSize"
              placeholder=""
              :disabled="checkDisabled('fontSize')"
              @change="update('fontSize')"
            >
              <el-option
                v-for="item in fontSizeList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="rowItem">
            <span class="name">行高</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.lineHeight"
              placeholder=""
              :disabled="checkDisabled('lineHeight')"
              @change="update('lineHeight')"
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
        </div>
        <div class="row">
          <div class="btnGroup">
            <el-tooltip content="颜色" placement="bottom">
              <div class="styleBtn" v-popover:popover :class="{ disabled: checkDisabled('color') }">
                A
                <span
                  class="colorShow"
                  :style="{ backgroundColor: style.color || '#eee' }"
                ></span>
              </div>
            </el-tooltip>
            <el-tooltip content="加粗" placement="bottom">
              <div
                class="styleBtn"
                :class="{ actived: style.fontWeight === 'bold', disabled: checkDisabled('fontWeight') }"
                @click="toggleFontWeight"
              >
                B
              </div>
            </el-tooltip>
            <el-tooltip content="斜体" placement="bottom">
              <div
                class="styleBtn i"
                :class="{ actived: style.fontStyle === 'italic', disabled: checkDisabled('fontStyle') }"
                @click="toggleFontStyle"
              >
                I
              </div>
            </el-tooltip>
            <el-tooltip content="划线" placement="bottom">
              <div
                class="styleBtn u"
                :style="{ textDecoration: style.textDecoration || 'none' }"
                :class="{ disabled: checkDisabled('textDecoration') }"
                v-popover:popover2
              >
                U
              </div>
            </el-tooltip>
          </div>
          <el-popover ref="popover" placement="bottom" trigger="click" :disabled="checkDisabled('color')">
            <Color :color="style.color" @change="changeFontColor"></Color>
          </el-popover>
          <el-popover ref="popover2" placement="bottom" trigger="click" :disabled="checkDisabled('textDecoration')">
            <el-radio-group
              size="mini"
              v-model="style.textDecoration"
              @change="update('textDecoration')"
            >
              <el-radio-button label="underline">下划线</el-radio-button>
              <el-radio-button label="line-through">中划线</el-radio-button>
              <el-radio-button label="overline">上划线</el-radio-button>
            </el-radio-group>
          </el-popover>
        </div>
        <!-- 边框 -->
        <div class="title">边框</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <span
              class="block"
              v-popover:popover3
              :style="{ width: '80px', backgroundColor: style.borderColor }"
              :class="{ disabled: checkDisabled('borderColor') }"
            ></span>
            <el-popover ref="popover3" placement="bottom" trigger="click" :disabled="checkDisabled('borderColor')">
              <Color
                :color="style.borderColor"
                @change="changeBorderColor"
              ></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name" v-popover:popover5>样式</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderDasharray"
              placeholder=""
              :disabled="checkDisabled('borderDasharray')"
              @change="update('borderDasharray')"
            >
              <el-option
                v-for="item in borderDasharrayList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">宽度</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderWidth"
              placeholder=""
              :disabled="checkDisabled('borderWidth')"
              @change="update('borderWidth')"
            >
              <el-option
                v-for="item in borderWidthList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="rowItem">
            <span class="name">圆角</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderRadius"
              placeholder=""
              :disabled="checkDisabled('borderRadius')"
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
        <div class="title">背景</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <span
              class="block"
              v-popover:popover4
              :style="{ backgroundColor: style.fillColor }"
              :class="{ disabled: checkDisabled('fillColor') }"
            ></span>
            <el-popover ref="popover4" placement="bottom" trigger="click" :disabled="checkDisabled('fillColor')">
              <Color :color="style.fillColor" @change="changeFillColor"></Color>
            </el-popover>
          </div>
        </div>
        <!-- 形状 -->
        <div class="title">形状</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">形状</span>
            <el-select
              size="mini"
              style="width: 120px"
              v-model="style.shape"
              placeholder=""
              :disabled="checkDisabled('shape')"
              @change="update('shape')"
            >
              <el-option
                v-for="item in shapeList"
                :key="item"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 节点内边距 -->
        <div class="title noTop">节点内边距</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">水平</span>
            <el-slider
              style="width: 200px"
              v-model="style.paddingX"
              :disabled="checkDisabled('paddingX')"
              @change="update('paddingX')"
            ></el-slider>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">垂直</span>
            <el-slider
              style="width: 200px"
              v-model="style.paddingY"
              :disabled="checkDisabled('paddingY')"
              @change="update('paddingY')"
            ></el-slider>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from "./Sidebar";
import Color from "./Color";
import {
  fontFamilyList,
  fontSizeList,
  borderWidthList,
  borderDasharrayList,
  borderRadiusList,
  lineHeightList,
  shapeList,
} from "@/config";
import { supportActiveStyle } from 'simple-mind-map/src/themes/default';

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:47
 * @Desc: 节点样式设置
 */
export default {
  name: "Style",
  components: {
    Sidebar,
    Color,
  },
  data() {
    return {
      supportActiveStyle,
      shapeList,
      fontFamilyList,
      fontSizeList,
      borderWidthList,
      borderDasharrayList,
      borderRadiusList,
      lineHeightList,
      activeNodes: [],
      activeTab: "normal",
      style: {
        shape: '',
        paddingX: 0,
        paddingY: 0,
        color: "",
        fontFamily: "",
        fontSize: "",
        lineHeight: "",
        textDecoration: "",
        fontWeight: "",
        fontStyle: "",
        borderWidth: "",
        borderColor: "",
        fillColor: "",
        borderDasharray: "",
        borderRadius: "",
      },
    };
  },
  created() {
    this.$bus.$on("node_active", (...args) => {
      if (this.$refs.sidebar) this.$refs.sidebar.show = false;
      this.$nextTick(() => {
        this.activeTab = "normal";
        this.activeNodes = args[1];
        if (this.$refs.sidebar) this.$refs.sidebar.show = this.activeNodes.length > 0;
        this.initNodeStyle();
      });
    });
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-05-05 11:42:32
     * @Desc: tab切换
     */
    handleTabClick() {
      this.initNodeStyle();
    },

    /** 
     * @Author: 王林 
     * @Date: 2022-09-12 22:16:56 
     * @Desc: 检查是否禁用 
     */
    checkDisabled(prop) {
      return this.activeTab === 'active' && !this.supportActiveStyle.includes(prop)
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:48:52
     * @Desc: 初始节点样式
     */
    initNodeStyle() {
      if (this.activeNodes.length <= 0) {
        this.activeTab = "normal";
        return;
      }
      [
        "shape",
        "paddingX",
        "paddingY",
        "color",
        "fontFamily",
        "fontSize",
        "lineHeight",
        "textDecoration",
        "fontWeight",
        "fontStyle",
        "borderWidth",
        "borderColor",
        "fillColor",
        "borderDasharray",
        "borderRadius",
      ].forEach((item) => {
        this.style[item] = this.activeNodes[0].getStyle(
          item,
          false,
          this.activeTab === "active"
        );
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 22:08:16
     * @Desc: 修改样式
     */
    update(prop) {
      this.activeNodes.forEach((node) => {
        node.setStyle(prop, this.style[prop], this.activeTab === "active");
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:41:34
     * @Desc: 切换加粗样式
     */
    toggleFontWeight() {
      if (this.style.fontWeight === "bold") {
        this.style.fontWeight = "normal";
      } else {
        this.style.fontWeight = "bold";
      }
      this.update("fontWeight");
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:46:39
     * @Desc: 切换字体样式
     */
    toggleFontStyle() {
      if (this.style.fontStyle === "italic") {
        this.style.fontStyle = "normal";
      } else {
        this.style.fontStyle = "italic";
      }
      this.update("fontStyle");
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:18:59
     * @Desc: 修改字体颜色
     */
    changeFontColor(color) {
      this.style.color = color;
      this.update("color");
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:18:59
     * @Desc: 修改边框颜色
     */
    changeBorderColor(color) {
      this.style.borderColor = color;
      this.update("borderColor");
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:18:59
     * @Desc: 修改背景颜色
     */
    changeFillColor(color) {
      this.style.fillColor = color;
      this.update("fillColor");
    },
  },
};
</script>

<style lang="less" scoped>
.styleBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .tab {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 20px;
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
          background-color: #F5F7FA !important;
          border-color: #E4E7ED !important;
          color: #C0C4CC !important;
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
        background-color: #F5F7FA !important;
        border-color: #E4E7ED !important;
        color: #C0C4CC !important;
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
</style>
