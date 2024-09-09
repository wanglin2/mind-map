//  布局结构图片映射
export const layoutImgMap = {
  logicalStructure: require('../assets/img/structures/logicalStructure.png'),
  logicalStructureLeft: require('../assets/img/structures/logicalStructureLeft.jpg'),
  mindMap: require('../assets/img/structures/mindMap.png'),
  organizationStructure: require('../assets/img/structures/organizationStructure.png'),
  catalogOrganization: require('../assets/img/structures/catalogOrganization.png'),
  timeline: require('../assets/img/structures/timeline.png'),
  timeline2: require('../assets/img/structures/timeline2.png'),
  fishbone: require('../assets/img/structures/fishbone.png'),
  verticalTimeline: require('../assets/img/structures/verticalTimeline.png')
}

//  主题图片映射
export const themeMap = {
  default: require('../assets/img/themes/default.jpg'),
  classic: require('../assets/img/themes/classic.jpg'),
  minions: require('../assets/img/themes/minions.jpg'),
  pinkGrape: require('../assets/img/themes/pinkGrape.jpg'),
  mint: require('../assets/img/themes/mint.jpg'),
  gold: require('../assets/img/themes/gold.jpg'),
  vitalityOrange: require('../assets/img/themes/vitalityOrange.jpg'),
  greenLeaf: require('../assets/img/themes/greenLeaf.jpg'),
  dark2: require('../assets/img/themes/dark2.jpg'),
  skyGreen: require('../assets/img/themes/skyGreen.jpg'),
  classic2: require('../assets/img/themes/classic2.jpg'),
  classic3: require('../assets/img/themes/classic3.jpg'),
  classic4: require('../assets/img/themes/classic4.jpg'),
  classicGreen: require('../assets/img/themes/classicGreen.jpg'),
  classicBlue: require('../assets/img/themes/classicBlue.jpg'),
  blueSky: require('../assets/img/themes/blueSky.jpg'),
  brainImpairedPink: require('../assets/img/themes/brainImpairedPink.jpg'),
  dark: require('../assets/img/themes/dark.jpg'),
  earthYellow: require('../assets/img/themes/earthYellow.jpg'),
  freshGreen: require('../assets/img/themes/freshGreen.jpg'),
  freshRed: require('../assets/img/themes/freshRed.jpg'),
  romanticPurple: require('../assets/img/themes/romanticPurple.jpg'),
  simpleBlack: require('../assets/img/themes/simpleBlack.jpg'),
  courseGreen: require('../assets/img/themes/courseGreen.jpg'),
  coffee: require('../assets/img/themes/coffee.jpg'),
  redSpirit: require('../assets/img/themes/redSpirit.jpg'),
  blackHumour: require('../assets/img/themes/blackHumour.jpg'),
  lateNightOffice: require('../assets/img/themes/lateNightOffice.jpg'),
  blackGold: require('../assets/img/themes/blackGold.jpg'),
  autumn: require('../assets/img/themes/autumn.jpg'),
  avocado: require('../assets/img/themes/avocado.jpg'),
  orangeJuice: require('../assets/img/themes/orangeJuice.jpg'),
  oreo: require('../assets/img/themes/oreo.jpg'),
  shallowSea: require('../assets/img/themes/shallowSea.jpg'),
  lemonBubbles: require('../assets/img/themes/lemonBubbles.jpg'),
  rose: require('../assets/img/themes/rose.jpg'),
  seaBlueLine: require('../assets/img/themes/seaBlueLine.jpg'),
  neonLamp: require('../assets/img/themes/neonLamp.jpg'),
  darkNightLceBlade: require('../assets/img/themes/darkNightLceBlade.jpg'),
  morandi: require('../assets/img/themes/morandi.jpg'),
  classic5: require('../assets/img/themes/classic5.jpg'),
  dark3: require('../assets/img/themes/dark3.jpg'),
  dark4: require('../assets/img/themes/dark4.jpg'),
  cactus: require('../assets/img/themes/cactus.jpg'),
  classic6: require('../assets/img/themes/classic6.jpg'),
  classic7: require('../assets/img/themes/classic7.jpg')
}

