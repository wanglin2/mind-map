<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Outline></Outline>
    <Style></Style>
    <BaseStyle
      :data="mindMapData"
      :mindMap="mindMap"
      @change="changeThemeConfig"
    ></BaseStyle>
    <Theme :mindMap="mindMap"></Theme>
    <Structure :mindMap="mindMap"></Structure>
  </div>
</template>

<script>
import MindMap from "simple-mind-map";
import Outline from "./Outline";
import Style from "./Style";
import BaseStyle from "./BaseStyle";
import exampleData from "simple-mind-map/example/exampleData";
import Theme from "./Theme";
import Structure from './Structure';

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:56:17
 * @Desc: 编辑区域
 */
export default {
  name: "Edit",
  components: {
    Outline,
    Style,
    BaseStyle,
    Theme,
    Structure
  },
  data() {
    return {
      mindMap: null,
      mindMapData: exampleData,
    };
  },
  created() {},
  mounted() {
    this.init();
    this.$bus.$on("execCommand", this.execCommand);
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-04-10 15:01:01
     * @Desc: 初始化
     */
    init() {
      let { root, layout, theme } = this.mindMapData;
      this.mindMap = new MindMap({
        el: this.$refs.mindMapContainer,
        data: root,
        layout: layout,
        theme: theme.template,
        themeConfig: theme.config,
      });
      this.mindMap.on("node_active", (...args) => {
        this.$bus.$emit("node_active", ...args);
      });
      this.mindMap.on("data_change", (...args) => {
        this.$bus.$emit("data_change", ...args);
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 13:49:25
     * @Desc: 修改主题配置
     */
    changeThemeConfig() {
      this.mindMap.setThemeConfig(this.mindMapData.theme.config);
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 13:32:11
     * @Desc: 重新渲染
     */
    reRender() {
      console.log(12)
      this.mindMap.render();
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 13:08:28
     * @Desc: 执行命令
     */
    execCommand(...args) {
      this.mindMap.execCommand(...args);
    },
  },
};
</script>

<style lang="less" scoped>
.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .mindMapContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
