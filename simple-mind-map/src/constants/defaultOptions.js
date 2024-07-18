import { CONSTANTS } from './constant'

// 默认选项配置
export const defaultOpt = {
  // 【基本】
  // 容器元素，必传，必须为DOM元素
  el: null,
  // 思维导图回显数据
  data: null,
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
  scaleRatio: 0.2,
  // 鼠标缩放是否以鼠标当前位置为中心点，否则以画布中心点
  mouseScaleCenterUseMousePosition: true,
  // 最多显示几个标签
  maxTag: 5,
  // 标签显示的位置，相对于节点文本，bottom（下方）、right（右侧）
  tagPosition: CONSTANTS.TAG_POSITION.RIGHT,
  // 展开收缩按钮尺寸
  expandBtnSize: 20,
  // 节点里图片和文字的间距
  imgTextMargin: 5,
  // 节点里各种文字信息的间距，如图标和文字的间距
  textContentMargin: 2,
  // 自定义节点备注内容显示
  customNoteContentShow: null,
  /*
          {
              show(){},
              hide(){}
          }
      */
  // 达到该宽度文本自动换行
  textAutoWrapWidth: 500,
  // 自定义鼠标滚轮事件处理
  // 可以传一个函数，回调参数为事件对象
  customHandleMousewheel: null,
  // 鼠标滚动的行为，如果customHandleMousewheel传了自定义函数，这个属性不生效
  mousewheelAction: CONSTANTS.MOUSE_WHEEL_ACTION.MOVE, // zoom（放大缩小）、move（上下移动）
  // 当mousewheelAction设为move时，可以通过该属性控制鼠标滚动一下视图移动的步长，单位px
  mousewheelMoveStep: 100,
  // 当mousewheelAction设为zoom时，或者按住Ctrl键时，默认向前滚动是缩小，向后滚动是放大，如果该属性设为true，那么会反过来
  mousewheelZoomActionReverse: true,
  // 默认插入的二级节点的文字
  defaultInsertSecondLevelNodeText: '二级节点',
  // 默认插入的二级以下节点的文字
  defaultInsertBelowSecondLevelNodeText: '分支主题',
  // 展开收起按钮的颜色
  expandBtnStyle: {
    color: '#808080',
    fill: '#fff',
    fontSize: 13,
    strokeColor: '#333333'
  },
  // 自定义展开收起按钮的图标
  expandBtnIcon: {
    open: '', // svg字符串
    close: ''
  },
  // 处理收起节点数量
  expandBtnNumHandler: num => {
    return num
  },
  // 是否显示带数量的收起按钮
  isShowExpandNum: true,
  // 是否只有当鼠标在画布内才响应快捷键事件
  enableShortcutOnlyWhenMouseInSvg: true,
  // 初始根节点的位置
  initRootNodePosition: null,
  // 节点文本编辑框的z-index
  nodeTextEditZIndex: 3000,
  // 节点备注浮层的z-index
  nodeNoteTooltipZIndex: 3000,
  // 是否在点击了画布外的区域时结束节点文本的编辑状态
  isEndNodeTextEditOnClickOuter: true,
  // 最大历史记录数
  maxHistoryCount: 500,
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
  // 思维导图适应画布大小时的内边距
  fitPadding: 50,
  // 是否开启按住ctrl键多选节点功能
  enableCtrlKeyNodeSelection: true,
  // 设置为左键多选节点，右键拖动画布
  useLeftKeySelectionRightKeyDrag: false,
  // 节点即将进入编辑前的回调方法，如果该方法返回true以外的值，那么将取消编辑，函数可以返回一个值，或一个Promise，回调参数为节点实例
  beforeTextEdit: null,
  // 是否开启自定义节点内容
  isUseCustomNodeContent: false,
  // 自定义返回节点内容的方法
  customCreateNodeContent: null,
  // 指定内部一些元素（节点文本编辑元素、节点备注显示元素、关联线文本编辑元素、节点图片调整按钮元素）添加到的位置，默认添加到document.body下
  customInnerElsAppendTo: null,
  // 是否在存在一个激活节点时，当按下中文、英文、数字按键时自动进入文本编辑模式
  // 开启该特性后，需要给你的输入框绑定keydown事件，并禁止冒泡
  enableAutoEnterTextEditWhenKeydown: false,
  // 自定义对剪贴板文本的处理。当按ctrl+v粘贴时会读取用户剪贴板中的文本和图片，默认只会判断文本是否是普通文本和simple-mind-map格式的节点数据，如果你想处理其他思维导图的数据，比如processon、zhixi等，那么可以传递一个函数，接受当前剪贴板中的文本为参数，返回处理后的数据，可以返回两种类型：
  /*
    1.返回一个纯文本，那么会直接以该文本创建一个子节点

    2.返回一个节点对象，格式如下：
      {
        // 代表是simple-mind-map格式的数据
        simpleMindMap: true,
        // 节点数据，同simple-mind-map节点数据格式
        data: {
          data: {
            text: ''
          },
          children: []
        }
      }
  */
  // 如果你的处理逻辑存在异步逻辑，也可以返回一个promise
  customHandleClipboardText: null,
  // 禁止鼠标滚轮缩放，你仍旧可以使用api进行缩放
  disableMouseWheelZoom: false,
  // 错误处理函数
  errorHandler: (code, error) => {
    console.error(code, error)
  },
  // 是否在鼠标双击时回到根节点，也就是让根节点居中显示
  enableDblclickBackToRootNode: false,
  // 节点鼠标hover和激活时显示的矩形边框的颜色
  hoverRectColor: 'rgb(94, 200, 248)',
  // 节点鼠标hover和激活时显示的矩形边框距节点内容的距离
  hoverRectPadding: 2,
  // 双击节点进入节点文本编辑时是否默认选中文本，默认只在创建新节点时会选中
  selectTextOnEnterEditText: false,
  // 删除节点后激活相邻节点
  deleteNodeActive: true,
  // 是否首次加载fit view
  fit: false,
  // 自定义标签的颜色
  // {pass: 'green, unpass: 'red'}
  tagsColorMap: {},
  // 节点协作样式配置
  cooperateStyle: {
    avatarSize: 22, // 头像大小
    fontSize: 12 // 如果是文字头像，那么文字的大小
  },
  // 协同编辑时，同一个节点不能同时被多人选中
  onlyOneEnableActiveNodeOnCooperate: false,
  // 插入概要的默认文本
  defaultGeneralizationText: '概要',
  // 粘贴文本的方式创建新节点时，控制是否按换行自动分割节点，即如果存在换行，那么会根据换行创建多个节点，否则只会创建一个节点
  // 可以传递一个函数，返回promise，resolve代表根据换行分割，reject代表忽略换行
  handleIsSplitByWrapOnPasteCreateNewNode: null,
  // 多少时间内只允许添加一次历史记录，避免添加没有必要的中间状态，单位：ms
  addHistoryTime: 100,
  // 是否禁止拖动画布
  isDisableDrag: false,
  // 鼠标移入概要高亮所属节点时的高亮框样式
  highlightNodeBoxStyle: {
    stroke: 'rgb(94, 200, 248)',
    fill: 'transparent'
  },
  // 创建新节点时的行为
  /*
    DEFAULT  ：默认会激活新创建的节点，并且进入编辑模式。如果同时创建了多个新节点，那么只会激活而不会进入编辑模式
    NOT_ACTIVE  : 不激活新创建的节点
    ACTIVE_ONLY  : 只激活新创建的节点，不进入编辑模式
  */
  createNewNodeBehavior: CONSTANTS.CREATE_NEW_NODE_BEHAVIOR.DEFAULT,
  // 当节点图片加载失败时显示的默认图片
  defaultNodeImage: '',
  // 是否将思维导图限制在画布内
  // 比如向右拖动时，思维导图图形的最左侧到达画布中心时将无法继续向右拖动，其他同理
  isLimitMindMapInCanvas: false,
  // 在节点上粘贴剪贴板中的图片的处理方法，默认是转换为data:url数据插入到节点中，你可以通过该方法来将图片数据上传到服务器，实现保存图片的url
  // 可以传递一个异步方法，接收Blob类型的图片数据，需要返回如下结构：
  /*
    {
      url,    // 图片url
      size: {
        width,  // 图片的宽度
        height  //图片的高度
      }
    }
  */
  handleNodePasteImg: null,
  // 自定义创建节点形状的方法，可以传一个函数，均接收一个参数
  // 矩形、圆角矩形、椭圆、圆等形状会调用该方法
  // 接收svg path字符串，返回svg节点
  customCreateNodePath: null,
  // 菱形、平行四边形、八角矩形、外三角矩形、内三角矩形等形状会调用该方法
  // 接收points数组点位，返回svg节点
  customCreateNodePolygon: null,
  // 自定义转换节点连线路径的方法
  // 接收svg path字符串，返回转换后的svg path字符串
  customTransformNodeLinePath: null,
  // 快捷键操作即将执行前的生命周期函数，返回true可以阻止操作执行
  // 函数接收两个参数：key（快捷键）、activeNodeList（当前激活的节点列表）
  beforeShortcutRun: null,
  // 移动节点到画布中心、回到根节点等操作时是否将缩放层级复位为100%
  // 该选项实际影响的是render.moveNodeToCenter方法，moveNodeToCenter方法本身也存在第二个参数resetScale来设置是否复位，如果resetScale参数没有传递，那么使用resetScaleOnMoveNodeToCenter配置，否则使用resetScale配置
  resetScaleOnMoveNodeToCenter: false,
  // 添加附加的节点前置内容，前置内容指和文本同一行的区域中的前置内容，不包括节点图片部分
  createNodePrefixContent: null,
  // 添加附加的节点后置内容，后置内容指和文本同一行的区域中的后置内容，不包括节点图片部分
  createNodePostfixContent: null,
  // 禁止粘贴用户剪贴板中的数据，禁止将复制的数据写入用户的剪贴板中
  disabledClipboard: false,
  // 自定义超链接的跳转
  // 如果不传，默认会以新窗口的方式打开超链接，可以传递一个函数，函数接收两个参数：link（超链接的url）、node（所属节点实例），只要传递了函数，就会阻止默认的跳转
  customHyperlinkJump: null,

  // 【Select插件】
  // 多选节点时鼠标移动到边缘时的画布移动偏移量
  selectTranslateStep: 3,
  // 多选节点时鼠标移动距边缘多少距离时开始偏移
  selectTranslateLimit: 20,

  // 【Drag插件】
  // 是否开启节点自由拖拽
  enableFreeDrag: false,
  // 拖拽节点时鼠标移动到画布边缘是否开启画布自动移动
  autoMoveWhenMouseInEdgeOnDrag: true,
  // 拖拽多个节点时随鼠标移动的示意矩形的样式配置
  dragMultiNodeRectConfig: {
    width: 40,
    height: 20,
    fill: 'rgb(94, 200, 248)' // 填充颜色
  },
  // 节点拖拽时新位置的示意矩形的填充颜色
  dragPlaceholderRectFill: 'rgb(94, 200, 248)',
  // 节点拖拽时新位置的示意连线的样式配置
  dragPlaceholderLineConfig: {
    color: 'rgb(94, 200, 248)',
    width: 2
  },
  // 节点拖拽时的透明度配置
  dragOpacityConfig: {
    cloneNodeOpacity: 0.5, // 跟随鼠标移动的克隆节点或矩形的透明度
    beingDragNodeOpacity: 0.3 // 被拖拽节点的透明度
  },
  // 拖拽单个节点时会克隆被拖拽节点，如果想修改该克隆节点，那么可以通过该选项提供一个处理函数，函数接收克隆节点对象
  // 需要注意的是节点对象指的是@svgdotjs/svg.js库的元素对象，所以你需要阅读该库的文档来操作该对象
  handleDragCloneNode: null,
  // 即将拖拽完成前调用该函数，函数接收一个对象作为参数：{overlapNodeUid,prevNodeUid,nextNodeUid}，代表拖拽信息，如果要阻止本次拖拽，那么可以返回true，此时node_dragend事件不会再触发。函数可以是异步函数，返回Promise实例
  beforeDragEnd: null,
  // 即将开始调整节点前调用该函数，函数接收当前即将被拖拽的节点实例列表作为参数，如果要阻止本次拖拽，那么可以返回true
  beforeDragStart: null,

  // 【Watermark插件】
  // 水印配置
  watermarkConfig: {
    onlyExport: false, // 是否仅在导出时添加水印
    text: '',
    lineSpacing: 100,
    textSpacing: 100,
    angle: 30,
    textStyle: {
      color: '#999',
      opacity: 0.5,
      fontSize: 14
    },
    belowNode: false
  },

  // 【Export插件】
  // 导出png、svg、pdf时的图形内边距，注意是单侧内边距
  exportPaddingX: 10,
  exportPaddingY: 10,
  // 设置导出图片和svg时，针对富文本节点内容，也就是嵌入到svg中的html节点的默认样式覆盖
  // 如果不覆盖，会发生偏移问题
  resetCss: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `,
  // 导出图片时canvas的缩放倍数，该配置会和window.devicePixelRatio值取最大值
  minExportImgCanvasScale: 2,
  // 导出png、svg、pdf时在头部和尾部添加自定义内容
  // 可传递一个函数，这个函数可以返回null代表不添加内容，也可以返回如下数据：
  /*
    {
      el,// 要追加的自定义DOM节点，样式可内联
      cssText,// 可选，如果样式不想内联，可以传递该值，一个css字符串
      height: 50// 返回的DOM节点的高度，必须传递
    }
  */
  addContentToHeader: null,
  addContentToFooter: null,
  // 导出png、svg、pdf时会获取画布上的svg数据进行克隆，然后通过该克隆的元素进行导出，如果你想对该克隆元素做一些处理，比如新增、替换、修改其中的一些元素，那么可以通过该参数传递一个处理函数，接收svg元素对象，处理后，需要返回原svg元素对象。
  // 需要注意的是svg对象指的是@svgdotjs/svg.js库的元素对象，所以你需要阅读该库的文档来操作该对象
  handleBeingExportSvg: null,

  // 【AssociativeLine插件】
  // 关联线默认文字
  defaultAssociativeLineText: '关联',
  // 关联线是否始终显示在节点上层
  // false：即创建关联线和激活关联线时处于最顶层，其他情况下处于节点下方
  associativeLineIsAlwaysAboveNode: true,
  // 默认情况下，新创建的关联线两个端点的位置是根据两个节点中心点的相对位置来计算的，如果你想固定位置，可以通过这个属性来配置
  // from和to都不传，则都自动计算，如果只传一个，另一个则会自动计算
  associativeLineInitPointsPosition: {
    // from和to可选值：left、top、bottom、right
    from: '', // 关联线起始节点上端点的位置
    to: '' // 关联线目标节点上端点的位置
  },
  // 是否允许调整关联线两个端点的位置
  enableAdjustAssociativeLinePoints: true,

  // 【TouchEvent插件】
  // 禁止双指缩放，你仍旧可以使用api进行缩放
  // 需要注册TouchEvent插件后生效
  disableTouchZoom: false,
  // 允许最大和最小的缩放值，百分数
  // 传-1代表不限制
  minTouchZoomScale: 20,
  maxTouchZoomScale: -1,

  // 【Scrollbar插件】
  // 当注册了滚动条插件（Scrollbar）时，是否将思维导图限制在画布内，isLimitMindMapInCanvas不再起作用
  isLimitMindMapInCanvasWhenHasScrollbar: true,

  // 【Search插件】
  // 是否仅搜索当前渲染的节点，被收起的节点不会被搜索到
  isOnlySearchCurrentRenderNodes: false,

  // 【Cooperate插件】
  // 协同编辑时，节点操作即将更新到其他客户端前的生命周期函数
  // 函数接收一个对象作为参数：
  /*
    {
      type: createOrUpdate（创建节点或更新节点）、delete（删除节点）
      data: 1.当type=createOrUpdate时，代表被创建或被更新的节点数据，即将同步到其他客户端，所以你可以修改该数据；2.当type=delete时，代表被删除的节点数据
    }
  */
  beforeCooperateUpdate: null,

  // 【RainbowLines插件】
  // 彩虹线条配置，需要先注册RainbowLines插件
  rainbowLinesConfig: {
    open: false, // 是否开启彩虹线条
    colorsList: [] // 自定义彩虹线条的颜色列表，如果不设置，会使用默认颜色列表
    /*
    [
      'rgb(255, 213, 73)',
      'rgb(255, 136, 126)',
      'rgb(107, 225, 141)',
      'rgb(151, 171, 255)',
      'rgb(129, 220, 242)',
      'rgb(255, 163, 125)',
      'rgb(152, 132, 234)'
    ]
    */
  },

  // 【Demonstrate插件】
  // 演示插件配置
  demonstrateConfig: null,

  // 【Formula插件】
  // 是否开启在富文本编辑框中直接编辑数学公式
  enableEditFormulaInRichTextEdit: true,
  // katex库的字体文件的请求路径。仅当katex的output配置为html时才会请求字体文件。可以通过mindMap.formula.getKatexConfig()方法来获取当前的配置
  // 字体文件可以从node_modules中找到：katex/dist/fonts/。可以上传到你的服务器或cdn
  // 最终的字体请求路径为`${katexFontPath}fonts/KaTeX_AMS-Regular.woff2`，可以自行拼接进行测试是否可以访问
  katexFontPath: 'https://unpkg.com/katex@0.16.11/dist/',
  // 自定义katex库的输出模式。默认当Chrome内核100以下会使用html方式，否则使用mathml方式，如果你有自己的规则，那么可以传递一个函数，函数返回值为：mathml或html
  getKatexOutputType: null,

  // 【RichText插件】
  // 转换富文本内容，当进入富文本编辑时，可以通过该参数传递一个函数，函数接收文本内容，需要返回你处理后的文本内容
  transformRichTextOnEnterEdit: null,
  // 可以传递一个函数，即将结束富文本编辑前会执行该函数，函数接收richText实例，所以你可以在此时机更新quill文档数据
  beforeHideRichTextEdit: null,
  // 设置富文本节点编辑框和节点大小一致，形成伪原地编辑的效果
  // 需要注意的是，只有当节点内只有文本、且形状是矩形才会有比较好的效果
  richTextEditFakeInPlace: false,

  // 【OuterFrame】插件
  outerFramePaddingX: 10,
  outerFramePaddingY: 10
}
