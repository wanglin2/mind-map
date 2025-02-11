// 字体列表
export const fontFamilyList = [
  {
    name: 'Song Ti',
    value: '宋体, SimSun, Songti SC'
  },
  {
    name: 'Microsoft Yahei',
    value: '微软雅黑, Microsoft YaHei'
  },
  {
    name: 'Italics',
    value: '楷体, 楷体_GB2312, SimKai, STKaiti'
  },
  {
    name: 'Boldface',
    value: '黑体, SimHei, Heiti SC'
  },
  {
    name: 'Official script',
    value: '隶书, SimLi'
  },
  {
    name: 'Andale Mono',
    value: 'andale mono'
  },
  {
    name: 'Arial',
    value: 'arial, helvetica, sans-serif'
  },
  {
    name: 'arialBlack',
    value: 'arial black, avant garde'
  },
  {
    name: 'Comic Sans Ms',
    value: 'comic sans ms'
  },
  {
    name: 'Impact',
    value: 'impact, chicago'
  },
  {
    name: 'Times New Roman',
    value: 'times new roman'
  },
  {
    name: 'Sans-Serif',
    value: 'sans-serif'
  },
  {
    name: 'serif',
    value: 'serif'
  }
]

// 边框样式
export const borderDasharrayList = [
  {
    name: 'Solid',
    value: 'none'
  },
  {
    name: 'Dotted1',
    value: '5,5'
  },
  {
    name: 'Dotted2',
    value: '10,10'
  },
  {
    name: 'Dotted3',
    value: '20,10,5,5,5,10'
  },
  {
    name: 'Dotted4',
    value: '5, 5, 1, 5'
  },
  {
    name: 'Dotted5',
    value: '15, 10, 5, 10, 15'
  },
  {
    name: 'Dotted6',
    value: '1, 5'
  },
  {
    name: 'Dotted7',
    value: '6, 4'
  }
]

// 连线风格
export const lineStyleList = [
  {
    name: 'Straight',
    value: 'straight'
  },
  {
    name: 'Curve',
    value: 'curve'
  },
  {
    name: 'Direct',
    value: 'direct'
  }
]

// 曲线风格中，根节点样式是否和其他节点保持一致
export const rootLineKeepSameInCurveList = [
  {
    name: 'Bracket',
    value: false
  },
  {
    name: 'Brace',
    value: true
  }
]

// 图片重复方式
export const backgroundRepeatList = [
  {
    name: 'No repeat',
    value: 'no-repeat'
  },
  {
    name: 'Repeat',
    value: 'repeat'
  },
  {
    name: 'Repeat-x',
    value: 'repeat-x'
  },
  {
    name: 'Repeat-y',
    value: 'repeat-y'
  }
]

// 背景图片定位
export const backgroundPositionList = [
  {
    name: 'Default',
    value: '0% 0%'
  },
  {
    name: 'Left top',
    value: 'left top'
  },
  {
    name: 'Left center',
    value: 'left center'
  },
  {
    name: 'Left bottom',
    value: 'left bottom'
  },
  {
    name: 'Right top',
    value: 'right top'
  },
  {
    name: 'Right center',
    value: 'right center'
  },
  {
    name: 'Right bottom',
    value: 'right bottom'
  },
  {
    name: 'Center top',
    value: 'center top'
  },
  {
    name: 'Center center',
    value: 'center center'
  },
  {
    name: 'Center bottom',
    value: 'center bottom'
  }
]

const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
const ctrl = isMac ? '⌘' : 'Ctrl'
const enter = isMac ? 'Return' : 'Enter'
const macFn = isMac ? 'fn + ' : ''

// 背景图片大小
export const backgroundSizeList = [
  {
    name: 'Auto',
    value: 'auto'
  },
  {
    name: 'Cover',
    value: 'cover'
  },
  {
    name: 'Contain',
    value: 'contain'
  }
]

