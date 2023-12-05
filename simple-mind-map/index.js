import View from './src/core/view/View'
import Event from './src/core/event/Event'
import Render from './src/core/render/Render'
import merge from 'deepmerge'
import theme from './src/themes'
import Style from './src/core/render/node/Style'
import KeyCommand from './src/core/command/KeyCommand'
import Command from './src/core/command/Command'
import BatchExecution from './src/utils/BatchExecution'
import {
  layoutValueList,
  CONSTANTS,
  commonCaches,
  ERROR_TYPES,
  cssContent
} from './src/constants/constant'
import { SVG } from '@svgdotjs/svg.js'
import { simpleDeepClone, getType, getObjectChangedProps } from './src/utils'
import defaultTheme, {
  checkIsNodeSizeIndependenceConfig
} from './src/themes/default'
import { defaultOpt } from './src/constants/defaultOptions'

//  思维导图
class MindMap {
  //  构造函数
  /**
   *
   * @param {defaultOpt} opt
   */
  constructor(opt = {}) {
    // 合并选项
    this.opt = this.handleOpt(merge(defaultOpt, opt))

    // 容器元素
    this.el = this.opt.el
    if (!this.el) throw new Error('缺少容器元素el')

    // 获取容器尺寸位置信息
    this.getElRectInfo()

    // 添加css
    this.cssEl = null
    this.addCss()

    // 画布
    this.initContainer()

    // 初始化主题
    this.initTheme()

    // 初始化缓存数据
    this.initCache()

    // 事件类
    this.event = new Event({
      mindMap: this
    })

    // 按键类
    this.keyCommand = new KeyCommand({
      mindMap: this
    })

    // 命令类
    this.command = new Command({
      mindMap: this
    })

    // 渲染类
    this.renderer = new Render({
      mindMap: this
    })

    // 视图操作类
    this.view = new View({
      mindMap: this
    })

    // 批量执行类
    this.batchExecution = new BatchExecution()

    // 注册插件
    MindMap.pluginList.forEach(plugin => {
      this.initPlugin(plugin)
    })

    // 初始渲染
    this.render(this.opt.fit ? () => this.view.fit() : () => {})
    setTimeout(() => {
      this.command.addHistory()
    }, 0)
  }

  //  配置参数处理
  handleOpt(opt) {
    // 深拷贝一份节点数据
    opt.data = simpleDeepClone(opt.data || {})
    // 检查布局配置
    if (!layoutValueList.includes(opt.layout)) {
      opt.layout = CONSTANTS.LAYOUT.LOGICAL_STRUCTURE
    }
    // 检查主题配置
    opt.theme = opt.theme && theme[opt.theme] ? opt.theme : 'default'
    return opt
  }

  // 创建容器元素
  initContainer() {
    const { associativeLineIsAlwaysAboveNode } = this.opt
    // 节点关联线容器
    const createAssociativeLineDraw = () => {
      this.associativeLineDraw = this.draw.group()
      this.associativeLineDraw.addClass('smm-associative-line-container')
    }
    // 画布
    this.svg = SVG().addTo(this.el).size(this.width, this.height)
    // 容器
    this.draw = this.svg.group()
    this.draw.addClass('smm-container')
    // 节点连线容器
    this.lineDraw = this.draw.group()
    this.lineDraw.addClass('smm-line-container')
    // 默认处于节点下方
    if (!associativeLineIsAlwaysAboveNode) {
      createAssociativeLineDraw()
    }
    // 节点容器
    this.nodeDraw = this.draw.group()
    this.nodeDraw.addClass('smm-node-container')
    // 关联线始终处于节点上方
    if (associativeLineIsAlwaysAboveNode) {
      createAssociativeLineDraw()
    }
    // 其他内容的容器
    this.otherDraw = this.draw.group()
    this.otherDraw.addClass('smm-other-container')
  }

  // 清空各容器
  clearDraw() {
    this.lineDraw.clear()
    this.associativeLineDraw.clear()
    this.nodeDraw.clear()
    this.otherDraw.clear()
  }

  // 添加必要的css样式到页面
  addCss() {
    this.cssEl = document.createElement('style')
    this.cssEl.type = 'text/css'
    this.cssEl.innerHTML = cssContent
    document.head.appendChild(this.cssEl)
  }

  // 移除css
  removeCss() {
    document.head.removeChild(this.cssEl)
  }

  //  渲染，部分渲染
  render(callback, source = '') {
    this.batchExecution.push('render', () => {
      this.initTheme()
      this.renderer.reRender = false
      this.renderer.render(callback, source)
    })
  }

  //  重新渲染
  reRender(callback, source = '') {
    this.batchExecution.push('render', () => {
      this.clearDraw()
      this.initTheme()
      this.renderer.reRender = true
      this.renderer.render(callback, source)
    })
  }

  // 获取或更新容器尺寸位置信息
  getElRectInfo() {
    this.elRect = this.el.getBoundingClientRect()
    this.width = this.elRect.width
    this.height = this.elRect.height
    if (this.width <= 0 || this.height <= 0)
      throw new Error('容器元素el的宽高不能为0')
  }

