// 海蓝线
export default {
    backgroundColor: 'rgb(231, 245, 255)',
    // 连线的颜色
    lineColor: 'rgb(96, 189, 255)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(0, 155, 255)',
    // 根节点样式
    root: {
      fillColor: 'rgb(96, 189, 255)',
      color: '#fff',
      borderColor: '#fff',
      borderWidth: 3,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: '#fff',
      color: 'rgb(0, 149, 255)',
      borderColor: '',
      borderWidth: 3,
      fontSize: 18,
      shape: 'roundedRectangle'
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: 'rgb(0, 66, 157)'
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: '#fff',
      borderColor: 'rgb(0, 155, 255)',
      borderWidth: 2,
      color: 'rgb(0, 155, 255)'
    }
  }
  