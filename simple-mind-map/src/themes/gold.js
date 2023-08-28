import defaultTheme from './default'
import merge from 'deepmerge'

//  金色vip
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(51, 56, 62)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(127, 93, 64)',
  // 背景颜色
  backgroundColor: '#fff',
  // 根节点样式
  root: {
    fillColor: 'rgb(51, 56, 62)',
    color: 'rgb(247, 208, 160)',
    borderColor: '',
    borderWidth: 0
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(239, 209, 176)',
    color: 'rgb(81, 58, 42)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222'
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(127, 93, 64)',
    borderColor: 'transparent',
    color: 'rgb(255, 214, 175)'
  }
})