  //  容器尺寸变化，调整尺寸
  resize() {
    this.getElRectInfo()
    this.svg.size(this.width, this.height)
    this.emit('resize')
  }

  //  监听事件
  on(event, fn) {
    this.event.on(event, fn)
  }

  //  触发事件
  emit(event, ...args) {
    this.event.emit(event, ...args)
  }

  //  解绑事件
  off(event, fn) {
    this.event.off(event, fn)
  }

  // 初始化缓存数据
  initCache() {
    Object.keys(commonCaches).forEach(key => {
      let type = getType(commonCaches[key])
      let value = ''
      switch (type) {
        case 'Boolean':
          value = false
          break
        default:
          value = null
          break
      }
      commonCaches[key] = value
    })
  }

  //  设置主题
  initTheme() {
    // 合并主题配置
    this.themeConfig = merge(theme[this.opt.theme], this.opt.themeConfig)
    // 设置背景样式
    Style.setBackgroundStyle(this.el, this.themeConfig)
  }

  //  设置主题
  setTheme(theme, notRender = false) {
    this.execCommand('CLEAR_ACTIVE_NODE')
    this.opt.theme = theme
    if (!notRender) {
      this.render(null, CONSTANTS.CHANGE_THEME)
    }
    this.emit('view_theme_change', theme)
  }

  //  获取当前主题
  getTheme() {
    return this.opt.theme
  }

  //  设置主题配置
  setThemeConfig(config, notRender = false) {
    // 计算改变了的配置
    const changedConfig = getObjectChangedProps(this.themeConfig, config)
    this.opt.themeConfig = config
    if (!notRender) {
      // 检查改变的是否是节点大小无关的主题属性
      let res = checkIsNodeSizeIndependenceConfig(changedConfig)
      this.render(null, res ? '' : CONSTANTS.CHANGE_THEME)
    }
  }

  //  获取自定义主题配置
  getCustomThemeConfig() {
    return this.opt.themeConfig
  }

  //  获取某个主题配置值
  getThemeConfig(prop) {
    return prop === undefined ? this.themeConfig : this.themeConfig[prop]
  }

  // 获取配置
  getConfig(prop) {
    return prop === undefined ? this.opt : this.opt[prop]
  }

  // 更新配置
  updateConfig(opt = {}) {
    this.opt = this.handleOpt(merge.all([defaultOpt, this.opt, opt]))
  }

  //  获取当前布局结构
  getLayout() {
    return this.opt.layout
  }

  //  设置布局结构
  setLayout(layout, notRender = false) {
    // 检查布局配置
    if (!layoutValueList.includes(layout)) {
      layout = CONSTANTS.LAYOUT.LOGICAL_STRUCTURE
    }
    this.opt.layout = layout
    this.view.reset()
    this.renderer.setLayout()
    if (!notRender) {
      this.render(null, CONSTANTS.CHANGE_LAYOUT)
    }
  }

  //  执行命令
  execCommand(...args) {
    this.command.exec(...args)
  }

  //  动态设置思维导图数据，纯节点数据
  setData(data) {
    data = simpleDeepClone(data || {})
    this.execCommand('CLEAR_ACTIVE_NODE')
    this.command.clearHistory()
    this.command.addHistory()
    this.renderer.setData(data)
    this.reRender(() => {}, CONSTANTS.SET_DATA)
    this.emit('set_data', data)
  }

  //  动态设置思维导图数据，包括节点数据、布局、主题、视图
  setFullData(data) {
    if (data.root) {
      this.setData(data.root)
    }
    if (data.layout) {
      this.setLayout(data.layout)
    }
    if (data.theme) {
      if (data.theme.template) {
        this.setTheme(data.theme.template)
      }
      if (data.theme.config) {
        this.setThemeConfig(data.theme.config)
      }
    }
    if (data.view) {
      this.view.setTransformData(data.view)
    }
  }

  //  获取思维导图数据，节点树、主题、布局等
  getData(withConfig) {
    let nodeData = this.command.getCopyData()
    let data = {}
    if (withConfig) {
      data = {
        layout: this.getLayout(),
        root: nodeData,
        theme: {
          template: this.getTheme(),
          config: this.getCustomThemeConfig()
        },
        view: this.view.getTransformData()
      }
    } else {
      data = nodeData
    }
    return simpleDeepClone(data)
  }

  //  导出
  async export(...args) {
    try {
      let result = await this.doExport.export(...args)
      return result
    } catch (error) {
      this.opt.errorHandler(ERROR_TYPES.EXPORT_ERROR, error)
    }
  }

  //  转换位置
  toPos(x, y) {
    return {
      x: x - this.elRect.left,
      y: y - this.elRect.top
    }
  }

