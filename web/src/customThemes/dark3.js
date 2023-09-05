// 暗色3
export default {
    backgroundColor: 'rgb(0, 0, 0)',
    // 连线的颜色
    lineColor: 'rgb(172, 172, 172)',
    lineWidth: 2,
    // 概要连线的粗细
    generalizationLineWidth: 2,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(172, 172, 172)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(57, 130, 252)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(68, 68, 68)',
    // 根节点样式
    root: {
      fillColor: '#fff',
      color: 'rgb(241, 79, 81)',
      borderColor: '',
      borderWidth: 0,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(241, 79, 81)',
      color: '#fff',
      borderColor: '',
      borderWidth: 0,
      fontSize: 18
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: '#fff'
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: '#fff',
      borderColor: '',
      borderWidth: 0,
      color: 'rgb(241, 79, 81)'
    }
  }
  