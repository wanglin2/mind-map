import defaultTheme from './default'
import merge from 'deepmerge'

// 红色精神
export default merge(defaultTheme, {
  // 背景颜色
  backgroundColor: 'rgb(255, 238, 228)',
  // 连线的颜色
  lineColor: 'rgb(230, 138, 131)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(222, 101, 85)',
  // 根节点样式
  root: {
    fillColor: 'rgb(207, 44, 44)',
    color: 'rgb(255, 233, 157)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 255, 255)',
    color: 'rgb(211, 58, 21)',
    borderColor: 'rgb(222, 101, 85)',
    borderWidth: 2,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(144, 71, 43)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: 'rgb(255, 247, 211)',
    borderColor: 'rgb(255, 202, 162)',
    borderWidth: 2,
    color: 'rgb(187, 101, 69)'
  }
})
