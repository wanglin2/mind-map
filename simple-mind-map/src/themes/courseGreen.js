import defaultTheme from './default'
import merge from 'deepmerge'

// 课程绿
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(113, 195, 169)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(113, 195, 169)',
  // 根节点样式
  root: {
    fillColor: 'rgb(16, 160, 121)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(240, 252, 249)',
    color: 'rgb(50, 113, 96)',
    borderColor: 'rgb(113, 195, 169)',
    borderWidth: 2,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(10, 59, 43)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: 'rgb(246, 238, 211)',
    borderColor: '',
    borderWidth: 0,
    color: 'rgb(173, 91, 12)'
  }
})
