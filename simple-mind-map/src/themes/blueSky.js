import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 天空蓝
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(115, 161, 191)',
    // 背景颜色
    backgroundColor: 'rgb(251, 251, 251)',
    // 根节点样式
    root: {
        fillColor: 'rgb(115, 161, 191)',
        active: {
            borderColor: 'rgb(57, 80, 96)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(238, 243, 246)',
        color: '#333',
        borderColor: 'rgb(115, 161, 191)',
        borderWidth: 1,
        fontSize: 14,
        active: {
            borderColor: 'rgb(57, 80, 96)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#333',
        active: {
            borderColor: 'rgb(57, 80, 96)'
        }
    },
})