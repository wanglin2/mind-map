import { Circle, G, Text, Image } from '@svgdotjs/svg.js'
import { generateColorByContent } from '../../../utils/index'

// 协同相关功能

// 创建容器
function createUserListNode() {
  // 如果没有注册协作插件，那么需要创建
  if (!this.mindMap.cooperate) return
  this._userListGroup = new G()
  this.group.add(this._userListGroup)
}

// 创建文本头像
function createTextAvatar(item) {
  const { avatarSize, fontSize } = this.mindMap.opt.cooperateStyle
  const g = new G()
  const str = item.isMore ? item.name : String(item.name)[0]
  // 圆
  const circle = new Circle().size(avatarSize, avatarSize)
  circle.fill({
    color: item.color || generateColorByContent(str)
  })
  // 文本
  const text = new Text()
    .text(str)
    .fill({
      color: '#fff'
    })
    .css({
      'font-size': fontSize + 'px'
    })
    .dx(-fontSize / 2)
    .dy((avatarSize - fontSize) / 2)
  g.add(circle).add(text)
  return g
}

// 创建图片头像
function createImageAvatar(item) {
  const { avatarSize } = this.mindMap.opt.cooperateStyle
  return new Image().load(item.avatar).size(avatarSize, avatarSize)
}

// 更新渲染
function updateUserListNode() {
  if (!this._userListGroup) return
  const { avatarSize } = this.mindMap.opt.cooperateStyle
  this._userListGroup.clear()
  // 根据当前节点长度计算最多能显示几个
  const length = this.userList.length
  const maxShowCount = Math.floor(this.width / avatarSize)
  const list = []
  if (length > maxShowCount) {
    // 如果当前用户数量比最多能显示的多，最后需要显示一个提示信息
    list.push(...this.userList.slice(0, maxShowCount - 1), {
      isMore: true,
      name: '+' + (length - maxShowCount + 1)
    })
  } else {
    list.push(...this.userList)
  }
  list.forEach((item, index) => {
    let node = null
    if (item.avatar) {
      node = this.createImageAvatar(item)
    } else {
      node = this.createTextAvatar(item)
    }
    node.on('click', (e) => {
      this.mindMap.emit('node_cooperate_avatar_click', item, this, node, e)
    })
    node.on('mouseenter', (e) => {
      this.mindMap.emit('node_cooperate_avatar_mouseenter', item, this, node, e)
    })
    node.on('mouseleave', (e) => {
      this.mindMap.emit('node_cooperate_avatar_mouseleave', item, this, node, e)
    })
    node.x(index * avatarSize).cy(-avatarSize / 2)
    this._userListGroup.add(node)
  })
}

// 添加用户
function addUser(userInfo) {
  if (
    this.userList.find(item => {
      return item.id == userInfo.id
    })
  )
    return
  this.userList.push(userInfo)
  this.updateUserListNode()
}

// 移除用户
function removeUser(userInfo) {
  const index = this.userList.findIndex(item => {
    return item.id == userInfo.id
  })
  if (index === -1) return
  this.userList.splice(index, 1)
  this.updateUserListNode()
}

// 清空用户
function emptyUser() {
  this.userList = []
  this.updateUserListNode()
}

export default {
  createUserListNode,
  updateUserListNode,
  createTextAvatar,
  createImageAvatar,
  addUser,
  removeUser,
  emptyUser
}
