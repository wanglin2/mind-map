// 经典7
export default {
  backgroundColor: 'rgb(255, 255, 255)',
  // 连线的颜色
  lineColor: 'rgb(237, 185, 81)',
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(226, 90, 64)',
  // 关联线默认状态的颜色
  associativeLineColor: 'rgb(152, 162, 171)',
  // 关联线文字颜色
  associativeLineTextColor: 'rgb(68, 68, 68)',
  // 根节点样式
  root: {
    fillColor: 'rgb(226, 90, 64)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(43, 118, 239)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(43, 118, 239)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: '#fff',
    borderColor: '',
    borderWidth: 0,
    color: 'rgb(43, 118, 239)'
  }
}
