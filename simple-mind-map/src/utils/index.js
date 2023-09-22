import { v4 as uuidv4 } from 'uuid'
import { nodeDataNoStylePropList } from '../constants/constant'

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
  keepId = false
) => {
  tree.data = simpleDeepClone(root.nodeData ? root.nodeData.data : root.data)
  // 去除节点uid，因为节点uid不能重复
  if (tree.data.uid && !keepId) delete tree.data.uid
  if (removeActiveState) {
    tree.data.isActive = false
  }
  tree.children = []
  if (root.children && root.children.length > 0) {
    root.children.forEach((item, index) => {
      tree.children[index] = copyNodeTree({}, item, removeActiveState, keepId)
    })
  } else if (
    root.nodeData &&
    root.nodeData.children &&
    root.nodeData.children.length > 0
  ) {
    root.nodeData.children.forEach((item, index) => {
      tree.children[index] = copyNodeTree({}, item, removeActiveState, keepId)
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
  return Object.prototype.toString.call(data).slice(7, -1)
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
      return `<p><span>${item}</span></p>`
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

// 合并数组对象by某个key

// const data = [
//   { type: 'a', list: [{ name: 1, value: 1 }, { name: 2, value: 2 }] },
//   { type: 'b', list: [{ name: 13, value: 3 }] },
//   { type: 'a', list: [{ name: 1, value: 3 }, { name: 4, value: 4 }] },
// ];

// mergeObjArrayBy(data, 'type', 'name') 结果

// [
//   { type: 'a', list: [ { name: 1, value: 3 }, { name: 2, value: 2 }, { name: 4, value: 4 } ] },
//   { type: 'b', list: [ { name: 13, value: 3 } ] }
// ]

export const mergerIconListBy = (arrList, key, name) => {
  return arrList.reduce((result, item) => {
    const existingItem = result.find(x => x[key] === item[key])
    if (existingItem) {
      item.list.forEach(newObj => {
        const existingObj = existingItem.list.find(
          x => x[name] === newObj[name]
        )
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
        return item.uid !== node.uid && item.isParent(node)
      })
    ) {
      res.push(node)
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

// 给指定的节点列表树数据添加uid，如果不存在的话，会修改原数据
export const createUidForAppointNodes = appointNodes => {
  const walk = list => {
    list.forEach(node => {
      if (!node.data) {
        node.data = {}
      }
      if (isUndef(node.data.uid)) {
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
export const getNodeIndex = node => {
  return node.parent
    ? node.parent.children.findIndex(item => {
        return item.uid === node.uid
      })
    : 0
}
