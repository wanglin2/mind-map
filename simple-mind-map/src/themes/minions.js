import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 小黄人
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(51, 51, 51)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(248, 215, 49)',
    // 根节点样式
    root: {
        fillColor: 'rgb(55, 165, 255)',
        borderColor: 'rgb(51, 51, 51)',
        borderWidth: 3,
        active: {
            borderColor: 'rgb(255, 160, 36)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(255, 160, 36)',
        color: '#222',
        borderColor: 'rgb(51, 51, 51)',
        borderWidth: 3,
        fontSize: 14,
        active: {
            borderColor: 'rgb(55, 165, 255)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#222',
        active: {
            borderColor: 'rgb(55, 165, 255)'
        }
    }
})