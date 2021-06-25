/** 
 * @Author: 王林 
 * @Date: 2021-04-15 22:23:24 
 * @Desc: 完整示例数据 
 */
export default {
    "root": {
        "data": {
            "text": "根节点",
        },
        "children": [{
            "data": {
                "text": "二级节点",
                "expand": true,
            },
            "children": [{
                "data": {
                    "text": "子节点",
                    // "image": "http://aliyuncdn.lxqnsys.com/whbm/enJFNMHnedQTYTESGfDkctCp2",
                    // "imageTitle": "图片名称",
                    // "imageSize": {
                    //     "width": 1000,
                    //     "height": 563
                    // },
                    // "icon": ['priority_1'],
                    // "tag": ["标签1", "标签2"],
                    // "hyperlink": "http://lxqnsys.com/",
                    // "hyperlinkTitle": "理想青年实验室",
                    // "note": "理想青年实验室\n一个有意思的角落"
                },
                "children": []
            }, {
                "data": {
                    "text": "子节点",
                }
            }]
        }]
    },
    "theme": {
        "template": "default",
        "config": {
            // 自定义配置...
        }
    },
    "layout": "logicalStructure"
}