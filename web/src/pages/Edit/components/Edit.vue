<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Count v-if="!isZenMode"></Count>
    <Navigator :mindMap="mindMap"></Navigator>
    <NavigatorToolbar :mindMap="mindMap" v-if="!isZenMode"></NavigatorToolbar>
    <Outline :mindMap="mindMap"></Outline>
    <Style v-if="!isZenMode"></Style>
    <BaseStyle :data="mindMapData" :mindMap="mindMap"></BaseStyle>
    <Theme :mindMap="mindMap"></Theme>
    <Structure :mindMap="mindMap"></Structure>
    <ShortcutKey></ShortcutKey>
    <Contextmenu v-if="mindMap" :mindMap="mindMap"></Contextmenu>
    <RichTextToolbar v-if="mindMap" :mindMap="mindMap"></RichTextToolbar>
    <NodeNoteContentShow
      v-if="mindMap"
      :mindMap="mindMap"
    ></NodeNoteContentShow>
    <NodeImgPreview v-if="mindMap" :mindMap="mindMap"></NodeImgPreview>
    <SidebarTrigger v-if="!isZenMode"></SidebarTrigger>
  </div>
</template>

<script>
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import Select from 'simple-mind-map/src/plugins/Select.js'
import RichText from 'simple-mind-map/src/plugins/RichText.js'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'
import Outline from './Outline'
import Style from './Style'
import BaseStyle from './BaseStyle'
import Theme from './Theme'
import Structure from './Structure'
import Count from './Count'
import NavigatorToolbar from './NavigatorToolbar'
import ShortcutKey from './ShortcutKey'
import Contextmenu from './Contextmenu'
import RichTextToolbar from './RichTextToolbar'
import NodeNoteContentShow from './NodeNoteContentShow.vue'
import { getData, storeData, storeConfig } from '@/api'
import Navigator from './Navigator.vue'
import NodeImgPreview from './NodeImgPreview.vue'
import SidebarTrigger from './SidebarTrigger.vue'
import { mapState } from 'vuex'
import icon from '@/config/icon'
import customThemeList from '@/customThemes'
import CustomNodeContent from './CustomNodeContent.vue'
import Color from './Color.vue'
import Vue from 'vue'
import router from '../../../router'
import store from '../../../store'
import i18n from '../../../i18n'

// 注册插件
MindMap
  .usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(ExportPDF)
  .usePlugin(Export)
  .usePlugin(Select)
  .usePlugin(AssociativeLine)
  // .usePlugin(TouchEvent)

// 注册自定义主题
// customThemeList.forEach((item) => {
//   MindMap.defineTheme(item.value, item.theme)
// })

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:56:17
 * @Desc: 编辑区域
 */
