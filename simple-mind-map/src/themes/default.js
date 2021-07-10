/** 
 * @Author: 王林 
 * @Date: 2021-04-11 10:19:55 
 * @Desc: 默认主题 
 */
export default {
    // 节点内边距
    paddingX: 15,
    paddingY: 5,
    // 图片显示的最大宽度
    imgMaxWidth: 100,
    // 图片显示的最大高度
    imgMaxHeight: 100,
    // icon的大小
    iconSize: 20,
    // 连线的粗细
    lineWidth: 1,
    // 连线的颜色
    lineColor: '#549688',
    // 背景颜色
    backgroundColor: '#fafafa',
    // 背景图片
    backgroundImage: 'none',
    // 背景重复
    backgroundRepeat: 'no-repeat',
    // 根节点样式
    root: {
        fillColor: '#549688',
        fontFamily: '微软雅黑, Microsoft YaHei',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        lineHeight: 1.5,
        borderColor: 'transparent',
        borderWidth: 0,
        borderDasharray: 'none',
        borderRadius: 5,
        textDecoration: 'none',
        active: {
            borderColor: 'rgb(57, 80, 96)',
            borderWidth: 3,
            borderDasharray: 'none',
        }
    },
    // 二级节点样式
    second: {
        marginX: 100,
        marginY: 40,
        fillColor: '#fff',
        fontFamily: '微软雅黑, Microsoft YaHei',
        color: '#565656',
        fontSize: 16,
        fontWeight: 'noraml',
        fontStyle: 'normal',
        lineHeight: 1.5,
        borderColor: '#549688',
        borderWidth: 1,
        borderDasharray: 'none',
        borderRadius: 5,
        textDecoration: 'none',
        active: {
            borderColor: 'rgb(57, 80, 96)',
            borderWidth: 3,
            borderDasharray: 'none',
        }
    },
    // 三级及以下节点样式
    node: {
        marginX: 50,
        marginY: 0,
        fillColor: 'transparent',
        fontFamily: '微软雅黑, Microsoft YaHei',
        color: '#6a6d6c',
        fontSize: 14,
        fontWeight: 'noraml',
        fontStyle: 'normal',
        lineHeight: 1.5,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        borderDasharray: 'none',
        textDecoration: 'none',
        active: {
            borderColor: 'rgb(57, 80, 96)',
            borderWidth: 3,
            borderDasharray: 'none',
        }
    }
}