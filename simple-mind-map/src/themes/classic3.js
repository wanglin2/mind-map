import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典3
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(94, 202, 110)',
    // 连线的粗细
    lineWidth: 2,
    // 背景颜色
    backgroundColor: 'rgb(241, 241, 241)',
    // 根节点样式
    root: {
        fillColor: 'rgb(255, 245, 214)',
        color: '#1a1a1a',
        fontSize: 24,
        borderRadius: 10,
        borderColor: 'rgb(249, 199, 84)',
        borderWidth: 1,
        active: {
            borderColor: 'rgb(94, 202, 110)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(255, 245, 214)',
        borderColor: 'rgb(249, 199, 84)',
        borderWidth: 1,
        color: '#1a1a1a',
        fontSize: 18,
        borderRadius: 10,
        active: {
            borderColor: 'rgb(94, 202, 110)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 14,
        color: '#1a1a1a',
        active: {
            borderColor: 'rgb(94, 202, 110)'
        }
    }
})