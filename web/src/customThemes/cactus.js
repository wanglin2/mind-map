// 仙人掌
export default {
    backgroundColor: 'rgb(219, 255, 211)',
    // 连线的颜色
    lineColor: 'rgb(51, 51, 51)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(255, 127, 71)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(160, 220, 63)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(160, 220, 63)',
    // 根节点样式
    root: {
      fillColor: 'rgb(15, 198, 113)',
      color: '#fff',
      borderColor: '',
      borderWidth: 0,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: '#fff',
      color: 'rgb(26, 26, 26)',
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
      fillColor: 'rgb(255, 127, 71)',
      borderColor: '',
      borderWidth: 0,
      color: '#fff'
    }
  }
  