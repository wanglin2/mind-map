import View from './src/core/view/View'
import Event from './src/core/event/Event'
import Render from './src/core/render/Render'
import merge from 'deepmerge'
import theme from './src/themes'
import Style from './src/core/render/node/Style'
import KeyCommand from './src/core/command/KeyCommand'
import Command from './src/core/command/Command'
import BatchExecution from './src/utils/BatchExecution'
import { layoutValueList, CONSTANTS } from './src/constants/constant'
import { SVG } from '@svgdotjs/svg.js'
import { simpleDeepClone } from './src/utils'
import defaultTheme, { checkIsNodeSizeIndependenceConfig } from './src/themes/default'

// 默认选项配置
const defaultOpt = {
  // 是否只读
  readonly: false,
  // 布局
  layout: CONSTANTS.LAYOUT.LOGICAL_STRUCTURE,
  // 如果结构为鱼骨图，那么可以通过该选项控制倾斜角度
  fishboneDeg: 45,
  // 主题
  theme: 'default', // 内置主题：default（默认主题）
  // 主题配置，会和所选择的主题进行合并
  themeConfig: {},
  // 放大缩小的增量比例
  scaleRatio: 0.1,
  // 最多显示几个标签
  maxTag: 5,
  // 导出图片时的内边距
  exportPadding: 20,
  // 展开收缩按钮尺寸
  expandBtnSize: 20,
  // 节点里图片和文字的间距
  imgTextMargin: 5,
  // 节点里各种文字信息的间距，如图标和文字的间距
  textContentMargin: 2,
  // 多选节点时鼠标移动到边缘时的画布移动偏移量
  selectTranslateStep: 3,
  // 多选节点时鼠标移动距边缘多少距离时开始偏移
  selectTranslateLimit: 20,
  // 自定义节点备注内容显示
  customNoteContentShow: null,
  /*
        {
            show(){},
            hide(){}
        }
    */
  // 是否开启节点自由拖拽
  enableFreeDrag: false,
  // 水印配置
  watermarkConfig: {
    text: '',
    lineSpacing: 100,
    textSpacing: 100,
    angle: 30,
    textStyle: {
      color: '#999',
      opacity: 0.5,
      fontSize: 14
    }
  },
  // 达到该宽度文本自动换行
  textAutoWrapWidth: 500,
  // 自定义鼠标滚轮事件处理
  // 可以传一个函数，回调参数为事件对象
  customHandleMousewheel: null,
  // 鼠标滚动的行为，如果customHandleMousewheel传了自定义函数，这个属性不生效
  mousewheelAction: CONSTANTS.MOUSE_WHEEL_ACTION.ZOOM,// zoom（放大缩小）、move（上下移动）
  // 当mousewheelAction设为move时，可以通过该属性控制鼠标滚动一下视图移动的步长，单位px
  mousewheelMoveStep: 100,
  // 默认插入的二级节点的文字
  defaultInsertSecondLevelNodeText: '二级节点',
  // 默认插入的二级以下节点的文字
  defaultInsertBelowSecondLevelNodeText: '分支主题',
  // 展开收起按钮的颜色
  expandBtnStyle: {
    color: '#808080',
    fill: '#fff'
  },
  // 自定义展开收起按钮的图标
  expandBtnIcon: {
    open: '',// svg字符串
    close: ''
  },
  // 是否只有当鼠标在画布内才响应快捷键事件
  enableShortcutOnlyWhenMouseInSvg: true,
  // 是否开启节点动画过渡
  enableNodeTransitionMove: true,
  // 如果开启节点动画过渡，可以通过该属性设置过渡的时间，单位ms
  nodeTransitionMoveDuration: 300,
  // 初始根节点的位置
  initRootNodePosition: null,
  // 导出png、svg、pdf时的图形内边距
  exportPaddingX: 10,
  exportPaddingY: 10,
  // 节点文本编辑框的z-index
  nodeTextEditZIndex: 3000,
  // 节点备注浮层的z-index
  nodeNoteTooltipZIndex: 3000,
  // 是否在点击了画布外的区域时结束节点文本的编辑状态
  isEndNodeTextEditOnClickOuter: true,
  // 最大历史记录数
  maxHistoryCount: 1000,
  // 是否一直显示节点的展开收起按钮，默认为鼠标移上去和激活时才显示
  alwaysShowExpandBtn: false,
  // 扩展节点可插入的图标
  iconList: [
    // {
    //   name: '',// 分组名称
    //   type: '',// 分组的值
    //   list: [// 分组下的图标列表
    //     {
    //       name: '',// 图标名称
    //       icon:''// 图标，可以传svg或图片
    //     }
    //   ]
    // }
  ],
  // 节点最大缓存数量
  maxNodeCacheCount: 1000,
  // 关联线默认文字
  defaultAssociativeLineText: '关联',
  // 思维导图适应画布大小时的内边距
  fitPadding: 50,
  // 是否开启按住ctrl键多选节点功能
  enableCtrlKeyNodeSelection: true,
  // 设置为左键多选节点，右键拖动画布
  useLeftKeySelectionRightKeyDrag: false,
  // 节点即将进入编辑前的回调方法，如果该方法返回true以外的值，那么将取消编辑，函数可以返回一个值，或一个Promise，回调参数为节点实例
  beforeTextEdit: null
}

