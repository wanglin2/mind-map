import defaultTheme from './default'
import merge from 'deepmerge'

//  薄荷
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(104, 204, 202)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(90, 206, 241)',
  // 背景颜色
  backgroundColor: 'rgb(239, 255, 255)',
  // 根节点样式
  root: {
    fillColor: 'rgb(0, 192, 184)',
    borderColor: '',
    borderWidth: 0
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: '#222',
    borderColor: 'rgb(184, 235, 233)',
    borderWidth: 2,
    fontSize: 14
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222'
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(90, 206, 241)',
    borderColor: 'transparent',
    color: '#fff'
  }
})
