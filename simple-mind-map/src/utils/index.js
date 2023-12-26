import { v4 as uuidv4 } from 'uuid'
import {
  nodeDataNoStylePropList,
  selfCloseTagList
} from '../constants/constant'
import MersenneTwister from './mersenneTwister'
//  深度优先遍历树
export const walk = (
  root,
  parent,
  beforeCallback,
  afterCallback,
  isRoot,
  layerIndex = 0,
  index = 0
) => {
  let stop = false
  if (beforeCallback) {
    stop = beforeCallback(root, parent, isRoot, layerIndex, index)
  }
  if (!stop && root.children && root.children.length > 0) {
    let _layerIndex = layerIndex + 1
    root.children.forEach((node, nodeIndex) => {
      walk(
        node,
        root,
        beforeCallback,
        afterCallback,
        false,
        _layerIndex,
        nodeIndex
      )
    })
  }
  afterCallback && afterCallback(root, parent, isRoot, layerIndex, index)
}

//  广度优先遍历树
export const bfsWalk = (root, callback) => {
  let stack = [root]
  let isStop = false
  if (callback(root, null) === 'stop') {
    isStop = true
  }
  while (stack.length) {
    if (isStop) {
      break
    }
    let cur = stack.shift()
    if (cur.children && cur.children.length) {
      cur.children.forEach(item => {
        if (isStop) return
        stack.push(item)
        if (callback(item, cur) === 'stop') {
          isStop = true
        }
      })
    }
  }
}

// 按原比例缩放图片
export const resizeImgSizeByOriginRatio = (
  width,
  height,
  newWidth,
  newHeight
) => {
  let arr = []
  let nRatio = width / height
  let mRatio = newWidth / newHeight
  if (nRatio > mRatio) {
    // 固定高度
    arr = [nRatio * newHeight, newHeight]
  } else {
    // 固定宽度
    arr = [newWidth, newWidth / nRatio]
  }
  return arr
}

//  缩放图片尺寸
export const resizeImgSize = (width, height, maxWidth, maxHeight) => {
  let nRatio = width / height
  let arr = []
  if (maxWidth && maxHeight) {
    if (width <= maxWidth && height <= maxHeight) {
      arr = [width, height]
    } else {
      let mRatio = maxWidth / maxHeight
      if (nRatio > mRatio) {
        // 固定高度
        arr = [nRatio * maxHeight, maxHeight]
      } else {
        // 固定宽度
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

//  缩放图片
export const resizeImg = (imgUrl, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = imgUrl
    img.onload = () => {
      let arr = resizeImgSize(
        img.naturalWidth,
        img.naturalHeight,
        maxWidth,
        maxHeight
      )
      resolve(arr)
    }
    img.onerror = e => {
      reject(e)
    }
  })
}

//  从头html结构字符串里获取带换行符的字符串
export const getStrWithBrFromHtml = str => {
  str = str.replace(/<br>/gim, '\n')
  let el = document.createElement('div')
  el.innerHTML = str
  str = el.textContent
  return str
}

//  极简的深拷贝
export const simpleDeepClone = data => {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    return null
  }
}

//  复制渲染树数据
export const copyRenderTree = (tree, root, removeActiveState = false) => {
  tree.data = simpleDeepClone(root.data)
  if (removeActiveState) {
    tree.data.isActive = false
    if (tree.data.generalization) {
      tree.data.generalization.isActive = false
    }
  }
  tree.children = []
  if (root.children && root.children.length > 0) {
    root.children.forEach((item, index) => {
      tree.children[index] = copyRenderTree({}, item, removeActiveState)
    })
  }
  return tree
}

//  复制节点树数据
export const copyNodeTree = (
  tree,
  root,
  removeActiveState = false,
  removeId = true
) => {
  tree.data = simpleDeepClone(root.nodeData ? root.nodeData.data : root.data)
  // 移除节点uid
  if (removeId) {
    delete tree.data.uid
  } else if (!tree.data.uid) {
    // 否则保留或生成
    tree.data.uid = createUid()
  }
  if (removeActiveState) {
    tree.data.isActive = false
  }
  tree.children = []
  if (root.children && root.children.length > 0) {
    root.children.forEach((item, index) => {
      tree.children[index] = copyNodeTree({}, item, removeActiveState, removeId)
    })
  } else if (
    root.nodeData &&
    root.nodeData.children &&
    root.nodeData.children.length > 0
  ) {
    root.nodeData.children.forEach((item, index) => {
      tree.children[index] = copyNodeTree({}, item, removeActiveState, removeId)
    })
  }
  return tree
}

//  图片转成dataURL
export const imgToDataUrl = src => {
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
    img.onerror = e => {
      reject(e)
    }
    img.src = src
  })
}

