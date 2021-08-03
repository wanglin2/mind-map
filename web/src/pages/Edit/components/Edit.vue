<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Count></Count>
    <NavigatorToolbar :mindMap="mindMap"></NavigatorToolbar>
    <Outline></Outline>
    <Style></Style>
    <BaseStyle :data="mindMapData" :mindMap="mindMap"></BaseStyle>
    <Theme :mindMap="mindMap"></Theme>
    <Structure :mindMap="mindMap"></Structure>
    <ShortcutKey></ShortcutKey>
    <Contextmenu :mindMap="mindMap"></Contextmenu>
  </div>
</template>

<script>
import MindMap from "simple-mind-map";
import Outline from "./Outline";
import Style from "./Style";
import BaseStyle from "./BaseStyle";
import Theme from "./Theme";
import Structure from "./Structure";
import Count from "./Count";
import NavigatorToolbar from "./NavigatorToolbar";
import ShortcutKey from "./ShortcutKey";
import Contextmenu from "./Contextmenu";
import { getData, storeData } from "@/api";

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
    Structure,
    Count,
    NavigatorToolbar,
    ShortcutKey,
    Contextmenu,
  },
  data() {
    return {
      mindMap: null,
      mindMapData: null,
      prevImg: "",
    };
  },
  mounted() {
    this.getData();
    this.init();
    this.$bus.$on("execCommand", this.execCommand);
    this.$bus.$on("export", this.export);
    this.$bus.$on("setData", this.setData);
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-07-03 22:11:37
     * @Desc: 获取思维导图数据，实际应该调接口获取
     */
    getData() {
      let storeData = getData();
      this.mindMapData = storeData;
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-01 10:19:07
     * @Desc: 存储数据当数据有变时
     */
    bindSaveEvent() {
      this.$bus.$on("data_change", (data) => {
        storeData(data);
      });
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-02 23:19:52
     * @Desc: 手动保存
     */
    manualSave() {
      let data = this.mindMap.command.getCopyData();
      storeData(data);
    },

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
      this.mindMap.keyCommand.addShortcut("Control+s", () => {
        this.manualSave();
      });
      // 转发事件
      [
        "node_active",
        "data_change",
        "back_forward",
        "node_contextmenu",
        "node_click",
        "draw_click",
        "expand_btn_click",
        "svg_mousedown",
        "mouseup",
      ].forEach((event) => {
        this.mindMap.on(event, (...args) => {
          this.$bus.$emit(event, ...args);
        });
      });
      this.bindSaveEvent();
    },

    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 23:01:13 
     * @Desc: 动态设置思维导图数据 
     */
    setData(data) {
      this.mindMap.setData(data)
      this.manualSave()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 13:32:11
     * @Desc: 重新渲染
     */
    reRender() {
      this.mindMap.reRender();
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 13:08:28
     * @Desc: 执行命令
     */
    execCommand(...args) {
      this.mindMap.execCommand(...args);
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-01 22:33:02
     * @Desc: 导出
     */
    async export(...args) {
      try {
        this.mindMap.export(...args);
      } catch (error) {
        console.log(error);
      }
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
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
