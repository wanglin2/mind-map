import defaultTheme from './default'
import merge from 'deepmerge'

// 牛油果
export default merge(defaultTheme, {
  // 背景颜色
  backgroundColor: '#e6f1de',
  // 连线的颜色
  lineColor: '#f5ffad',
  lineWidth: 4,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#749336',
  // 根节点样式
  root: {
    fillColor: '#94c143',
    color: '#fff',
    borderColor: '#94c143',
    borderWidth: 0,
    fontSize: 24
  },
  // 二级节点样式
  second: {
    fillColor: '#cee498',
    color: '#749336',
    borderColor: '#aec668',
    borderWidth: 2,
    fontSize: 18
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: '#749336'
  },
  // 概要节点样式
  generalization: {
    fontSize: 14,
    fillColor: '#cee498',
    borderColor: '#aec668',
    borderWidth: 2,
    color: '#749336'
  }
})
