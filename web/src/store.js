import Vue from 'vue'
import Vuex from 'vuex'
import exampleData from 'simple-mind-map/example/exampleData'
import { storeLocalConfig } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mindMapData: null, // 思维导图数据
    isHandleLocalFile: false, // 是否操作的是本地文件
    localConfig: {
      // 本地配置
      isZenMode: false, // 是否是禅模式
      // 是否开启节点富文本
      openNodeRichText: true,
      // 鼠标行为
      useLeftKeySelectionRightKeyDrag: false,
      // 是否显示滚动条
      isShowScrollbar: false,
      // 是否开启手绘风格
      isUseHandDrawnLikeStyle: false,
      // 是否是暗黑模式
      isDark: false
    },
    activeSidebar: '', // 当前显示的侧边栏
    isOutlineEdit: false, // 是否是大纲编辑模式
    isReadonly: false, // 是否只读
    isSourceCodeEdit: false, // 是否是源码编辑模式
    extraTextOnExport: '', // 导出时底部添加的文字
    supportHandDrawnLikeStyle: false, // 是否支持设置手绘风格
    supportMark: false, // 是否支持标记
    supportNumbers: false, // 是否支持编号
    supportFreemind: false, // 是否支持Freemind插件
    supportExcel: false, // 是否支持Excel插件
    supportCheckbox: false, // 是否支持Checkbox插件
    supportLineFlow: false, // 是否支持LineFlow插件
    isDragOutlineTreeNode: false // 当前是否正在拖拽大纲树的节点
  },
  mutations: {
    // 设置思维导图数据
    setMindMapData(state, data) {
      state.mindMapData = data
    },

    // 设置操作本地文件标志位
    setIsHandleLocalFile(state, data) {
      state.isHandleLocalFile = data
    },

    // 设置本地配置
    setLocalConfig(state, data) {
      state.localConfig = {
        ...state.localConfig,
        ...data
      }
      storeLocalConfig(state.localConfig)
    },

    // 设置当前显示的侧边栏
    setActiveSidebar(state, data) {
      state.activeSidebar = data
    },

    // 设置大纲编辑模式
    setIsOutlineEdit(state, data) {
      state.isOutlineEdit = data
    },

    // 设置是否只读
    setIsReadonly(state, data) {
      state.isReadonly = data
    },

    // 设置源码编辑模式
    setIsSourceCodeEdit(state, data) {
      state.isSourceCodeEdit = data
    },

    // 设置导出时底部添加的文字
    setExtraTextOnExport(state, data) {
      state.extraTextOnExport = data
    },

    // 设置是否支持手绘风格
    setSupportHandDrawnLikeStyle(state, data) {
      state.supportHandDrawnLikeStyle = data
    },

    // 设置是否支持标记
    setSupportMark(state, data) {
      state.supportMark = data
    },

    // 设置是否支持编号
    setSupportNumbers(state, data) {
      state.supportNumbers = data
    },

    // 设置是否支持Freemind插件
    setSupportFreemind(state, data) {
      state.supportFreemind = data
    },

    // 设置是否支持Excel插件
    setSupportExcel(state, data) {
      state.supportExcel = data
    },

    // 设置是否支持Checkbox插件
    setSupportCheckbox(state, data) {
      state.supportCheckbox = data
    },

    // 设置是否支持Lineflow插件
    setSupportLineFlow(state, data) {
      state.supportLineFlow = data
    },

    // 设置树节点拖拽
    setIsDragOutlineTreeNode(state, data) {
      state.isDragOutlineTreeNode = data
    }
  },
  actions: {
    // 设置初始思维导图数据
    getUserMindMapData(ctx) {
      try {
        let { data } = {
          data: {
            data: {
              mindMapData: exampleData
            }
          }
        }
        ctx.commit('setMindMapData', data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default store
