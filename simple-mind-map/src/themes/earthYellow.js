import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 泥土黄
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(191, 147, 115)',
    // 背景颜色
    backgroundColor: 'rgb(251, 251, 251)',
    // 根节点样式
    root: {
        fillColor: 'rgb(191, 147, 115)',
        active: {
            borderColor: 'rgb(96, 73, 57)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(246, 242, 238)',
        color: '#333',
        borderColor: 'rgb(191, 147, 115)',
        borderWidth: 1,
        fontSize: 14,
        active: {
            borderColor: 'rgb(96, 73, 57)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#333',
        active: {
            borderColor: 'rgb(96, 73, 57)'
        }
    }
})