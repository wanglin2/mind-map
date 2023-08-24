import JSZip from 'jszip'
import xmlConvert from 'xml-js'
import {
  getTextFromHtml,
  imgToDataUrl,
  parseDataUrl,
  getImageSize
} from '../utils/index'

//  解析.xmind文件
const parseXmindFile = file => {
  return new Promise((resolve, reject) => {
    JSZip.loadAsync(file).then(
      async zip => {
        try {
          let content = ''
          let jsonFile = zip.files['content.json']
          let xmlFile = zip.files['content.xml'] || zip.files['/content.xml']
          if (jsonFile) {
            let json = await jsonFile.async('string')
            content = await transformXmind(json, zip.files)
          } else if (xmlFile) {
            let xml = await xmlFile.async('string')
            let json = xmlConvert.xml2json(xml)
            content = transformOldXmind(json)
          }
          if (content) {
            resolve(content)
          } else {
            reject(new Error('解析失败'))
          }
        } catch (error) {
          reject(error)
        }
      },
      e => {
        reject(e)
      }
    )
  })
}

//  转换xmind数据
const transformXmind = async (content, files) => {
  let data = JSON.parse(content)[0]
  let nodeTree = data.rootTopic
  let newTree = {}
  let waitLoadImageList = []
  let walk = async (node, newNode) => {
    newNode.data = {
      // 节点内容
      text: node.title
    }
    // 节点备注
    if (node.notes) {
      let notesData = node.notes.realHTML || node.notes.plain
      newNode.data.note = notesData ? notesData.content || '' : ''
    }
    // 超链接
    if (node.href && /^https?:\/\//.test(node.href)) {
      newNode.data.hyperlink = node.href
    }
    // 标签
    if (node.labels && node.labels.length > 0) {
      newNode.data.tag = node.labels
    }
    // 图片
    if (node.image && /\.(jpg|jpeg|png|gif|webp)$/.test(node.image.src)) {
      // 处理异步逻辑
      let resolve = null
      let promise = new Promise(_resolve => {
        resolve = _resolve
      })
      waitLoadImageList.push(promise)
      try {
        // 读取图片
        let imageType = /\.([^.]+)$/.exec(node.image.src)[1]
        let imageBase64 =
          `data:image/${imageType};base64,` +
          (await files['resources/' + node.image.src.split('/')[1]].async(
            'base64'
          ))
        newNode.data.image = imageBase64
        // 如果图片尺寸不存在
        if (!node.image.width && !node.image.height) {
          let imageSize = await getImageSize(imageBase64)
          newNode.data.imageSize = {
            width: imageSize.width,
            height: imageSize.height
          }
        } else {
          newNode.data.imageSize = {
            width: node.image.width,
            height: node.image.height
          }
        }
        resolve()
      } catch (error) {
        console.log(error)
        resolve()
      }
    }
    // 子节点
    newNode.children = []
    if (
      node.children &&
      node.children.attached &&
      node.children.attached.length > 0
    ) {
      node.children.attached.forEach(item => {
        let newChild = {}
        newNode.children.push(newChild)
        walk(item, newChild)
      })
    }
  }
  walk(nodeTree, newTree)
  await Promise.all(waitLoadImageList)
  return newTree
}

//  转换旧版xmind数据，xmind8
const transformOldXmind = content => {
  let data = JSON.parse(content)
  let elements = data.elements
  let root = null
  let getRoot = arr => {
    if (!arr) return
    for (let i = 0; i < arr.length; i++) {
      if (!root && arr[i].name === 'topic') {
        root = arr[i]
        return
      }
    }
    arr.forEach(item => {
      getRoot(item.elements)
    })
  }
  getRoot(elements)
  let newTree = {}
  let getItemByName = (arr, name) => {
    return arr.find(item => {
      return item.name === name
    })
  }
  let walk = (node, newNode) => {
    let nodeElements = node.elements
    let nodeTitle = getItemByName(nodeElements, 'title')
    newNode.data = {
      // 节点内容
      text: nodeTitle && nodeTitle.elements && nodeTitle.elements[0].text
    }
    try {
      // 节点备注
      let notesElement = getItemByName(nodeElements, 'notes')
      if (notesElement) {
        newNode.data.note =
          notesElement.elements[0].elements[0].elements[0].text
      }
    } catch (error) {
      console.log(error)
    }
    try {
      // 超链接
      if (
        node.attributes &&
        node.attributes['xlink:href'] &&
        /^https?:\/\//.test(node.attributes['xlink:href'])
      ) {
        newNode.data.hyperlink = node.attributes['xlink:href']
      }
    } catch (error) {
      console.log(error)
    }
    try {
      // 标签
      let labelsElement = getItemByName(nodeElements, 'labels')
      if (labelsElement) {
        newNode.data.tag = labelsElement.elements.map(item => {
          return item.elements[0].text
        })
      }
    } catch (error) {
      console.log(error)
    }
    // 子节点
    newNode.children = []
    let _children = getItemByName(nodeElements, 'children')
    if (_children && _children.elements && _children.elements.length > 0) {
      _children.elements.forEach(item => {
        if (item.name === 'topics') {
          (item.elements || []).forEach(item2 => {
            let newChild = {}
            newNode.children.push(newChild)
            walk(item2, newChild)
          })
        } else {
          let newChild = {}
          newNode.children.push(newChild)
          walk(item, newChild)
        }
      })
    }
  }
  walk(root, newTree)
  return newTree
}

