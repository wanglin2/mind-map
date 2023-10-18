// 获取目标节点在起始节点的目标数组中的索引
export const getAssociativeLineTargetIndex = (node, toNode) => {
  return node.getData('associativeLineTargets').findIndex(item => {
    return item === toNode.getData('uid')
  })
}

// 计算贝塞尔曲线的控制点
export const computeCubicBezierPathPoints = (x1, y1, x2, y2) => {
  let cx1 = x1 + (x2 - x1) / 2
  let cy1 = y1
  let cx2 = cx1
  let cy2 = y2
  if (Math.abs(x1 - x2) <= 5) {
    cx1 = x1 + (y2 - y1) / 2
    cx2 = cx1
  }
  return [
    {
      x: cx1,
      y: cy1
    },
    {
      x: cx2,
      y: cy2
    }
  ]
}

// 拼接贝塞尔曲线路径
export const joinCubicBezierPath = (startPoint, endPoint, point1, point2) => {
  return `M ${startPoint.x},${startPoint.y} C ${point1.x},${point1.y} ${point2.x},${point2.y} ${endPoint.x},${endPoint.y}`
}

//  获取节点的位置信息
const getNodeRect = node => {
  let { left, top, width, height } = node
  return {
    right: left + width,
    bottom: top + height,
    left,
    top
  }
}

// 三次贝塞尔曲线
export const cubicBezierPath = (x1, y1, x2, y2) => {
  let points = computeCubicBezierPathPoints(x1, y1, x2, y2)
  return joinCubicBezierPath(
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    points[0],
    points[1]
  )
}

export const calcPoint = (node, e) => {
  const { left, top, translateLeft, translateTop, width, height } = node
  const clientX = e.clientX
  const clientY = e.clientY
  // 中心点的坐标
  const centerX = translateLeft + width / 2
  const centerY = translateTop + height / 2
  const translateCenterX = left + width / 2
  const translateCenterY = top + height / 2
  const theta = Math.atan(height / width)
  // 矩形左上角坐标
  const deltaX = clientX - centerX
  const deltaY = centerY - clientY
  // 方向值
  const direction = Math.atan2(deltaY, deltaX)
  // 默认坐标
  let x = left + width
  let y = top + height
  if (direction < theta && direction >= -theta) {
    // 右边
    // 正切值 = 对边/邻边，对边 = 正切值*邻边
    const range = direction * (width / 2)
    if (direction < theta && direction >= 0) {
      // 中心点上边
      y = translateCenterY - range
    } else if (direction >= -theta && direction < 0) {
      //  中心点下方
      y = translateCenterY - range
    }
    return {
      x,
      y,
      dir: 'right',
      range
    }
  } else if (direction >= theta && direction < Math.PI - theta) {
    // 上边
    y = top
    let range = 0
    if (direction < Math.PI / 2 - theta && direction >= theta) {
      // 正切值 = 对边/邻边，邻边 = 对边/正切值
      const side = height / 2 / direction
      range = -side
      // 中心点右侧
      x = translateCenterX + side
    } else if (
      direction >= Math.PI / 2 - theta &&
      direction < Math.PI - theta
    ) {
      // 中心点左侧
      const tanValue = (centerX - clientX) / (centerY - clientY)
      const side = (height / 2) * tanValue
      range = side
      x = translateCenterX - side
    }
    return {
      x,
      y,
      dir: 'top',
      range
    }
  } else if (direction < -theta && direction >= theta - Math.PI) {
    // 下边
    let range = 0
    if (direction >= theta - Math.PI / 2 && direction < -theta) {
      // 中心点右侧
      // 正切值 = 对边/邻边，邻边 = 对边/正切值
      const side = height / 2 / direction
      range = side
      x = translateCenterX - side
    } else if (
      direction < theta - Math.PI / 2 &&
      direction >= theta - Math.PI
    ) {
      // 中心点左侧
      const tanValue = (centerX - clientX) / (centerY - clientY)
      const side = (height / 2) * tanValue
      range = -side
      x = translateCenterX + side
    }
    return {
      x,
      y,
      dir: 'bottom',
      range
    }
  }
  // 左边
  x = left
  const tanValue = (centerY - clientY) / (centerX - clientX)
  const range = tanValue * (width / 2)
  if (direction >= -Math.PI && direction < theta - Math.PI) {
    // 中心点右侧
    y = translateCenterY - range
  } else if (direction < Math.PI && direction >= Math.PI - theta) {
    //  中心点左侧
    y = translateCenterY - range
  }
  return {
    x,
    y,
    dir: 'left',
    range
  }
}
// 获取节点的连接点
export const getNodePoint = (node, dir = 'right', range = 0, e = null) => {
  let { left, top, width, height } = node
  if (e) {
    return calcPoint(node, e)
  }
  switch (dir) {
    case 'left':
      return {
        x: left,
        y: top + height / 2 - range
      }
    case 'right':
      return {
        x: left + width,
        y: top + height / 2 - range
      }
    case 'top':
      return {
        x: left + width / 2 - range,
        y: top
      }
    case 'bottom':
      return {
        x: left + width / 2 - range,
        y: top + height
      }
    default:
      break
  }
}

