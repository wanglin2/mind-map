import { bfsWalk, getTextFromHtml } from '../utils/index'

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
    this.onDataChange = this.onDataChange.bind(this)
    this.mindMap.on('data_change', this.onDataChange)
  }

  // 节点数据改变了，需要重新搜索
  onDataChange() {
    if (this.notResetSearchText) {
      this.notResetSearchText = false
      return
    }
    this.searchText = ''
  }

  // 搜索
  search(text, callback) {
    text = String(text).trim()
    if (!text) return this.endSearch()
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
    bfsWalk(this.mindMap.renderer.root, node => {
      let { richText, text } = node.nodeData.data
      if (richText) {
        text = getTextFromHtml(text)
      }
      if (text.includes(this.searchText)) {
        this.matchNodeList.push(node)
      }
    })
  }

  // 搜索下一个，定位到下一个匹配节点
  searchNext(callback) {
    if (!this.isSearching || this.matchNodeList.length <= 0) return
    if (this.currentIndex < this.matchNodeList.length - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
    let currentNode = this.matchNodeList[this.currentIndex]
    this.notResetSearchText = true
    this.mindMap.execCommand('GO_TARGET_NODE', currentNode, () => {
      callback()
    })
  }

  // 替换当前节点
  replace(replaceText) {
    replaceText = String(replaceText).trim()
    if (!replaceText || !this.isSearching || this.matchNodeList.length <= 0)
      return
    let currentNode = this.matchNodeList[this.currentIndex]
    if (!currentNode) return
    let text = this.getReplacedText(currentNode, this.searchText, replaceText)
    this.notResetSearchText = true
    currentNode.setText(text, currentNode.nodeData.data.richText)
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
    replaceText = String(replaceText).trim()
    if (!replaceText || !this.isSearching || this.matchNodeList.length <= 0)
      return
    this.matchNodeList.forEach(node => {
      let text = this.getReplacedText(node, this.searchText, replaceText)
      this.mindMap.renderer.setNodeDataRender(
        node,
        {
          text,
          resetRichText: !!node.nodeData.data.richText
        },
        true
      )
    })
    this.mindMap.render()
    this.mindMap.command.addHistory()
    this.endSearch()
  }

  // 获取某个节点替换后的文本
  getReplacedText(node, searchText, replaceText) {
    let { richText, text } = node.nodeData.data
    if (richText) {
      text = getTextFromHtml(text)
    }
    return text.replaceAll(searchText, replaceText)
  }

  // 发送事件
  emitEvent() {
    this.mindMap.emit('search_info_change', {
      currentIndex: this.currentIndex,
      total: this.matchNodeList.length
    })
  }
}

Search.instanceName = 'search'

export default Search
