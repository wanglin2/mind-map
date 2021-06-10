/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 14:13:17 
 * @Desc: 深度优先遍历树 
 */
export const walk = (root, parent, beforeCallback, afterCallback, isRoot, layerIndex = 0) => {
    beforeCallback && beforeCallback(root, parent, isRoot, layerIndex)
    if (root.children && root.children.length > 0) {
        let _layerIndex = layerIndex + 1
        root.children.forEach((node) => {
            walk(node, root, beforeCallback, afterCallback, false, _layerIndex)
        })
    }
    afterCallback && afterCallback(root, parent, isRoot, layerIndex)
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
    while (stack.length) {
        let cur = stack.shift()
        if (cur.children && cur.children.length) {
            cur.children.forEach((item) => {
                stack.push(item)
                callback(item)
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
    if (root.children.length > 0) {
        root.children.forEach((item, index) => {
            tree.children[index] = copyRenderTree({}, item)
        })
    }
    return tree;
}