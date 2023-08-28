import defaultTheme from './default'
import merge from 'deepmerge'

//  经典3
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(94, 202, 110)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#1a1a1a',
  // 背景颜色
  backgroundColor: 'rgb(241, 241, 241)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 245, 214)',
    color: '#1a1a1a',
    fontSize: 24,
    borderRadius: 10,
    borderColor: 'rgb(249, 199, 84)',
    borderWidth: 1
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 245, 214)',
    borderColor: 'rgb(249, 199, 84)',
    borderWidth: 1,
    color: '#1a1a1a',
    fontSize: 18,
    borderRadius: 10
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: '#1a1a1a'
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#1a1a1a',
    color: '#1a1a1a',
    borderWidth: 2
  }
})
