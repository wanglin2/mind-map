//  默认主题
export default {
  // 节点内边距
  paddingX: 15,
  paddingY: 5,
  // 图片显示的最大宽度
  imgMaxWidth: 200,
  // 图片显示的最大高度
  imgMaxHeight: 100,
  // icon的大小
  iconSize: 20,
  // 连线的粗细
  lineWidth: 1,
  // 连线的颜色
  lineColor: '#549688',
  // 连线样式
  lineDasharray: 'none',
  // 连线是否开启流动效果，仅在虚线时有效（需要注册LineFlow插件）
  lineFlow: false,
  // 流动效果一个周期的时间，单位：s
  lineFlowDuration: 1,
  // 流动方向是否是从父节点到子节点
  lineFlowForward: true,
  // 连线风格
  lineStyle: 'straight', // 曲线（curve）【仅支持logicalStructure、mindMap、verticalTimeline三种结构】、直线（straight）、直连（direct）【仅支持logicalStructure、mindMap、organizationStructure、verticalTimeline四种结构】
  // 曲线连接时，根节点和其他节点的连接线样式保持统一，默认根节点为 ( 型，其他节点为 { 型，设为true后，都为 { 型。仅支持logicalStructure、mindMap两种结构
  rootLineKeepSameInCurve: true,
  // 曲线连接时，根节点和其他节点的连线起始位置保持统一，默认根节点的连线起始位置在节点中心，其他节点在节点右侧（或左侧），如果该配置设为true，那么根节点的连线起始位置也会在节点右侧（或左侧）
  rootLineStartPositionKeepSameInCurve: false,
  // 直线连接(straight)时，连线的圆角大小，设置为0代表没有圆角，仅支持logicalStructure、mindMap、verticalTimeline三种结构
  lineRadius: 5,
  // 连线是否显示标记，目前只支持箭头
  showLineMarker: false,
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#549688',
  // 概要曲线距节点的距离
  generalizationLineMargin: 0,
  // 概要节点距节点的距离
  generalizationNodeMargin: 20,
  // 关联线默认状态的粗细
  associativeLineWidth: 2,
  // 关联线默认状态的颜色
  associativeLineColor: 'rgb(51, 51, 51)',
  // 关联线激活状态的粗细
  associativeLineActiveWidth: 8,
  // 关联线激活状态的颜色
  associativeLineActiveColor: 'rgba(2, 167, 240, 1)',
  // 关联线样式
  associativeLineDasharray: '6,4',
  // 关联线文字颜色
  associativeLineTextColor: 'rgb(51, 51, 51)',
  // 关联线文字大小
  associativeLineTextFontSize: 14,
  // 关联线文字行高
  associativeLineTextLineHeight: 1.2,
  // 关联线文字字体
  associativeLineTextFontFamily: '微软雅黑, Microsoft YaHei',
  // 背景颜色
  backgroundColor: '#fafafa',
  // 背景图片
  backgroundImage: 'none',
  // 背景重复
  backgroundRepeat: 'no-repeat',
  // 设置背景图像的起始位置
  backgroundPosition: 'center center',
  // 设置背景图片大小
  backgroundSize: 'cover',
  // 节点使用只有底边横线的样式，仅支持logicalStructure、mindMap、catalogOrganization、organizationStructure四种结构
  nodeUseLineStyle: false,
  // 根节点样式
  root: {
    shape: 'rectangle',
    fillColor: '#549688',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    borderColor: 'transparent',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    // 连线标记的位置，start（头部）、end（尾部），该配置在showLineMarker配置为true时生效
    lineMarkerDir: 'end',
    // 节点鼠标hover和激活时显示的矩形边框的颜色，主题里不设置，默认会取hoverRectColor实例化选项的值
    hoverRectColor: '',
    // 点鼠标hover和激活时显示的矩形边框的圆角大小
    hoverRectRadius: 5,
    // 文本对齐
    textAlign: 'left',// right、center、justify、left
    // 图片放置位置，相对于整个文本内容
    imgPlacement: 'top', // left、right、bottom、top
    // 标签放置位置
    tagPlacement: 'right' // right（文字右侧）、bottom（文本内容下方）
    // 下列样式也支持给节点设置，用于覆盖最外层的设置
    // paddingX,
    // paddingY,
    // lineWidth,
    // lineColor,
    // lineDasharray,
    // lineFlow,
    // lineFlowDuration,
    // lineFlowForward
    // 关联线的所有样式
  },
  // 二级节点样式
  second: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  // 三级及以下节点样式
  node: {
    shape: 'rectangle',
    marginX: 50,
    marginY: 0,
    fillColor: 'transparent',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#6a6d6c',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    borderDasharray: 'none',
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    lineMarkerDir: 'end',
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  },
  // 概要节点样式
  generalization: {
    shape: 'rectangle',
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    gradientStyle: false,
    startColor: '#549688',
    endColor: '#fff',
    startDir: [0, 0],
    endDir: [1, 0],
    hoverRectColor: '',
    hoverRectRadius: 5,
    textAlign: 'left',
    imgPlacement: 'top',
    tagPlacement: 'right'
  }
}

// 检测主题配置是否是节点大小无关的
const nodeSizeIndependenceList = [
  'lineWidth',
  'lineColor',
  'lineDasharray',
  'lineStyle',
  'generalizationLineWidth',
  'generalizationLineColor',
  'associativeLineWidth',
  'associativeLineColor',
  'associativeLineActiveWidth',
  'associativeLineActiveColor',
  'associativeLineTextColor',
  'associativeLineTextFontSize',
  'associativeLineTextLineHeight',
  'associativeLineTextFontFamily',
  'backgroundColor',
  'backgroundImage',
  'backgroundRepeat',
  'backgroundPosition',
  'backgroundSize',
  'rootLineKeepSameInCurve',
  'rootLineStartPositionKeepSameInCurve',
  'showLineMarker',
  'lineRadius',
  'hoverRectColor',
  'hoverRectRadius',
  'lineFlow',
  'lineFlowDuration',
  'lineFlowForward',
  'textAlign'
]
export const checkIsNodeSizeIndependenceConfig = config => {
  let keys = Object.keys(config)
  for (let i = 0; i < keys.length; i++) {
    if (
      !nodeSizeIndependenceList.find(item => {
        return item === keys[i]
      })
    ) {
      return false
    }
  }
  return true
}

// 连线的样式
export const lineStyleProps = [
  'lineColor',
  'lineDasharray',
  'lineWidth',
  'lineMarkerDir',
  'lineFlow',
  'lineFlowDuration',
  'lineFlowForward'
]
