import defaultTheme from './default'
import merge from 'deepmerge'

//  绿叶
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(40, 193, 84)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(251, 158, 0)',
  // 背景颜色
  backgroundColor: 'rgb(238, 255, 243)',
  // 根节点样式
  root: {
    fillColor: 'rgb(25, 193, 73)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: 'rgb(69, 149, 96)',
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
    fillColor: '#fff',
    borderColor: 'rgb(251, 158, 0)',
    borderWidth: 2,
    color: 'rgb(51, 51, 51)'
  }
})
