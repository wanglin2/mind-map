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
        value: 'Tab'
      },
      {
        icon: 'iconjiedian',
        name: 'Insert sibling node',
        value: 'Enter'
      },
      {
        icon: 'icondodeparent',
        name: 'Insert parent node',
        value: 'Shift + Tab'
      },
      {
        icon: 'iconshangyi',
        name: 'Move up node',
        value: 'Ctrl + ↑'
      },
      {
        icon: 'iconxiayi',
        name: 'Move down node',
        value: 'Ctrl + ↓'
      },
      {
        icon: 'icongaikuozonglan',
        name: 'Insert summary',
        value: 'Ctrl + G'
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
        value: 'Ctrl + C'
      },
      {
        icon: 'iconjianqie',
        name: 'Cut node',
        value: 'Ctrl + X'
      },
      {
        icon: 'iconniantie',
        name: 'Paste node',
        value: 'Ctrl + V'
      },
      {
        icon: 'iconbianji',
        name: 'Edit node',
        value: 'F2'
      },
      {
        icon: 'iconhuanhang',
        name: 'Text Wrap',
        value: 'Shift + Enter'
      },
      {
        icon: 'iconhoutui-shi',
        name: 'Undo',
        value: 'Ctrl + Z'
      },
      {
        icon: 'iconqianjin1',
        name: 'Redo',
        value: 'Ctrl + Y'
      },
      {
        icon: 'iconquanxuan',
        name: 'Select All',
        value: 'Ctrl + A'
      },
      {
        icon: 'iconquanxuan',
        name: 'Multiple choice',
        value: 'Right click / Ctrl + Left click'
      },
      {
        icon: 'iconzhengli',
        name: 'Arrange layout',
        value: 'Ctrl + L'
      },
      {
        icon: 'iconsousuo',
        name: 'Search and Replace',
        value: 'Ctrl + F'
      }
    ]
  },
  {
    type: 'Canvas operation',
    list: [
      {
        icon: 'iconfangda',
        name: 'Zoom in',
        value: 'Ctrl + +'
      },
      {
        icon: 'iconsuoxiao',
        name: 'Zoom out',
        value: 'Ctrl + -'
      },
      {
        icon: 'iconfangda',
        name: 'Zoom in/Zoom out',
        value: 'Ctrl + Mouse wheel'
      },
      {
        icon: 'icondingwei',
        name: 'Back root node',
        value: 'Ctrl + Enter'
      },
      {
        icon: 'iconquanping1',
        name: 'fit canvas',
        value: 'Ctrl + i'
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
    desc: 'Available for import'
  },
  {
    name: 'JSON',
    type: 'json',
    icon: 'iconjson',
    desc: 'Popular data exchange formats, Available for import'
  },
  {
    name: 'Image',
    type: 'png',
    icon: 'iconPNG',
    desc: 'Suitable for viewing and sharing'
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
    desc: 'Suitable for printing'
  },
  {
    name: 'Markdown',
    type: 'md',
    icon: 'iconmarkdown',
    desc: 'Easy for other software to open'
  },
  {
    name: 'XMind',
    type: 'xmind',
    icon: 'iconxmind',
    desc: 'XMind file'
  }
]