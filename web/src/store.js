import Vue from 'vue'
import Vuex from 'vuex'
import exampleData from 'simple-mind-map/example/exampleData'
import { storeLocalConfig } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    fileName: '', // 本地的文件名
    isUnSave: false, // 当前操作是否未保存
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
      // 是否开启动量效果
      isUseMomentum: true,
      // 是否是暗黑模式
      isDark: false,
      // 是否开启AI功能
      enableAi: true
    },
    activeSidebar: '', // 当前显示的侧边栏
    localEditList: [], // 客户端中正在编辑的思维导图列表
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
    supportMomentum: false, // 是否支持Momentum插件
    isDragOutlineTreeNode: false, // 当前是否正在拖拽大纲树的节点
    aiConfig: {
      api: 'http://ark.cn-beijing.volces.com/api/v3/chat/completions',
      key: '',
      model: '',
      port: 3456,
      method: 'POST'
    },
    currentFolder: '', // 当前打开的目录
    isVIP: false // 是否是会员
  },
  mutations: {
    // 设置本地文件名
    setFileName(state, data) {
      state.fileName = data
    },

    // 设置当前操作是否未保存
    setIsUnSave(state, data) {
      state.isUnSave = data
    },

    setCurrentFolder(state, data) {
      localStorage.setItem('currentFolder', data)
      state.currentFolder = data
    },

    /**
     * @Author: 王林
     * @Date: 2021-04-10 14:50:01
     * @Desc: 设置思维导图数据
     */
    setMindMapData(state, data) {
      state.mindMapData = data
    },

    // 设置操作本地文件标志位
    setIsHandleLocalFile(state, data) {
      state.isHandleLocalFile = data
    },

    // 设置本地配置
    setLocalConfig(state, data) {
      const aiConfigKeys = Object.keys(state.aiConfig)
      Object.keys(data).forEach(key => {
        if (aiConfigKeys.includes(key)) {
          state.aiConfig[key] = data[key]
        } else {
          state.localConfig[key] = data[key]
        }
      })
      storeLocalConfig({
        ...state.localConfig,
        ...state.aiConfig
      })
    },

    // 设置当前显示的侧边栏
    setActiveSidebar(state, data) {
      state.activeSidebar = data
    },

    // 设置客户端中当前正在编辑的思维导图列表
    setLocalEditList(state, list) {
      state.localEditList = list
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

    // 设置是否支持Momentum插件
    setSupportMomentum(state, data) {
      state.supportMomentum = data
    },

    // 设置树节点拖拽
    setIsDragOutlineTreeNode(state, data) {
      state.isDragOutlineTreeNode = data
    },

    // 设置是否是会员
    setIsVIP(state, data) {
      state.isVIP = data
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