// 解析dataUrl
export const parseDataUrl = data => {
  if (!/^data:/.test(data)) return data
  let [typeStr, base64] = data.split(',')
  let res = /^data:[^/]+\/([^;]+);/.exec(typeStr)
  let type = res[1]
  return {
    type,
    base64
  }
}

//  下载文件
export const downloadFile = (file, fileName) => {
  let a = document.createElement('a')
  a.href = file
  a.download = fileName
  a.click()
}

//  节流函数
export const throttle = (fn, time = 300, ctx) => {
  let timer = null
  return (...args) => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.call(ctx, ...args)
      timer = null
    }, time)
  }
}

//  异步执行任务队列
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

// 角度转弧度
export const degToRad = deg => {
  return deg * (Math.PI / 180)
}

// 驼峰转连字符
export const camelCaseToHyphen = str => {
  return str.replace(/([a-z])([A-Z])/g, (...args) => {
    return args[1] + '-' + args[2].toLowerCase()
  })
}

//计算节点的文本长宽
let measureTextContext = null
export const measureText = (text, { italic, bold, fontSize, fontFamily }) => {
  const font = joinFontStr({
    italic,
    bold,
    fontSize,
    fontFamily
  })
  if (!measureTextContext) {
    const canvas = document.createElement('canvas')
    measureTextContext = canvas.getContext('2d')
  }
  measureTextContext.save()
  measureTextContext.font = font
  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
    measureTextContext.measureText(text)
  measureTextContext.restore()
  const height = actualBoundingBoxAscent + actualBoundingBoxDescent
  return { width, height }
}

// 拼接font字符串
export const joinFontStr = ({ italic, bold, fontSize, fontFamily }) => {
  return `${italic ? 'italic ' : ''} ${
    bold ? 'bold ' : ''
  } ${fontSize}px ${fontFamily} `
}

//  在下一个事件循环里执行任务
export const nextTick = function (fn, ctx) {
  let pending = false
  let timerFunc = null
  let handle = () => {
    pending = false
    ctx ? fn.call(ctx) : fn()
  }
  // 支持MutationObserver接口的话使用MutationObserver
  if (typeof MutationObserver !== 'undefined') {
    let counter = 1
    let observer = new MutationObserver(handle)
    let textNode = document.createTextNode(counter)
    observer.observe(textNode, {
      characterData: true // 设为 true 表示监视指定目标节点或子节点树中节点所包含的字符数据的变化
    })
    timerFunc = function () {
      counter = (counter + 1) % 2 // counter会在0和1两者循环变化
      textNode.data = counter // 节点变化会触发回调handle，
    }
  } else {
    // 否则使用定时器
    timerFunc = setTimeout
  }
  return function () {
    if (pending) return
    pending = true
    timerFunc(handle, 0)
  }
}

// 检查节点是否超出画布
export const checkNodeOuter = (mindMap, node) => {
  let elRect = mindMap.elRect
  let { scaleX, scaleY, translateX, translateY } = mindMap.draw.transform()
  let { left, top, width, height } = node
  let right = (left + width) * scaleX + translateX
  let bottom = (top + height) * scaleY + translateY
  left = left * scaleX + translateX
  top = top * scaleY + translateY
  let offsetLeft = 0
  let offsetTop = 0
  if (left < 0) {
    offsetLeft = -left
  }
  if (right > elRect.width) {
    offsetLeft = -(right - elRect.width)
  }
  if (top < 0) {
    offsetTop = -top
  }
  if (bottom > elRect.height) {
    offsetTop = -(bottom - elRect.height)
  }
  return {
    isOuter: offsetLeft !== 0 || offsetTop !== 0,
    offsetLeft,
    offsetTop
  }
}

