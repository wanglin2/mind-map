// 字型列表
export const fontFamilyList = [
  {
    name: '宋體',
    value: '宋体, SimSun, Songti SC'
  },
  {
    name: '微軟雅黑',
    value: '微软雅黑, Microsoft YaHei'
  },
  {
    name: '楷體',
    value: '楷体, 楷体_GB2312, SimKai, STKaiti'
  },
  {
    name: '黑體',
    value: '黑体, SimHei, Heiti SC'
  },
  {
    name: '隸書',
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

// 框線樣式
export const borderDasharrayList = [
  {
    name: '實線',
    value: 'none'
  },
  {
    name: '虛線 1',
    value: '5,5'
  },
  {
    name: '虛線 2',
    value: '10,10'
  },
  {
    name: '虛線 3',
    value: '20,10,5,5,5,10'
  },
  {
    name: '虛線 4',
    value: '5,5,1,5'
  },
  {
    name: '虛線 5',
    value: '15,10,5,10,15'
  },
  {
    name: '虛線 6',
    value: '1,5'
  },
  {
    name: '虛線 7',
    value: '6,4'
  }
]

// 連線樣式
export const lineStyleList = [
  {
    name: '直線',
    value: 'straight'
  },
  {
    name: '曲線',
    value: 'curve'
  },
  {
    name: '直接連線',
    value: 'direct'
  }
]

// 曲線樣式中，根節點樣式是否和其他節點保持一致
export const rootLineKeepSameInCurveList = [
  {
    name: '括號',
    value: false
  },
  {
    name: '大括號',
    value: true
  }
]

// 圖片重複方式
export const backgroundRepeatList = [
  {
    name: '不重複',
    value: 'no-repeat'
  },
  {
    name: '重複',
    value: 'repeat'
  },
  {
    name: '水平重複',
    value: 'repeat-x'
  },
  {
    name: '垂直重複',
    value: 'repeat-y'
  }
]

// 背景圖片位置
export const backgroundPositionList = [
  {
    name: '預設',
    value: '0% 0%'
  },
  {
    name: '左上',
    value: 'left top'
  },
  {
    name: '左中',
    value: 'left center'
  },
  {
    name: '左下',
    value: 'left bottom'
  },
  {
    name: '右上',
    value: 'right top'
  },
  {
    name: '右中',
    value: 'right center'
  },
  {
    name: '右下',
    value: 'right bottom'
  },
  {
    name: '中上',
    value: 'center top'
  },
  {
    name: '置中',
    value: 'center center'
  },
  {
    name: '中下',
    value: 'center bottom'
  }
]

const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
const ctrl = isMac ? '⌘' : 'Ctrl'
const enter = isMac ? 'Return' : 'Enter'
const macFn = isMac ? 'fn + ' : ''

// 背景圖片大小
export const backgroundSizeList = [
  {
    name: '自動',
    value: 'auto'
  },
  {
    name: '覆蓋',
    value: 'cover'
  },
  {
    name: '包含',
    value: 'contain'
  }
]

// 快捷鍵列表
export const shortcutKeyList = [
  {
    type: '節點操作',
    list: [
      {
        icon: 'icontianjiazijiedian',
        name: '插入子節點',
        value: 'Tab | Insert'
      },
      {
        icon: 'iconjiedian',
        name: '插入同層節點',
        value: enter
      },
      {
        icon: 'icondodeparent',
        name: '插入父節點',
        value: 'Shift + Tab'
      },
      {
        icon: 'iconshangyi',
        name: '上移節點',
        value: `${ctrl} + ↑`
      },
      {
        icon: 'iconxiayi',
        name: '下移節點',
        value: `${ctrl} + ↓`
      },
      {
        icon: 'icongaikuozonglan',
        name: '插入摘要',
        value: `${ctrl} + G`
      },
      {
        icon: 'iconzhankai',
        name: '展開／收合節點',
        value: '/'
      },
      {
        icon: 'iconshanchu',
        name: '刪除節點',
        value: 'Delete | Backspace'
      },
      {
        icon: 'iconshanchu',
        name: '僅刪除目前節點',
        value: 'Shift + Backspace'
      },
      {
        icon: 'iconfuzhi',
        name: '複製節點',
        value: `${ctrl} + C`
      },
      {
        icon: 'iconjianqie',
        name: '剪下節點',
        value: `${ctrl} + X`
      },
      {
        icon: 'iconniantie',
        name: '貼上節點',
        value: `${ctrl} + V`
      },
      {
        icon: 'iconbianji',
        name: '編輯節點',
        value: macFn + 'F2'
      },
      {
        icon: 'iconhuanhang',
        name: '文字換行',
        value: `Shift + ${enter}`
      },
      {
        icon: 'iconhoutui-shi',
        name: '復原',
        value: `${ctrl} + Z`
      },
      {
        icon: 'iconqianjin1',
        name: '重做',
        value: `${ctrl} + Y`
      },
      {
        icon: 'iconquanxuan',
        name: '全選',
        value: `${ctrl} + A`
      },
      {
        icon: 'iconquanxuan',
        name: '多重選擇',
        value: `右鍵 / ${ctrl} + 左鍵`
      },
      {
        icon: 'iconzhengli',
        name: '一鍵整理版面配置',
        value: `${ctrl} + L`
      },
      {
        icon: 'iconsousuo',
        name: '搜尋與取代',
        value: `${ctrl} + F`
      }
    ]
  },
  {
    type: '畫布操作',
    list: [
      {
        icon: 'iconfangda',
        name: '放大',
        value: `${ctrl} + +`
      },
      {
        icon: 'iconsuoxiao',
        name: '縮小',
        value: `${ctrl} + -`
      },
      {
        icon: 'iconfangda',
        name: '放大／縮小',
        value: `${ctrl} + 滑鼠滾輪`
      },
      {
        icon: 'icondingwei',
        name: '回到根節點',
        value: `${ctrl} + ${enter}`
      },
      {
        icon: 'iconquanping1',
        name: '適應畫布',
        value: `${ctrl} + i`
      }
    ]
  },
  {
    type: '大綱操作',
    list: [
      {
        icon: 'iconhuanhang',
        name: '文字換行',
        value: `Shift + ${enter}`
      },
      {
        icon: 'iconshanchu',
        name: '刪除節點',
        value: 'Delete'
      },
      {
        icon: 'icontianjiazijiedian',
        name: '插入子節點',
        value: 'Tab'
      },
      {
        icon: 'iconjiedian',
        name: '插入同層節點',
        value: enter
      },
      {
        icon: 'icondodeparent',
        name: '上移一層',
        value: 'Shift + Tab'
      }
    ]
  }
]

// 形狀列表
export const shapeList = [
  {
    name: '矩形',
    value: 'rectangle'
  },
  {
    name: '菱形',
    value: 'diamond'
  },
  {
    name: '平行四邊形',
    value: 'parallelogram'
  },
  {
    name: '圓角矩形',
    value: 'roundedRectangle'
  },
  {
    name: '八角矩形',
    value: 'octagonalRectangle'
  },
  {
    name: '外三角矩形',
    value: 'outerTriangularRectangle'
  },
  {
    name: '內三角矩形',
    value: 'innerTriangularRectangle'
  },
  {
    name: '橢圓形',
    value: 'ellipse'
  },
  {
    name: '圓形',
    value: 'circle'
  }
]

// 側邊欄列表
export const sidebarTriggerList = [
  {
    name: '節點樣式',
    value: 'nodeStyle',
    icon: 'iconzhuti'
  },
  {
    name: '基礎樣式',
    value: 'baseStyle',
    icon: 'iconyangshi'
  },
  {
    name: '主題',
    value: 'theme',
    icon: 'iconjingzi'
  },
  {
    name: '結構',
    value: 'structure',
    icon: 'iconjiegou'
  },
  {
    name: '大綱',
    value: 'outline',
    icon: 'iconfuhao-dagangshu'
  },
  // {
  //   name: 'AI',
  //   value: 'ai',
  //   icon: 'iconAIshengcheng'
  // },
  {
    name: '設置',
    value: 'setting',
    icon: 'iconshezhi'
  },
  // {
  //   name: '快捷鍵',
  //   value: 'shortcutKey',
  //   icon: 'iconjianpan'
  // }
]

// 下載類型列表
export const downTypeList = [
  {
    name: '思緒檔案',
    type: 'smm',
    icon: 'iconwenjian',
    desc: 'SimpleMindMap私有格式，可用于再次導入，客戶端可直接編輯'
  },
  {
    name: '圖片',
    type: 'png',
    icon: 'iconPNG',
    desc: '常用圖片格式，適合查看分享'
  },
  {
    name: 'SVG',
    type: 'svg',
    icon: 'iconSVG',
    desc: '可縮放矢量圖形'
  },
  {
    name: 'PDF',
    type: 'pdf',
    icon: 'iconpdf',
    desc: '適合查看浏覽和打印'
  },
  {
    name: 'Markdown',
    type: 'md',
    icon: 'iconmarkdown',
    desc: 'md文本格式，便于其他軟件打開'
  },
  {
    name: 'XMind',
    type: 'xmind',
    icon: 'iconxmind',
    desc: 'XMind軟件格式'
  },
  {
    name: 'Txt',
    type: 'txt',
    icon: 'iconTXT',
    desc: '純文本文件'
  },
  {
    name: 'Excel',
    type: 'xlsx',
    icon: 'iconfile-excel',
    desc: '表格文本形式，可用Excel軟件編輯'
  },
  {
    name: 'FreeMind',
    type: 'mm',
    icon: 'iconfreemind',
    desc: 'FreeMind軟件格式'
  },
  {
    name: 'JSON',
    type: 'json',
    icon: 'iconjson',
    desc: '流行的數據交換格式，可用于再次導入'
  },
]

// 編號類型列表
export const numberTypeList = [
  {
    name: '無編號',
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

// 編號層級列表
export const numberLevelList = [
  {
    name: '編號第一層',
    value: 1
  },
  {
    name: '編號前兩層',
    value: 2
  },
  {
    name: '編號前三層',
    value: 3
  },
  {
    name: '編號每一層',
    value: 0
  }
]

// 背景渐变方向
export const linearGradientDirList = [
  {
    name: '从左到右',
    value: '1',
    start: [0, 0],
    end: [1, 0]
  },
  {
    name: '从右到左',
    value: '2',
    start: [1, 0],
    end: [0, 0]
  },
  {
    name: '从上到下',
    value: '3',
    start: [0, 0],
    end: [0, 1]
  },
  {
    name: '从下到上',
    value: '4',
    start: [0, 1],
    end: [0, 0]
  },
  {
    name: '从左上到右下',
    value: '5',
    start: [0, 0],
    end: [1, 1]
  },
  {
    name: '从左下到右上',
    value: '6',
    start: [0, 1],
    end: [1, 0]
  },
  {
    name: '从右上到左下',
    value: '7',
    start: [1, 0],
    end: [0, 1]
  },
  {
    name: '从右下到左上',
    value: '8',
    start: [1, 1],
    end: [0, 0]
  }
]

// 文本对齐方式
export const alignList = [
  {
    name: '左對齊',
    value: 'left'
  },
  {
    name: '居中對齊',
    value: 'center'
  },
  {
    name: '右對齊',
    value: 'right'
  }
]

// 结构列表
export const layoutGroupList = [
  {
    name: '邏輯結構圖',
    list: ['logicalStructure', 'logicalStructureLeft']
  },
  {
    name: '思維導圖',
    list: ['mindMap']
  },
  {
    name: '組織結構圖',
    list: ['organizationStructure']
  },
  {
    name: '目錄組織圖',
    list: ['catalogOrganization']
  },
  {
    name: '時間軸',
    list: [
      'timeline',
      'timeline2',
      'verticalTimeline2',
      'verticalTimeline3',
      'verticalTimeline'
    ]
  },
  {
    name: '魚骨圖',
    list: ['fishbone', 'fishbone2', 'rightFishbone', 'rightFishbone2']
  }
]
