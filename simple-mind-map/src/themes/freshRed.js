import defaultTheme from './default'
import merge from 'deepmerge'

//  清新红
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(191, 115, 115)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(191, 115, 115)'
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(246, 238, 238)',
    color: '#333',
    borderColor: 'rgb(191, 115, 115)',
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
