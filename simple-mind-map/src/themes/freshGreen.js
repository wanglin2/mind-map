import defaultTheme from './default'
import merge from 'deepmerge'

//  清新绿
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: '#333',
  // 背景颜色
  backgroundColor: '#d1f6ec',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: '#1fb27d'
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: '#565656',
    borderColor: 'transparent',
    borderWidth: 0
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333'
  }
})