// 快捷键列表
export const shortcutKeyList = [
  {
    type: 'Node operation',
    list: [
      {
        icon: 'icontianjiazijiedian',
        name: 'Inert child node',
        value: 'Tab | Insert'
      },
      {
        icon: 'iconjiedian',
        name: 'Insert sibling node',
        value: enter
      },
      {
        icon: 'icondodeparent',
        name: 'Insert parent node',
        value: 'Shift + Tab'
      },
      {
        icon: 'iconshangyi',
        name: 'Move up node',
        value: `${ctrl} + ↑`
      },
      {
        icon: 'iconxiayi',
        name: 'Move down node',
        value: `${ctrl} + ↓`
      },
      {
        icon: 'icongaikuozonglan',
        name: 'Insert summary',
        value: `${ctrl} + G`
      },
      {
        icon: 'iconzhankai',
        name: 'Expand/UnExpand node',
        value: '/'
      },
      {
        icon: 'iconshanchu',
        name: 'Delete node',
        value: 'Delete | Backspace'
      },
      {
        icon: 'iconshanchu',
        name: 'Delete current node',
        value: 'Shift + Backspace'
      },
      {
        icon: 'iconfuzhi',
        name: 'Copy node',
        value: `${ctrl} + C`
      },
      {
        icon: 'iconjianqie',
        name: 'Cut node',
        value: `${ctrl} + X`
      },
      {
        icon: 'iconniantie',
        name: 'Paste node',
        value: `${ctrl} + V`
      },
      {
        icon: 'iconbianji',
        name: 'Edit node',
        value: macFn + 'F2'
      },
      {
        icon: 'iconhuanhang',
        name: 'Text Wrap',
        value: `Shift + ${enter}`
      },
      {
        icon: 'iconhoutui-shi',
        name: 'Undo',
        value: `${ctrl} + Z`
      },
      {
        icon: 'iconqianjin1',
        name: 'Redo',
        value: `${ctrl} + Y`
      },
      {
        icon: 'iconquanxuan',
        name: 'Select All',
        value: `${ctrl} + A`
      },
      {
        icon: 'iconquanxuan',
        name: 'Multiple choice',
        value: `Right click / ${ctrl} + Left click`
      },
      {
        icon: 'iconzhengli',
        name: 'Arrange layout',
        value: `${ctrl} + L`
      },
      {
        icon: 'iconsousuo',
        name: 'Search and Replace',
        value: `${ctrl} + F`
      }
    ]
  },
  {
    type: 'Canvas operation',
    list: [
      {
        icon: 'iconfangda',
        name: 'Zoom in',
        value: `${ctrl} + +`
      },
      {
        icon: 'iconsuoxiao',
        name: 'Zoom out',
        value: `${ctrl} + -`
      },
      {
        icon: 'iconfangda',
        name: 'Zoom in/Zoom out',
        value: `${ctrl} + Mouse wheel`
      },
      {
        icon: 'icondingwei',
        name: 'Back root node',
        value: `${ctrl} + ${enter}`
      },
      {
        icon: 'iconquanping1',
        name: 'fit canvas',
        value: `${ctrl} + i`
      }
    ]
  },
  {
    type: 'Outline Operation',
    list: [
      {
        icon: 'iconhuanhang',
        name: 'Text Wrap',
        value: `Shift + ${enter}`
      },
      {
        icon: 'iconshanchu',
        name: 'Delete current node',
        value: 'Delete'
      },
      {
        icon: 'icontianjiazijiedian',
        name: 'Inert child node',
        value: 'Tab'
      },
      {
        icon: 'iconjiedian',
        name: 'Insert sibling node',
        value: enter
      },
      {
        icon: 'icondodeparent',
        name: 'Move up one level',
        value: 'Shift + Tab'
      }
    ]
  }
]

// 形状列表
export const shapeList = [
  {
    name: 'Rectangle',
    value: 'rectangle'
  },
  {
    name: 'Diamond',
    value: 'diamond'
  },
  {
    name: 'Parallelogram',
    value: 'parallelogram'
  },
  {
    name: 'Rounded rectangle',
    value: 'roundedRectangle'
  },
  {
    name: 'Octagonal rectangle',
    value: 'octagonalRectangle'
  },
  {
    name: 'Outer triangular rectangle',
    value: 'outerTriangularRectangle'
  },
  {
    name: 'Inner triangular rectangle',
    value: 'innerTriangularRectangle'
  },
  {
    name: 'Ellipse',
    value: 'ellipse'
  },
  {
    name: 'Circle',
    value: 'circle'
  }
]