export default {
  name: 'Edit',
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
    RichTextToolbar,
    NodeNoteContentShow,
    Navigator,
    NodeImgPreview,
    SidebarTrigger
  },
  data() {
    return {
      mindMap: null,
      mindMapData: null,
      prevImg: '',
      openTest: false
    }
  },
  computed: {
    ...mapState({
      isZenMode: state => state.localConfig.isZenMode,
      openNodeRichText: state => state.localConfig.openNodeRichText,
      useLeftKeySelectionRightKeyDrag: state => state.localConfig.useLeftKeySelectionRightKeyDrag,
    })
  },
  watch: {
    openNodeRichText() {
      if (this.openNodeRichText) {
        this.addRichTextPlugin()
      } else {
        this.removeRichTextPlugin()
      }
    }
  },
  mounted() {
    // this.showNewFeatureInfo()
    this.getData()
    this.init()
    this.$bus.$on('execCommand', this.execCommand)
    this.$bus.$on('paddingChange', this.onPaddingChange)
    this.$bus.$on('export', this.export)
    this.$bus.$on('setData', this.setData)
    this.$bus.$on('startTextEdit', () => {
      this.mindMap.renderer.startTextEdit()
    })
    this.$bus.$on('endTextEdit', () => {
      this.mindMap.renderer.endTextEdit()
    })
    this.$bus.$on('createAssociativeLine', () => {
      this.mindMap.associativeLine.createLineFromActiveNode()
    })
    window.addEventListener('resize', () => {
      this.mindMap.resize()
    })
    if (this.openTest) {
      setTimeout(() => {
        this.test()
      }, 5000)
    }
  },
  methods: {
    /**
     * @Author: 王林25
     * @Date: 2021-11-22 19:39:28
     * @Desc: 数据更改测试
     */
    test() {
      let nodeData = {
        data: { text: '根节点', expand: true, isActive: false },
        children: []
      }
      setTimeout(() => {
        nodeData.data.text = '理想青年实验室'
        this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

        setTimeout(() => {
          nodeData.children.push({
            data: { text: '网站', expand: true, isActive: false },
            children: []
          })
          this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

          setTimeout(() => {
            nodeData.children.push({
              data: { text: '博客', expand: true, isActive: false },
              children: []
            })
            this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

            setTimeout(() => {
              let viewData = {
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  shear: 0,
                  rotate: 0,
                  translateX: 179,
                  translateY: 0,
                  originX: 0,
                  originY: 0,
                  a: 1,
                  b: 0,
                  c: 0,
                  d: 1,
                  e: 179,
                  f: 0
                },
                state: { scale: 1, x: 179, y: 0, sx: 0, sy: 0 }
              }
              this.mindMap.view.setTransformData(viewData)

              setTimeout(() => {
                let viewData = {
                  transform: {
                    scaleX: 1.6000000000000005,
                    scaleY: 1.6000000000000005,
                    shear: 0,
                    rotate: 0,
                    translateX: -373.3000000000004,
                    translateY: -281.10000000000025,
                    originX: 0,
                    originY: 0,
                    a: 1.6000000000000005,
                    b: 0,
                    c: 0,
                    d: 1.6000000000000005,
                    e: -373.3000000000004,
                    f: -281.10000000000025
                  },
                  state: {
                    scale: 1.6000000000000005,
                    x: 179,
                    y: 0,
                    sx: 0,
                    sy: 0
                  }
                }
                this.mindMap.view.setTransformData(viewData)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-03 22:11:37
     * @Desc: 获取思维导图数据，实际应该调接口获取
     */
    getData() {
      let storeData = getData()
      this.mindMapData = storeData
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-01 10:19:07
     * @Desc: 存储数据当数据有变时
     */
    bindSaveEvent() {
      if (this.openTest) {
        return
      }
      this.$bus.$on('data_change', data => {
        storeData(data)
      })
      this.$bus.$on('view_data_change', data => {
        storeConfig({
          view: data
        })
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-02 23:19:52
     * @Desc: 手动保存
     */
    manualSave() {
      if (this.openTest) {
        return
      }
      let data = this.mindMap.getData(true)
      storeConfig(data)
    },

    /**
     * @Author: 王林
     * @Date: 2021-04-10 15:01:01
     * @Desc: 初始化
     */
    init() {
      let { root, layout, theme, view, config } = this.mindMapData
      this.mindMap = new MindMap({
        el: this.$refs.mindMapContainer,
        data: root,
        layout: layout,
        theme: theme.template,
        themeConfig: theme.config,
        viewData: view,
        nodeTextEditZIndex: 1000,
        nodeNoteTooltipZIndex: 1000,
        customNoteContentShow: {
          show: (content, left, top) => {
            this.$bus.$emit('showNoteContent', content, left, top)
          },
          hide: () => {
            // this.$bus.$emit('hideNoteContent')
          }
        },
        ...(config || {}),
        iconList: icon,
        useLeftKeySelectionRightKeyDrag: this.useLeftKeySelectionRightKeyDrag,
        // isUseCustomNodeContent: true,
        // 示例1：组件里用到了router、store、i18n等实例化vue组件时需要用到的东西
        // customCreateNodeContent: (node) => {
        //   let el = document.createElement('div')
        //   let Comp = Vue.extend(Color)
        //   let comp = new Comp({
        //     router,
        //     store,
        //     i18n
        //   })
        //   comp.$mount(el)
        //   return comp.$el
        // },
        // 示例2：组件里没有用到示例1的东西
        // customCreateNodeContent: (node) => {
        //   let el = document.createElement('div')
        //   let Comp = Vue.extend(CustomNodeContent)
        //   let comp = new Comp({
        //     propsData: {
        //       html: node.nodeData.data.text
        //     }
        //   })
        //   comp.$mount(el)
        //   return comp.$el
        // }
      })
      if (this.openNodeRichText) this.addRichTextPlugin()
      this.mindMap.keyCommand.addShortcut('Control+s', () => {
        this.manualSave()
      })
      // 转发事件
      ;[
        'node_active',
        'data_change',
        'view_data_change',
        'back_forward',
        'node_contextmenu',
        'node_click',
        'draw_click',
        'expand_btn_click',
        'svg_mousedown',
        'mouseup',
        'mode_change',
        'node_tree_render_end',
        'rich_text_selection_change',
        'transforming-dom-to-images',
        'generalization_node_contextmenu'
      ].forEach(event => {
        this.mindMap.on(event, (...args) => {
          this.$bus.$emit(event, ...args)
        })
      })
      this.bindSaveEvent()
      // setTimeout(() => {
        // 动态给指定节点添加子节点
        // this.mindMap.execCommand('INSERT_CHILD_NODE', false, this.mindMap.renderer.root, {
        //   text: '自定义内容'
        // })

        // 动态给指定节点添加同级节点
        // this.mindMap.execCommand('INSERT_NODE', false, this.mindMap.renderer.root, {
        //   text: '自定义内容'
        // })

        // 动态删除指定节点
        // this.mindMap.execCommand('REMOVE_NODE', this.mindMap.renderer.root.children[0])
      // }, 5000);
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-03 23:01:13
     * @Desc: 动态设置思维导图数据
     */
    setData(data) {
      if (data.root) {
        this.mindMap.setFullData(data)
      } else {
        this.mindMap.setData(data)
      }
      this.mindMap.view.reset()
      this.manualSave()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 13:32:11
     * @Desc: 重新渲染
     */
    reRender() {
      this.mindMap.reRender()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 13:08:28
     * @Desc: 执行命令
     */
    execCommand(...args) {
      this.mindMap.execCommand(...args)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-01 22:33:02
     * @Desc: 导出
     */
    async export(...args) {
      try {
        this.mindMap.export(...args)
      } catch (error) {
        console.log(error)
      }
    },

    // 修改导出内边距
    onPaddingChange(data) {
      this.mindMap.updateConfig(data)
    },

    // 显示新特性提示
    showNewFeatureInfo() {
      let showed = localStorage.getItem('SIMPLE_MIND_MAP_NEW_FEATURE_TIP_1')
      if (!showed) {
        this.$notify.info({
          title: this.$t('edit.newFeatureNoticeTitle'),
          message: this.$t('edit.newFeatureNoticeMessage'), 
          duration: 0,
          onClose: () => {
            localStorage.setItem('SIMPLE_MIND_MAP_NEW_FEATURE_TIP_1', true)
          }
        })
      }
    },

    // 加载节点富文本编辑插件
    addRichTextPlugin() {
      if (!this.mindMap) return
      this.mindMap.addPlugin(RichText)
    },

    // 移除节点富文本编辑插件
    removeRichTextPlugin() {
      this.mindMap.removePlugin(RichText)
    }
  }
}
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

    // left: 100px;
    // top: 100px;
    // right: 100px;
    // bottom: 100px;
  }
}
</style>