//  思维导图
class MindMap {
  //  构造函数
  constructor(opt = {}) {
    // 合并选项
    this.opt = this.handleOpt(merge(defaultOpt, opt))

    // 容器元素
    this.el = this.opt.el
    this.elRect = this.el.getBoundingClientRect()

    // 画布宽高
    this.width = this.elRect.width
    this.height = this.elRect.height

    // 画布
    this.svg = SVG().addTo(this.el).size(this.width, this.height)
    this.draw = this.svg.group()

    // 节点id
    this.uid = 1

    // 初始化主题
    this.initTheme()

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
      mindMap: this,
      draw: this.draw
    })

    // 批量执行类
    this.batchExecution = new BatchExecution()

    // 注册插件
    MindMap.pluginList.forEach((plugin) => {
      this.initPlugin(plugin)
    })

    // 初始渲染
    this.render()
    setTimeout(() => {
      this.command.addHistory()
    }, 0)
  }

  //  配置参数处理
  handleOpt(opt) {
    // 检查布局配置
    if (!layoutValueList.includes(opt.layout)) {
      opt.layout = CONSTANTS.LAYOUT.LOGICAL_STRUCTURE
    }
    // 检查主题配置
    opt.theme = opt.theme && theme[opt.theme] ? opt.theme : 'default'
    return opt
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
      this.draw.clear()
      this.initTheme()
      this.renderer.reRender = true
      this.renderer.render(callback, source)
    })
  }

  //  容器尺寸变化，调整尺寸
  resize() {
    this.elRect = this.el.getBoundingClientRect()
    this.width = this.elRect.width
    this.height = this.elRect.height
    this.svg.size(this.width, this.height)
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

  //  设置主题
  initTheme() {
    // 合并主题配置
    this.themeConfig = merge(theme[this.opt.theme], this.opt.themeConfig)
    // 设置背景样式
    Style.setBackgroundStyle(this.el, this.themeConfig)
  }

  //  设置主题
  setTheme(theme) {
    this.renderer.clearAllActive()
    this.opt.theme = theme
    this.render(null, CONSTANTS.CHANGE_THEME)
  }

  //  获取当前主题
  getTheme() {
    return this.opt.theme
  }

  //  设置主题配置
  setThemeConfig(config) {
    this.opt.themeConfig = config
    // 检查改变的是否是节点大小无关的主题属性
    let res = checkIsNodeSizeIndependenceConfig(config)
    this.render(null, res ? '' : CONSTANTS.CHANGE_THEME)
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
  setLayout(layout) {
    // 检查布局配置
    if (!layoutValueList.includes(layout)) {
      layout = CONSTANTS.LAYOUT.LOGICAL_STRUCTURE
    }
    this.opt.layout = layout
    this.view.reset()
    this.renderer.setLayout()
    this.render()
  }

  //  执行命令
  execCommand(...args) {
    this.command.exec(...args)
  }

  //  动态设置思维导图数据，纯节点数据
  setData(data) {
    this.execCommand('CLEAR_ACTIVE_NODE')
    this.command.clearHistory()
    this.command.addHistory()
    if (this.richText) {
      this.renderer.renderTree = this.richText.handleSetData(data)
    } else {
      this.renderer.renderTree = data
    }
    this.reRender(() => {}, CONSTANTS.SET_DATA)
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
    let nodeData = this.command.removeDataUid(this.command.getCopyData())
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
    let result = await this.doExport.export(...args)
    return result
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
      this.renderer.clearAllActive()
    }
    this.emit('mode_change', mode)
  }

  // 获取svg数据
  getSvgData({ paddingX = 0, paddingY = 0 } = {}) {
    const svg = this.svg
    const draw = this.draw
    // 保存原始信息
    const origWidth = svg.width()
    const origHeight = svg.height()
    const origTransform = draw.transform()
    const elRect = this.el.getBoundingClientRect()
    // 去除放大缩小的变换效果
    draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY)
    // 获取变换后的位置尺寸信息，其实是getBoundingClientRect方法的包装方法
    const rect = draw.rbox()
    // 内边距
    rect.width += paddingX
    rect.height += paddingY
    draw.translate(paddingX / 2, paddingY / 2)
    // 将svg设置为实际内容的宽高
    svg.size(rect.width, rect.height)
    // 把实际内容变换
    draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
    // 克隆一份数据
    let clone = svg.clone()
    // 如果实际图形宽高超出了屏幕宽高，且存在水印的话需要重新绘制水印，否则会出现超出部分没有水印的问题
    if ((rect.width > origWidth || rect.height >  origHeight) && this.watermark && this.watermark.hasWatermark()) {
      this.width = rect.width
      this.height = rect.height
      this.watermark.draw()
      clone = svg.clone()
      this.width = origWidth
      this.height = origHeight
      this.watermark.draw()
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
    // 移除插件
    [...MindMap.pluginList].forEach((plugin) => {
      this[plugin.instanceName] = null
    })
    // 解绑事件
    this.event.unbind()
    // 移除画布节点
    this.svg.remove()
    // 去除给容器元素设置的背景样式
    Style.removeBackgroundStyle(this.el)
    this.el = null
  }
}

// 插件列表
MindMap.pluginList = []
MindMap.usePlugin = (plugin, opt = {}) => {
  plugin.pluginOpt = opt
  MindMap.pluginList.push(plugin)
  return MindMap
}
MindMap.hasPlugin = (plugin) => {
  return MindMap.pluginList.findIndex((item) => {
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
