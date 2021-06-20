import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 暗色
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(17, 68, 23)',
    // 连线的粗细
    lineWidth: 2,
    // 背景颜色
    backgroundColor: 'rgb(15, 16, 17)',
    // 根节点样式
    root: {
        fillColor: 'rgb(28, 178, 43)',
        color: '#fff',
        fontSize: 24,
        borderRadius: 10,
        active: {
            borderColor: 'rgb(17, 68, 23)'
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(55, 56, 58)',
        color: 'rgb(147,148,149)',
        fontSize: 18,
        borderRadius: 10,
        borderWidth: 0,
        active: {
            borderColor: 'rgb(17, 68, 23)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 14,
        color: 'rgb(147, 148, 149)',
        active: {
            borderColor: 'rgb(17, 68, 23)'
        }
    }
})