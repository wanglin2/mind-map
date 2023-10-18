import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { isSameObject, simpleDeepClone, getType, isUndef } from '../utils/index'

// 协同插件
class Cooperate {
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    // yjs文档
    this.ydoc = new Y.Doc()
    // 共享数据
    this.ymap = null
    // 连接提供者
    this.provider = null
    // 感知数据
    this.awareness = null
    this.currentAwarenessData = []
    this.waitNodeUidMap = {} // 该列表中的uid对应的节点还未渲染完毕
    // 当前的平级对象类型的思维导图数据
    this.currentData = null
    // 用户信息
    this.userInfo = null
    // 绑定事件
    this.bindEvent()
    // 处理实例化时传入的思维导图数据
    if (this.mindMap.opt.data) {
      this.initData(this.mindMap.opt.data)
    }
  }

  // 初始化数据
  initData(data) {
    data = simpleDeepClone(data)
    // 解绑原来的数据
    if (this.ymap) {
      this.ymap.unobserve(this.onObserve)
    }
    // 创建共享数据
    this.ymap = this.ydoc.getMap()
    // 思维导图树结构转平级对象结构
    this.currentData = this.transformTreeDataToObject(data)
    // 将思维导图数据添加到共享数据中
    Object.keys(this.currentData).forEach(uid => {
      this.ymap.set(uid, this.currentData[uid])
    })
    // 监听数据同步
    this.onObserve = this.onObserve.bind(this)
    this.ymap.observe(this.onObserve)
  }

  // 获取yjs doc实例
  getDoc() {
    return this.ydoc
  }

  // 设置连接提供者
  setProvider(provider, webrtcProviderConfig = {}) {
    const { roomName, signalingList, ...otherConfig } = webrtcProviderConfig
    this.provider =
      provider ||
      new WebrtcProvider(roomName, this.ydoc, {
        signaling: signalingList,
        ...otherConfig
      })
    this.awareness = this.provider.awareness

    // 监听状态同步事件
    this.onAwareness = this.onAwareness.bind(this)
    this.awareness.on('change', this.onAwareness)
  }

  // 绑定事件
  bindEvent() {
    // 监听思维导图改变
    this.onDataChange = this.onDataChange.bind(this)
    this.mindMap.on('data_change', this.onDataChange)

    // 监听思维导图节点激活事件
    this.onNodeActive = this.onNodeActive.bind(this)
    this.mindMap.on('node_active', this.onNodeActive)

    // 监听思维导图渲染完毕事件
    this.onNodeTreeRenderEnd = this.onNodeTreeRenderEnd.bind(this)
    this.mindMap.on('node_tree_render_end', this.onNodeTreeRenderEnd)

    // 监听设置思维导图数据事件
    this.initData = this.initData.bind(this)
    this.mindMap.on('set_data', this.initData)
  }

  // 解绑事件
  unBindEvent() {
    if (this.ymap) {
      this.ymap.unobserve(this.onObserve)
    }
    this.mindMap.off('data_change', this.onDataChange)
    this.mindMap.off('node_active', this.onNodeActive)
    this.mindMap.off('node_tree_render_end', this.onNodeTreeRenderEnd)
    this.mindMap.off('set_data', this.initData)
    this.ydoc.destroy()
  }

  // 数据同步时的处理，更新当前思维导图
  onObserve(event) {
    const data = event.target.toJSON()
    // 如果数据没有改变直接返回
    if (isSameObject(data, this.currentData)) return
    this.currentData = data
    // 平级对象转树结构
    const res = this.transformObjectToTreeData(data)
    if (!res) return
    // 更新思维导图画布
    this.mindMap.renderer.setData(res)
    this.mindMap.render()
    this.mindMap.command.addHistory()
  }

  // 当前思维导图改变后的处理，触发同步
  onDataChange(data) {
    const res = this.transformTreeDataToObject(data)
    this.updateChanges(res)
  }

  // 找出更新点
  updateChanges(data) {
    const oldData = this.currentData
    this.currentData = data
    this.ydoc.transact(() => {
      // 找出新增的或修改的
      Object.keys(data).forEach(uid => {
        // 新增的或已经存在的，如果数据发生了改变
        if (!oldData[uid] || !isSameObject(oldData[uid], data[uid])) {
          this.ymap.set(uid, data[uid])
        }
      })
      // 找出删除的
      Object.keys(oldData).forEach(uid => {
        if (!data[uid]) {
          this.ymap.delete(uid)
        }
      })
    })
  }

  // 节点激活状态改变后触发感知数据同步
  onNodeActive(node, nodeList) {
    if (this.userInfo) {
      this.awareness.setLocalStateField(this.userInfo.name, {
        // 用户信息
        userInfo: {
          ...this.userInfo
        },
        // 当前激活的节点id列表
        nodeIdList: nodeList.map(item => {
          return item.uid
        })
      })
    }
  }

  // 节点树渲染完毕事件
  onNodeTreeRenderEnd() {
    Object.keys(this.waitNodeUidMap).forEach(uid => {
      const node = this.mindMap.renderer.findNodeByUid(uid)
      if (node) {
        node.addUser(this.waitNodeUidMap[uid])
      }
    })
    this.waitNodeUidMap = {}
  }

  // 设置用户信息
  /**
   * {
   *    id: '',     // 必传，用户唯一的id
   *    name: '',   // 用户名称。name和avatar两个只传一个即可，如果都传了，会显示avatar
   *    avatar: '', // 用户头像
   *    color: ''   // 如果没有传头像，那么会以一个圆形来显示名称的第一个字，文字的颜色为白色，圆的颜色可以通过该字段设置
   * }
   **/
  setUserInfo(userInfo) {
    if (
      getType(userInfo) !== 'Object' ||
      isUndef(userInfo.id) ||
      (isUndef(userInfo.name) && isUndef(userInfo.avatar))
    )
      return
    this.userInfo = userInfo || null
  }

  // 监听感知数据同步事件
  onAwareness() {
    const walk = (list, callback) => {
      list.forEach(value => {
        const userName = Object.keys(value)[0]
        if (!userName) return
        const data = value[userName]
        const userInfo = data.userInfo
        const nodeIdList = data.nodeIdList
        nodeIdList.forEach(uid => {
          const node = this.mindMap.renderer.findNodeByUid(uid)
          callback(uid, node, userInfo)
        })
      })
    }
    // 清除之前的数据
    walk(this.currentAwarenessData, (uid, node, userInfo) => {
      if (node) {
        node.removeUser(userInfo)
      }
    })
    // 设置当前数据
    const data = Array.from(this.awareness.getStates().values())
    this.currentAwarenessData = data
    walk(data, (uid, node, userInfo) => {
      // 不显示自己
      if (userInfo.id === this.userInfo.id) return
      if (node) {
        node.addUser(userInfo)
      } else {
        this.waitNodeUidMap[uid] = userInfo
      }
    })
  }

  // 将树结构转平级对象
  /*
    {
        data: {
            uid: 'xxx'
        },
        children: [
            {
                data: {
                    uid: 'xxx'
                },
                children: []
            }
        ]
    }
    转为：
    {
        uid: {
            children: [uid1, uid2],
            data: {}
        }
    }
  */
  transformTreeDataToObject(data) {
    const res = {}
    const walk = (root, parent) => {
      const uid = root.data.uid
      if (parent) {
        parent.children.push(uid)
      }
      res[uid] = {
        isRoot: !parent,
        data: {
          ...root.data
        },
        children: []
      }
      if (root.children && root.children.length > 0) {
        root.children.forEach(item => {
          walk(item, res[uid])
        })
      }
    }
    walk(data, null)
    return res
  }

  // 找到父节点的uid
  findParentUid(data, targetUid) {
    const uids = Object.keys(data)
    let res = ''
    uids.forEach(uid => {
      const children = data[uid].children
      const isParent =
        children.findIndex(childUid => {
          return childUid === targetUid
        }) !== -1
      if (isParent) {
        res = uid
      }
    })
    return res
  }

  // 将平级对象转树结构
  transformObjectToTreeData(data) {
    const uids = Object.keys(data)
    if (uids.length <= 0) return null
    const rootKey = uids.find(uid => {
      return data[uid].isRoot
    })
    if (!rootKey || !data[rootKey]) return null
    // 根节点
    const res = {
      data: simpleDeepClone(data[rootKey].data),
      children: []
    }
    const map = {}
    map[rootKey] = res
    uids.forEach(uid => {
      const parentUid = this.findParentUid(data, uid)
      const cur = data[uid]
      const node = map[uid] || {
        data: simpleDeepClone(cur.data),
        children: []
      }
      if (!map[uid]) {
        map[uid] = node
      }
      if (parentUid) {
        const index = data[parentUid].children.findIndex(item => {
          return item === uid
        })
        if (!map[parentUid]) {
          map[parentUid] = {
            data: simpleDeepClone(data[parentUid].data),
            children: []
          }
        }
        map[parentUid].children[index] = node
      }
    })
    return res
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

Cooperate.instanceName = 'cooperate'

export default Cooperate
