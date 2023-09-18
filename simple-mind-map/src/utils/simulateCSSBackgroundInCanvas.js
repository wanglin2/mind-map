// 将以空格分隔的字符串值转换成成数字/单位/值数组
const getNumberValueFromStr = value => {
  let arr = String(value).split(/\s+/)
  return arr.map(item => {
    if (/^[\d.]+/.test(item)) {
      // 数字+单位
      let res = /^([\d.]+)(.*)$/.exec(item)
      return [Number(res[1]), res[2]]
    } else {
      // 单个值
      return item
    }
  })
}

// 缩放宽度
const zoomWidth = (ratio, height) => {
  // w / height = ratio
  return ratio * height
}

// 缩放高度
const zoomHeight = (ratio, width) => {
  // width / h = ratio
  return width / ratio
}

// 关键词到百分比值的映射
const keyWordToPercentageMap = {
  left: 0,
  top: 0,
  center: 50,
  bottom: 100,
  right: 100
}

// 模拟background-size
const handleBackgroundSize = ({
  backgroundSize,
  drawOpt,
  imageRatio,
  canvasWidth,
  canvasHeight,
  canvasRatio
}) => {
  if (backgroundSize) {
    // 将值转换成数组
    let backgroundSizeValueArr = getNumberValueFromStr(backgroundSize)
    // 两个值都为auto，那就相当于不设置
    if (
      backgroundSizeValueArr[0] === 'auto' &&
      backgroundSizeValueArr[1] === 'auto'
    ) {
      return
    }
    // 值为cover
    if (backgroundSizeValueArr[0] === 'cover') {
      if (imageRatio > canvasRatio) {
        // 图片的宽高比大于canvas的宽高比，那么图片高度缩放到和canvas的高度一致，宽度自适应
        drawOpt.height = canvasHeight
        drawOpt.width = zoomWidth(imageRatio, canvasHeight)
      } else {
        // 否则图片宽度缩放到和canvas的宽度一致，高度自适应
        drawOpt.width = canvasWidth
        drawOpt.height = zoomHeight(imageRatio, canvasWidth)
      }
      return
    }
    // 值为contain
    if (backgroundSizeValueArr[0] === 'contain') {
      if (imageRatio > canvasRatio) {
        // 图片的宽高比大于canvas的宽高比，那么图片宽度缩放到和canvas的宽度一致，高度自适应
        drawOpt.width = canvasWidth
        drawOpt.height = zoomHeight(imageRatio, canvasWidth)
      } else {
        // 否则图片高度缩放到和canvas的高度一致，宽度自适应
        drawOpt.height = canvasHeight
        drawOpt.width = zoomWidth(imageRatio, canvasHeight)
      }
      return
    }
    // 图片宽度
    let newNumberWidth = -1
    if (backgroundSizeValueArr[0]) {
      if (Array.isArray(backgroundSizeValueArr[0])) {
        // 数字+单位类型
        if (backgroundSizeValueArr[0][1] === '%') {
          // %单位
          drawOpt.width = (backgroundSizeValueArr[0][0] / 100) * canvasWidth
          newNumberWidth = drawOpt.width
        } else {
          // 其他都认为是px单位
          drawOpt.width = backgroundSizeValueArr[0][0]
          newNumberWidth = backgroundSizeValueArr[0][0]
        }
      } else if (backgroundSizeValueArr[0] === 'auto') {
        // auto类型，那么根据设置的新高度以图片原宽高比进行自适应
        if (backgroundSizeValueArr[1]) {
          if (backgroundSizeValueArr[1][1] === '%') {
            // 高度为%单位
            drawOpt.width = zoomWidth(
              imageRatio,
              (backgroundSizeValueArr[1][0] / 100) * canvasHeight
            )
          } else {
            // 其他都认为是px单位
            drawOpt.width = zoomWidth(imageRatio, backgroundSizeValueArr[1][0])
          }
        }
      }
    }
    // 设置了图片高度
    if (backgroundSizeValueArr[1] && Array.isArray(backgroundSizeValueArr[1])) {
      // 数字+单位类型
      if (backgroundSizeValueArr[1][1] === '%') {
        // 高度为%单位
        drawOpt.height = (backgroundSizeValueArr[1][0] / 100) * canvasHeight
      } else {
        // 其他都认为是px单位
        drawOpt.height = backgroundSizeValueArr[1][0]
      }
    } else if (newNumberWidth !== -1) {
      // 没有设置图片高度或者设置为auto，那么根据设置的新宽度以图片原宽高比进行自适应
      drawOpt.height = zoomHeight(imageRatio, newNumberWidth)
    }
  }
}

