import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典蓝
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(51, 51, 51)',
    // 连线的粗细
    lineWidth: 2,
    // 背景颜色
    backgroundColor: 'rgb(239, 248, 250)',
    // 根节点样式
    root: {
        fillColor: 'rgb(255, 255, 255)',
        color: '#222',
        active: {
            borderColor: 'rgb(94, 199, 248)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(255, 255, 255)',
        color: '#222',
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 1,
        fontSize: 14,
        active: {
            borderColor: 'rgb(94, 199, 248)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#333',
        active: {
            borderColor: 'rgb(94, 199, 248)'
        }
    }
})