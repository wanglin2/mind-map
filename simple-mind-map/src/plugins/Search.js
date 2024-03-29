import {
  bfsWalk,
  getTextFromHtml,
  isUndef,
  replaceHtmlText
} from '../utils/index'
import Node from '../core/render/node/Node'

// 搜索插件
class Search {
  //  构造函数
  constructor({ mindMap }) {
    this.mindMap = mindMap
    // 是否正在搜索
    this.isSearching = false
    // 搜索文本
    this.searchText = ''
    // 匹配的节点列表
    this.matchNodeList = []
    // 当前所在的节点列表索引
    this.currentIndex = -1
    // 不要复位搜索文本
    this.notResetSearchText = false
    // 是否自动跳转下一个匹配节点
    this.isJumpNext = false

    this.bindEvent()
  }

  bindEvent() {
    this.onDataChange = this.onDataChange.bind(this)
    this.mindMap.on('data_change', this.onDataChange)
  }

  unBindEvent() {
    this.mindMap.off('data_change', this.onDataChange)
  }

  // 节点数据改变了，需要重新搜索
  onDataChange() {
    if (this.isJumpNext) {
      this.isJumpNext = false
      this.search(this.searchText)
      return
    }
    if (this.notResetSearchText) {
      this.notResetSearchText = false
      return
    }
    this.searchText = ''
  }

  // 搜索
  search(text, callback = () => {}) {
    if (isUndef(text)) return this.endSearch()
    text = String(text)
    this.isSearching = true
    if (this.searchText === text) {
      // 和上一次搜索文本一样，那么搜索下一个
      this.searchNext(callback)
    } else {
      // 和上次搜索文本不一样，那么重新开始
      this.searchText = text
      this.doSearch()
      this.searchNext(callback)
    }
    this.emitEvent()
  }

  // 结束搜索
  endSearch() {
    if (!this.isSearching) return
    if (this.mindMap.opt.readonly && this.matchNodeList[this.currentIndex]) {
      this.matchNodeList[this.currentIndex].closeHighlight()
    }
    this.searchText = ''
    this.matchNodeList = []
    this.currentIndex = -1
    this.notResetSearchText = false
    this.isSearching = false
    this.emitEvent()
  }

  // 搜索匹配的节点
  doSearch() {
    this.matchNodeList = []
    this.currentIndex = -1
    const { isOnlySearchCurrentRenderNodes } = this.mindMap.opt
    // 如果要搜索收起来的节点，那么要遍历渲染树而不是节点树
    const tree = isOnlySearchCurrentRenderNodes
      ? this.mindMap.renderer.root
      : this.mindMap.renderer.renderTree
    if (!tree) return
    bfsWalk(tree, node => {
      let { richText, text } = isOnlySearchCurrentRenderNodes
        ? node.getData()
        : node.data
      if (richText) {
        text = getTextFromHtml(text)
      }
      if (text.includes(this.searchText)) {
        this.matchNodeList.push(node)
      }
    })
  }

  // 判断对象是否是节点实例
  isNodeInstance(node) {
    return node instanceof Node
  }

  // 搜索下一个，定位到下一个匹配节点
  searchNext(callback) {
    if (!this.isSearching || this.matchNodeList.length <= 0) return
    if (this.currentIndex < this.matchNodeList.length - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
    const currentNode = this.matchNodeList[this.currentIndex]
    this.notResetSearchText = true
    const uid = this.isNodeInstance(currentNode)
      ? currentNode.getData('uid')
      : currentNode.data.uid
    const targetNode = this.mindMap.renderer.findNodeByUid(uid)
    this.mindMap.execCommand('GO_TARGET_NODE', uid, node => {
      if (!this.isNodeInstance(currentNode)) {
        this.matchNodeList[this.currentIndex] = node
      }
      callback()
      // 只读模式下节点无法激活，所以通过高亮的方式
      if (this.mindMap.opt.readonly) {
        node.highlight()
      }
      // 如果当前节点实例已经存在，则不会触发data_change事件，那么需要手动把标志复位
      if (targetNode) {
        this.notResetSearchText = false
      }
    })
  }

  // 替换当前节点
  replace(replaceText, jumpNext = false) {
    if (
      replaceText === null ||
      replaceText === undefined ||
      !this.isSearching ||
      this.matchNodeList.length <= 0
    )
      return
    // 自动跳转下一个匹配节点
    this.isJumpNext = jumpNext
    replaceText = String(replaceText)
    let currentNode = this.matchNodeList[this.currentIndex]
    if (!currentNode) return
    let text = this.getReplacedText(currentNode, this.searchText, replaceText)
    this.notResetSearchText = true
    currentNode.setText(text, currentNode.getData('richText'), true)
    this.matchNodeList = this.matchNodeList.filter(node => {
      return currentNode !== node
    })
    if (this.currentIndex > this.matchNodeList.length - 1) {
      this.currentIndex = -1
    } else {
      this.currentIndex--
    }
    this.emitEvent()
  }

  // 替换所有
  replaceAll(replaceText) {
    if (
      replaceText === null ||
      replaceText === undefined ||
      !this.isSearching ||
      this.matchNodeList.length <= 0
    )
      return
    replaceText = String(replaceText)
    this.matchNodeList.forEach(node => {
      const text = this.getReplacedText(node, this.searchText, replaceText)
      if (this.isNodeInstance(node)) {
        this.mindMap.renderer.setNodeDataRender(
          node,
          {
            text,
            resetRichText: !!node.getData('richText')
          },
          true
        )
      } else {
        node.data.text = text
        node.data.resetRichText = !!node.data.richText
      }
    })
    this.mindMap.render()
    this.mindMap.command.addHistory()
    this.endSearch()
  }

  // 获取某个节点替换后的文本
  getReplacedText(node, searchText, replaceText) {
    let { richText, text } = this.isNodeInstance(node)
      ? node.getData()
      : node.data
    if (richText) {
      return replaceHtmlText(text, searchText, replaceText)
    } else {
      return text.replaceAll(searchText, replaceText)
    }
  }

  // 发送事件
  emitEvent() {
    this.mindMap.emit('search_info_change', {
      currentIndex: this.currentIndex,
      total: this.matchNodeList.length
    })
  }

  // 插件被移除前做的事情
  beforePluginRemove() {
    this.unBindEvent()
  }

  // 插件被卸载前做的事情
  beforePluginDestroy() {
    this.unBindEvent()
  }
}

Search.instanceName = 'search'

export default Search
