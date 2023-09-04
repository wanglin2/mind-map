import defaultTheme from './default'
import merge from 'deepmerge'

// 黑色幽默
export default merge(defaultTheme, {
  // 背景颜色
  backgroundColor: 'rgb(27, 31, 34)',
  // 连线的颜色
  lineColor: 'rgb(75, 81, 78)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(255, 119, 34)',
  // 根节点样式
  root: {
    fillColor: 'rgb(36, 179, 96)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(254, 199, 13)',
    color: 'rgb(0, 0, 0)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(204, 204, 204)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: 'rgb(27, 31, 34)',
    borderColor: 'rgb(255, 119, 34)',
    borderWidth: 2,
    color: 'rgb(204, 204, 204)'
  }
})
