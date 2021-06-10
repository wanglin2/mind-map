/** 
 * @Author: 王林 
 * @Date: 2021-04-15 22:23:24 
 * @Desc: 完整示例数据 
 */
export default {
    "root": {
        "data": {
            "text": "鱼骨头图",
        },
        "children": [{
            "data": {
                "text": "分支主题",
                "expand": true
            },
            "children": [{
                "data": {
                    "text": "分支主题",
                    "hyperlink": "https://naotu.baidu.com/",
                    "hyperlinkTitle": "百度脑图",
                    "image": "https://kityminder-img.gz.bcebos.com/865551aedebd1e02ac6e76d24c093231df9aafda",
                    "imageTitle": "图片名称",
                    "imageSize": {
                        "width": 200,
                        "height": 112
                    },
                    "note": "我是备注",
                    "resource": ["标签1", "标签2"],
                    "priority": 5,
                    "progress": 7,
                    // ... 其他类型的图标
                },
                "children": []
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