// 侧边栏列表
export const sidebarTriggerList = [
  {
    name: 'Node style',
    value: 'nodeStyle',
    icon: 'iconzhuti'
  },
  {
    name: 'Base style',
    value: 'baseStyle',
    icon: 'iconyangshi'
  },
  {
    name: 'Theme',
    value: 'theme',
    icon: 'iconjingzi'
  },
  {
    name: 'Structure',
    value: 'structure',
    icon: 'iconjiegou'
  },
  {
    name: 'Outline',
    value: 'outline',
    icon: 'iconfuhao-dagangshu'
  },
  {
    name: 'Setting',
    value: 'setting',
    icon: 'iconshezhi'
  },
  {
    name: 'ShortcutKey',
    value: 'shortcutKey',
    icon: 'iconjianpan'
  }
]

// 下载类型列表
export const downTypeList = [
  {
    name: 'Dedicated file',
    type: 'smm',
    icon: 'iconwenjian',
    desc:
      'SimpleMindMap private format, can be used for re import, and the client can directly edit it'
  },
  {
    name: 'JSON',
    type: 'json',
    icon: 'iconjson',
    desc: 'Popular data exchange format that can be used for re importing'
  },
  {
    name: 'Image',
    type: 'png',
    icon: 'iconPNG',
    desc: 'Common image formats, suitable for viewing and sharing'
  },
  {
    name: 'SVG',
    type: 'svg',
    icon: 'iconSVG',
    desc: 'Scalable Vector Graphics'
  },
  {
    name: 'PDF',
    type: 'pdf',
    icon: 'iconpdf',
    desc: 'Suitable for viewing, browsing, and printing'
  },
  {
    name: 'Markdown',
    type: 'md',
    icon: 'iconmarkdown',
    desc: 'MD text format, easy for other software to open'
  },
  {
    name: 'XMind',
    type: 'xmind',
    icon: 'iconxmind',
    desc: 'XMind software file'
  },
  {
    name: 'Txt',
    type: 'txt',
    icon: 'iconTXT',
    desc: 'Plain text file'
  },
  {
    name: 'FreeMind',
    type: 'mm',
    icon: 'iconfreemind',
    desc: 'FreeMind software format'
  },
  {
    name: 'Excel',
    type: 'xlsx',
    icon: 'iconfile-excel',
    desc: 'Table text format, editable with Excel software'
  }
]

// 编号类型列表
export const numberTypeList = [
  {
    name: 'None',
    value: ''
  },
  {
    name: '1, 2, 3',
    value: 1
  },
  {
    name: '1., 2., 3.',
    value: 2
  },
  {
    name: '(1), (2), (3)',
    value: 3
  },
  {
    name: 'a., b., c.',
    value: 4
  },
  {
    name: 'A., B., C.',
    value: 5
  },
  {
    name: 'i., ii., iii.',
    value: 6
  },
  {
    name: 'I., II., III.',
    value: 7
  },
  {
    name: '一、, 二、, 三、',
    value: 8
  }
]

// 编号层级列表
export const numberLevelList = [
  {
    name: '1 level',
    value: 1
  },
  {
    name: '2 level',
    value: 2
  },
  {
    name: '3 level',
    value: 3
  },
  {
    name: 'All level',
    value: 0
  }
]

// 背景渐变方向
export const linearGradientDirList = [
  {
    name: 'Left to right',
    value: '1',
    start: [0, 0],
    end: [1, 0]
  },
  {
    name: 'Right to left',
    value: '2',
    start: [1, 0],
    end: [0, 0]
  },
  {
    name: 'Top to bottom',
    value: '3',
    start: [0, 0],
    end: [0, 1]
  },
  {
    name: 'Bottom to top',
    value: '4',
    start: [0, 1],
    end: [0, 0]
  },
  {
    name: 'Left top to right bottom',
    value: '5',
    start: [0, 0],
    end: [1, 1]
  },
  {
    name: 'Left bottom to right top',
    value: '6',
    start: [0, 1],
    end: [1, 0]
  },
  {
    name: 'Right top to left bottom',
    value: '7',
    start: [1, 0],
    end: [0, 1]
  },
  {
    name: 'Right bottom to left top',
    value: '8',
    start: [1, 1],
    end: [0, 0]
  }
]

// 文本对齐方式
export const alignList = [
  {
    name: 'Align left',
    value: 'left'
  },
  {
    name: 'Align center',
    value: 'center'
  },
  {
    name: 'Align right',
    value: 'right'
  }
]
