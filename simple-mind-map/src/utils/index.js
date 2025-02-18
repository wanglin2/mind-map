import { v4 as uuidv4 } from 'uuid'
import {
  nodeDataNoStylePropList,
  selfCloseTagList,
  richTextSupportStyleList
} from '../constants/constant'
import MersenneTwister from './mersenneTwister'
import { ForeignObject } from '@svgdotjs/svg.js'
import merge from 'deepmerge'
import { lineStyleProps } from '../theme/default'

//  深度优先遍历树
export const walk = (
  root,
  parent,
  beforeCallback,
  afterCallback,
  isRoot,
  layerIndex = 0,
  index = 0,
  ancestors = []
) => {
  let stop = false
  if (beforeCallback) {
    stop = beforeCallback(root, parent, isRoot, layerIndex, index, ancestors)
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
        nodeIndex,
        [...ancestors, root]
      )
    })
  }
  afterCallback &&
    afterCallback(root, parent, isRoot, layerIndex, index, ancestors)
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
    // 固定宽度
    arr = [newWidth, newWidth / nRatio]
  } else {
    // 固定高度
    arr = [nRatio * newHeight, newHeight]
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
        // 固定宽度
        arr = [maxWidth, maxWidth / nRatio]
      } else {
        // 固定高度
        arr = [nRatio * maxHeight, maxHeight]
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
    const generalizationList = formatGetNodeGeneralization(tree.data)
    generalizationList.forEach(item => {
      item.isActive = false
    })
  }
  tree.children = []
  if (root.children && root.children.length > 0) {
    root.children.forEach((item, index) => {
      tree.children[index] = copyRenderTree({}, item, removeActiveState)
    })
  }
  // data、children外的其他字段
  Object.keys(root).forEach(key => {
    if (!['data', 'children'].includes(key) && !/^_/.test(key)) {
      tree[key] = root[key]
    }
  })
  return tree
}

//  复制节点树数据
export const copyNodeTree = (
  tree,
  root,
  removeActiveState = false,
  removeId = true
) => {
  const rootData = root.nodeData ? root.nodeData : root
  tree.data = simpleDeepClone(rootData.data)
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
  // data、children外的其他字段
  Object.keys(rootData).forEach(key => {
    if (!['data', 'children'].includes(key) && !/^_/.test(key)) {
      tree[key] = rootData[key]
    }
  })
  return tree
}

//  图片转成dataURL
export const imgToDataUrl = (src, returnBlob = false) => {
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
        if (returnBlob) {
          canvas.toBlob(blob => {
            resolve(blob)
          })
        } else {
          resolve(canvas.toDataURL())
        }
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

// 防抖函数
export const debounce = (fn, wait = 300, ctx) => {
  let timeout = null

  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      fn.apply(ctx, args)
    }, wait)
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
export const checkNodeOuter = (mindMap, node, offsetX = 0, offsetY = 0) => {
  let elRect = mindMap.elRect
  let { scaleX, scaleY, translateX, translateY } = mindMap.draw.transform()
  let { left, top, width, height } = node
  let right = (left + width) * scaleX + translateX
  let bottom = (top + height) * scaleY + translateY
  left = left * scaleX + translateX
  top = top * scaleY + translateY
  let offsetLeft = 0
  let offsetTop = 0
  if (left < 0 + offsetX) {
    offsetLeft = -left + offsetX
  }
  if (right > elRect.width - offsetX) {
    offsetLeft = -(right - elRect.width) - offsetX
  }
  if (top < 0 + offsetY) {
    offsetTop = -top + offsetY
  }
  if (bottom > elRect.height - offsetY) {
    offsetTop = -(bottom - elRect.height) - offsetY
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
  [['&nbsp;', '&#160;']].forEach(item => {
    str = str.replace(new RegExp(item[0], 'g'), item[1])
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
  return html.replace(/(<[^\s]+)\s+style=["'][^'"]+["']\s*(>)/g, '$1$2')
}

// 给html标签中指定的标签添加内联样式
let addHtmlStyleEl = null
export const addHtmlStyle = (html, tag, style) => {
  if (!addHtmlStyleEl) {
    addHtmlStyleEl = document.createElement('div')
  }
  const tags = Array.isArray(tag) ? tag : [tag]
  addHtmlStyleEl.innerHTML = html
  let walk = root => {
    let childNodes = root.childNodes
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点
        if (tags.includes(node.tagName.toLowerCase())) {
          node.style.cssText = style
        } else {
          walk(node)
        }
      }
    })
  }
  walk(addHtmlStyleEl)
  return addHtmlStyleEl.innerHTML
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
            node.nodeValue.replace(new RegExp(searchText, 'g'), replaceText)
          ),
          node
        )
      }
    })
  }
  walk(replaceHtmlTextEl)
  return replaceHtmlTextEl.innerHTML
}

