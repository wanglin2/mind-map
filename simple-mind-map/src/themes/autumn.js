import defaultTheme from './default'
import merge from 'deepmerge'

// 秋天
export default merge(defaultTheme, {
  // 背景颜色
  backgroundColor: '#fff2df',
  // 连线的颜色
  lineColor: '#b0bc47',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#b0bc47',
  // 根节点样式
  root: {
    fillColor: '#e68112',
    color: '#fff',
    borderColor: '#e68112',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: '#ffd683',
    color: '#8c5416',
    borderColor: '#b0bc47',
    borderWidth: 2,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: '#8c5416'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: '#ffd683',
    borderColor: '#b0bc47',
    borderWidth: 2,
    color: '#8c5416'
  }
})
