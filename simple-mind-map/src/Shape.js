//  节点形状类
export default class Shape {
  constructor(node) {
    this.node = node
  }

  //  形状需要的padding
  getShapePadding(width, height, paddingX, paddingY) {
    const shape = this.node.getShape()
    const defaultPaddingX = 15
    const defaultPaddingY = 5
    const actWidth = width + paddingX * 2
    const actHeight = height + paddingY * 2
    const actOffset = Math.abs(actWidth - actHeight)
    switch (shape) {
      case 'roundedRectangle':
        return {
          paddingX: height > width ? (height - width) / 2 : 0,
          paddingY: 0
        }
      case 'diamond':
        return {
          paddingX: width / 2,
          paddingY: height / 2
        }
      case 'parallelogram':
        return {
          paddingX: paddingX <= 0 ? defaultPaddingX : 0,
          paddingY: 0
        }
      case 'outerTriangularRectangle':
        return {
          paddingX: paddingX <= 0 ? defaultPaddingX : 0,
          paddingY: 0
        }
      case 'innerTriangularRectangle':
        return {
          paddingX: paddingX <= 0 ? defaultPaddingX : 0,
          paddingY: 0
        }
      case 'ellipse':
        return {
          paddingX: paddingX <= 0 ? defaultPaddingX : 0,
          paddingY: paddingY <= 0 ? defaultPaddingY : 0
        }
      case 'circle':
        return {
          paddingX: actHeight > actWidth ? actOffset / 2 : 0,
          paddingY: actHeight < actWidth ? actOffset / 2 : 0
        }
      default:
        return {
          paddingX: 0,
          paddingY: 0
        }
    }
  }

  //  创建形状节点
  createShape() {
    const shape = this.node.getShape()
    let { width, height } = this.node
    let node = null
    // 矩形
    if (shape === 'rectangle') {
      node = this.node.group.rect(width, height)
    } else if (shape === 'diamond') {
      // 菱形
      node = this.createDiamond()
    } else if (shape === 'parallelogram') {
      // 平行四边形
      node = this.createParallelogram()
    } else if (shape === 'roundedRectangle') {
      // 圆角矩形
      node = this.createRoundedRectangle()
    } else if (shape === 'octagonalRectangle') {
      // 八角矩形
      node = this.createOctagonalRectangle()
    } else if (shape === 'outerTriangularRectangle') {
      // 外三角矩形
      node = this.createOuterTriangularRectangle()
    } else if (shape === 'innerTriangularRectangle') {
      // 内三角矩形
      node = this.createInnerTriangularRectangle()
    } else if (shape === 'ellipse') {
      // 椭圆
      node = this.createEllipse()
    } else if (shape === 'circle') {
      // 圆
      node = this.createCircle()
    }
    return node
  }

  //  创建菱形
  createDiamond() {
    let { width, height } = this.node
    let halfWidth = width / 2
    let halfHeight = height / 2
    let topX = halfWidth
    let topY = 0
    let rightX = width
    let rightY = halfHeight
    let bottomX = halfWidth
    let bottomY = height
    let leftX = 0
    let leftY = halfHeight
    return this.node.group.polygon(`
            ${topX}, ${topY}
            ${rightX}, ${rightY}
            ${bottomX}, ${bottomY}
            ${leftX}, ${leftY}
        `)
  }

  //  创建平行四边形
  createParallelogram() {
    let { paddingX } = this.node.getPaddingVale()
    paddingX = paddingX || this.node.shapePadding.paddingX
    let { width, height } = this.node
    return this.node.group.polygon(`
            ${paddingX}, ${0}
            ${width}, ${0}
            ${width - paddingX}, ${height}
            ${0}, ${height}
        `)
  }

  //  创建圆角矩形
  createRoundedRectangle() {
    let { width, height } = this.node
    let halfHeight = height / 2
    return this.node.group.path(`
            M${halfHeight},0
            L${width - halfHeight},0
            A${height / 2},${height / 2} 0 0,1 ${width - halfHeight},${height} 
            L${halfHeight},${height}
            A${height / 2},${height / 2} 0 0,1 ${halfHeight},${0}
        `)
  }

  //  创建八角矩形
  createOctagonalRectangle() {
    let w = 5
    let { width, height } = this.node
    return this.node.group.polygon(`
            ${0}, ${w}
            ${w}, ${0}
            ${width - w}, ${0}
            ${width}, ${w}
            ${width}, ${height - w}
            ${width - w}, ${height}
            ${w}, ${height}
            ${0}, ${height - w}
        `)
  }

  //  创建外三角矩形
  createOuterTriangularRectangle() {
    let { paddingX } = this.node.getPaddingVale()
    paddingX = paddingX || this.node.shapePadding.paddingX
    let { width, height } = this.node
    return this.node.group.polygon(`
            ${paddingX}, ${0}
            ${width - paddingX}, ${0}
            ${width}, ${height / 2}
            ${width - paddingX}, ${height}
            ${paddingX}, ${height}
            ${0}, ${height / 2}
        `)
  }

  //  创建内三角矩形
  createInnerTriangularRectangle() {
    let { paddingX } = this.node.getPaddingVale()
    paddingX = paddingX || this.node.shapePadding.paddingX
    let { width, height } = this.node
    return this.node.group.polygon(`
            ${0}, ${0}
            ${width}, ${0}
            ${width - paddingX / 2}, ${height / 2}
            ${width}, ${height}
            ${0}, ${height}
            ${paddingX / 2}, ${height / 2}
        `)
  }

  //  创建椭圆
  createEllipse() {
    let { width, height } = this.node
    let halfWidth = width / 2
    let halfHeight = height / 2
    return this.node.group.path(`
            M${halfWidth},0
            A${halfWidth},${halfHeight} 0 0,1 ${halfWidth},${height} 
            M${halfWidth},${height} 
            A${halfWidth},${halfHeight} 0 0,1 ${halfWidth},${0} 
        `)
  }

  //  创建圆
  createCircle() {
    let { width, height } = this.node
    let halfWidth = width / 2
    let halfHeight = height / 2
    return this.node.group.path(`
            M${halfWidth},0
            A${halfWidth},${halfHeight} 0 0,1 ${halfWidth},${height} 
            M${halfWidth},${height} 
            A${halfWidth},${halfHeight} 0 0,1 ${halfWidth},${0} 
        `)
  }
}

// 形状列表
export const shapeList = [
  'rectangle',
  'diamond',
  'parallelogram',
  'roundedRectangle',
  'octagonalRectangle',
  'outerTriangularRectangle',
  'innerTriangularRectangle',
  'ellipse',
  'circle'
]
