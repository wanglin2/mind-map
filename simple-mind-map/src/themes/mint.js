import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 薄荷
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(104, 204, 202)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(239, 255, 255)',
    // 根节点样式
    root: {
        fillColor: 'rgb(0, 192, 184)',
        borderColor: '',
        borderWidth: 0,
        active: {
            borderColor: 'rgb(255, 160, 36)',
            borderWidth: 3,
        }
    },
    // 二级节点样式
    second: {
        fillColor: '#fff',
        color: '#222',
        borderColor: 'rgb(184, 235, 233)',
        borderWidth: 2,
        fontSize: 14,
        active: {
            borderColor: 'rgb(0, 192, 184)'
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#222',
        active: {
            borderColor: 'rgb(0, 192, 184)'
        }
    }
})