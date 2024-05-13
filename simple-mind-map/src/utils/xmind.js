import {
  getImageSize,
  imgToDataUrl,
  parseDataUrl,
  getTextFromHtml,
  createUid
} from './index'
import { formatGetNodeGeneralization } from '../utils/index'

// 解析出新xmind的概要文本
export const getSummaryText = (node, topicId) => {
  if (node.children.summary && node.children.summary.length > 0) {
    for (let i = 0; i < node.children.summary.length; i++) {
      const cur = node.children.summary[i]
      if (cur.id === topicId) {
        return cur.title
      }
    }
  }
}

// 解析出旧xmind的概要文本
export const getSummaryText2 = (item, topicId) => {
  const summaryElements = getElementsByType(item.elements, 'summary')
  if (summaryElements && summaryElements && summaryElements.length > 0) {
    for (let i = 0; i < summaryElements.length; i++) {
      const cur = summaryElements[i]
      if (cur.attributes.id === topicId) {
        return cur.elements &&
          cur.elements[0] &&
          cur.elements[0].elements &&
          cur.elements[0].elements[0]
          ? cur.elements[0].elements[0].text
          : ''
      }
    }
  }
  return ''
}

// 解析旧版xmind数据时，找出根节点
export const getRoot = list => {
  let root = null
  const walk = arr => {
    if (!arr) return
    for (let i = 0; i < arr.length; i++) {
      if (!root && arr[i].name === 'topic') {
        root = arr[i]
        return
      }
    }
    arr.forEach(item => {
      walk(item.elements)
    })
  }
  walk(list)
  return root
}

// 解析旧版xmind数据，从一个数组中根据name找出该项
export const getItemByName = (arr, name) => {
  return arr.find(item => {
    return item.name === name
  })
}

// 解析旧版xmind数据，从一个数组中根据attributes.type找出该项
export const getElementsByType = (arr, type) => {
  return arr.find(el => {
    return el.attributes.type === type
  }).elements
}

// 解析xmind数据，将概要转换为smm支持的结构
export const addSummaryData = (selfList, childrenList, getText, range) => {
  const summaryData = {
    expand: true,
    isActive: false,
    text: getText(),
    range: null
  }
  const match = range.match(/\((\d+),(\d+)\)/)
  if (match) {
    const startIndex = Number(match[1])
    const endIndex = Number(match[2])
    if (startIndex === endIndex) {
      childrenList[startIndex] = summaryData
    } else {
      summaryData.range = [startIndex, endIndex]
      selfList.push(summaryData)
    }
  } else {
    selfList.push(summaryData)
  }
}

