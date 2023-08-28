import defaultTheme from './default'
import merge from 'deepmerge'

// 黑金
export default merge(defaultTheme, {
  // 背景颜色
  backgroundColor: 'rgb(18, 20, 20)',
  // 连线的颜色
  lineColor: 'rgb(205, 186, 156)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(245, 224, 191)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 208, 124)',
    color: 'rgb(111, 61, 6)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(66, 57, 46)',
    color: 'rgb(225, 201, 158)',
    borderColor: 'rgb(245, 224, 191)',
    borderWidth: 2,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(231, 203, 155)'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: 'rgb(56, 45, 34)',
    borderColor: 'rgb(104, 84, 61)',
    borderWidth: 2,
    color: 'rgb(242, 216, 176)'
  }
})
