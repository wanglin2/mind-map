import { CONSTANTS } from './constant'

// 默认选项配置
export const defaultOpt = {
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
  mousewheelAction: CONSTANTS.MOUSE_WHEEL_ACTION.ZOOM, // zoom（放大缩小）、move（上下移动）
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
    open: '', // svg字符串
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
  beforeTextEdit: null,
  // 是否开启自定义节点内容
  isUseCustomNodeContent: false,
  // 自定义返回节点内容的方法
  customCreateNodeContent: null
}
