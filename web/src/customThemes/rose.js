// 玫瑰
export default {
    backgroundColor: 'rgb(255, 251, 231)',
    // 连线的颜色
    lineColor: 'rgb(110, 165, 79)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(136, 100, 0)',
    // 根节点样式
    root: {
      fillColor: 'rgb(254, 92, 92)',
      color: '#fff',
      borderColor: 'rgb(18, 187, 55)',
      borderWidth: 3,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(209, 237, 176)',
      color: 'rgb(85, 136, 55)',
      borderColor: '',
      borderWidth: 3,
      fontSize: 18,
      shape: 'roundedRectangle'
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: 'rgb(26, 26, 26)'
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: '#fff',
      borderColor: 'rgb(136, 100, 0)',
      borderWidth: 2,
      color: 'rgb(136, 100, 0)'
    }
  }
  