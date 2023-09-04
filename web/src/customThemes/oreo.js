// 奥利奥
export default {
  // 连线的颜色
  lineColor: 'rgb(51, 51, 51)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(51, 51, 51)',
  // 根节点样式
  root: {
    fillColor: 'rgb(22, 22, 22)',
    color: '#fff',
    borderColor: 'rgb(22, 22, 22)',
    borderWidth: 3,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(244, 246, 253)',
    color: 'rgb(0, 0, 0)',
    borderColor: '',
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
    fillColor: 'transparent',
    borderColor: 'rgb(34, 34, 34)',
    borderWidth: 2,
    color: 'rgb(34, 34, 34)'
  }
}
