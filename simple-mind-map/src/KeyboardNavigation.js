import { isKey } from './utils/keyMap'
import { bfsWalk } from './utils'

/**
 * javascript comment
 * @Author: 王林25
 * @Date: 2022-12-09 11:06:50
 * @Desc: 键盘导航类
 */
export default class KeyboardNavigation {
  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-12-09 11:07:24
   * @Desc: 构造函数
   */
  constructor(opt) {
    this.opt = opt
    this.mindMap = opt.mindMap
    this.onKeyup = this.onKeyup.bind(this)
    this.mindMap.on('keyup', this.onKeyup)
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-12-09 14:12:27
   * @Desc: 处理按键事件
   */
  onKeyup(e) {
    if (this.mindMap.renderer.activeNodeList.length > 0) {
      ;['Left', 'Up', 'Right', 'Down'].forEach(dir => {
        if (isKey(e, dir)) {
          this.focus(dir)
        }
      })
    } else {
      let root = this.mindMap.renderer.root
      this.mindMap.renderer.moveNodeToCenter(root)
      root.active()
    }
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-12-09 14:12:39
   * @Desc: 聚焦到下一个节点
   */
  focus(dir) {
    let currentActiveNode = this.mindMap.renderer.activeNodeList[0]
    let currentActiveNodeRect = this.getNodeRect(currentActiveNode)
    let targetNode = null
    let targetDis = Infinity
    let checkNodeDis = (rect, node) => {
      let dis = this.getDistance(currentActiveNodeRect, rect)
      if (dis < targetDis) {
        targetNode = node
        targetDis = dis
      }
    }
    bfsWalk(this.mindMap.renderer.root, node => {
      let rect = this.getNodeRect(node)
      let { left, top, right, bottom } = rect
      if (dir === 'Right') {
        if (left >= currentActiveNodeRect.right) {
          checkNodeDis(rect, node)
        }
      } else if (dir === 'Left') {
        if (right <= currentActiveNodeRect.left) {
          checkNodeDis(rect, node)
        }
      } else if (dir === 'Up') {
        if (bottom <= currentActiveNodeRect.top) {
          checkNodeDis(rect, node)
        }
      } else if (dir === 'Down') {
        if (top >= currentActiveNodeRect.bottom) {
          checkNodeDis(rect, node)
        }
      }
    })
    if (targetNode) {
      this.mindMap.renderer.moveNodeToCenter(targetNode)
      targetNode.active()
    }
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-12-09 14:12:50
   * @Desc: 获取节点的位置信息
   */
  getNodeRect(node) {
    let { scaleX, scaleY, translateX, translateY } =
      this.mindMap.draw.transform()
    let { left, top, width, height } = node
    return {
      right: (left + width) * scaleX + translateX,
      bottom: (top + height) * scaleY + translateY,
      left: left * scaleX + translateX,
      top: top * scaleY + translateY
    }
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-12-09 14:13:04
   * @Desc: 获取两个节点的距离
   */
  getDistance(node1Rect, node2Rect) {
    let center1 = this.getCenter(node1Rect)
    let center2 = this.getCenter(node2Rect)
    return Math.sqrt(
      Math.pow(center1.x - center2.x, 2) + Math.pow(center1.y - center2.y, 2)
    )
  }

  /**
   * javascript comment
   * @Author: 王林25
   * @Date: 2022-12-09 14:13:11
   * @Desc: 获取节点的中心点
   */
  getCenter({ left, right, top, bottom }) {
    return {
      x: (left + right) / 2,
      y: (top + bottom) / 2
    }
  }
}
