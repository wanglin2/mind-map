// 经典5
export default {
    backgroundColor: 'rgb(233, 245, 241)',
    // 连线的颜色
    lineColor: 'rgb(34, 34, 34)',
    lineWidth: 2,
    // 概要连线的粗细
    generalizationLineWidth: 2,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(34, 34, 34)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(56, 44, 116)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(68, 68, 68)',
    // 根节点样式
    root: {
      fillColor: 'rgb(56, 44, 116)',
      color: '#fff',
      borderColor: 'rgb(56, 44, 116)',
      borderWidth: 0,
      fontSize: 24
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(161, 213, 188)',
      color: 'rgb(0, 0, 0)',
      borderColor: '',
      borderWidth: 0,
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
      fillColor: 'rgb(56, 44, 116)',
      borderColor: '',
      borderWidth: 0,
      color: '#fff'
    }
  }
  