// 根据两个节点的位置计算节点的连接点
export const computeNodePoints = (fromNode, toNode) => {
  let fromRect = getNodeRect(fromNode)
  let fromCx = (fromRect.right + fromRect.left) / 2
  let fromCy = (fromRect.bottom + fromRect.top) / 2
  let toRect = getNodeRect(toNode)
  let toCx = (toRect.right + toRect.left) / 2
  let toCy = (toRect.bottom + toRect.top) / 2
  // 中心点坐标的差值
  let offsetX = toCx - fromCx
  let offsetY = toCy - fromCy
  if (offsetX === 0 && offsetY === 0) return []
  let fromDir = ''
  let toDir = ''
  if (offsetX <= 0 && offsetX <= offsetY && offsetX <= -offsetY) {
    // left
    fromDir = 'left'
    toDir = 'right'
  } else if (offsetX > 0 && offsetX >= -offsetY && offsetX >= offsetY) {
    // right
    fromDir = 'right'
    toDir = 'left'
  } else if (offsetY <= 0 && offsetY < offsetX && offsetY < -offsetX) {
    // up
    fromDir = 'top'
    toDir = 'bottom'
  } else if (offsetY > 0 && -offsetY < offsetX && offsetY > offsetX) {
    // down
    fromDir = 'right'
    toDir = 'right'
  }
  return [getNodePoint(fromNode, fromDir), getNodePoint(toNode, toDir)]
}

// 获取节点的关联线路径
export const getNodeLinePath = (startPoint, endPoint, node, toNode) => {
  let targetIndex = getAssociativeLineTargetIndex(node, toNode)
  // 控制点
  let controlPoints = []
  let associativeLineTargetControlOffsets =
    node.getData('associativeLineTargetControlOffsets')
  if (
    associativeLineTargetControlOffsets &&
    associativeLineTargetControlOffsets[targetIndex]
  ) {
    // 节点保存了控制点差值
    let offsets = associativeLineTargetControlOffsets[targetIndex]
    controlPoints = [
      {
        x: startPoint.x + offsets[0].x,
        y: startPoint.y + offsets[0].y
      },
      {
        x: endPoint.x + offsets[1].x,
        y: endPoint.y + offsets[1].y
      }
    ]
  } else {
    // 没有保存控制点则生成默认的
    controlPoints = computeCubicBezierPathPoints(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y
    )
  }
  // 根据控制点拼接贝塞尔曲线路径
  return {
    path: joinCubicBezierPath(
      startPoint,
      endPoint,
      controlPoints[0],
      controlPoints[1]
    ),
    controlPoints
  }
}

// 获取默认的控制点差值
export const getDefaultControlPointOffsets = (startPoint, endPoint) => {
  let controlPoints = computeCubicBezierPathPoints(
    startPoint.x,
    startPoint.y,
    endPoint.x,
    endPoint.y
  )
  return [
    {
      x: controlPoints[0].x - startPoint.x,
      y: controlPoints[0].y - startPoint.y
    },
    {
      x: controlPoints[1].x - endPoint.x,
      y: controlPoints[1].y - endPoint.y
    }
  ]
}
