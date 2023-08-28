import defaultTheme from './default'
import merge from 'deepmerge'

//  天清绿
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: '#fff',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#fff',
  // 背景颜色
  backgroundColor: 'rgb(80, 156, 170)',
  // 根节点样式
  root: {
    fillColor: '#fff',
    borderColor: '',
    borderWidth: 0,
    color: 'rgb(65, 89, 158)'
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(251, 227, 188)',
    color: 'rgb(65, 89, 158)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: 'rgb(65, 89, 158)'
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'transparent',
    color: 'rgb(65, 89, 158)'
  }
})
