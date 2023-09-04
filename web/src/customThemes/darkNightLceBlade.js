// 暗夜冰刃
export default {
    backgroundColor: 'rgb(0, 21, 21)',
    // 连线的颜色
    lineColor: 'rgb(0, 139, 146)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgba(2, 167, 240, 0.5)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(255, 255, 255)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(255, 255, 255)',
    // 根节点样式
    root: {
      fillColor: 'rgb(0, 243, 255)',
      color: 'rgb(0, 21, 21)',
      borderColor: '#fff',
      borderWidth: 3,
      fontSize: 24,
      shape: 'parallelogram'
    },
    // 二级节点样式
    second: {
      fillColor: 'rgb(0, 21, 21)',
      color: '#fff',
      borderColor: '#fff',
      borderWidth: 3,
      fontSize: 18,
      shape: 'diamond'
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
      borderColor: 'rgb(0, 117, 255)',
      borderWidth: 2,
      color: 'rgb(0, 21, 21)'
    }
  }
  