// 数据转换为xmind文件
const transformToXmind = async (data, name) => {
  const id = 'simpleMindMap_' + Date.now()
  const imageList = []
  // 转换核心数据
  let newTree = {}
  let waitLoadImageList = []
  let walk = async (node, newNode, isRoot) => {
    let newData = {
      structureClass: 'org.xmind.ui.logic.right',
      title: getTextFromHtml(node.data.text), // 节点文本
      children: {
        attached: []
      }
    }
    // 备注
    if (node.data.note !== undefined) {
      newData.notes = {
        realHTML: {
          content: node.data.note
        },
        plain: {
          content: node.data.note
        }
      }
    }
    // 超链接
    if (node.data.hyperlink !== undefined) {
      newData.href = node.data.hyperlink
    }
    // 标签
    if (node.data.tag !== undefined) {
      newData.labels = node.data.tag || []
    }
    // 图片
    if (node.data.image) {
      try {
        // 处理异步逻辑
        let resolve = null
        let promise = new Promise(_resolve => {
          resolve = _resolve
        })
        waitLoadImageList.push(promise)
        let imgName = ''
        let imgData = node.data.image
        // 网络图片要先转换成data:url
        if (/^https?:\/\//.test(node.data.image)) {
          imgData = await imgToDataUrl(node.data.image)
        }
        // 从data:url中解析出图片类型和base64
        let dataUrlRes = parseDataUrl(imgData)
        imgName = 'image_' + imageList.length + '.' + dataUrlRes.type
        imageList.push({
          name: imgName,
          data: dataUrlRes.base64
        })
        newData.image = {
          src: 'xap:resources/' + imgName,
          width: node.data.imageSize.width,
          height: node.data.imageSize.height
        }
        resolve()
      } catch (error) {
        console.log(error)
        resolve()
      }
    }
    // 样式
    // 暂时不考虑样式
    if (isRoot) {
      newData.class = 'topic'
      newNode.id = id
      newNode.class = 'sheet'
      newNode.title = name
      newNode.extensions = []
      newNode.topicPositioning = 'fixed'
      newNode.topicOverlapping = 'overlap'
      newNode.coreVersion = '2.100.0'
      newNode.rootTopic = newData
    } else {
      Object.keys(newData).forEach(key => {
        newNode[key] = newData[key]
      })
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        let newChild = {}
        walk(child, newChild)
        newData.children.attached.push(newChild)
      })
    }
  }
  walk(data, newTree, true)
  await Promise.all(waitLoadImageList)
  const contentData = [newTree]
  // 创建压缩包
  const zip = new JSZip()
  zip.file('content.json', JSON.stringify(contentData))
  zip.file(
    'metadata.json',
    `{"modifier":"","dataStructureVersion":"1","layoutEngineVersion":"2","activeSheetId":"${id}"}`
  )
  const manifestData = {
    'file-entries': { 'content.json': {}, 'metadata.json': {} }
  }
  // 图片
  if (imageList.length > 0) {
    imageList.forEach(item => {
      manifestData['file-entries']['resources/' + item.name] = {}
      const img = zip.folder('resources')
      img.file(item.name, item.data, { base64: true })
    })
  }
  zip.file('manifest.json', JSON.stringify(manifestData))
  const zipData = await zip.generateAsync({ type: 'blob' })
  return zipData
}

export default {
  parseXmindFile,
  transformXmind,
  transformOldXmind,
  transformToXmind
}
