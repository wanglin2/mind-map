//  标签颜色列表
export const tagColorList = [
  {
    color: 'rgb(77, 65, 0)',
    background: 'rgb(255, 244, 179)'
  },
  {
    color: 'rgb(0, 50, 77)',
    background: 'rgb(179, 229, 255)'
  },
  {
    color: 'rgb(77, 0, 73)',
    background: 'rgb(255, 179, 251)'
  },
  {
    color: 'rgb(57, 77, 0)',
    background: 'rgb(236, 255, 179)'
  },
  {
    color: 'rgb(0, 77, 47)',
    background: 'rgb(179, 255, 226)'
  }
]

//  主题列表
export const themeList = [
  {
    name: '默认',
    value: 'default',
  },
  {
    name: '暗色2',
    value: 'dark2',
  },
  {
    name: '天清绿',
    value: 'skyGreen',
  },
  {
    name: '脑图经典2',
    value: 'classic2',
  },
  {
    name: '脑图经典3',
    value: 'classic3',
  },
  {
    name: '经典绿',
    value: 'classicGreen',
  },
  {
    name: '经典蓝',
    value: 'classicBlue',
  },
  {
    name: '天空蓝',
    value: 'blueSky',
  },
  {
    name: '脑残粉',
    value: 'brainImpairedPink',
  },
  {
    name: '暗色',
    value: 'dark',
  },
  {
    name: '泥土黄',
    value: 'earthYellow',
  },
  {
    name: '清新绿',
    value: 'freshGreen',
  },
  {
    name: '清新红',
    value: 'freshRed',
  },
  {
    name: '浪漫紫',
    value: 'romanticPurple',
  },
  {
    name: '粉红葡萄',
    value: 'pinkGrape',
  },
  {
    name: '薄荷',
    value: 'mint',
  },
  {
    name: '金色vip',
    value: 'gold',
  },
  {
    name: '活力橙',
    value: 'vitalityOrange',
  },
  {
    name: '绿叶',
    value: 'greenLeaf',
  },
  {
    name: '脑图经典',
    value: 'classic',
  },
  {
    name: '脑图经典4',
    value: 'classic4',
  },
  {
    name: '小黄人',
    value: 'minions',
  },
  {
    name: '简约黑',
    value: 'simpleBlack',
  },
  {
    name: '课程绿',
    value: 'courseGreen',
  },
  {
    name: '咖啡',
    value: 'coffee',
  },
  {
    name: '红色精神',
    value: 'redSpirit',
  },
  {
    name: '黑色幽默',
    value: 'blackHumour',
  },
  {
    name: '深夜办公室',
    value: 'lateNightOffice',
  },
  {
    name: '黑金',
    value: 'blackGold',
  },
  {
    name: '牛油果',
    value: 'avocado',
  },
  {
    name: '秋天',
    value: 'autumn',
  },
  {
    name: '橙汁',
    value: 'orangeJuice',
  }
]

// 常量
export const CONSTANTS = {
  CHANGE_THEME: 'changeTheme',
  SET_DATA: 'setData',
  TRANSFORM_TO_NORMAL_NODE: 'transformAllNodesToNormalNode',
  MODE: {
    READONLY: 'readonly',
    EDIT: 'edit'
  },
  LAYOUT: {
    LOGICAL_STRUCTURE: 'logicalStructure',
    MIND_MAP: 'mindMap',
    ORGANIZATION_STRUCTURE: 'organizationStructure',
    CATALOG_ORGANIZATION: 'catalogOrganization',
    TIMELINE: 'timeline',
    TIMELINE2: 'timeline2',
    FISHBONE: 'fishbone'
  },
  DIR: {
    UP: 'up',
    LEFT: 'left',
    DOWN: 'down',
    RIGHT: 'right'
  },
  KEY_DIR: {
    LEFT: 'Left',
    UP: 'Up',
    RIGHT: 'Right',
    DOWN: 'Down'
  },
  SHAPE: {
    RECTANGLE: 'rectangle',
    DIAMOND: 'diamond',
    PARALLELOGRAM: 'parallelogram',
    ROUNDED_RECTANGLE: 'roundedRectangle',
    OCTAGONAL_RECTANGLE: 'octagonalRectangle',
    OUTER_TRIANGULAR_RECTANGLE: 'outerTriangularRectangle',
    INNER_TRIANGULAR_RECTANGLE: 'innerTriangularRectangle',
    ELLIPSE: 'ellipse',
    CIRCLE: 'circle'
  },
  MOUSE_WHEEL_ACTION: {
    ZOOM: 'zoom',
    MOVE: 'move'
  },
  INIT_ROOT_NODE_POSITION: {
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    CENTER: 'center'
  },
  TIMELINE_DIR: {
    TOP: 'top',
    BOTTOM: 'bottom'
  }
}

export const initRootNodePositionMap = {
  [CONSTANTS.INIT_ROOT_NODE_POSITION.LEFT]: 0,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.TOP]: 0,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.RIGHT]: 1,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.BOTTOM]: 1,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.CENTER]: 0.5,
}

//  布局结构列表
export const layoutList = [
  {
    name: '逻辑结构图',
    value: CONSTANTS.LAYOUT.LOGICAL_STRUCTURE,
  },
  {
    name: '思维导图',
    value: CONSTANTS.LAYOUT.MIND_MAP,
  },
  {
    name: '组织结构图',
    value: CONSTANTS.LAYOUT.ORGANIZATION_STRUCTURE,
  },
  {
    name: '目录组织图',
    value: CONSTANTS.LAYOUT.CATALOG_ORGANIZATION,
  },
  {
    name: '时间轴',
    value: CONSTANTS.LAYOUT.TIMELINE,
  },
  {
    name: '时间轴2',
    value: CONSTANTS.LAYOUT.TIMELINE2,
  },
  {
    name: '鱼骨图',
    value: CONSTANTS.LAYOUT.FISHBONE,
  }
]
export const layoutValueList = [
  CONSTANTS.LAYOUT.LOGICAL_STRUCTURE,
  CONSTANTS.LAYOUT.MIND_MAP,
  CONSTANTS.LAYOUT.CATALOG_ORGANIZATION,
  CONSTANTS.LAYOUT.ORGANIZATION_STRUCTURE,
  CONSTANTS.LAYOUT.TIMELINE,
  CONSTANTS.LAYOUT.TIMELINE2,
  CONSTANTS.LAYOUT.FISHBONE
]

// 节点数据中非样式的字段
export const nodeDataNoStylePropList = [
  'text',
  'image',
  'imageTitle',
  'imageSize',
  'icon',
  'tag',
  'hyperlink',
  'hyperlinkTitle',
  'note',
  'expand',
  'isActive',
  'generalization',
  'richText',
  'resetRichText',
  'uid',
  'activeStyle'
]