import { getTopAncestorsFomNodeList } from '../../utils'

// 解析要添加外框的节点实例列表
export const parseAddNodeList = list => {
  // 找出顶层节点
  list = getTopAncestorsFomNodeList(list)
  const cache = {}
  const uidToParent = {}
  // 找出列表中节点在兄弟节点中的索引，并和父节点关联起来
  list.forEach(node => {
    const parent = node.parent
    if (parent) {
      const pUid = parent.uid
      uidToParent[pUid] = parent
      const index = node.getIndexInBrothers()
      const data = {
        node,
        index
      }
      if (cache[pUid]) {
        if (
          !cache[pUid].find(item => {
            return item.index === data.index
          })
        ) {
          cache[pUid].push(data)
        }
      } else {
        cache[pUid] = [data]
      }
    }
  })
  const res = []
  Object.keys(cache).forEach(uid => {
    const indexList = cache[uid]
    const parentNode = uidToParent[uid]
    if (indexList.length > 1) {
      // 多个节点
      const rangeList = indexList
        .map(item => {
          return item.index
        })
        .sort((a, b) => {
          return a - b
        })
      const minIndex = rangeList[0]
      const maxIndex = rangeList[rangeList.length - 1]
      let curStart = -1
      let curEnd = -1
      for (let i = minIndex; i <= maxIndex; i++) {
        // 连续索引
        if (rangeList.includes(i)) {
          if (curStart === -1) {
            curStart = i
          }
          curEnd = i
        } else {
          // 连续断开
          if (curStart !== -1 && curEnd !== -1) {
            res.push({
              node: parentNode,
              range: [curStart, curEnd]
            })
          }
          curStart = -1
          curEnd = -1
        }
      }
      // 不要忘了最后一段索引
      if (curStart !== -1 && curEnd !== -1) {
        res.push({
          node: parentNode,
          range: [curStart, curEnd]
        })
      }
    } else {
      // 单个节点
      res.push({
        node: parentNode,
        range: [indexList[0].index, indexList[0].index]
      })
    }
  })
  return res
}

// 解析获取节点的子节点生成的外框列表
export const getNodeOuterFrameList = node => {
  const children = node.children
  if (!children || children.length <= 0) return
  const res = []
  const map = {}
  children.forEach((item, index) => {
    const outerFrameData = item.getData('outerFrame')
    if (!outerFrameData) return
    const groupId = outerFrameData.groupId
    if (groupId) {
      if (!map[groupId]) {
        map[groupId] = []
      }
      map[groupId].push({
        node: item,
        index
      })
    } else {
      res.push({
        nodeList: [item],
        range: [index, index]
      })
    }
  })
  Object.keys(map).forEach(id => {
    const list = map[id]
    res.push({
      nodeList: list.map(item => {
        return item.node
      }),
      range: [list[0].index, list[list.length - 1].index]
    })
  })
  return res
}
