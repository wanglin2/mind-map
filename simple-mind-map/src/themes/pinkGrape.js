import defaultTheme from './default';
import merge from 'deepmerge';

/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 粉红葡萄
 */
export default merge(defaultTheme, {
    // 连线的颜色
    lineColor: 'rgb(166, 101, 106)',
    lineWidth: 3,
    // 背景颜色
    backgroundColor: 'rgb(255, 208, 211)',
    // 根节点样式
    root: {
        fillColor: 'rgb(139, 109, 225)',
        borderColor: '',
        borderWidth: 0,
        active: {
            borderColor: 'rgb(243, 104, 138)',
            borderWidth: 2,
        }
    },
    // 二级节点样式
    second: {
        fillColor: 'rgb(243, 104, 138)',
        color: '#fff',
        borderColor: '',
        borderWidth: 0,
        fontSize: 14,
        active: {
            borderColor: 'rgb(139, 109, 225)',
            borderWidth: 2,
        }
    },
    // 三级及以下节点样式
    node: {
        fontSize: 12,
        color: '#222',
        active: {
            borderColor: 'rgb(139, 109, 225)'
        }
    }
})