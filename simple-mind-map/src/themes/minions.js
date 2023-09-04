import defaultTheme from './default'
import merge from 'deepmerge'

//  小黄人
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(51, 51, 51)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#222',
  // 背景颜色
  backgroundColor: 'rgb(248, 215, 49)',
  // 根节点样式
  root: {
    fillColor: 'rgb(55, 165, 255)',
    borderColor: 'rgb(51, 51, 51)',
    borderWidth: 3
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 160, 36)',
    color: '#222',
    borderColor: 'rgb(51, 51, 51)',
    borderWidth: 3,
    fontSize: 14
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222'
  },
  // 概要节点样式
  generalization: {
    borderColor: '#222',
    borderWidth: 3,
    color: '#222'
  }
})