// 去除html字符串中指定选择器的节点，然后返回html字符串
let removeHtmlNodeByClassEl = null
export const removeHtmlNodeByClass = (html, selector) => {
  if (!removeHtmlNodeByClassEl) {
    removeHtmlNodeByClassEl = document.createElement('div')
  }
  removeHtmlNodeByClassEl.innerHTML = html
  const node = removeHtmlNodeByClassEl.querySelector(selector)
  if (node) {
    node.parentNode.removeChild(node)
  }
  return removeHtmlNodeByClassEl.innerHTML
}

// 判断一个颜色是否是白色
export const isWhite = color => {
  color = String(color).replace(/\s+/g, '')
  return (
    ['#fff', '#ffffff', '#FFF', '#FFFFFF', 'rgb(255,255,255)'].includes(
      color
    ) || /rgba\(255,255,255,[^)]+\)/.test(color)
  )
}

// 判断一个颜色是否是透明
export const isTransparent = color => {
  color = String(color).replace(/\s+/g, '')
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

// 去掉DOM节点中的公式标签
export const removeFormulaTags = node => {
  const walk = root => {
    const childNodes = root.childNodes
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        if (node.classList.contains('ql-formula')) {
          node.parentNode.removeChild(node)
        } else {
          walk(node)
        }
      }
    })
  }
  walk(node)
}

// 将<p><span></span><p>形式的节点富文本内容转换成\n换行的文本
// 会过滤掉节点中的格式节点
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
      removeFormulaTags(node)
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

// 去除富文本内容的样式，包括样式标签，比如strong、em、s等
// 但要保留数学公式内容
let removeRichTextStyesEl = null
export const removeRichTextStyes = html => {
  if (!removeRichTextStyesEl) {
    removeRichTextStyesEl = document.createElement('div')
  }
  removeRichTextStyesEl.innerHTML = html
  // 首先用占位文本替换掉所有的公式
  const formulaList = removeRichTextStyesEl.querySelectorAll('.ql-formula')
  Array.from(formulaList).forEach(el => {
    const placeholder = document.createTextNode('$smmformula$')
    el.parentNode.replaceChild(placeholder, el)
  })
  // 然后遍历每行节点，去掉内部的所有标签，转为文本
  const childNodes = removeRichTextStyesEl.childNodes
  let list = []
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i]
    if (node.nodeType === 1) {
      // 元素节点
      list.push(node.textContent)
    } else if (node.nodeType === 3) {
      // 文本节点
      list.push(node.nodeValue)
    }
  }
  // 拼接文本
  html = list
    .map(item => {
      return `<p><span>${htmlEscape(item)}</span></p>`
    })
    .join('')
  // 将公式添加回去
  if (formulaList.length > 0) {
    html = html.replace(/\$smmformula\$/g, '<span class="smmformula"></span>')
    removeRichTextStyesEl.innerHTML = html
    const els = removeRichTextStyesEl.querySelectorAll('.smmformula')
    Array.from(els).forEach((el, index) => {
      el.parentNode.replaceChild(formulaList[index], el)
    })
    html = removeRichTextStyesEl.innerHTML
  }
  return html
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

