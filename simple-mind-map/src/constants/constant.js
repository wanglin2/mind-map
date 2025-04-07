// 常量
export const CONSTANTS = {
  CHANGE_THEME: 'changeTheme',
  CHANGE_LAYOUT: 'changeLayout',
  MODE: {
    READONLY: 'readonly',
    EDIT: 'edit'
  },
  LAYOUT: {
    LOGICAL_STRUCTURE: 'logicalStructure',
    LOGICAL_STRUCTURE_LEFT: 'logicalStructureLeft',
    MIND_MAP: 'mindMap',
    ORGANIZATION_STRUCTURE: 'organizationStructure',
    CATALOG_ORGANIZATION: 'catalogOrganization',
    TIMELINE: 'timeline',
    TIMELINE2: 'timeline2',
    FISHBONE: 'fishbone',
    FISHBONE2: 'fishbone2',
    RIGHT_FISHBONE: 'rightFishbone',
    RIGHT_FISHBONE2: 'rightFishbone2',
    VERTICAL_TIMELINE: 'verticalTimeline',
    VERTICAL_TIMELINE2: 'verticalTimeline2',
    VERTICAL_TIMELINE3: 'verticalTimeline3'
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
  LAYOUT_GROW_DIR: {
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom'
  },
  PASTE_TYPE: {
    CLIP_BOARD: 'clipBoard',
    CANVAS: 'canvas'
  },
  SCROLL_BAR_DIR: {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
  },
  CREATE_NEW_NODE_BEHAVIOR: {
    DEFAULT: 'default',
    NOT_ACTIVE: 'notActive',
    ACTIVE_ONLY: 'activeOnly'
  },
  TAG_PLACEMENT: {
    RIGHT: 'right',
    BOTTOM: 'bottom'
  },
  IMG_PLACEMENT: {
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom'
  }
}

export const initRootNodePositionMap = {
  [CONSTANTS.INIT_ROOT_NODE_POSITION.LEFT]: 0,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.TOP]: 0,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.RIGHT]: 1,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.BOTTOM]: 1,
  [CONSTANTS.INIT_ROOT_NODE_POSITION.CENTER]: 0.5
}

//  布局结构列表
export const layoutList = [
  {
    name: '逻辑结构图',
    value: CONSTANTS.LAYOUT.LOGICAL_STRUCTURE
  },
  {
    name: '向左逻辑结构图',
    value: CONSTANTS.LAYOUT.LOGICAL_STRUCTURE_LEFT
  },
  {
    name: '思维导图',
    value: CONSTANTS.LAYOUT.MIND_MAP
  },
  {
    name: '组织结构图',
    value: CONSTANTS.LAYOUT.ORGANIZATION_STRUCTURE
  },
  {
    name: '目录组织图',
    value: CONSTANTS.LAYOUT.CATALOG_ORGANIZATION
  },
  {
    name: '时间轴',
    value: CONSTANTS.LAYOUT.TIMELINE
  },
  {
    name: '时间轴2',
    value: CONSTANTS.LAYOUT.TIMELINE2
  },
  {
    name: '竖向时间轴',
    value: CONSTANTS.LAYOUT.VERTICAL_TIMELINE
  },
  {
    name: '竖向时间轴2',
    value: CONSTANTS.LAYOUT.VERTICAL_TIMELINE2
  },
  {
    name: '竖向时间轴3',
    value: CONSTANTS.LAYOUT.VERTICAL_TIMELINE3
  },
  {
    name: '鱼骨图',
    value: CONSTANTS.LAYOUT.FISHBONE
  },
  {
    name: '鱼骨图2',
    value: CONSTANTS.LAYOUT.FISHBONE2
  },
  {
    name: '向右鱼骨图',
    value: CONSTANTS.LAYOUT.RIGHT_FISHBONE
  },
  {
    name: '向右鱼骨图2',
    value: CONSTANTS.LAYOUT.RIGHT_FISHBONE2
  }
]
export const layoutValueList = [
  CONSTANTS.LAYOUT.LOGICAL_STRUCTURE,
  CONSTANTS.LAYOUT.LOGICAL_STRUCTURE_LEFT,
  CONSTANTS.LAYOUT.MIND_MAP,
  CONSTANTS.LAYOUT.CATALOG_ORGANIZATION,
  CONSTANTS.LAYOUT.ORGANIZATION_STRUCTURE,
  CONSTANTS.LAYOUT.TIMELINE,
  CONSTANTS.LAYOUT.TIMELINE2,
  CONSTANTS.LAYOUT.VERTICAL_TIMELINE,
  CONSTANTS.LAYOUT.VERTICAL_TIMELINE2,
  CONSTANTS.LAYOUT.VERTICAL_TIMELINE3,
  CONSTANTS.LAYOUT.FISHBONE,
  CONSTANTS.LAYOUT.FISHBONE2,
  CONSTANTS.LAYOUT.RIGHT_FISHBONE,
  CONSTANTS.LAYOUT.RIGHT_FISHBONE2
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
  'resetRichText', // 重新创建富文本内容，去掉原有样式
  'uid',
  'activeStyle',
  'associativeLineTargets',
  'associativeLineTargetControlOffsets',
  'associativeLinePoint',
  'associativeLineText',
  'attachmentUrl',
  'attachmentName',
  'notation',
  'outerFrame',
  'number',
  'range',
  'customLeft',
  'customTop',
  'customTextWidth',
  'checkbox',
  'dir',
  'needUpdate', // 重新创建节点内容
  'imgMap',
  'nodeLink'
]

// 错误类型
export const ERROR_TYPES = {
  READ_CLIPBOARD_ERROR: 'read_clipboard_error',
  PARSE_PASTE_DATA_ERROR: 'parse_paste_data_error',
  CUSTOM_HANDLE_CLIPBOARD_TEXT_ERROR: 'custom_handle_clipboard_text_error',
  LOAD_CLIPBOARD_IMAGE_ERROR: 'load_clipboard_image_error',
  BEFORE_TEXT_EDIT_ERROR: 'before_text_edit_error',
  EXPORT_ERROR: 'export_error',
  EXPORT_LOAD_IMAGE_ERROR: 'export_load_image_error',
  DATA_CHANGE_DETAIL_EVENT_ERROR: 'data_change_detail_event_error'
}

// css
export const cssContent = `
  /* 鼠标hover和激活时渲染的矩形 */
  .smm-hover-node{
    display: none;
    opacity: 0.6;
    stroke-width: 1;
  }

  .smm-node:not(.smm-node-dragging):hover .smm-hover-node{
    display: block;
  }

  .smm-node.active .smm-hover-node, .smm-node-highlight .smm-hover-node{
    display: block;
    opacity: 1;
    stroke-width: 2;
  }

  .smm-text-node-wrap, .smm-expand-btn-text {
    user-select: none;
  }
`

// html自闭合标签列表
export const selfCloseTagList = [
  'img',
  'br',
  'hr',
  'input',
  'link',
  'meta',
  'area'
]

// 非富文本模式下的节点文本行高
export const noneRichTextNodeLineHeight = 1.2

// 富文本支持的样式列表
export const richTextSupportStyleList = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'textDecoration',
  'color',
  'textAlign'
]
