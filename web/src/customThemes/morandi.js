// 莫兰迪
export default {
    backgroundColor: 'rgb(252, 245, 241)',
    // 连线的颜色
    lineColor: 'rgb(144, 114, 110)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(128, 154, 151)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(166, 124, 106)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(166, 124, 106)',
    // 根节点样式
    root: {
      fillColor: 'rgb(207, 121, 105)',
      color: '#fff',
      borderColor: 'rgb(207, 121, 105)',
      borderWidth: 3,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(239, 210, 207)',
      color: 'rgb(144, 79, 68)',
      borderColor: 'rgb(222, 186, 183)',
      borderWidth: 3,
      fontSize: 18,
      shape: 'roundedRectangle'
    },
    // 三级及以下节点样式
    node: {
      fontSize: 14,
      color: 'rgb(131, 90, 64)'
    },
    // 概要节点样式
    generalization: {
      fontSize: 14,
      fillColor: 'rgb(172, 202, 199)',
      borderColor: 'rgb(172, 202, 199)',
      borderWidth: 2,
      color: 'rgb(91, 102, 97)'
    }
  }
  