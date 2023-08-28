// 霓虹灯
export default {
    backgroundColor: 'rgb(17, 17, 84)',
    // 连线的颜色
    lineColor: 'rgb(255, 0, 214)',
    lineWidth: 3,
    // 概要连线的粗细
    generalizationLineWidth: 3,
    // 概要连线的颜色
    generalizationLineColor: 'rgb(255, 181, 0)',
    // 关联线默认状态的颜色
    associativeLineColor: 'rgb(255, 255, 255)',
    // 关联线文字颜色
    associativeLineTextColor: 'rgb(255, 255, 255)',
    // 根节点样式
    root: {
      fillColor: 'rgb(251, 233, 248)',
      color: 'rgb(208, 5, 176)',
      borderColor: 'rgb(255, 0, 214)',
      borderWidth: 3,
      fontSize: 24,
      shape: 'roundedRectangle'
    },
    // 二级节点样式
    second: {
      fillColor: 'transparent',
      color: 'rgb(248, 177, 237)',
      borderColor: '',
      borderWidth: 3,
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
      borderColor: 'rgb(255, 181, 0)',
      borderWidth: 2,
      color: 'rgb(17, 17, 84)'
    }
  }
  