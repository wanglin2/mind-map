/**
 * @Author: 王林
 * @Date: 2021-07-11 21:38:09
 * @Desc: 全屏事件检测
 */
const getOnfullscreEnevt = () => {
  if (document.documentElement.requestFullScreen) {
    return 'onfullscreenchange'
  } else if (document.documentElement.webkitRequestFullScreen) {
    return 'onwebkitfullscreenchange'
  } else if (document.documentElement.mozRequestFullScreen) {
    return 'onmozfullscreenchange'
  } else if (document.documentElement.msRequestFullscreen) {
    return 'onmsfullscreenchange'
  }
}

export const fullscrrenEvent = getOnfullscreEnevt()

/**
 * @Author: 王林
 * @Date: 2021-07-11 21:45:06
 * @Desc: 全屏
 */
export const fullScreen = element => {
  if (element.requestFullScreen) {
    element.requestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-10-24 14:16:18
 * @Desc: 文件转buffer
 */
export const fileToBuffer = file => {
  return new Promise(r => {
    const reader = new FileReader()
    reader.onload = () => {
      r(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

// 判断url是否是http协议或者data:url协议的
const checkIsHttpOrDataUrl = (url) => {
  return /^https?:\/\//.test(url) || /^data:/.test(url)
}

// 将贴纸地址统一转成web线上版
// 客户端开发版：        img/a-7-xinzang.svg
// 客户端线上版：app://./img/a-shuben2.svg
// web线上版：   ./dist/img/-_1.svg
// web本地版：          img/a-7-xinzang.svg
export const removeMindMapNodeStickerProtocol = (data) => {
  let walk = (root) => {
    let image = root.data.image
    if (image && !checkIsHttpOrDataUrl(image)) {
      const res = image.match(/img\/[^/]+\.svg$/)
      root.data.image = './dist/' + res[0]
    }
    if (root.children && root.children.length > 0) {
      root.children.forEach((item) => {
        walk(item)
      })
    }
  }
  walk(data)
}

// 将贴纸地址转成客户端需要的路径
const dev = process.env.NODE_ENV === 'development'
export const addMindMapNodeStickerProtocol = (data) => {
  let walk = (root) => {
    let image = root.data.image
    if (image && !checkIsHttpOrDataUrl(image)) {
      const res = image.match(/img\/[^/]+\.svg$/)
      root.data.image = dev ? res[0] : 'app://./' + res[0]
    }
    if (root.children && root.children.length > 0) {
      root.children.forEach((item) => {
        walk(item)
      })
    }
  }
  walk(data)
}

// 复制文本到剪贴板
export const copy = text => {
  // 使用textarea可以保留换行
  const input = document.createElement('textarea')
  // input.setAttribute('value', text)
  input.innerHTML = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

// 复制文本到剪贴板
export const setDataToClipboard = data => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(data)
  }
}

// 复制图片到剪贴板
export const setImgToClipboard = img => {
  if (navigator.clipboard) {
    const data = [new ClipboardItem({ ['image/png']: img })]
    navigator.clipboard.write(data)
  }
}