// 提取html字符串里的纯文本
let getTextFromHtmlEl = null
export const getTextFromHtml = html => {
  if (!getTextFromHtmlEl) {
    getTextFromHtmlEl = document.createElement('div')
  }
  getTextFromHtmlEl.innerHTML = html
  return getTextFromHtmlEl.textContent
}

// 将blob转成data:url
export const readBlob = blob => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = evt => {
      resolve(evt.target.result)
    }
    reader.onerror = err => {
      reject(err)
    }
    reader.readAsDataURL(blob)
  })
}

// 将dom节点转换成html字符串
let nodeToHTMLWrapEl = null
export const nodeToHTML = node => {
  if (!nodeToHTMLWrapEl) {
    nodeToHTMLWrapEl = document.createElement('div')
  }
  nodeToHTMLWrapEl.innerHTML = ''
  nodeToHTMLWrapEl.appendChild(node)
  return nodeToHTMLWrapEl.innerHTML
}

// 获取图片大小
export const getImageSize = src => {
  return new Promise(resolve => {
    let img = new Image()
    img.src = src
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = () => {
      resolve({
        width: 0,
        height: 0
      })
    }
  })
}

// 创建节点唯一的id
export const createUid = () => {
  return uuidv4()
}

// 加载图片文件
export const loadImage = imgFile => {
  return new Promise((resolve, reject) => {
    let fr = new FileReader()
    fr.readAsDataURL(imgFile)
    fr.onload = async e => {
      let url = e.target.result
      let size = await getImageSize(url)
      resolve({
        url,
        size
      })
    }
    fr.onerror = error => {
      reject(error)
    }
  })
}

// 移除字符串中的html实体
export const removeHTMLEntities = str => {
  ;[['&nbsp;', '&#160;']].forEach(item => {
    str = str.replaceAll(item[0], item[1])
  })
  return str
}

// 获取一个数据的类型
export const getType = data => {
  return Object.prototype.toString.call(data).slice(8, -1)
}

// 判断一个数据是否是null和undefined和空字符串
export const isUndef = data => {
  return data === null || data === undefined || data === ''
}

// 移除html字符串中节点的内联样式
export const removeHtmlStyle = html => {
  return html.replaceAll(/(<[^\s]+)\s+style=["'][^'"]+["']\s*(>)/g, '$1$2')
}

// 给html标签中指定的标签添加内联样式
export const addHtmlStyle = (html, tag, style) => {
  const reg = new RegExp(`(<${tag}[^>]*)(>[^<>]*</${tag}>)`, 'g')
  return html.replaceAll(reg, `$1 style="${style}"$2`)
}

// 检查一个字符串是否是富文本字符
let checkIsRichTextEl = null
export const checkIsRichText = str => {
  if (!checkIsRichTextEl) {
    checkIsRichTextEl = document.createElement('div')
  }
  checkIsRichTextEl.innerHTML = str
  for (let c = checkIsRichTextEl.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true
  }
  return false
}

// 搜索和替换html字符串中指定的文本
let replaceHtmlTextEl = null
export const replaceHtmlText = (html, searchText, replaceText) => {
  if (!replaceHtmlTextEl) {
    replaceHtmlTextEl = document.createElement('div')
  }
  replaceHtmlTextEl.innerHTML = html
  let walk = root => {
    let childNodes = root.childNodes
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点
        walk(node)
      } else if (node.nodeType === 3) {
        // 文本节点
        root.replaceChild(
          document.createTextNode(
            node.nodeValue.replaceAll(searchText, replaceText)
          ),
          node
        )
      }
    })
  }
  walk(replaceHtmlTextEl)
  return replaceHtmlTextEl.innerHTML
}

