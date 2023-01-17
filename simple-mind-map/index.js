import View from './src/View'
import Event from './src/Event'
import Render from './src/Render'
import merge from 'deepmerge'
import theme from './src/themes'
import Style from './src/Style'
import KeyCommand from './src/KeyCommand'
import Command from './src/Command'
import BatchExecution from './src/BatchExecution'
import Export from './src/Export'
import Select from './src/Select'
import { layoutValueList } from './src/utils/constant'
import { SVG } from '@svgdotjs/svg.js'
import { simpleDeepClone } from './src/utils'
import KeyboardNavigation from './src/KeyboardNavigation'
import defaultTheme from './src/themes/default'

// 默认选项配置
const defaultOpt = {
  // 是否只读
  readonly: false,
  // 布局
  layout: 'logicalStructure',
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
  }
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
    this.uid = 0

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

    // 导出类
    this.doExport = new Export({
      mindMap: this
    })

    // 选择类
    this.select = new Select({
      mindMap: this
    })

    // 键盘导航类
    this.keyboardNavigation = new KeyboardNavigation({
      mindMap: this
    })

    // 批量执行类
    this.batchExecution = new BatchExecution()

    // 注册插件
    MindMap.pluginList.forEach((plugin) => {
      this[plugin.instanceName] = new plugin({
        mindMap: this
      })
    })

    // 初始渲染
    this.reRender()
    setTimeout(() => {
      this.command.addHistory()
    }, 0)
  }

  //  配置参数处理
  handleOpt(opt) {
    // 检查布局配置
    if (!layoutValueList.includes(opt.layout)) {
      opt.layout = 'logicalStructure'
    }
    // 检查主题配置
    opt.theme = opt.theme && theme[opt.theme] ? opt.theme : 'default'
    return opt
  }

  //  渲染，部分渲染
  render() {
    this.batchExecution.push('render', () => {
      this.initTheme()
      this.renderer.reRender = false
      this.renderer.render()
    })
  }

  //  重新渲染
  reRender() {
    this.batchExecution.push('render', () => {
      this.draw.clear()
      this.initTheme()
      this.renderer.reRender = true
      this.renderer.render()
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
    this.reRender()
  }

  //  获取当前主题
  getTheme() {
    return this.opt.theme
  }

  //  设置主题配置
  setThemeConfig(config) {
    this.opt.themeConfig = config
    this.reRender()
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
      layout = 'logicalStructure'
    }
    this.opt.layout = layout
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
    this.renderer.renderTree = data
    this.reRender()
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
    if (!['readonly', 'edit'].includes(mode)) {
      return
    }
    this.opt.readonly = mode === 'readonly'
    if (this.opt.readonly) {
      // 取消当前激活的元素
      this.renderer.clearAllActive()
    }
    this.emit('mode_change', mode)
  }

  // 获取svg数据
  getSvgData() {
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
    // 将svg设置为实际内容的宽高
    svg.size(rect.width, rect.height)
    // 把实际内容变换
    draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
    // 克隆一份数据
    const clone = svg.clone()
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
}

// 插件列表
MindMap.pluginList = []
MindMap.usePlugin = (plugin) => {
  MindMap.pluginList.push(plugin)
  return MindMap
}

// 定义新主题
MindMap.defineTheme = (name, config = {}) => {
  if (theme[name]) {
    return new Error('该主题名称已存在')
  }
  theme[name] = merge(defaultTheme, config)
}

export default MindMap
