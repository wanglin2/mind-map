import defaultTheme from './default'
import merge from 'deepmerge'

//  天空蓝
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(115, 161, 191)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(115, 161, 191)'
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(238, 243, 246)',
    color: '#333',
    borderColor: 'rgb(115, 161, 191)',
    borderWidth: 1,
    fontSize: 14
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333'
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333'
  }
})