// 判断一个颜色是否是白色
export const isWhite = color => {
  color = String(color).replaceAll(/\s+/g, '')
  return (
    ['#fff', '#ffffff', '#FFF', '#FFFFFF', 'rgb(255,255,255)'].includes(
      color
    ) || /rgba\(255,255,255,[^)]+\)/.test(color)
  )
}

// 判断一个颜色是否是透明
export const isTransparent = color => {
  color = String(color).replaceAll(/\s+/g, '')
  return (
    ['', 'transparent'].includes(color) || /rgba\(\d+,\d+,\d+,0\)/.test(color)
  )
}

// 从当前主题里获取一个非透明非白色的颜色
export const getVisibleColorFromTheme = themeConfig => {
  let { lineColor, root, second, node } = themeConfig
  let list = [
    lineColor,
    root.fillColor,
    root.color,
    second.fillColor,
    second.color,
    node.fillColor,
    node.color,
    root.borderColor,
    second.borderColor,
    node.borderColor
  ]
  for (let i = 0; i < list.length; i++) {
    let color = list[i]
    if (!isTransparent(color) && !isWhite(color)) {
      return color
    }
  }
}

// 将<p><span></span><p>形式的节点富文本内容转换成\n换行的文本
let nodeRichTextToTextWithWrapEl = null
export const nodeRichTextToTextWithWrap = html => {
  if (!nodeRichTextToTextWithWrapEl) {
    nodeRichTextToTextWithWrapEl = document.createElement('div')
  }
  nodeRichTextToTextWithWrapEl.innerHTML = html
  const childNodes = nodeRichTextToTextWithWrapEl.childNodes
  let res = ''
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i]
    if (node.nodeType === 1) {
      // 元素节点
      if (node.tagName.toLowerCase() === 'p') {
        res += node.textContent + '\n'
      } else {
        res += node.textContent
      }
    } else if (node.nodeType === 3) {
      // 文本节点
      res += node.nodeValue
    }
  }
  return res.replace(/\n$/, '')
}

// 将<br>换行的文本转换成<p><span></span><p>形式的节点富文本内容
let textToNodeRichTextWithWrapEl = null
export const textToNodeRichTextWithWrap = html => {
  if (!textToNodeRichTextWithWrapEl) {
    textToNodeRichTextWithWrapEl = document.createElement('div')
  }
  textToNodeRichTextWithWrapEl.innerHTML = html
  const childNodes = textToNodeRichTextWithWrapEl.childNodes
  let list = []
  let str = ''
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i]
    if (node.nodeType === 1) {
      // 元素节点
      if (node.tagName.toLowerCase() === 'br') {
        list.push(str)
        str = ''
      } else {
        str += node.textContent
      }
    } else if (node.nodeType === 3) {
      // 文本节点
      str += node.nodeValue
    }
  }
  if (str) {
    list.push(str)
  }
  return list
    .map(item => {
      return `<p><span>${htmlEscape(item)}</span></p>`
    })
    .join('')
}

// 判断是否是移动端环境
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// 获取对象改变了的的属性
export const getObjectChangedProps = (oldObject, newObject) => {
  const res = {}
  Object.keys(newObject).forEach(prop => {
    const oldVal = oldObject[prop]
    const newVal = newObject[prop]
    if (getType(oldVal) !== getType(newVal)) {
      res[prop] = newVal
      return
    }
    if (getType(oldVal) === 'Object') {
      if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        res[prop] = newVal
        return
      }
    } else {
      if (oldVal !== newVal) {
        res[prop] = newVal
        return
      }
    }
  })
  return res
}

// 判断一个字段是否是节点数据中的样式字段
export const checkIsNodeStyleDataKey = key => {
  // 用户自定义字段
  if (/^_/.test(key)) return false
  // 不在节点非样式字段列表里，那么就是样式字段
  if (!nodeDataNoStylePropList.includes(key)) {
    return true
  }
  return false
}

// 合并图标数组
// const data = [
//   { type: 'priority', name: '优先级图标', list: [{ name: '1', icon: 'a' }, { name: 2, icon: 'b' }] },
//   { type: 'priority', name: '优先级图标', list: [{ name: '2', icon: 'c' }, { name: 3, icon: 'd' }] },
// ];

