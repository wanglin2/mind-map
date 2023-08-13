import { imgToDataUrl } from 'simple-mind-map/src/utils/index'

// 处理知犀
const handleZHIXI = async text => {
  text = text.replace('￿﻿', '')
  try {
    // 只处理一项
    const node = JSON.parse(text)[0]
    const newNode = {}
    const waitLoadImageList = []
    const walk = async (root, newRoot) => {
      newRoot.data = {
        text: root.data.text,
        hyperlink: root.data.hyperlink,
        hyperlinkTitle: root.data.hyperlinkTitle,
        note: root.data.note
      }
      // 图片
      if (root.data.image) {
        let resolve = null
        let promise = new Promise(_resolve => {
          resolve = _resolve
        })
        waitLoadImageList.push(promise)
        try {
          newRoot.data.image = await imgToDataUrl(root.data.image)
          newRoot.data.imageSize = root.data.imageSize
          resolve()
        } catch (error) {
          resolve()
        }
      }
      // 子节点
      newRoot.children = []
      if (root.children && root.children.length > 0) {
        root.children.forEach(item => {
          // 概要
          if (item.data.type === 'generalize') {
            newRoot.data.generalization = {
              text: item.data.text
            }
            return
          }
          let newChild = {}
          newRoot.children.push(newChild)
          walk(item, newChild)
        })
      }
    }
    walk(node, newNode)
    await Promise.all(waitLoadImageList)
    return {
      simpleMindMap: true,
      data: newNode
    }
  } catch (error) {
    return ''
  }
}

const handleClipboardText = async text => {
  // 处理知犀数据
  if (text.includes('￿﻿')) {
    const res = await handleZHIXI(text)
    return res
  }
  return ''
}

export default handleClipboardText
