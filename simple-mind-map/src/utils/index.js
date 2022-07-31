/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 14:13:17 
 * @Desc: 深度优先遍历树 
 */
export const walk = (root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0, index = 0) => {
    let stop = false
    if (beforeCallback) {
        stop = beforeCallback(root, parent, isRoot, layerIndex, index)
    }
    if (!stop && root.children && root.children.length > 0) {
        let _layerIndex = layerIndex + 1
        root.children.forEach((node, nodeIndex) => {
            walk(node, root, beforeCallback, afterCallback, false, _layerIndex, nodeIndex)
        })
    }
    afterCallback && afterCallback(root, parent, isRoot, layerIndex, index)
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-07 18:47:20 
 * @Desc: 广度优先遍历树 
 */
export const bfsWalk = (root, callback) => {
    callback(root)
    let stack = [root]
    let isStop = false
    while (stack.length) {
        if (isStop) {
            break
        }
        let cur = stack.shift()
        if (cur.children && cur.children.length) {
            cur.children.forEach((item) => {
                stack.push(item)
                if(callback(item) === 'stop') {
                    isStop = true
                }
            })
        }
    }
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-09 10:44:54 
 * @Desc: 缩放图片尺寸 
 */
export const resizeImgSize = (width, height, maxWidth, maxHeight) => {
    let nRatio = width / height
    let arr = []
    if (maxWidth && maxHeight) {
        if (width <= maxWidth && height <= maxHeight) {
            arr = [width, height]
        } else {
            let mRatio = maxWidth / maxHeight
            if (nRatio > mRatio) { // 固定高度
                arr = [nRatio * maxHeight, maxHeight]
            } else { // 固定宽度
                arr = [maxWidth, maxWidth / nRatio]
            }
        }
    } else if (maxWidth) {
        if (width <= maxWidth) {
            arr = [width, height]
        } else {
            arr = [maxWidth, maxWidth / nRatio]
        }
    } else if (maxHeight) {
        if (height <= maxHeight) {
            arr = [width, height]
        } else {
            arr = [nRatio * maxHeight, maxHeight]
        }
    }
    return arr
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-09 10:18:42 
 * @Desc: 缩放图片 
 */
export const resizeImg = (imgUrl, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = imgUrl
        img.onload = () => {
            let arr = resizeImgSize(img.naturalWidth, img.naturalHeight, maxWidth, maxHeight)
            resolve(arr)
        }
        img.onerror = (e) => {
            reject(e)
        }
    })
}

/** 
 * @Author: 王林 
 * @Date: 2021-05-04 12:26:56 
 * @Desc: 从头html结构字符串里获取带换行符的字符串 
 */
export const getStrWithBrFromHtml = (str) => {
    str = str.replace(/<br>/img, '\n')
    let el = document.createElement('div')
    el.innerHTML = str
    str = el.textContent
    return str;
}

/** 
 * @Author: 王林 
 * @Date: 2021-05-04 14:45:39 
 * @Desc: 极简的深拷贝 
 */
export const simpleDeepClone = (data) => {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        return null
    }
}

/** 
 * @Author: 王林 
 * @Date: 2021-05-04 14:40:11 
 * @Desc: 复制渲染树数据 
 */
export const copyRenderTree = (tree, root) => {
    tree.data = simpleDeepClone(root.data)
    tree.children = []
    if (root.children && root.children.length > 0) {
        root.children.forEach((item, index) => {
            tree.children[index] = copyRenderTree({}, item)
        })
    }
    return tree;
}

/** 
 * @Author: 王林 
 * @Date: 2021-05-04 14:40:11 
 * @Desc: 复制节点树数据 
 */
export const copyNodeTree = (tree, root) => {
    tree.data = simpleDeepClone(root.nodeData.data)
    // tree.data.isActive = false
    tree.children = []
    if (root.children && root.children.length > 0) {
        root.children.forEach((item, index) => {
            tree.children[index] = copyNodeTree({}, item)
        })
    }
    return tree;
}

/** 
 * @Author: 王林 
 * @Date: 2021-07-04 09:08:43 
 * @Desc: 图片转成dataURL 
 */
export const imgToDataUrl = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
        img.setAttribute('crossOrigin', 'anonymous')
        img.onload = () => {
            try {
                let canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                let ctx = canvas.getContext('2d')
                // 图片绘制到canvas里
                ctx.drawImage(img, 0, 0, img.width, img.height)
                resolve(canvas.toDataURL())
            } catch (e) {
                reject(e)
            }
        }
        img.onerror = (e) => {
            reject(e)
        }
        img.src = src
    });
}

/** 
 * @Author: 王林 
 * @Date: 2021-07-04 16:20:06 
 * @Desc: 下载文件 
 */
export const downloadFile = (file, fileName) => {
    let a = document.createElement('a')
    a.href = file
    a.download = fileName
    a.click()
}

/** 
 * @Author: 王林 
 * @Date: 2021-07-11 10:36:47 
 * @Desc: 节流函数 
 */
export const throttle = (fn, time = 300, ctx) => {
    let timer = null
    return () => {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.call(ctx)
            timer = null
        }, 300)
    };
}

/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-07-12 10:27:36 
 * @Desc: 异步执行任务队列 
 */
export const asyncRun = (taskList, callback = () => {}) => {
    let index = 0
    let len = taskList.length
    if (len <= 0) {
        return callback()
    }
    let loop = () => {
        if (index >= len) {
            callback()
            return
        }
        taskList[index]()
        setTimeout(() => {
            index++
            loop()
        }, 0)
    }
    loop()
}
