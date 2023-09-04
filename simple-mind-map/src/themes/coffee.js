import defaultTheme from './default'
import merge from 'deepmerge'

// 咖啡
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(173, 123, 91)',
  lineWidth: 4,
  // 概要连线的粗细
  generalizationLineWidth: 4,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(173, 123, 91)',
  // 根节点样式
  root: {
    fillColor: 'rgb(202, 117, 79)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(245, 231, 216)',
    color: 'rgb(125, 86, 42)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(96, 71, 47)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: 'rgb(255, 249, 239)',
    borderColor: 'rgb(173, 123, 91)',
    borderWidth: 2,
    color: 'rgb(122, 83, 44)'
  }
})
