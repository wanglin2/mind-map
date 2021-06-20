import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典2
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(51, 51, 51)',
    // 连线的粗细
    lineWidth: 2,
    // 背景颜色
    backgroundColor: '#fff',
    // 根节点样式
    root: {
        fillColor: 'rgb(18, 187, 55)',
        color: '#fff',
        fontSize: 24,
        borderRadius: 10,
        active: {
            borderColor: 'rgb(51, 51, 51)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(241, 242, 241)',
        borderColor: 'transparent',
        color: '#1a1a1a',
        fontSize: 18,
        borderRadius: 10,
        active: {
            borderColor: 'rgb(51, 51, 51)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 14,
        color: '#1a1a1a',
        active: {
            borderColor: 'rgb(51, 51, 51)'
        }
    }
})