// 公式列表
export const formulaList = [
  'a^2',
  'a_2',
  'a^{2+2}',
  'a_{i,j}',
  'x_2^3',
  '\\overbrace{1+2+\\cdots+100}',
  '\\sum_{k=1}^N k^2',
  '\\lim_{n \\to \\infty}x_n',
  '\\int_{-N}^{N} e^x\\, dx',
  '\\sqrt{3}',
  '\\sqrt[n]{3}',
  '\\sin\\theta',
  '\\log X',
  '\\log_{10}',
  '\\log_\\alpha X',
  '\\lim_{t\\to n}T',
  '\\frac{1}{2}=0.5',
  '\\binom{n}{k}',
  '\\begin{matrix}x & y \\\\z & v\\end{matrix}',
  '\\begin{cases}3x + 5y +  z \\\\7x - 2y + 4z \\\\-6x + 3y + 2z\\end{cases}'
]

// 支持某种连线类型的结构
export const supportLineStyleLayoutsMap = {
  curve: [
    'logicalStructure',
    'logicalStructureLeft',
    'mindMap',
    'verticalTimeline',
    'organizationStructure'
  ],
  direct: [
    'logicalStructure',
    'logicalStructureLeft',
    'mindMap',
    'organizationStructure',
    'verticalTimeline'
  ]
}

// 直线模式支持设置圆角的结构
export const supportLineRadiusLayouts = [
  'logicalStructure',
  'logicalStructureLeft',
  'mindMap',
  'verticalTimeline'
]

// 支持只显示底边直线风格的结构
export const supportNodeUseLineStyleLayouts = [
  'logicalStructure',
  'logicalStructureLeft',
  'mindMap',
  'catalogOrganization',
  'organizationStructure'
]

// 支持曲线模式下，根节点样式和其他节点样式保持一致的结构
export const supportRootLineKeepSameInCurveLayouts = [
  'logicalStructure',
  'logicalStructureLeft',
  'mindMap',
  'organizationStructure'
]

// 彩虹线条配置
export const rainbowLinesOptions = [
  {
    value: 'close'
  },
  {
    value: 'colors1',
    list: [
      'rgb(255, 213, 73)',
      'rgb(255, 136, 126)',
      'rgb(107, 225, 141)',
      'rgb(151, 171, 255)',
      'rgb(129, 220, 242)',
      'rgb(255, 163, 125)',
      'rgb(152, 132, 234)'
    ]
  },
  {
    value: 'colors2',
    list: [
      'rgb(248, 93, 93)',
      'rgb(255, 151, 84)',
      'rgb(255, 214, 69)',
      'rgb(73, 205, 140)',
      'rgb(64, 192, 255)',
      'rgb(84, 110, 214)',
      'rgb(164, 93, 220)'
    ]
  },
  {
    value: 'colors3',
    list: [
      'rgb(140, 240, 231)',
      'rgb(74, 210, 255)',
      'rgb(65, 168, 243)',
      'rgb(49, 128, 205)',
      'rgb(188, 226, 132)',
      'rgb(113, 215, 123)',
      'rgb(120, 191, 109)'
    ]
  },
  {
    value: 'colors4',
    list: [
      'rgb(169, 98, 99)',
      'rgb(245, 125, 123)',
      'rgb(254, 183, 168)',
      'rgb(251, 218, 171)',
      'rgb(138, 163, 181)',
      'rgb(131, 127, 161)',
      'rgb(84, 83, 140)'
    ]
  },
  {
    value: 'colors5',
    list: [
      'rgb(255, 229, 142)',
      'rgb(254, 158, 41)',
      'rgb(248, 119, 44)',
      'rgb(232, 82, 80)',
      'rgb(182, 66, 98)',
      'rgb(99, 54, 99)',
      'rgb(65, 40, 82)'
    ]
  },
  {
    value: 'colors6',
    list: [
      'rgb(171, 227, 209)',
      'rgb(107, 201, 196)',
      'rgb(55, 170, 169)',
      'rgb(18, 135, 131)',
      'rgb(74, 139, 166)',
      'rgb(75, 105, 150)',
      'rgb(57, 75, 133)'
    ]
  }
]
