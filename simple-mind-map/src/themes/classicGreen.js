import defaultTheme from './default'
import merge from 'deepmerge'

//  经典绿
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(123, 199, 120)',
  // 背景颜色
  backgroundColor: 'rgb(236, 245, 231)',
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(123, 199, 120)',
  // 根节点样式
  root: {
    fillColor: 'rgb(253, 244, 217)',
    color: '#222'
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(253, 244, 217)',
    color: '#222',
    borderColor: 'rgb(242, 200, 104)',
    borderWidth: 1,
    fontSize: 14
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333'
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(123, 199, 120)',
    borderColor: 'transparent',
    borderWidth: 2,
    color: '#fff'
  }
})
