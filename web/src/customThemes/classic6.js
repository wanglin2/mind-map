// 经典6
export default {
    backgroundColor: 'rgb(255, 255, 255)',
    // 连线的颜色
    lineColor: 'rgb(0, 0, 0)',
    lineWidth: 2,
    // 概要连线的粗细
    generalizationLineWidth: 2,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(0, 0, 0)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(152, 162, 171)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(68, 68, 68)',
    // 根节点样式
    root: {
      fillColor: 'rgb(237, 182, 72)',
      color: 'rgb(0, 0, 0)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 2,
      fontSize: 24
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(114, 158, 28)',
      color: '#fff',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 2,
      fontSize: 18
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: 'rgb(10, 2, 2)'
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: '#fff',
      borderColor: '',
      borderWidth: 0,
      color: 'rgb(10, 2, 2)'
    }
  }
  