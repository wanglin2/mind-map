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
  callback(root)
  let stack = [root]
  let isStop = false
  while (stack.length) {
    if (isStop) {
      break
    }
    let cur = stack.shift()
    if (cur.children && cur.children.length) {
      cur.children.forEach(item => {
        stack.push(item)
        if (callback(item) === 'stop') {
          isStop = true
        }
      })
    }
  }
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
export const copyNodeTree = (tree, root, removeActiveState = false, keepId = false) => {
  tree.data = simpleDeepClone(root.nodeData ? root.nodeData.data : root.data)
  // 去除节点id，因为节点id不能重复
  if (tree.data.id && !keepId) delete tree.data.id
  if (tree.data.uid) delete tree.data.uid
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
export const camelCaseToHyphen = (str) => {
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
  const {
    width,
    actualBoundingBoxAscent,
    actualBoundingBoxDescent
  } = measureTextContext.measureText(text)
  measureTextContext.restore()
  const height = actualBoundingBoxAscent + actualBoundingBoxDescent
  return { width, height }
}

// 拼接font字符串
export const joinFontStr = ({ italic, bold, fontSize, fontFamily }) => {
  return `${italic ? 'italic ' : ''} ${bold ? 'bold ' : ''} ${fontSize}px ${fontFamily} `
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
export const getTextFromHtml = (html) => {
  if (!getTextFromHtmlEl) {
    getTextFromHtmlEl = document.createElement('div')
  }
  getTextFromHtmlEl.innerHTML = html
  return getTextFromHtmlEl.textContent
}

// 将blob转成data:url
export const readBlob = (blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = (evt) => {
      resolve(evt.target.result)
    }
    reader.onerror = (err) => {
      reject(err)
    }
    reader.readAsDataURL(blob)
  })
}