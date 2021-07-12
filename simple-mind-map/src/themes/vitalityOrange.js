import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 活力橙
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(254, 146, 0)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(255, 246, 243)',
    // 根节点样式
    root: {
        fillColor: 'rgb(255, 112, 52)',
        color: '#fff',
        borderColor: '',
        borderWidth: 0,
        active: {
            borderColor: 'rgb(51, 51, 51)',
            borderWidth: 3,
        }
    },
    // 二级节点样式
    second: {
        fillColor: '#fff',
        color: 'rgb(51, 51, 51)',
        borderColor: '',
        borderWidth: 0,
        fontSize: 14,
        active: {
            borderColor: 'rgb(255, 112, 52)',
            borderWidth: 2
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#222',
        active: {
            borderColor: 'rgb(255, 112, 52)'
        }
    }
})