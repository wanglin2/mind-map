import exampleData from "simple-mind-map/example/exampleData"
import { simpleDeepClone } from 'simple-mind-map/src/utils/index'

const SIMPLE_MIND_MAP_DATA = 'SIMPLE_MIND_MAP_DATA'

/** 
 * @Author: 王林 
 * @Date: 2021-08-02 22:36:48 
 * @Desc: 克隆思维导图数据，去除激活状态 
 */
const copyMindMapTreeData = (tree, root) => {
    tree.data = simpleDeepClone(root.data)
    // tree.data.isActive = false
    tree.children = []
    if (root.children && root.children.length > 0) {
        root.children.forEach((item, index) => {
            tree.children[index] = copyMindMapTreeData({}, item)
        })
    }
    return tree;
}

/** 
 * @Author: 王林 
 * @Date: 2021-08-01 10:10:49 
 * @Desc: 获取缓存的思维导图数据 
 */
export const getData = () => {
    let store = localStorage.getItem(SIMPLE_MIND_MAP_DATA)
    if (store === null) {
        return simpleDeepClone(exampleData)
    } else {
        try {
            return JSON.parse(store)
        } catch (error) {
            return simpleDeepClone(exampleData)
        }
    }
}

/** 
 * @Author: 王林 
 * @Date: 2021-08-01 10:14:28 
 * @Desc: 存储思维导图数据 
 */
export const storeData = (data) => {
    try {
        let originData = getData()
        originData.root = copyMindMapTreeData({}, data)
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}

/** 
 * @Author: 王林 
 * @Date: 2021-08-01 10:24:56 
 * @Desc: 存储思维导图配置数据 
 */
export const storeConfig = (config) => {
    try {
        let originData = getData()
        originData = {
            ...originData,
            ...config
        }
        let dataStr = JSON.stringify(originData)
        localStorage.setItem(SIMPLE_MIND_MAP_DATA, dataStr)
    } catch (error) {
        console.log(error)
    }
}