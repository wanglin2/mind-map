<template>
  <Sidebar ref="sidebar" title="基础样式">
    <div class="sidebarContent" v-if="data">
      <div class="title noTop">背景</div>
      <div class="row">
        <Color
          :color="style.backgroundColor"
          @change="
            (color) => {
              update('backgroundColor', color);
            }
          "
        ></Color>
      </div>
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
      <div class="title noTop">节点内边距</div>
      <div class="row">
        <div class="rowItem">
          <span class="name">水平</span>
          <el-slider
            style="width: 230px"
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
            style="width: 230px"
            v-model="style.paddingY"
            @change="
              (value) => {
                update('paddingY', value);
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
import { lineWidthList } from "@/config";

export default {
  name: "BaseStyle",
  components: {
    Sidebar,
    Color,
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
      style: {
        backgroundColor: "",
        lineColor: "",
        lineWidth: "",
        paddingX: 0,
        paddingY: 0,
      },
    };
  },
  created() {
    this.$bus.$on("showTheme", () => {
      this.$refs.sidebar.show = true;
      this.initStyle();
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
        "paddingX",
        "paddingY",
      ].forEach((key) => {
        this.style[key] = this.mindMap.getThemeConfig(key);
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 14:05:40
     * @Desc: 更新配置
     */
    update(key, value) {
      this.style[key] = value;
      this.data.theme.config[key] = value;
      this.$emit("change");
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
        margin-right: 5px;
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
