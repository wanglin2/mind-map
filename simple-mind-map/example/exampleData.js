const createFullData = () => {
    return {
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
    };
}

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
        "children": [
            {
                "data": {
                    "text": "二级节点1",
                    "expand": true,
                },
                "children": [{
                    "data": {
                        "text": "子节点1-1",
                        ...createFullData()
                    },
                }, {
                    "data": {
                        "text": "子节点1-2",
                        ...createFullData()
                    }
                },]
            },
            {
                "data": {
                    "text": "二级节点2"
                },
                "children": [
                    {
                        "data": {
                            "text": "子节点2-1",
                            ...createFullData()
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "子节点2-1-1",
                                    ...createFullData()
                                }
                            },
                            {
                                "data": {
                                    "text": "子节点2-1-2",
                                    ...createFullData()
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "子节点2-1-2-1",
                                            ...createFullData()
                                        }
                                    },
                                    {
                                        "data": {
                                            "text": "子节点2-1-2-2",
                                            ...createFullData()
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "子节点2-1-2-2-1",
                                                    ...createFullData()
                                                }
                                            },
                                            {
                                                "data": {
                                                    "text": "子节点2-1-2-2-2",
                                                    ...createFullData()
                                                }
                                            },
                                            {
                                                "data": {
                                                    "text": "子节点2-1-2-2-3",
                                                    ...createFullData()
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "data": {
                                            "text": "子节点4-1-2-3",
                                            ...createFullData()
                                        }
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "子节点2-1-3",
                                    ...createFullData()
                                }
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "子节点2-2",
                            ...createFullData()
                        }
                    }
                ]
            },
            {
                "data": {
                    "text": "二级节点3",
                },
                "children": [
                    {
                        "data": {
                            "text": "子节点3-1",
                            ...createFullData()
                        }
                    },
                    {
                        "data": {
                            "text": "子节点3-2",
                            ...createFullData()
                        }
                    }
                ]
            },
            {
                "data": {
                    "text": "二级节点4",
                },
                "children": [
                    {
                        "data": {
                            "text": "子节点4-1",
                            ...createFullData()
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "子节点4-1-1",
                                    ...createFullData()
                                }
                            },
                            {
                                "data": {
                                    "text": "子节点4-1-2",
                                    ...createFullData()
                                }
                            },
                            {
                                "data": {
                                    "text": "子节点4-1-3",
                                    ...createFullData()
                                }
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "子节点4-2",
                            ...createFullData()
                        }
                    }
                ]
            }
        ]
    },
    "theme": {
        "template": "default",
        "config": {
            // 自定义配置...
        }
    },
    // "layout": "mindMap",
    "layout": "logicalStructure"
    // "layout": "catalogOrganization"
}