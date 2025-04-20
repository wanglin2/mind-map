import { fromMarkdown } from 'mdast-util-from-markdown'

const getNodeText = node => {
  if (node.type === 'list') return ''
  let textStr = ''

  ;(node.children || []).forEach(item => {
    if (['inlineCode', 'text'].includes(item.type)) {
      textStr += item.value || ''
    } else {
      textStr += getNodeText(item)
    }
  })

  return textStr
}

// 处理list的情况
const handleList = node => {
  let list = []
  let walk = (arr, newArr) => {
    for (let i = 0; i < arr.length; i++) {
      let cur = arr[i]
      let node = {}
      node.data = {
        // 节点内容
        text: getNodeText(cur)
      }
      node.children = []
      newArr.push(node)
      if (cur.children.length > 1) {
        for (let j = 1; j < cur.children.length; j++) {
          let cur2 = cur.children[j]
          if (cur2.type === 'list') {
            walk(cur2.children, node.children)
          }
        }
      }
    }
  }
  walk(node.children, list)
  return list
}

// 将markdown转换成节点树
export const transformMarkdownTo = md => {
  const tree = fromMarkdown(md)
  let root = {
    children: []
  }
  let childrenQueue = [root.children]
  let currentChildren = root.children
  let depthQueue = [-1]
  let currentDepth = -1
  for (let i = 0; i < tree.children.length; i++) {
    let cur = tree.children[i]
    if (cur.type === 'heading') {
      if (!cur.children[0]) continue
      // 创建新节点
      let node = {}
      node.data = {
        // 节点内容
        text: getNodeText(cur)
      }
      node.children = []
      // 如果当前的层级大于上一个节点的层级，那么是其子节点
      if (cur.depth > currentDepth) {
        // 添加到上一个节点的子节点列表里
        currentChildren.push(node)
        // 更新当前栈和数据
        childrenQueue.push(node.children)
        currentChildren = node.children
        depthQueue.push(cur.depth)
        currentDepth = cur.depth
      } else if (cur.depth === currentDepth) {
        // 如果当前层级等于上一个节点的层级，说明它们是同级节点
        // 将上一个节点出栈
        childrenQueue.pop()
        currentChildren = childrenQueue[childrenQueue.length - 1]
        depthQueue.pop()
        currentDepth = depthQueue[depthQueue.length - 1]
        // 追加到上上个节点的子节点列表里
        currentChildren.push(node)
        // 更新当前栈和数据
        childrenQueue.push(node.children)
        currentChildren = node.children
        depthQueue.push(cur.depth)
        currentDepth = cur.depth
      } else {
        // 如果当前层级小于上一个节点的层级，那么一直出栈，直到遇到比当前层级小的节点
        while (depthQueue.length) {
          childrenQueue.pop()
          currentChildren = childrenQueue[childrenQueue.length - 1]
          depthQueue.pop()
          currentDepth = depthQueue[depthQueue.length - 1]
          if (currentDepth < cur.depth) {
            // 追加到该节点的子节点列表里
            currentChildren.push(node)
            // 更新当前栈和数据
            childrenQueue.push(node.children)
            currentChildren = node.children
            depthQueue.push(cur.depth)
            currentDepth = cur.depth
            break
          }
        }
      }
    } else if (cur.type === 'list') {
      currentChildren.push(...handleList(cur))
    }
  }
  return root.children[0]
}
