const createFullData = () => {
    return {
        "image": "/enJFNMHnedQTYTESGfDkctCp2.jpeg",
        "imageTitle": "图片名称",
        "imageSize": {
            "width": 1000,
            "height": 563
        },
        "icon": ['priority_1'],
        "tag": ["标签1", "标签2"],
        "hyperlink": "http://lxqnsys.com/",
        "hyperlinkTitle": "理想青年实验室",
        "note": "理想青年实验室\n一个有意思的角落",
        // 自定义位置
        // "customLeft": 1318,
        // "customTop": 374.5
    };
}

// 节点较多示例数据
const data1 = {
    "root": {
        "data": {
            "text": "根节点"
        },
        "children": [
            {
                "data": {
                    "text": "二级节点1",
                    "expand": true,
                },
                "children": [{
                    "data": {
                        "text": "分支主题",
                        ...createFullData()
                    },
                    "children": [{
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                        "children": [{
                            "data": {
                                "text": "分支主题",
                                ...createFullData()
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                            "children": [{
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                                "children": [{
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                    "children": [{
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }, {
                                        "data": {
                                            "text": "分支主题",
                                        },
                                        "children": [{
                                            "data": {
                                                "text": "分支主题",
                                            },
                                        }, {
                                            "data": {
                                                "text": "分支主题",
                                            },
                                        }, {
                                            "data": {
                                                "text": "分支主题",
                                            },
                                        }, {
                                            "data": {
                                                "text": "分支主题",
                                            },
                                        }]
                                    }, {
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }, {
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }]
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }]
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }]
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }]
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }]
                }]
            },
            {
                "data": {
                    "text": "二级节点2",
                    "expand": true,
                },
                "children": [{
                    "data": {
                        "text": "分支主题",
                    },
                }, {
                    "data": {
                        "text": "分支主题",
                    },
                    "children": [{
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }]
                }, {
                    "data": {
                        "text": "分支主题",
                    },
                }, {
                    "data": {
                        "text": "分支主题",
                    },
                }]
            },
            {
                "data": {
                    "text": "二级节点3",
                    "expand": true,
                },
                "children": [{
                    "data": {
                        "text": "分支主题",
                    },
                    "children": [{
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                        "children": [{
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }]
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }]
                }]
            },
            {
                "data": {
                    "text": "二级节点4",
                    "expand": true,
                },
                "children": [{
                    "data": {
                        "text": "分支主题",
                    },
                    "children": [{
                        "data": {
                            "text": "分支主题",
                        },
                        "children": [{
                            "data": {
                                "text": "分支主题",
                            },
                            "children": [{
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }]
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }]
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                        "children": [{
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                            "children": [{
                                "data": {
                                    "text": "分支主题",
                                },
                                "children": [{
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }]
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                                "children": [{
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                    "children": [{
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }, {
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }, {
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }, {
                                        "data": {
                                            "text": "分支主题",
                                        },
                                    }]
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }]
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }]
                        }]
                    }, {
                        "data": {
                            "text": "分支主题",
                        },
                        "children": [{
                            "data": {
                                "text": "分支主题",
                            },
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                            "children": [{
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                                "children": [{
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }, {
                                    "data": {
                                        "text": "分支主题",
                                    },
                                }]
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }]
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                            "children": [{
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }]
                        }, {
                            "data": {
                                "text": "分支主题",
                            },
                            "children": [{
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }, {
                                "data": {
                                    "text": "分支主题",
                                },
                            }]
                        }]
                    }]
                }]
            },
        ]
    }
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-07-12 13:49:43 
 * @Desc: 真实场景数据 
 */
const data2 = {
    "root": {
        "data": {
            "text": "一周安排"
        },
        "children": [
            {
                "data": {
                    "text": "生活"
                },
                "children": [
                    {
                        "data": {
                            "text": "锻炼"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "晨跑"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "7:00-8:00"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "夜跑"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "20:00-21:00"
                                        },
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "饮食"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "早餐"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "8:30"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "午餐"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "11:30"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "晚餐"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "19:00"
                                        },
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "休息"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "午休"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "12:30-13:00"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "晚休"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "23:00-6:30"
                                        },
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "text": "工作日\n周一至周五"
                },
                "children": [
                    {
                        "data": {
                            "text": "日常工作"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "9:00-18:00"
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "工作总结"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "21:00-22:00"
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "text": "学习"
                },
                "children": [
                    {
                        "data": {
                            "text": "工作日"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "早间新闻"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "8:00-8:30"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "阅读"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "21:00-23:00"
                                        },
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "休息日"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "财务管理"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "9:00-10:30"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "职场技能"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "14:00-15:30"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "其他书籍"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "16:00-18:00"
                                        },
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "text": "休闲娱乐"
                },
                "children": [
                    {
                        "data": {
                            "text": "看电影"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "1~2部"
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "逛街"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "1~2次"
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-07-12 14:29:10 
 * @Desc: 极简数据 
 */
const data3 = {
    "root": {
        "data": {
            "text": "根节点"
        },
        "children": [
            {
                "data": {
                    "text": "二级节点"
                },
                "children": [
                    {
                        "data": {
                            "text": "分支主题"
                        },
                        "children": []
                    },
                    {
                        "data": {
                            "text": "分支主题"
                        },
                        "children": []
                    }
                ]
            }
        ]
    }
}

const data4 = {
    "root": {
        "data": {
            "text": "根节点"
        },
        "children": [
            {
                "data": {
                    "text": "二级节点1"
                },
                "children": [
                    {
                        "data": {
                            "text": "子节点1-1"
                        },
                        "children": []
                    },
                    {
                        "data": {
                            "text": "子节点1-2"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "子节点1-2-1"
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "子节点1-2-2"
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "子节点1-2-3"
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "text": "二级节点2"
                },
                "children": [
                    {
                        "data": {
                            "text": "子节点2-1"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "子节点2-1-1"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "子节点2-1-1-1"
                                        },
                                        "children": []
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "子节点2-2"
                        },
                        "children": []
                    }
                ]
            }
        ]
    }
}

// 带概要
const data5 = {
    "root": {
        "data": {
            "text": "根节点"
        },
        "children": [
            {
                "data": {
                    "text": "二级节点",
                    "generalization": {
                        "text": "概要",
                    }
                },
                "children": [
                    {
                        "data": {
                            "text": "分支主题"
                        },
                        "children": []
                    },
                    {
                        "data": {
                            "text": "分支主题"
                        },
                        "children": []
                    }
                ]
            },
        ]
    }
}

// 富文本数据v0.4.0+，需要使用RichText插件才支持富文本编辑
const richTextData = {
    "root": {
        "data": {
            "text": "<a href='http://lxqnsys.com/' target='_blank'>理想去年实验室</a>",
            "richText": true
        },
        "children": []
    }
}

const rootData = {
    "root": {
        "data": {
            "text": "根节点"
        },
        "children": []
    }
}

export default {
    // ...data1,
    // ...data2,
    // ...data3,
    // ...data4,
    ...data5,
    // ...rootData,
    "theme": {
        "template": "classic4",
        "config": {
            // 自定义配置...
        }
    },
    "layout": "logicalStructure",
    // "layout": "mindMap",
    // "layout": "catalogOrganization"
    // "layout": "organizationStructure"
}