// 解析xmind数据时，解析其中的图片数据
export const handleNodeImageFromXmind = async (
  node,
  newNode,
  promiseList,
  files
) => {
  if (node.image && /\.(jpg|jpeg|png|gif|webp)$/.test(node.image.src)) {
    // 处理异步逻辑
    let resolve = null
    const promise = new Promise(_resolve => {
      resolve = _resolve
    })
    promiseList.push(promise)
    try {
      // 读取图片
      const imageType = /\.([^.]+)$/.exec(node.image.src)[1]
      const imageBase64 =
        `data:image/${imageType};base64,` +
        (await files['resources/' + node.image.src.split('/')[1]].async(
          'base64'
        ))
      newNode.data.image = imageBase64
      // 如果图片尺寸不存在
      if (!node.image.width && !node.image.height) {
        const imageSize = await getImageSize(imageBase64)
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
}

// 导出为xmind时，处理图片数据
export const handleNodeImageToXmind = async (
  node,
  newData,
  promiseList,
  imageList
) => {
  if (node.data.image) {
    // 处理异步逻辑
    let resolve = null
    let promise = new Promise(_resolve => {
      resolve = _resolve
    })
    promiseList.push(promise)
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
}

export const getXmindContentXmlData = () => {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?><xmap-content xmlns="urn:xmind:xmap:xmlns:content:2.0" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" modified-by="bruce" timestamp="1503058545540" version="2.0">    <sheet id="7abtd0ssc7n4pi1nu6i7b6lsdh" modified-by="bruce" theme="0kdeemiijde6nuk97e4t0vpp54" timestamp="1503058545540">        <topic id="1vr0lcte2og4t2sopiogvdmifc" modified-by="bruce" structure-class="org.xmind.ui.logic.right" timestamp="1503058545417">            <title>Warning                警告                Attention                Warnung                경고</title>            <children>                <topics type="attached">                    <topic id="71h1aip2t1o8vvm0a41nausaar" modified-by="bruce" timestamp="1503058545423">                        <title svg:width="500">This file can not be opened normally, please do not modify and save, otherwise the contents will be permanently lost！</title>                        <children>                            <topics type="attached">                                <topic id="428akmkh9a0tog6c91qj995qdl" modified-by="bruce" timestamp="1503058545427">                                    <title>You can try using XMind 8 Update 3 or later version to open</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="2kb87f8m38b3hnfhp450c7q35e" modified-by="bruce" timestamp="1503058545434">                        <title svg:width="500">该文件无法正常打开，请勿修改并保存，否则文件内容将会永久性丢失！</title>                        <children>                            <topics type="attached">                                <topic id="3m9hoo4a09n53ofl6fohdun99f" modified-by="bruce" timestamp="1503058545438">                                    <title>你可以尝试使用 XMind 8 Update 3 或更新版本打开</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="7r3r4617hvh931ot9obi595r8f" modified-by="bruce" timestamp="1503058545444">                        <title svg:width="500">該文件無法正常打開，請勿修改並保存，否則文件內容將會永久性丟失！</title>                        <children>                            <topics type="attached">                                <topic id="691pgka6gmgpgkacaa0h3f1hjb" modified-by="bruce" timestamp="1503058545448">                                    <title>你可以嘗試使用 XMind 8 Update 3 或更新版本打開</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="0f2e3rpkfahg4spg4nda946r0b" modified-by="bruce" timestamp="1503058545453">                        <title svg:width="500">この文書は正常に開かないので、修正して保存しないようにしてください。そうでないと、書類の内容が永久に失われます。！</title>                        <children>                            <topics type="attached">                                <topic id="4vuubta53ksc1falk46mevge0t" modified-by="bruce" timestamp="1503058545457">                                    <title>XMind 8 Update 3 や更新版を使って開くこともできます</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="70n9i4u3lb89sq9l1m1bs255j5" modified-by="bruce" timestamp="1503058545463">                        <title svg:width="500">Datei kann nicht richtig geöffnet werden. Bitte ändern Sie diese Datei nicht und speichern Sie sie, sonst wird die Datei endgültig gelöscht werden.</title>                        <children>                            <topics type="attached">                                <topic id="1qpc5ee298p2sqeqbinpca46b7" modified-by="bruce" timestamp="1503058545466">                                    <title svg:width="500">Bitte versuchen Sie, diese Datei mit XMind 8 Update 3 oder später zu öffnen.</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="4dmes10uc19pq7enu8sc4bmvif" modified-by="bruce" timestamp="1503058545473">                        <title svg:width="500">Ce fichier ne peut pas ouvert normalement, veuillez le rédiger et sauvegarder, sinon le fichier sera perdu en permanence. </title>                        <children>                            <topics type="attached">                                <topic id="5f0rivgubii2launodiln7sdkt" modified-by="bruce" timestamp="1503058545476">                                    <title svg:width="500">Vous pouvez essayer d'ouvrir avec XMind 8 Update 3 ou avec une version plus récente.</title>                                </topic>                            </topics>                        </children>                    </topic>                    <topic id="10pn1os1sgfsnqa8akabom5pej" modified-by="bruce" timestamp="1503058545481">                        <title svg:width="500">파일을 정상적으로 열 수 없으며, 수정 및 저장하지 마십시오. 그렇지 않으면 파일의 내용이 영구적으로 손실됩니다!</title>                        <children>                            <topics type="attached">                                <topic id="0l2nr0fq3em22rctapkj46ue58" modified-by="bruce" timestamp="1503058545484">                                    <title svg:width="500">XMind 8 Update 3 또는 이후 버전을 사용하여</title>                                </topic>                            </topics>                        </children>                    </topic>                </topics>            </children>            <extensions>                <extension provider="org.xmind.ui.map.unbalanced">                    <content>                        <right-number>-1</right-number>                    </content>                </extension>            </extensions>        </topic>        <title>Sheet 1</title>    </sheet></xmap-content>`
}

//  获取节点自身的概要，非子节点区间
const getSelfGeneralization = data => {
  const list = formatGetNodeGeneralization(data)
  return list.filter(item => {
    return !item.range || item.range.length <= 0
  })
}

//  获取节点区间概要
const getRangeGeneralization = data => {
  const list = formatGetNodeGeneralization(data)
  return list.filter(item => {
    return item.range && item.range.length > 0
  })
}

// 导出为xmind时，将概要转换为xmind的格式
export const parseNodeGeneralizationToXmind = node => {
  const summary = []
  const summaries = []
  const collectSummary = (item, startIndex, endIndex) => {
    const summaryTopicId = createUid()
    const summaryTitle = getTextFromHtml(item.text)
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
      id: createUid(),
      range: '(' + startIndex + ',' + endIndex + ')',
      topicId: summaryTopicId
    })
  }
  // 在xmind中，概要都是保存在父节点的
  // 而在simple-mind-map中，区间概要保存在父节点中，不带区间的保存在自身
  // 所以先要过滤出自身的区间概要
  const generalizationList = getRangeGeneralization(node.data)
  generalizationList.forEach(item => {
    collectSummary(item, item.range[0], item.range[1])
  })

  // 遍历子节点，找出子节点自身的概要
  ;(node.children || []).forEach((child, childIndex) => {
    const list = getSelfGeneralization(child.data)
    list.forEach(item => {
      collectSummary(item, childIndex, childIndex)
    })
  })

  return {
    summary,
    summaries
  }
}
