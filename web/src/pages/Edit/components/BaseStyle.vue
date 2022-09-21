<template>
  <Sidebar ref="sidebar" title="基础样式">
    <div class="sidebarContent" v-if="data">
      <!-- 背景 -->
      <div class="title noTop">背景</div>
      <div class="row">
        <el-tabs class="tab" v-model="activeTab">
          <el-tab-pane label="颜色" name="color">
            <Color
              :color="style.backgroundColor"
              @change="
                (color) => {
                  update('backgroundColor', color);
                }
              "
            ></Color>
          </el-tab-pane>
          <el-tab-pane label="图片" name="image">
            <ImgUpload
              class="imgUpload"
              v-model="style.backgroundImage"
              @change="
                (img) => {
                  update('backgroundImage', img);
                }
              "
            ></ImgUpload>
            <div class="rowItem">
              <span class="name">图片重复</span>
              <el-select
                size="mini"
                style="width: 120px"
                v-model="style.backgroundRepeat"
                placeholder=""
                @change="
                  (value) => {
                    update('backgroundRepeat', value);
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
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 连线 -->
      <div class="title noTop">连线</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">颜色</span>
          <span
            class="block"
            v-popover:popover
            :style="{ backgroundColor: style.lineColor }"
          ></span>
          <el-popover ref="popover" placement="bottom" trigger="click">
            <Color
              :color="style.lineColor"
              @change="
                (color) => {
                  update('lineColor', color);
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">粗细</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.lineWidth"
            placeholder=""
            @change="
              (value) => {
                update('lineWidth', value);
              }
            "
          >
            <el-option
              v-for="item in lineWidthList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 概要连线 -->
      <div class="title noTop">概要的连线</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">颜色</span>
          <span
            class="block"
            v-popover:popover2
            :style="{ backgroundColor: style.generalizationLineColor }"
          ></span>
          <el-popover ref="popover2" placement="bottom" trigger="click">
            <Color
              :color="style.generalizationLineColor"
              @change="
                (color) => {
                  update('generalizationLineColor', color);
                }
              "
            ></Color>
          </el-popover>
        </div>
        <div class="rowItem">
          <span class="name">粗细</span>
          <el-select
            size="mini"
            style="width: 80px"
            v-model="style.generalizationLineWidth"
            placeholder=""
            @change="
              (value) => {
                update('generalizationLineWidth', value);
              }
            "
          >
            <el-option
              v-for="item in lineWidthList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 内边距 -->
      <div class="title noTop">节点内边距</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">水平</span>
          <el-slider
            style="width: 200px"
            v-model="style.paddingX"
            @change="
              (value) => {
                update('paddingX', value);
              }
            "
          ></el-slider>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">垂直</span>
          <el-slider
            style="width: 200px"
            v-model="style.paddingY"
            @change="
              (value) => {
                update('paddingY', value);
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 图片 -->
      <div class="title noTop">图片</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">显示的最大宽度</span>
          <el-slider
            style="width: 140px"
            v-model="style.imgMaxWidth"
            :min="10"
            :max="300"
            @change="
              (value) => {
                update('imgMaxWidth', value);
              }
            "
          ></el-slider>
        </div>
      </div>
      <div class="row">
        <div class="rowItem">
          <span class="name">显示的最大高度</span>
          <el-slider
            style="width: 140px"
            v-model="style.imgMaxHeight"
            :min="10"
            :max="300"
            @change="
              (value) => {
                update('imgMaxHeight', value);
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 图标 -->
      <div class="title noTop">图标</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">大小</span>
          <el-slider
            style="width: 200px"
            v-model="style.iconSize"
            :min="12"
            :max="50"
            @change="
              (value) => {
                update('iconSize', value);
              }
            "
          ></el-slider>
        </div>
      </div>
      <!-- 二级节点外边距 -->
      <div class="title noTop">节点外边距</div>
      <div class="row column">
        <el-tabs
          class="tab"
          v-model="marginActiveTab"
          @tab-click="initMarginStyle"
        >
          <el-tab-pane label="二级节点" name="second"></el-tab-pane>
          <el-tab-pane label="三级及以下节点" name="node"></el-tab-pane>
        </el-tabs>
        <div class="rowItem">
          <span class="name">水平</span>
          <el-slider
            :max="200"
            style="width: 200px"
            v-model="style.marginX"
            @change="
              (value) => {
                updateMargin('marginX', value);
              }
            "
          ></el-slider>
        </div>
        <div class="rowItem">
          <span class="name">垂直</span>
          <el-slider
            :max="200"
            style="width: 200px"
            v-model="style.marginY"
            @change="
              (value) => {
                updateMargin('marginY', value);
              }
            "
          ></el-slider>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from "./Sidebar";
import Color from "./Color";
import {
  lineWidthList,
  backgroundRepeatList
} from "@/config";
import ImgUpload from "@/components/ImgUpload";
import { storeConfig } from "@/api";

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:52:56
 * @Desc: 基础样式
 */
export default {
  name: "BaseStyle",
  components: {
    Sidebar,
    Color,
    ImgUpload,
  },
  props: {
    data: {
      type: [Object, null],
      default: null,
    },
    mindMap: {
      type: Object,
    },
  },
  data() {
    return {
      lineWidthList,
      backgroundRepeatList,
      activeTab: "color",
      marginActiveTab: "second",
      style: {
        backgroundColor: "",
        lineColor: "",
        lineWidth: "",
        generalizationLineWidth: "",
        generalizationLineColor: "",
        paddingX: 0,
        paddingY: 0,
        imgMaxWidth: 0,
        imgMaxHeight: 0,
        iconSize: 0,
        backgroundImage: "",
        backgroundRepeat: "no-repeat",
        marginX: 0,
        marginY: 0,
      },
    };
  },
  created() {
    this.$bus.$on("showBaseStyle", () => {
      this.$refs.sidebar.show = false;
      this.$nextTick(() => {
        this.$refs.sidebar.show = true;
        this.initStyle();
      });
    });
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-05-05 14:02:12
     * @Desc: 初始样式
     */
    initStyle() {
      [
        "backgroundColor",
        "lineWidth",
        "lineColor",
        "generalizationLineWidth",
        "generalizationLineColor",
        "paddingX",
        "paddingY",
        "imgMaxWidth",
        "imgMaxHeight",
        "iconSize",
        "backgroundImage",
        "backgroundRepeat",
      ].forEach((key) => {
        this.style[key] = this.mindMap.getThemeConfig(key);
        if (key === "backgroundImage" && this.style[key] === "none") {
          this.style[key] = "";
        }
      });
      this.initMarginStyle();
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-03 22:27:32
     * @Desc: margin初始值
     */
    initMarginStyle() {
      ["marginX", "marginY"].forEach((key) => {
        this.style[key] =
          this.mindMap.getThemeConfig()[this.marginActiveTab][key];
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 14:05:40
     * @Desc: 更新配置
     */
    update(key, value) {
      if (key === "backgroundImage" && value === "none") {
        this.style[key] = "";
      } else {
        this.style[key] = value;
      }
      this.data.theme.config[key] = value;
      this.mindMap.setThemeConfig(this.data.theme.config);
      storeConfig({
        theme: {
            "template": this.mindMap.getTheme(),
            "config": this.data.theme.config
        }
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-03 22:08:12
     * @Desc: 设置margin
     */
    updateMargin(type, value) {
      this.style[type] = value;
      if (!this.data.theme.config[this.marginActiveTab]) {
        this.data.theme.config[this.marginActiveTab] = {};
      }
      this.data.theme.config[this.marginActiveTab][type] = value;
      this.mindMap.setThemeConfig(this.data.theme.config);
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>