  //  设置只读模式、编辑模式
  setMode(mode) {
    if (![CONSTANTS.MODE.READONLY, CONSTANTS.MODE.EDIT].includes(mode)) {
      return
    }
    this.opt.readonly = mode === CONSTANTS.MODE.READONLY
    if (this.opt.readonly) {
      // 取消当前激活的元素
      this.execCommand('CLEAR_ACTIVE_NODE')
    }
    this.emit('mode_change', mode)
  }

  // 获取svg数据
  getSvgData({ paddingX = 0, paddingY = 0, ignoreWatermark = false } = {}) {
    const svg = this.svg
    const draw = this.draw
    // 保存原始信息
    const origWidth = svg.width()
    const origHeight = svg.height()
    const origTransform = draw.transform()
    const elRect = this.elRect
    // 去除放大缩小的变换效果
    draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY)
    // 获取变换后的位置尺寸信息，其实是getBoundingClientRect方法的包装方法
    const rect = draw.rbox()
    // 内边距
    rect.width += paddingX * 2
    rect.height += paddingY * 2
    draw.translate(paddingX, paddingY)
    // 将svg设置为实际内容的宽高
    svg.size(rect.width, rect.height)
    // 把实际内容变换
    draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
    // 克隆一份数据
    let clone = svg.clone()
    // 如果实际图形宽高超出了屏幕宽高，且存在水印的话需要重新绘制水印，否则会出现超出部分没有水印的问题
    if (
      !ignoreWatermark &&
      (rect.width > origWidth || rect.height > origHeight) &&
      this.watermark &&
      this.watermark.hasWatermark()
    ) {
      this.width = rect.width
      this.height = rect.height
      this.watermark.draw()
      clone = svg.clone()
      this.width = origWidth
      this.height = origHeight
      this.watermark.draw()
    }
    // 添加必要的样式
    clone.add(SVG(`<style>${cssContent}</style>`))
    // 修正关联线箭头marker的id
    const markerList = svg.find('marker')
    if (markerList && markerList.length > 0) {
      const id = markerList[0].attr('id')
      clone.find('marker').forEach(item => {
        item.attr('id', id)
      })
    }
    // 恢复原先的大小和变换信息
    svg.size(origWidth, origHeight)
    draw.transform(origTransform)

    return {
      svg: clone, // 思维导图图形的整体svg元素，包括：svg（画布容器）、g（实际的思维导图组）
      svgHTML: clone.svg(), // svg字符串
      rect: {
        ...rect, // 思维导图图形未缩放时的位置尺寸等信息
        ratio: rect.width / rect.height // 思维导图图形的宽高比
      },
      origWidth, // 画布宽度
      origHeight, // 画布高度
      scaleX: origTransform.scaleX, // 思维导图图形的水平缩放值
      scaleY: origTransform.scaleY // 思维导图图形的垂直缩放值
    }
  }

  // 添加插件
  addPlugin(plugin, opt) {
    let index = MindMap.hasPlugin(plugin)
    if (index === -1) {
      MindMap.usePlugin(plugin, opt)
      this.initPlugin(plugin)
    }
  }

  // 移除插件
  removePlugin(plugin) {
    let index = MindMap.hasPlugin(plugin)
    if (index !== -1) {
      MindMap.pluginList.splice(index, 1)
      if (this[plugin.instanceName]) {
        if (this[plugin.instanceName].beforePluginRemove) {
          this[plugin.instanceName].beforePluginRemove()
        }
        delete this[plugin.instanceName]
      }
    }
  }

  // 实例化插件
  initPlugin(plugin) {
    this[plugin.instanceName] = new plugin({
      mindMap: this,
      pluginOpt: plugin.pluginOpt
    })
  }

  // 销毁
  destroy() {
    this.emit('beforeDestroy')
    // 清除节点编辑框
    this.renderer.textEdit.hideEditTextBox()
    // 清除关联线文字编辑框
    if (this.associativeLine) {
      this.associativeLine.hideEditTextBox()
    }
    // 移除插件
    ;[...MindMap.pluginList].forEach(plugin => {
      if (this[plugin.instanceName].beforePluginDestroy) {
        this[plugin.instanceName].beforePluginDestroy()
      }
      this[plugin.instanceName] = null
    })
    // 解绑事件
    this.event.unbind()
    // 移除画布节点
    this.svg.remove()
    // 去除给容器元素设置的背景样式
    Style.removeBackgroundStyle(this.el)
    this.el.innerHTML = ''
    this.el = null
    this.removeCss()
  }
}

// 插件列表
MindMap.pluginList = []
MindMap.usePlugin = (plugin, opt = {}) => {
  if (MindMap.hasPlugin(plugin) !== -1) return MindMap
  plugin.pluginOpt = opt
  MindMap.pluginList.push(plugin)
  return MindMap
}
MindMap.hasPlugin = plugin => {
  return MindMap.pluginList.findIndex(item => {
    return item === plugin
  })
}

// 定义新主题
MindMap.defineTheme = (name, config = {}) => {
  if (theme[name]) {
    return new Error('该主题名称已存在')
  }
  theme[name] = merge(defaultTheme, config)
}

export default MindMap
