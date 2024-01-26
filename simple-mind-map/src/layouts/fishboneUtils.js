import { degToRad } from '../utils/'

export default {
  top: {
    renderExpandBtn({
      node,
      btn,
      expandBtnSize,
      translateX,
      translateY,
      width,
      height
    }) {
      if (node.parent && node.parent.isRoot) {
        btn.translate(
          width * 0.3 - expandBtnSize / 2 - translateX,
          -expandBtnSize / 2 - translateY
        )
      } else {
        btn.translate(
          width * 0.3 - expandBtnSize / 2 - translateX,
          height + expandBtnSize / 2 - translateY
        )
      }
    },
    renderLine({
      node,
      line,
      top,
      x,
      lineLength,
      height,
      expandBtnSize,
      maxy,
      ctx
    }) {
      if (node.parent && node.parent.isRoot) {
        line.plot(
          ctx.transformPath(
            `M ${x},${top} L ${x + lineLength},${
              top - Math.tan(degToRad(ctx.mindMap.opt.fishboneDeg)) * lineLength
            }`
          )
        )
      } else {
        line.plot(
          ctx.transformPath(
            `M ${x},${top + height + expandBtnSize} L ${x},${maxy}`
          )
        )
      }
    },
    computedLeftTopValue({ layerIndex, node, ctx }) {
      if (layerIndex >= 1 && node.children) {
        // 遍历三级及以下节点的子节点
        let marginY = ctx.getMarginY(layerIndex + 1)
        let startLeft = node.left + node.width * ctx.childIndent
        let totalTop =
          node.top +
          node.height +
          (ctx.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0) +
          marginY
        node.children.forEach(item => {
          item.left = startLeft
          item.top += totalTop
          totalTop +=
            item.height +
            (ctx.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0) +
            marginY
        })
      }
    },
    adjustLeftTopValueBefore({ node, parent, ctx, layerIndex }) {
      // 调整top
      let len = node.children.length
      let marginY = ctx.getMarginY(layerIndex + 1)
      // 调整三级及以下节点的top
      if (parent && !parent.isRoot && len > 0) {
        let totalHeight = node.children.reduce((h, item) => {
          return (
            h +
            item.height +
            (ctx.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0) +
            marginY
          )
        }, 0)
        ctx.updateBrothersTop(node, totalHeight)
      }
    },
    adjustLeftTopValueAfter({ parent, node, ctx }) {
      // 将二级节点的子节点移到上方
      if (parent && parent.isRoot) {
        // 遍历二级节点的子节点
        let marginY = ctx.getMarginY(node.layerIndex + 1)
        let totalHeight = node.expandBtnSize + marginY
        node.children.forEach(item => {
          // 调整top
          let nodeTotalHeight = ctx.getNodeAreaHeight(item)
          let _top = item.top
          let _left = item.left
          item.top =
            node.top - (item.top - node.top) - nodeTotalHeight + node.height
          // 调整left
          item.left =
            node.left +
            node.width * ctx.indent +
            (nodeTotalHeight + totalHeight) /
              Math.tan(degToRad(ctx.mindMap.opt.fishboneDeg))
          totalHeight += nodeTotalHeight
          // 同步更新后代节点
          ctx.updateChildrenPro(item.children, {
            top: item.top - _top,
            left: item.left - _left
          })
        })
      }
    }
  },
  bottom: {
    renderExpandBtn({
      node,
      btn,
      expandBtnSize,
      translateX,
      translateY,
      width,
      height
    }) {
      if (node.parent && node.parent.isRoot) {
        btn.translate(
          width * 0.3 - expandBtnSize / 2 - translateX,
          height + expandBtnSize / 2 - translateY
        )
      } else {
        btn.translate(
          width * 0.3 - expandBtnSize / 2 - translateX,
          -expandBtnSize / 2 - translateY
        )
      }
    },
    renderLine({ node, line, top, x, lineLength, height, miny, ctx }) {
      if (node.parent && node.parent.isRoot) {
        line.plot(
          ctx.transformPath(
            `M ${x},${top + height} L ${x + lineLength},${
              top +
              height +
              Math.tan(degToRad(ctx.mindMap.opt.fishboneDeg)) * lineLength
            }`
          )
        )
      } else {
        line.plot(ctx.transformPath(`M ${x},${top} L ${x},${miny}`))
      }
    },
    computedLeftTopValue({ layerIndex, node, ctx }) {
      let marginY = ctx.getMarginY(layerIndex + 1)
      if (layerIndex === 1 && node.children) {
        // 遍历二级节点的子节点
        let startLeft = node.left + node.width * ctx.childIndent
        let totalTop =
          node.top +
          node.height +
          (ctx.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0) +
          marginY

        node.children.forEach(item => {
          item.left = startLeft
          item.top =
            totalTop +
            (ctx.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0)
          totalTop +=
            item.height +
            (ctx.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0) +
            marginY
        })
      }
      if (layerIndex > 1 && node.children) {
        // 遍历三级及以下节点的子节点
        let startLeft = node.left + node.width * ctx.childIndent
        let totalTop =
          node.top -
          (ctx.getNodeActChildrenLength(node) > 0 ? node.expandBtnSize : 0) -
          marginY
        node.children.forEach(item => {
          item.left = startLeft
          item.top = totalTop - item.height
          totalTop -=
            item.height +
            (ctx.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0) +
            marginY
        })
      }
    },
    adjustLeftTopValueBefore({ node, ctx, layerIndex }) {
      // 调整top
      let marginY = ctx.getMarginY(layerIndex + 1)
      let len = node.children.length
      if (layerIndex > 2 && len > 0) {
        let totalHeight = node.children.reduce((h, item) => {
          return (
            h +
            item.height +
            (ctx.getNodeActChildrenLength(item) > 0 ? item.expandBtnSize : 0) +
            marginY
          )
        }, 0)
        ctx.updateBrothersTop(node, -totalHeight)
      }
    },
    adjustLeftTopValueAfter({ parent, node, ctx }) {
      // 将二级节点的子节点移到上方
      if (parent && parent.isRoot) {
        // 遍历二级节点的子节点
        let marginY = ctx.getMarginY(node.layerIndex + 1)
        let totalHeight = 0
        let totalHeight2 = node.expandBtnSize
        node.children.forEach(item => {
          // 调整top
          let hasChildren = ctx.getNodeActChildrenLength(item) > 0
          let nodeTotalHeight = ctx.getNodeAreaHeight(item)
          let offset = hasChildren
            ? nodeTotalHeight -
              item.height -
              (hasChildren ? item.expandBtnSize : 0)
            : 0
          offset -= hasChildren ? marginY : 0
          let _top = totalHeight + offset
          let _left = item.left
          item.top += _top
          // 调整left
          item.left =
            node.left +
            node.width * ctx.indent +
            (nodeTotalHeight + totalHeight2) /
              Math.tan(degToRad(ctx.mindMap.opt.fishboneDeg))
          totalHeight += offset
          totalHeight2 += nodeTotalHeight
          // 同步更新后代节点
          ctx.updateChildrenPro(item.children, {
            top: _top,
            left: item.left - _left
          })
        })
      }
    }
  }
}
