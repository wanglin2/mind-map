import defaultTheme from './default'
import merge from 'deepmerge'

//  经典4
export default merge(defaultTheme, {
  // 连线的颜色
  lineColor: 'rgb(30, 53, 86)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(56, 123, 233)',
  // 背景颜色
  backgroundColor: 'rgb(241, 241, 241)',
  // 根节点样式
  root: {
    fillColor: 'rgb(30, 53, 86)',
    color: '#fff',
    fontSize: 24,
    borderRadius: 10,
    borderColor: 'rgb(189, 197, 201)',
    borderWidth: 2
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(169, 218, 218)',
    borderColor: 'rgb(30, 53, 86)',
    borderWidth: 2,
    color: '#fff',
    fontSize: 18,
    borderRadius: 10
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(30, 53, 86)',
    borderColor: 'rgb(30, 53, 86)',
    borderWidth: 1,
    marginY: 20
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(56, 123, 233)',
    borderColor: 'rgb(56, 123, 233)',
    color: '#fff',
    borderWidth: 0
  }
})