// 模拟background-position
const handleBackgroundPosition = ({
  backgroundPosition,
  drawOpt,
  imgWidth,
  imgHeight,
  canvasWidth,
  canvasHeight
}) => {
  if (backgroundPosition) {
    // 将值转换成数组
    let backgroundPositionValueArr = getNumberValueFromStr(backgroundPosition)
    // 将关键词转为百分比
    backgroundPositionValueArr = backgroundPositionValueArr.map(item => {
      if (typeof item === 'string') {
        return keyWordToPercentageMap[item] !== undefined
          ? [keyWordToPercentageMap[item], '%']
          : item
      }
      return item
    })
    if (Array.isArray(backgroundPositionValueArr[0])) {
      if (backgroundPositionValueArr.length === 1) {
        // 如果只设置了一个值，第二个默认为50%
        backgroundPositionValueArr.push([50, '%'])
      }
      // 水平位置
      if (backgroundPositionValueArr[0][1] === '%') {
        // 单位为%
        let canvasX = (backgroundPositionValueArr[0][0] / 100) * canvasWidth
        let imgX = (backgroundPositionValueArr[0][0] / 100) * imgWidth
        // 计算差值
        drawOpt.x = canvasX - imgX
      } else {
        // 其他单位默认都为px
        drawOpt.x = backgroundPositionValueArr[0][0]
      }
      // 垂直位置
      if (backgroundPositionValueArr[1][1] === '%') {
        // 单位为%
        let canvasY = (backgroundPositionValueArr[1][0] / 100) * canvasHeight
        let imgY = (backgroundPositionValueArr[1][0] / 100) * imgHeight
        // 计算差值
        drawOpt.y = canvasY - imgY
      } else {
        // 其他单位默认都为px
        drawOpt.y = backgroundPositionValueArr[1][0]
      }
    }
  }
}

// 模拟background-repeat
const handleBackgroundRepeat = ({
  ctx,
  image,
  backgroundRepeat,
  drawOpt,
  imgWidth,
  imgHeight,
  canvasWidth,
  canvasHeight
}) => {
  if (backgroundRepeat) {
    // 保存在handleBackgroundPosition中计算出来的x、y
    let ox = drawOpt.x
    let oy = drawOpt.y
    // 计算ox和oy能平铺的图片数量
    let oxRepeatNum = Math.ceil(ox / imgWidth)
    let oyRepeatNum = Math.ceil(oy / imgHeight)
    // 计算ox和oy第一张图片的位置
    let oxRepeatX = ox - oxRepeatNum * imgWidth
    let oxRepeatY = oy - oyRepeatNum * imgHeight
    // 将值转换成数组
    let backgroundRepeatValueArr = getNumberValueFromStr(backgroundRepeat)
    // 不处理
    if (
      backgroundRepeatValueArr[0] === 'no-repeat' ||
      (imgWidth >= canvasWidth && imgHeight >= canvasHeight)
    ) {
      return
    }
    // 水平平铺
    if (backgroundRepeatValueArr[0] === 'repeat-x') {
      if (canvasWidth > imgWidth) {
        let x = oxRepeatX
        while (x < canvasWidth) {
          drawImage(ctx, image, {
            ...drawOpt,
            x
          })
          x += imgWidth
        }
        return true
      }
    }
    // 垂直平铺
    if (backgroundRepeatValueArr[0] === 'repeat-y') {
      if (canvasHeight > imgHeight) {
        let y = oxRepeatY
        while (y < canvasHeight) {
          drawImage(ctx, image, {
            ...drawOpt,
            y
          })
          y += imgHeight
        }
        return true
      }
    }
    // 平铺
    if (backgroundRepeatValueArr[0] === 'repeat') {
      let x = oxRepeatX
      while (x < canvasWidth) {
        if (canvasHeight > imgHeight) {
          let y = oxRepeatY
          while (y < canvasHeight) {
            drawImage(ctx, image, {
              ...drawOpt,
              x,
              y
            })
            y += imgHeight
          }
        }
        x += imgWidth
      }
      return true
    }
  }
}

// 根据参数绘制图片
const drawImage = (ctx, image, drawOpt) => {
  ctx.drawImage(
    image,
    drawOpt.sx,
    drawOpt.sy,
    drawOpt.swidth,
    drawOpt.sheight,
    drawOpt.x,
    drawOpt.y,
    drawOpt.width,
    drawOpt.height
  )
}

const drawBackgroundImageToCanvas = (
  ctx,
  width,
  height,
  img,
  { backgroundSize, backgroundPosition, backgroundRepeat },
  callback = () => {}
) => {
  // 画布的长宽比
  let canvasRatio = width / height
  // 加载图片
  let image = new Image()
  image.src = img
  image.onload = () => {
    // 图片的宽度及长宽比
    let imgWidth = image.width
    let imgHeight = image.height
    let imageRatio = imgWidth / imgHeight
    // 绘制图片
    // drawImage方法的参数值
    let drawOpt = {
      sx: 0,
      sy: 0,
      swidth: imgWidth,
      sheight: imgHeight,
      x: 0,
      y: 0,
      width: imgWidth,
      height: imgHeight
    }
    // 模拟background-size
    handleBackgroundSize({
      backgroundSize,
      drawOpt,
      imageRatio,
      canvasWidth: width,
      canvasHeight: height,
      canvasRatio
    })

    // 模拟background-position
    handleBackgroundPosition({
      backgroundPosition,
      drawOpt,
      imgWidth: drawOpt.width,
      imgHeight: drawOpt.height,
      imageRatio,
      canvasWidth: width,
      canvasHeight: height,
      canvasRatio
    })

    // 模拟background-repeat
    let notNeedDraw = handleBackgroundRepeat({
      ctx,
      image,
      backgroundRepeat,
      drawOpt,
      imgWidth: drawOpt.width,
      imgHeight: drawOpt.height,
      imageRatio,
      canvasWidth: width,
      canvasHeight: height,
      canvasRatio
    })

    //  绘制图片
    if (!notNeedDraw) {
      drawImage(ctx, image, drawOpt)
    }

    callback()
  }
  image.onerror = e => {
    callback(e)
  }
}

export default drawBackgroundImageToCanvas
