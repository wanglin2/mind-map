import defaultTheme from './default'
import merge from 'deepmerge'

// 深夜办公室
export default merge(defaultTheme, {
  // 背景颜色
  backgroundColor: 'rgb(32, 37, 49)',
  // 连线的颜色
  lineColor: 'rgb(137, 167, 196)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(255, 119, 34)',
  // 根节点样式
  root: {
    fillColor: 'rgb(23, 153, 243)',
    color: 'rgb(255, 255, 255)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(70, 78, 94)',
    color: 'rgb(209, 210, 210)',
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
    fillColor: 'rgb(255, 119, 34)',
    borderColor: '',
    borderWidth: 2,
    color: '#fff'
  }
})