// mergerIconList(data) 结果

// [
//   { type: 'priority', name: '优先级图标', list: [{ name: '1', icon: 'a' }, { name: 2, icon: 'c' }, { name: 3, icon: 'd' }] },
// ]
export const mergerIconList = list => {
  return list.reduce((result, item) => {
    const existingItem = result.find(x => x.type === item.type)
    if (existingItem) {
      item.list.forEach(newObj => {
        const existingObj = existingItem.list.find(x => x.name === newObj.name)
        if (existingObj) {
          existingObj.icon = newObj.icon
        } else {
          existingItem.list.push(newObj)
        }
      })
    } else {
      result.push({ ...item })
    }
    return result
  }, [])
}

// 从节点实例列表里找出顶层的节点
export const getTopAncestorsFomNodeList = list => {
  let res = []
  list.forEach(node => {
    if (
      !list.find(item => {
        return item.uid !== node.uid && item.isAncestor(node)
      })
    ) {
      res.push(node)
    }
  })
  return res
}

// 从给定的节点实例列表里判断是否存在上下级关系
export const checkHasSupSubRelation = list => {
  for (let i = 0; i < list.length; i++) {
    const cur = list[i]
    if (
      list.find(item => {
        return item.uid !== cur.uid && cur.isAncestor(item)
      })
    ) {
      return true
    }
  }
  return false
}

// 解析要添加概要的节点实例列表
export const parseAddGeneralizationNodeList = list => {
  const cache = {}
  const uidToParent = {}
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
    if (cache[uid].length > 1) {
      const rangeList = cache[uid]
        .map(item => {
          return item.index
        })
        .sort((a, b) => {
          return a - b
        })
      res.push({
        node: uidToParent[uid],
        range: [rangeList[0], rangeList[rangeList.length - 1]]
      })
    } else {
      res.push({
        node: cache[uid][0].node
      })
    }
  })
  return res
}

// 判断两个矩形是否重叠
export const checkTwoRectIsOverlap = (
  minx1,
  maxx1,
  miny1,
  maxy1,
  minx2,
  maxx2,
  miny2,
  maxy2
) => {
  return maxx1 > minx2 && maxx2 > minx1 && maxy1 > miny2 && maxy2 > miny1
}

// 聚焦指定输入框
export const focusInput = el => {
  let selection = window.getSelection()
  let range = document.createRange()
  range.selectNodeContents(el)
  range.collapse()
  selection.removeAllRanges()
  selection.addRange(range)
}

// 聚焦全选指定输入框
export const selectAllInput = el => {
  let selection = window.getSelection()
  let range = document.createRange()
  range.selectNodeContents(el)
  selection.removeAllRanges()
  selection.addRange(range)
}

// 给指定的节点列表树数据添加附加数据，会修改原数据
export const addDataToAppointNodes = (appointNodes, data = {}) => {
  const walk = list => {
    list.forEach(node => {
      node.data = {
        ...node.data,
        ...data
      }
      if (node.children && node.children.length > 0) {
        walk(node.children)
      }
    })
  }
  walk(appointNodes)
  return appointNodes
}

// 给指定的节点列表树数据添加uid，会修改原数据
// createNewId默认为false，即如果节点不存在uid的话，会创建新的uid。如果传true，那么无论节点数据原来是否存在uid，都会创建新的uid
export const createUidForAppointNodes = (appointNodes, createNewId = false) => {
  const walk = list => {
    list.forEach(node => {
      if (!node.data) {
        node.data = {}
      }
      if (createNewId || isUndef(node.data.uid)) {
        node.data.uid = createUid()
      }
      if (node.children && node.children.length > 0) {
        walk(node.children)
      }
    })
  }
  walk(appointNodes)
  return appointNodes
}

