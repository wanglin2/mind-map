import defaultTheme from './default'
import merge from 'deepmerge'

//  经典蓝
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(51, 51, 51)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(51, 51, 51)',
  // 背景颜色
  backgroundColor: 'rgb(239, 248, 250)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 255, 255)',
    color: '#222'
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 255, 255)',
    color: '#222',
    borderColor: 'rgb(255, 255, 255)',
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
    borderColor: 'rgb(51, 51, 51)',
    color: '#333'
  }
})