// 判断一个对象是否不需要触发节点重新创建
export const isNodeNotNeedRenderData = config => {
  const list = [...lineStyleProps] // 节点连线样式
  const keys = Object.keys(config)
  for (let i = 0; i < keys.length; i++) {
    if (!list.includes(keys[i])) {
      return false
    }
  }
  return true
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
  data = { ...data }
  const alreadyIsRichText = data && data.richText
  // 如果指定的数据就是富文本格式，那么不需要重新创建
  if (alreadyIsRichText && data.resetRichText) {
    delete data.resetRichText
  }
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
export const createUidForAppointNodes = (
  appointNodes,
  createNewId = false,
  handle = null,
  handleGeneralization = false
) => {
  const walk = list => {
    list.forEach(node => {
      if (!node.data) {
        node.data = {}
      }
      if (createNewId || isUndef(node.data.uid)) {
        node.data.uid = createUid()
      }
      if (handleGeneralization) {
        const generalizationList = formatGetNodeGeneralization(node.data)
        generalizationList.forEach(gNode => {
          if (createNewId || isUndef(gNode.uid)) {
            gNode.uid = createUid()
          }
        })
      }
      handle && handle(node)
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
  [
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

// 检查navigator.clipboard对象的读取是否可用
export const checkClipboardReadEnable = () => {
  return navigator.clipboard && typeof navigator.clipboard.read === 'function'
}

// 将数据设置到用户剪切板中
export const setDataToClipboard = data => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(JSON.stringify(data))
  }
}

// 从用户剪贴板中读取文字和图片
export const getDataFromClipboard = async () => {
  let text = null
  let img = null
  if (checkClipboardReadEnable()) {
    const items = await navigator.clipboard.read()
    if (items && items.length > 0) {
      for (const clipboardItem of items) {
        for (const type of clipboardItem.types) {
          if (/^image\//.test(type)) {
            img = await clipboardItem.getType(type)
          } else if (type === 'text/plain') {
            const blob = await clipboardItem.getType(type)
            text = await blob.text()
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
    str = str.replace(
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

// 获取浏览器的chrome内核版本
export const getChromeVersion = () => {
  const match = navigator.userAgent.match(/\s+Chrome\/(.*)\s+/)
  if (match && match[1]) {
    return Number.parseFloat(match[1])
  }
  return ''
}

// 创建smm粘贴的粘贴数据
export const createSmmFormatData = data => {
  return {
    simpleMindMap: true,
    data
  }
}

// 检查是否是smm粘贴格式的数据
export const checkSmmFormatData = data => {
  let smmData = null
  // 如果是字符串，则尝试解析为对象
  if (typeof data === 'string') {
    try {
      const parsedData = JSON.parse(data)
      // 判断是否是对象，且存在属性标志
      if (typeof parsedData === 'object' && parsedData.simpleMindMap) {
        smmData = parsedData.data
      }
    } catch (error) {}
  } else if (typeof data === 'object' && data.simpleMindMap) {
    // 否则如果是对象，则检查属性标志
    smmData = data.data
  }
  const isSmm = !!smmData
  return {
    isSmm,
    data: isSmm ? smmData : String(data)
  }
}

// 处理输入框的粘贴事件，会去除文本的html格式、换行
export const handleInputPasteText = (e, text) => {
  e.preventDefault()
  const selection = window.getSelection()
  if (!selection.rangeCount) return
  selection.deleteFromDocument()
  text = text || e.clipboardData.getData('text')
  // 转义特殊字符
  text = htmlEscape(text)
  // 去除格式
  text = getTextFromHtml(text)
  // 去除换行
  // text = text.replace(/\n/g, '')
  const textArr = text.split(/\n/g)
  const fragment = document.createDocumentFragment()
  textArr.forEach((item, index) => {
    const node = document.createTextNode(item)
    fragment.appendChild(node)
    if (index < textArr.length - 1) {
      const br = document.createElement('br')
      fragment.appendChild(br)
    }
  })
  selection.getRangeAt(0).insertNode(fragment)
  selection.collapseToEnd()
}

// 将思维导图树结构转平级对象
/*
    {
        data: {
            uid: 'xxx'
        },
        children: [
            {
                data: {
                    uid: 'xxx'
                },
                children: []
            }
        ]
    }
    转为：
    {
        uid: {
            children: [uid1, uid2],
            data: {}
        }
    }
  */
export const transformTreeDataToObject = data => {
  const res = {}
  const walk = (root, parent) => {
    const uid = root.data.uid
    if (parent) {
      parent.children.push(uid)
    }
    res[uid] = {
      isRoot: !parent,
      data: {
        ...root.data
      },
      children: []
    }
    if (root.children && root.children.length > 0) {
      root.children.forEach(item => {
        walk(item, res[uid])
      })
    }
  }
  walk(data, null)
  return res
}

// 将平级对象转树结构
// transformTreeDataToObject方法的反向操作
// 找到父节点的uid
const _findParentUid = (data, targetUid) => {
  const uids = Object.keys(data)
  let res = ''
  uids.forEach(uid => {
    const children = data[uid].children
    const isParent =
      children.findIndex(childUid => {
        return childUid === targetUid
      }) !== -1
    if (isParent) {
      res = uid
    }
  })
  return res
}
export const transformObjectToTreeData = data => {
  const uids = Object.keys(data)
  if (uids.length <= 0) return null
  const rootKey = uids.find(uid => {
    return data[uid].isRoot
  })
  if (!rootKey || !data[rootKey]) return null
  // 根节点
  const res = {
    data: simpleDeepClone(data[rootKey].data),
    children: []
  }
  const map = {}
  map[rootKey] = res
  uids.forEach(uid => {
    const parentUid = _findParentUid(data, uid)
    const cur = data[uid]
    const node = map[uid] || {
      data: simpleDeepClone(cur.data),
      children: []
    }
    if (!map[uid]) {
      map[uid] = node
    }
    if (parentUid) {
      const index = data[parentUid].children.findIndex(item => {
        return item === uid
      })
      if (!map[parentUid]) {
        map[parentUid] = {
          data: simpleDeepClone(data[parentUid].data),
          children: []
        }
      }
      map[parentUid].children[index] = node
    }
  })
  return res
}

// 计算两个点的直线距离
export const getTwoPointDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

// 判断两个矩形的相对位置
// 第一个矩形在第二个矩形的什么方向
export const getRectRelativePosition = (rect1, rect2) => {
  // 获取第一个矩形的中心点坐标
  const rect1CenterX = rect1.x + rect1.width / 2
  const rect1CenterY = rect1.y + rect1.height / 2

  // 获取第二个矩形的中心点坐标
  const rect2CenterX = rect2.x + rect2.width / 2
  const rect2CenterY = rect2.y + rect2.height / 2

  // 判断第一个矩形在第二个矩形的哪个方向
  if (rect1CenterX < rect2CenterX && rect1CenterY < rect2CenterY) {
    return 'left-top'
  } else if (rect1CenterX > rect2CenterX && rect1CenterY < rect2CenterY) {
    return 'right-top'
  } else if (rect1CenterX > rect2CenterX && rect1CenterY > rect2CenterY) {
    return 'right-bottom'
  } else if (rect1CenterX < rect2CenterX && rect1CenterY > rect2CenterY) {
    return 'left-bottom'
  } else if (rect1CenterX < rect2CenterX && rect1CenterY === rect2CenterY) {
    return 'left'
  } else if (rect1CenterX > rect2CenterX && rect1CenterY === rect2CenterY) {
    return 'right'
  } else if (rect1CenterX === rect2CenterX && rect1CenterY < rect2CenterY) {
    return 'top'
  } else if (rect1CenterX === rect2CenterX && rect1CenterY > rect2CenterY) {
    return 'bottom'
  } else {
    return 'overlap'
  }
}

// 处理获取svg内容时添加额外内容
export const handleGetSvgDataExtraContent = ({
  addContentToHeader,
  addContentToFooter
}) => {
  // 追加内容
  const cssTextList = []
  let header = null
  let headerHeight = 0
  let footer = null
  let footerHeight = 0
  const handle = (fn, callback) => {
    if (typeof fn === 'function') {
      const res = fn()
      if (!res) return
      const { el, cssText, height } = res
      if (el instanceof HTMLElement) {
        addXmlns(el)
        const foreignObject = createForeignObjectNode({ el, height })
        callback(foreignObject, height)
      }
      if (cssText) {
        cssTextList.push(cssText)
      }
    }
  }
  handle(addContentToHeader, (foreignObject, height) => {
    header = foreignObject
    headerHeight = height
  })
  handle(addContentToFooter, (foreignObject, height) => {
    footer = foreignObject
    footerHeight = height
  })
  return {
    cssTextList,
    header,
    headerHeight,
    footer,
    footerHeight
  }
}

// 获取指定节点的包围框信息
export const getNodeTreeBoundingRect = (
  node,
  x = 0,
  y = 0,
  paddingX = 0,
  paddingY = 0,
  excludeSelf = false,
  excludeGeneralization = false
) => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  const walk = (root, isRoot) => {
    if (!(isRoot && excludeSelf) && root.group) {
      try {
        const { x, y, width, height } = root.group
          .findOne('.smm-node-shape')
          .rbox()
        if (x < minX) {
          minX = x
        }
        if (x + width > maxX) {
          maxX = x + width
        }
        if (y < minY) {
          minY = y
        }
        if (y + height > maxY) {
          maxY = y + height
        }
      } catch (e) {}
    }
    if (!excludeGeneralization && root._generalizationList.length > 0) {
      root._generalizationList.forEach(item => {
        walk(item.generalizationNode)
      })
    }
    if (root.children) {
      root.children.forEach(item => {
        walk(item)
      })
    }
  }
  walk(node, true)

  minX = minX - x + paddingX
  minY = minY - y + paddingY
  maxX = maxX - x + paddingX
  maxY = maxY - y + paddingY

  return {
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

// 获取多个节点总的包围框
export const getNodeListBoundingRect = (
  nodeList,
  x = 0,
  y = 0,
  paddingX = 0,
  paddingY = 0
) => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  nodeList.forEach(node => {
    const { left, top, width, height } = getNodeTreeBoundingRect(
      node,
      x,
      y,
      paddingX,
      paddingY,
      false,
      true
    )
    if (left < minX) {
      minX = left
    }
    if (left + width > maxX) {
      maxX = left + width
    }
    if (top < minY) {
      minY = top
    }
    if (top + height > maxY) {
      maxY = top + height
    }
  })
  return {
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

// 全屏事件检测
const getOnfullscreEnevt = () => {
  if (document.documentElement.requestFullScreen) {
    return 'fullscreenchange'
  } else if (document.documentElement.webkitRequestFullScreen) {
    return 'webkitfullscreenchange'
  } else if (document.documentElement.mozRequestFullScreen) {
    return 'mozfullscreenchange'
  } else if (document.documentElement.msRequestFullscreen) {
    return 'msfullscreenchange'
  }
}
export const fullscrrenEvent = getOnfullscreEnevt()

// 全屏
export const fullScreen = element => {
  if (element.requestFullScreen) {
    element.requestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

// 退出全屏
export const exitFullScreen = () => {
  if (!document.fullscreenElement) return
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  }
}

// 创建foreignObject节点
export const createForeignObjectNode = ({ el, width, height }) => {
  const foreignObject = new ForeignObject()
  if (width !== undefined) {
    foreignObject.width(width)
  }
  if (height !== undefined) {
    foreignObject.height(height)
  }
  foreignObject.add(el)
  return foreignObject
}

// 格式化获取节点的概要数据
export const formatGetNodeGeneralization = data => {
  const generalization = data.generalization
  if (generalization) {
    return Array.isArray(generalization) ? generalization : [generalization]
  } else {
    return []
  }
}

/**
 * 防御 XSS 攻击，过滤恶意 HTML 标签和属性
 * @param {string} text 需要过滤的文本
 * @returns {string} 过滤后的文本
 */
export const defenseXSS = text => {
  text = String(text)

  // 初始化结果变量
  let result = text

  // 使用正则表达式匹配 HTML 标签
  const match = text.match(/<(\S*?)[^>]*>.*?|<.*? \/>/g)
  if (match == null) {
    // 如果没有匹配到任何标签，则直接返回原始文本
    return text
  }

  // 遍历匹配到的标签
  for (let value of match) {
    // 定义白名单属性正则表达式（style、target、href）
    const whiteAttrRegex = new RegExp(/(style|target|href)=["'][^"']*["']/g)

    // 定义黑名单href正则表达式（javascript:）
    const aHrefBlackRegex = new RegExp(/href=["']javascript:/g)

    // 过滤 HTML 标签
    const filterHtml = value.replace(
      // 匹配属性键值对（如：key="value"）
      /([a-zA-Z-]+)\s*=\s*["']([^"']*)["']/g,
      text => {
        // 如果属性值包含黑名单href或不在白名单中，则删除该属性
        if (aHrefBlackRegex.test(text) || !whiteAttrRegex.test(text)) {
          return ''
        }

        // 否则，保留该属性
        return text
      }
    )

    // 将过滤后的标签替换回原始文本
    result = result.replace(value, filterHtml)
  }

  // 返回最终结果
  return result
}

// 给节点添加命名空间
export const addXmlns = el => {
  el.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
}

// 给一组节点实例升序排序，依据其sortIndex值
export const sortNodeList = nodeList => {
  nodeList = [...nodeList]
  nodeList.sort((a, b) => {
    return a.sortIndex - b.sortIndex
  })
  return nodeList
}

// 合并主题配置
export const mergeTheme = (dest, source) => {
  return merge(dest, source, {
    arrayMerge: (destinationArray, sourceArray) => {
      return sourceArray
    }
  })
}

// 获取节点实例的文本样式数据
export const getNodeRichTextStyles = node => {
  const res = {}
  richTextSupportStyleList.forEach(prop => {
    let value = node.style.merge(prop)
    if (prop === 'fontSize') {
      value = value + 'px'
    }
    res[prop] = value
  })
  return res
}

// 判断两个版本号的关系
/*
a > b 返回 >
a < b 返回 <
a = b 返回 =
*/
export const compareVersion = (a, b) => {
  const aArr = String(a).split('.')
  const bArr = String(b).split('.')
  const max = Math.max(aArr.length, bArr.length)
  for (let i = 0; i < max; i++) {
    const ai = aArr[i] || 0
    const bi = bArr[i] || 0
    if (ai > bi) {
      return '>'
    } else if (ai < bi) {
      return '<'
    }
  }
  return '='
}
