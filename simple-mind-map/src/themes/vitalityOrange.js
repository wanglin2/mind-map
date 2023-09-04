import defaultTheme from './default'
import merge from 'deepmerge'

//  活力橙
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(254, 146, 0)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(255, 222, 69)',
  // 背景颜色
  backgroundColor: 'rgb(255, 246, 243)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 112, 52)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: 'rgb(51, 51, 51)',
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
    fillColor: 'rgb(255, 222, 69)',
    borderColor: 'transparent',
    color: 'rgb(51, 51, 51)'
  }
})
