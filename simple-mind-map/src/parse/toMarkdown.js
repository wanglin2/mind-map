import { walk, nodeRichTextToTextWithWrap } from '../utils'

const getNodeText = data => {
  return data.richText ? nodeRichTextToTextWithWrap(data.text) : data.text
}

const getTitleMark = level => {
  return new Array(level).fill('#').join('')
}

const getIndentMark = level => {
  return new Array(level - 6).fill('   ').join('') + '*'
}

// 转换成markdown格式
export const transformToMarkdown = root => {
  let content = ''
  walk(
    root,
    null,
    (node, parent, isRoot, layerIndex) => {
      const level = layerIndex + 1
      if (level <= 6) {
        content += getTitleMark(level)
      } else {
        content += getIndentMark(level)
      }
      content += ' ' + getNodeText(node.data)
      // 概要
      const generalization = node.data.generalization
      if (Array.isArray(generalization)) {
        content += generalization.map(item => {
          return ` [${getNodeText(item)}]`
        })
      } else if (generalization && generalization.text) {
        const generalizationText = getNodeText(generalization)
        content += ` [${generalizationText}]`
      }
      content += '\n\n'
      // 备注
      if (node.data.note) {
        content += node.data.note + '\n\n'
      }
    },
    () => {},
    true
  )
  return content
}
