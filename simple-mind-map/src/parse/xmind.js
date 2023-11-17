import JSZip from 'jszip'
import xmlConvert from 'xml-js'
import {
  getTextFromHtml,
  imgToDataUrl,
  parseDataUrl,
  getImageSize,
  isUndef
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
      text: isUndef(node.title) ? '' : node.title
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
    // 概要
    if (node.currentSummary) {
      newNode.data.generalization = {
          text: node.currentSummary.title,
          expand: true,
          isActive: false,
      }
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
      // 分析概要位置
      // xmind 支持合并概要,现在的组件不支持合并概要，分别拆分开来
      let summariesPosition = {}
      if (node.summaries && node.summaries.length > 0) {
        node.summaries.forEach(item => {
          // 使用正则表达式提取位置数字,例如 (2,3)
          const match = item.range.match(/\((\d+),(\d+)\)/)
          const firstNumber = match ? parseInt(match[1], 10) : null
          const secondNumber = match ? parseInt(match[2], 10) : null
          summariesPosition[item.topicId] = []
          for (let i = firstNumber; i <= secondNumber; i++) {
            summariesPosition[item.topicId].push(i)
          }
        })
      }

      let summariesPositionData = {}
      if (node.children.summary && node.children.summary.length > 0) {
        node.children.summary.forEach(summary => {
          if (Object.prototype.hasOwnProperty.call(summariesPosition, summary.id)) {
            summariesPosition[summary.id].forEach (index => {
              summariesPositionData[index] = summary
            })
          }
        })
      }

      node.children.attached.forEach((item, index) => {
        let currentSummary = null
        if (Object.prototype.hasOwnProperty.call(summariesPositionData, index)) {
          currentSummary = summariesPositionData[index]
        }

        let newChild = {}
        newNode.children.push(newChild)
        item.currentSummary = currentSummary
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
    nodeTitle = nodeTitle && nodeTitle.elements && nodeTitle.elements[0].text
    newNode.data = {
      // 节点内容
      text: isUndef(nodeTitle) ? '' : nodeTitle
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

    // 概要
    if (node.currentSummary) {
      let summaryText = ''
      if (node.currentSummary
        && node.currentSummary.elements
        && node.currentSummary.elements[0]
        && node.currentSummary.elements[0].elements
        && node.currentSummary.elements[0].elements[0]) {
        summaryText = node.currentSummary.elements[0].elements[0].text
      }
      newNode.data.generalization = {
        text: summaryText,
        expand: true,
        isActive: false,
      }
    }

    // 子节点
    newNode.children = []

    let _children = getItemByName(nodeElements, 'children')
    if (_children && _children.elements && _children.elements.length > 0) {
      let summaryNode = null
      let summariesNode = getItemByName(nodeElements, 'summaries')
      _children.elements.forEach(item => {
        if (item.name === 'topics' && item.attributes.type === 'summary') {
          summaryNode = item
          return
        }
      })

      // 分析概要位置
      // xmind 支持合并概要,现在的组件不支持合并概要，分别拆分开来
      let summariesPosition = {}
      if (summariesNode !== null && summariesNode.elements && summariesNode.elements.length > 0) {
        summariesNode.elements.forEach(item => {
          // 使用正则表达式提取位置数字,例如 (2,3)
          const match = item.attributes.range.match(/\((\d+),(\d+)\)/)
          const firstNumber = match ? parseInt(match[1], 10) : null
          const secondNumber = match ? parseInt(match[2], 10) : null
          summariesPosition[item.attributes['topic-id']] = []
          for (let i = firstNumber; i <= secondNumber; i++) {
            summariesPosition[item.attributes['topic-id']].push(i)
          }
        })
      }

      let summariesPositionData = {}
      if (summaryNode !== null && summaryNode.elements && summaryNode.elements.length > 0) {
        summaryNode.elements.forEach(summary => {
          if (Object.prototype.hasOwnProperty.call(summariesPosition, summary.attributes.id)) {
            summariesPosition[summary.attributes.id].forEach (index => {
              summariesPositionData[index] = summary
            })
          }
        })
      }

      _children.elements.forEach((item, index) => {
        if (item.name === 'topics') {
          if (item.attributes.type !== 'summary') {
            (item.elements || []).forEach((item2, index2) => {
              let newChild = {}
              let currentSummary = null
              if (Object.prototype.hasOwnProperty.call(summariesPositionData, index2)) {
                currentSummary = summariesPositionData[index2]
              }
              newNode.children.push(newChild)
              item2.currentSummary = currentSummary
              walk(item2, newChild)
            })
          }
        } else {
          let newChild = {}
          let currentSummary = null
          if (Object.prototype.hasOwnProperty.call(summariesPositionData, index)) {
            currentSummary = summariesPositionData[index]
          }
          newNode.children.push(newChild)
          item.currentSummary = currentSummary
          walk(item, newChild)
        }
      })
    }
  }
  walk(root, newTree)
  return newTree
}

// 数据转换为xmind文件
// 直接转换为最新版本的xmind文件 2023.09.11172
const transformToXmind = async (data, name) => {
  const id = 'simpleMindMap_' + Date.now()
  const imageList = []
  // 转换核心数据
  let newTree = {
    legend: {},
    topicPositioning: "fixed",
    theme: {
      "boundary": {
        "styleId": "94a6c549-690c-4f1e-b18f-457f114abcb0",
        "type": "boundary",
        "properties": {
          "fo:font-style": "normal",
          "svg:fill": "#D5E9FC",
          "fo:font-family": "NeverMind",
          "shape-class": "org.xmind.boundaryShape.roundedRect",
          "fo:font-size": "13pt",
          "fo:color": "#FFFFFF",
          "fo:font-weight": "500",
          "line-pattern": "dash",
          "line-color": "#0288D1"
        }
      },
      "subTopic": {
        "styleId": "ddd92ae3-f2b4-48ee-9e47-2dacee6acac4",
        "type": "topic",
        "properties": {
          "fo:text-align": "left",
          "fo:font-style": "normal",
          "svg:fill": "none",
          "fo:font-family": "NeverMind",
          "fo:font-size": "13pt",
          "shape-class": "org.xmind.topicShape.underline",
          "fo:color": "#333333",
          "fo:font-weight": "500",
          "line-class": "org.xmind.branchConnection.roundedElbow"
        }
      },
      "summary": {
        "styleId": "8aa88864-8667-4627-a763-a84973e0109b",
        "type": "summary",
        "properties": {
          "line-width": "2",
          "shape-class": "org.xmind.summaryShape.round",
          "line-color": "#0288D1"
        }
      },
      "calloutTopic": {
        "styleId": "9bffcc6a-0526-4db5-b304-ea3830a42846",
        "type": "topic",
        "properties": {
          "fo:font-style": "normal",
          "fo:font-family": "NeverMind",
          "fo:font-size": "13pt",
          "fo:color": "#FFFFFF",
          "fo:font-weight": "600",
          "callout-shape-class": "org.xmind.calloutTopicShape.balloon.roundedRect"
        }
      },
      "summaryTopic": {
        "styleId": "a82dc72d-29bc-4d81-bd44-3f1bee0ed35c",
        "type": "topic",
        "properties": {
          "fo:font-style": "normal",
          "line-width": "1",
          "svg:fill": "#333333",
          "fo:font-family": "NeverMind",
          "fo:font-size": "13pt",
          "shape-class": "org.xmind.topicShape.roundedRect",
          "border-line-width": "1",
          "fo:font-weight": "600",
          "line-class": "org.xmind.branchConnection.roundedElbow",
          "border-line-color": "none",
          "line-color": "#333333"
        }
      },
      "floatingTopic": {
        "styleId": "8286b472-0630-4970-8bf1-510a831dc2b9",
        "type": "topic",
        "properties": {
          "fo:font-style": "normal",
          "line-width": "1",
          "svg:fill": "#333333",
          "fo:font-family": "NeverMind",
          "fo:font-size": "13pt",
          "shape-class": "org.xmind.topicShape.roundedRect",
          "border-line-width": "0",
          "fo:color": "#FFFFFF",
          "fo:font-weight": "600",
          "line-class": "org.xmind.branchConnection.roundedElbow",
          "border-line-color": "none",
          "line-color": "#333333"
        }
      },
      "importantTopic": {
        "type": "topic",
        "properties": {
          "svg:fill": "#FFFF00",
          "fo:color": "#333333",
          "fo:font-weight": "bold"
        }
      },
      "expiredTopic": {
        "type": "topic",
        "properties": {
          "fo:font-style": "italic",
          "fo:text-decoration": " line-through"
        }
      },
      "centralTopic": {
        "styleId": "9a94e1a0-7e67-48df-a231-7fa0c60b7b97",
        "type": "topic",
        "properties": {
          "fo:font-style": "normal",
          "line-width": "2",
          "svg:fill": "#0288D1",
          "fo:font-family": "NeverMind",
          "fo:font-size": "28pt",
          "shape-class": "org.xmind.topicShape.roundedRect",
          "border-line-width": "0",
          "fo:font-weight": "600",
          "line-class": "org.xmind.branchConnection.curve",
          "line-color": "#333333"
        }
      },
      "mainTopic": {
        "styleId": "7565fe37-2200-4483-b343-91bdf53e563e",
        "type": "topic",
        "properties": {
          "fo:font-style": "normal",
          "fo:text-align": "left",
          "line-width": "1",
          "fo:font-family": "NeverMind",
          "fo:font-size": "20pt",
          "border-line-width": "2",
          "fo:font-weight": "600",
          "line-class": "org.xmind.branchConnection.roundedElbow",
          "line-color": "#333333",
          "border-line-color": "#333333"
        }
      },
      "id": "6518e97a4149b5f96691ab3b5d",
      "relationship": {
        "styleId": "1611e291-8cc1-4500-93a5-69281d5bedf0",
        "type": "relationship",
        "properties": {
          "line-width": "2",
          "fo:font-family": "NeverMind",
          "shape-class": "org.xmind.relationshipShape.curved",
          "fo:font-size": "13pt",
          "fo:color": "#333333",
          "fo:font-weight": "normal",
          "line-color": "#0288D1"
        }
      },
      "minorTopic": {
        "type": "topic",
        "properties": {
          "svg:fill": "#FFCB88",
          "fo:color": "#333333",
          "fo:font-weight": "bold"
        }
      },
      "map": {
        "styleId": "7e90467a-d643-4fa9-84f2-f8f0166e5afb",
        "type": "map",
        "properties": {}
      }
    },
    id,
  }

  let waitLoadImageList = []

  let walk = async (node, newNode, isRoot) => {
    let newData = {
      id: node.data.uid,
      title: getTextFromHtml(node.data.text),
      extensions: [],
      markers: [],
      labels: [],
      notes: {},
      comments: [],
      children: {
        attached: [],
      },
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
      // 处理异步逻辑
      let resolve = null
      let promise = new Promise(_resolve => {
        resolve = _resolve
      })
      waitLoadImageList.push(promise)
      try {
        let imgName = ''
        let imgData = node.data.image
        // base64之外的其他图片要先转换成data:url
        if (!/^data:/.test(node.data.image)) {
          imgData = await imgToDataUrl(node.data.image)
        }
        // 从data:url中解析出图片类型和ase64
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
      newNode.title = name
      newNode.structureClass = "org.xmind.ui.map.unbalanced"
      newNode.rootTopic = newData
    } else {
      Object.keys(newData).forEach(key => {
        newNode[key] = newData[key]
      })
    }
    if (node.children && node.children.length > 0) {
      let summary = []
      let summaries = []
      node.children.forEach((child,index) => {
        if (child.data.generalization) {
          let summaryTopicId = node.data.uid+'_topic_id_' + index
          let summaryTitle = getTextFromHtml(child.data.generalization.text)
          summary.push({
            id: summaryTopicId,
            title: summaryTitle,
            attributedTitle: [
              {
                text: summaryTitle
              }
            ]
          })

          summaries.push({
            id: node.data.uid+'_range_id_' + index,
            range: "("+index+","+index+")",
            topicId: summaryTopicId
          })
        }
        let newChild = {}
        walk(child, newChild)
        newData.children.attached.push(newChild)
      })

      if (isRoot) {
        if (summaries.length > 0) {
         newNode.rootTopic.children.summary = summary
         newNode.rootTopic.summaries = summaries
        }
      } else {
        if (summaries.length > 0) {
          newNode.children.summary = summary
          newNode.summaries = summaries
        }
      }
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
    `{"dataStructureVersion":"2","creator":{"name":"mind-map"},"layoutEngineVersion":"3"}`
  )
  zip.file(
    'content.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="no"?><xmap-content xmlns="urn:xmind:xmap:xmlns:content:2.0" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" modified-by="bruce" timestamp="1503058545540" version="2.0">    <sheet id="7abtd0ssc7n4pi1nu6i7b6lsdh" modified-by="bruce" theme="0kdeemiijde6nuk97e4t0vpp54" timestamp="1503058545540">        <topic id="1vr0lcte2og4t2sopiogvdmifc" modified-by="bruce" structure-class="org.xmind.ui.logic.right" timestamp="1503058545417">            <title>Warning                警告                Attention                Warnung                경고</title>            <children>                <topics type="attached">                    <topic id="71h1aip2t1o8vvm0a41nausaar" modified-by="bruce" timestamp="1503058545423">                        <title svg:width="500">This file can not be opened normally, please do not modify and save, otherwise the contents will be permanently lost！</title>                        <children>                            <topics type="attached">                                <topic id="428akmkh9a0tog6c91qj995qdl" modified-by="bruce" timestamp="1503058545427">                                    <title>You can try using XMind 8 Update 3 or later version to open</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="2kb87f8m38b3hnfhp450c7q35e" modified-by="bruce" timestamp="1503058545434">                        <title svg:width="500">该文件无法正常打开，请勿修改并保存，否则文件内容将会永久性丢失！</title>                        <children>                            <topics type="attached">                                <topic id="3m9hoo4a09n53ofl6fohdun99f" modified-by="bruce" timestamp="1503058545438">                                    <title>你可以尝试使用 XMind 8 Update 3 或更新版本打开</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="7r3r4617hvh931ot9obi595r8f" modified-by="bruce" timestamp="1503058545444">                        <title svg:width="500">該文件無法正常打開，請勿修改並保存，否則文件內容將會永久性丟失！</title>                        <children>                            <topics type="attached">                                <topic id="691pgka6gmgpgkacaa0h3f1hjb" modified-by="bruce" timestamp="1503058545448">                                    <title>你可以嘗試使用 XMind 8 Update 3 或更新版本打開</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="0f2e3rpkfahg4spg4nda946r0b" modified-by="bruce" timestamp="1503058545453">                        <title svg:width="500">この文書は正常に開かないので、修正して保存しないようにしてください。そうでないと、書類の内容が永久に失われます。！</title>                        <children>                            <topics type="attached">                                <topic id="4vuubta53ksc1falk46mevge0t" modified-by="bruce" timestamp="1503058545457">                                    <title>XMind 8 Update 3 や更新版を使って開くこともできます</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="70n9i4u3lb89sq9l1m1bs255j5" modified-by="bruce" timestamp="1503058545463">                        <title svg:width="500">Datei kann nicht richtig geöffnet werden. Bitte ändern Sie diese Datei nicht und speichern Sie sie, sonst wird die Datei endgültig gelöscht werden.</title>                        <children>                            <topics type="attached">                                <topic id="1qpc5ee298p2sqeqbinpca46b7" modified-by="bruce" timestamp="1503058545466">                                    <title svg:width="500">Bitte versuchen Sie, diese Datei mit XMind 8 Update 3 oder später zu öffnen.</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="4dmes10uc19pq7enu8sc4bmvif" modified-by="bruce" timestamp="1503058545473">                        <title svg:width="500">Ce fichier ne peut pas ouvert normalement, veuillez le rédiger et sauvegarder, sinon le fichier sera perdu en permanence. </title>                        <children>                            <topics type="attached">                                <topic id="5f0rivgubii2launodiln7sdkt" modified-by="bruce" timestamp="1503058545476">                                    <title svg:width="500">Vous pouvez essayer d'ouvrir avec XMind 8 Update 3 ou avec une version plus récente.</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="10pn1os1sgfsnqa8akabom5pej" modified-by="bruce" timestamp="1503058545481">                        <title svg:width="500">파일을 정상적으로 열 수 없으며, 수정 및 저장하지 마십시오. 그렇지 않으면 파일의 내용이 영구적으로 손실됩니다!</title>                        <children>                            <topics type="attached">                                <topic id="0l2nr0fq3em22rctapkj46ue58" modified-by="bruce" timestamp="1503058545484">                                    <title svg:width="500">XMind 8 Update 3 또는 이후 버전을 사용하여</title>                                </topic>                            </topics>                        </children>                    </topic>                </topics>            </children>            <extensions>                <extension provider="org.xmind.ui.map.unbalanced">                    <content>                        <right-number>-1</right-number>                    </content>                </extension>            </extensions>        </topic>        <title>Sheet 1</title>    </sheet></xmap-content>`
  )

  const manifestData = {
    'file-entries': { 'content.json': {}, 'metadata.json': {}, 'Thumbnails/thumbnail.png':{} }
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
