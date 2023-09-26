import { walk } from '../utils'

let el = null
const getText = str => {
  if (!el) {
    el = document.createElement('div')
  }
  el.innerHTML = str
  return el.textContent
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
      let level = layerIndex + 1
      let text = node.data.richText ? getText(node.data.text) : node.data.text
      if (level <= 6) {
        content += getTitleMark(level)
      } else {
        content += getIndentMark(level)
      }
      content += ' ' + text
      // 概要
      let generalization = node.data.generalization
      if (generalization && generalization.text) {
        let generalizationText = generalization.richText
          ? getText(generalization.text)
          : generalization.text
        content += `[${generalizationText}]`
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
