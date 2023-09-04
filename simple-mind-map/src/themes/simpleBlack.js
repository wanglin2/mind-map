import defaultTheme from './default'
import merge from 'deepmerge'

// 简约黑
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(34, 34, 34)',
  lineWidth: 4,
  // 概要连线的粗细
  generalizationLineWidth: 4,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(34, 34, 34)',
  // 根节点样式
  root: {
    fillColor: '#fff',
    color: 'rgb(34, 34, 34)',
    borderColor: 'rgb(34, 34, 34)',
    borderWidth: 3,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(241, 246, 248)',
    color: 'rgb(34, 34, 34)',
    borderColor: 'rgb(34, 34, 34)',
    borderWidth: 3,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(34, 34, 34)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: 'transparent',
    borderColor: 'rgb(34, 34, 34)',
    borderWidth: 2,
    color: 'rgb(34, 34, 34)'
  }
})
