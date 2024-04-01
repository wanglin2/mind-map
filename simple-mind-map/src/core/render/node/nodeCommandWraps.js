//  设置数据
function setData(data = {}) {
  this.mindMap.execCommand('SET_NODE_DATA', this, data)
}

//  设置文本
function setText(text, richText, resetRichText) {
  this.mindMap.execCommand('SET_NODE_TEXT', this, text, richText, resetRichText)
}

//  设置图片
function setImage(imgData) {
  this.mindMap.execCommand('SET_NODE_IMAGE', this, imgData)
}

//  设置图标
function setIcon(icons) {
  this.mindMap.execCommand('SET_NODE_ICON', this, icons)
}

//  设置超链接
function setHyperlink(link, title) {
  this.mindMap.execCommand('SET_NODE_HYPERLINK', this, link, title)
}

//  设置备注
function setNote(note) {
  this.mindMap.execCommand('SET_NODE_NOTE', this, note)
}

//  设置附件
function setAttachment(url, name) {
  this.mindMap.execCommand('SET_NODE_ATTACHMENT', this, url, name)
}

//  设置标签
function setTag(tag) {
  this.mindMap.execCommand('SET_NODE_TAG', this, tag)
}

//  设置形状
function setShape(shape) {
  this.mindMap.execCommand('SET_NODE_SHAPE', this, shape)
}

//  修改某个样式
function setStyle(prop, value) {
  this.mindMap.execCommand('SET_NODE_STYLE', this, prop, value)
}

//  修改多个样式
function setStyles(style) {
  this.mindMap.execCommand('SET_NODE_STYLES', this, style)
}

export default {
  setData,
  setText,
  setImage,
  setIcon,
  setHyperlink,
  setNote,
  setAttachment,
  setTag,
  setShape,
  setStyle,
  setStyles
}
