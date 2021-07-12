import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 金色vip
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(51, 56, 62)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: '#fff',
    // 根节点样式
    root: {
        fillColor: 'rgb(51, 56, 62)',
        color: 'rgb(247, 208, 160)',
        borderColor: '',
        borderWidth: 0,
        active: {
            borderColor: 'rgb(247, 208, 160)',
            borderWidth: 3,
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(239, 209, 176)',
        color: 'rgb(81, 58, 42)',
        borderColor: '',
        borderWidth: 0,
        fontSize: 14,
        active: {
            borderColor: 'rgb(51, 56, 62)',
            borderWidth: 2
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