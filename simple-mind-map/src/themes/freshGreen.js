import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 清新绿 
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: '#333',
    // 背景颜色
    backgroundColor: '#d1f6ec',
    // 根节点样式
    root: {
        fillColor: '#1fb27d'
    },
    // 二级节点样式
    second: {
        fillColor: '#fff',
        color: '#565656',
        borderColor: 'transparent',
        borderWidth: 0
    },
})