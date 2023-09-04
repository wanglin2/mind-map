// 柠檬气泡
export default {
    backgroundColor: 'rgb(236, 254, 255)',
    // 连线的颜色
    lineColor: 'rgb(51, 51, 51)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(51, 51, 51)',
    // 根节点样式
    root: {
      fillColor: 'rgb(39, 222, 232)',
      color: 'rgb(26, 26, 26)',
      borderColor: 'rgb(26, 26, 26)',
      borderWidth: 3,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(235, 255, 187)',
      color: 'rgb(0, 0, 0)',
      borderColor: 'rgb(51, 51, 51)',
      borderWidth: 3,
      fontSize: 18,
      shape: 'roundedRectangle'
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: 'rgb(0, 0, 0)'
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: '#fff',
      borderColor: 'rgb(26, 26, 26)',
      borderWidth: 2,
      color: 'rgb(26, 26, 26)'
    }
  }
  