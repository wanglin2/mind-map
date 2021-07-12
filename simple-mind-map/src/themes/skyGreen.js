import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 天清绿
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: '#fff',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(80, 156, 170)',
    // 根节点样式
    root: {
        fillColor: '#fff',
        borderColor: '',
        borderWidth: 0,
        color: 'rgb(65, 89, 158)',
        active: {
            borderColor: 'rgb(251, 227, 188)',
            borderWidth: 3,
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(251, 227, 188)',
        color: 'rgb(65, 89, 158)',
        borderColor: '',
        borderWidth: 0,
        fontSize: 14,
        active: {
            borderColor: '#fff',
            borderWidth: 2,
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: 'rgb(65, 89, 158)',
        active: {
            borderColor: 'rgb(251, 227, 188)'
        }
    }
})