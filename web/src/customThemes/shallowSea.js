// 浅海
export default {
    backgroundColor: 'rgb(187, 241, 250)',
    // 连线的颜色
    lineColor: 'rgb(74, 139, 170)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(255, 168, 101)',
    // 根节点样式
    root: {
      fillColor: 'rgb(51, 149, 255)',
      color: '#fff',
      borderColor: 'rgb(51, 149, 255)',
      borderWidth: 3,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(74, 139, 170)',
      color: '#fff',
      borderColor: '',
      borderWidth: 3,
      fontSize: 18
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
      borderColor: 'rgb(255, 168, 101)',
      borderWidth: 2,
      color: '#000'
    }
  }
  