// 传入一个数据，如果该数据是数组，那么返回该数组，否则返回一个以该数据为成员的数组
export const formatDataToArray = data => {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

//  获取节点在同级里的位置索引
export const getNodeDataIndex = node => {
  return node.parent
    ? node.parent.nodeData.children.findIndex(item => {
        return item.data.uid === node.uid
      })
    : 0
}

// 从一个节点列表里找出某个节点的索引
export const getNodeIndexInNodeList = (node, nodeList) => {
  return nodeList.findIndex(item => {
    return item.uid === node.uid
  })
}

// 根据内容生成颜色
export const generateColorByContent = str => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  // 这里使用伪随机数的原因是因为
  // 1. 如果字符串的内容差不多，根据hash生产的颜色就比较相近，不好区分，比如v1.1 v1.2，所以需要加入随机数来使得颜色能够区分开
  // 2. 普通的随机数每次数值不一样，就会导致每次新增标签原来的标签颜色就会发生改变，所以加入了这个方法，使得内容不变随机数也不变
  const rng = new MersenneTwister(hash)
  const h = rng.genrand_int32() % 360
  return 'hsla(' + h + ', 50%, 50%, 1)'
}

//  html转义
export const htmlEscape = str => {
  ;[
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;']
  ].forEach(item => {
    str = str.replace(new RegExp(item[0], 'g'), item[1])
  })
  return str
}

// 判断两个对象是否相同，只处理对象或数组
export const isSameObject = (a, b) => {
  const type = getType(a)
  // a、b类型不一致，那么肯定不相同
  if (type !== getType(b)) return false
  // 如果都是对象
  if (type === 'Object') {
    const keysa = Object.keys(a)
    const keysb = Object.keys(b)
    // 对象字段数量不一样，肯定不相同
    if (keysa.length !== keysb.length) return false
    // 字段数量一样，那么需要遍历字段进行判断
    for (let i = 0; i < keysa.length; i++) {
      const key = keysa[i]
      // b没有a的一个字段，那么肯定不相同
      if (!keysb.includes(key)) return false
      // 字段名称一样，那么需要递归判断它们的值
      const isSame = isSameObject(a[key], b[key])
      if (!isSame) {
        return false
      }
    }
    return true
  } else if (type === 'Array') {
    // 如果都是数组
    // 数组长度不一样，肯定不相同
    if (a.length !== b.length) return false
    // 长度一样，那么需要遍历进行判断
    for (let i = 0; i < a.length; i++) {
      const itema = a[i]
      const itemb = b[i]
      const typea = getType(itema)
      const typeb = getType(itemb)
      if (typea !== typeb) return false
      const isSame = isSameObject(itema, itemb)
      if (!isSame) {
        return false
      }
    }
    return true
  } else {
    // 其他类型，直接全等判断
    return a === b
  }
}

// 将数据设置到用户剪切板中
export const setDataToClipboard = data => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(data))
  }
}

// 从用户剪贴板中读取文字和图片
export const getDataFromClipboard = async () => {
  let text = null
  let img = null
  if (navigator.clipboard) {
    text = await navigator.clipboard.readText()
    const items = await navigator.clipboard.read()
    if (items && items.length > 0) {
      for (const clipboardItem of items) {
        for (const type of clipboardItem.types) {
          if (/^image\//.test(type)) {
            img = await clipboardItem.getType(type)
            break
          }
        }
      }
    }
  }
  return {
    text,
    img
  }
}

// 从节点的父节点的nodeData.children列表中移除该节点的数据
export const removeFromParentNodeData = node => {
  if (!node || !node.parent) return
  const index = getNodeDataIndex(node)
  if (index === -1) return
  node.parent.nodeData.children.splice(index, 1)
}

// 给html自闭合标签添加闭合状态
export const handleSelfCloseTags = str => {
  selfCloseTagList.forEach(tagName => {
    str = str.replaceAll(
      new RegExp(`<${tagName}([^>]*)>`, 'g'),
      `<${tagName} $1 />`
    )
  })
  return str
}

// 检查两个节点列表是否包含的节点是一样的
export const checkNodeListIsEqual = (list1, list2) => {
  if (list1.length !== list2.length) return false
  for (let i = 0; i < list1.length; i++) {
    if (
      !list2.find(item => {
        return item.uid === list1[i].uid
      })
    ) {
      return false
    }
  }
  return true
}
