import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 绿叶
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(40, 193, 84)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(238, 255, 243)',
    // 根节点样式
    root: {
        fillColor: 'rgb(25, 193, 73)',
        color: '#fff',
        borderColor: '',
        borderWidth: 0,
        active: {
            borderColor: '#222',
            borderWidth: 3,
        }
    },
    // 二级节点样式
    second: {
        fillColor: '#fff',
        color: 'rgb(69, 149, 96)',
        borderColor: '',
        borderWidth: 0,
        fontSize: 14,
        active: {
            borderColor: 'rgb(25, 193, 73)',
            borderWidth: 2
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#222',
        active: {
            borderColor: 'rgb(25, 193, 73)'
        }
    }
})