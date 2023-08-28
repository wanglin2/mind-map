import defaultTheme from './default'
import merge from 'deepmerge'

//  粉红葡萄
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(166, 101, 106)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#fff',
  // 背景颜色
  backgroundColor: 'rgb(255, 208, 211)',
  // 根节点样式
  root: {
    fillColor: 'rgb(139, 109, 225)',
    borderColor: '',
    borderWidth: 0
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(243, 104, 138)',
    color: '#fff',
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
    borderColor: 'transparent',
    color: '#222'
  }
})
