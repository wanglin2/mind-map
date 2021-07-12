import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 暗色2
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(75, 81, 78)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(27, 31, 34)',
    // 根节点样式
    root: {
        fillColor: 'rgb(36, 179, 96)',
        color: '#fff',
        borderColor: '',
        borderWidth: 0,
        active: {
            borderColor: 'rgb(254, 199, 13)',
            borderWidth: 3,
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(254, 199, 13)',
        color: 'rgb(0, 0, 0)',
        borderColor: '',
        borderWidth: 0,
        fontSize: 14,
        active: {
            borderColor: 'rgb(36, 179, 96)',
            borderWidth: 2
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: 'rgb(204, 204, 204)',
        active: {
            borderColor: 'rgb(254, 199, 13)'
        }
    }
})