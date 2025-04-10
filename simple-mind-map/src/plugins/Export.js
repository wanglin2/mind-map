import {
  imgToDataUrl,
  downloadFile,
  readBlob,
  removeHTMLEntities,
  resizeImgSize,
  handleSelfCloseTags,
  addXmlns
} from '../utils'
import { SVG } from '@svgdotjs/svg.js'
import drawBackgroundImageToCanvas from '../utils/simulateCSSBackgroundInCanvas'
import { transformToMarkdown } from '../parse/toMarkdown'
import { ERROR_TYPES } from '../constants/constant'
import { transformToTxt } from '../parse/toTxt'

//  导出插件
class Export {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
  }

  //  导出
  async export(type, isDownload = true, name = '思维导图', ...args) {
    if (this[type]) {
      const result = await this[type](name, ...args)
      if (isDownload) {
        downloadFile(result, name + '.' + type)
      }
      return result
    } else {
      return null
    }
  }

  // 创建图片url转换任务
  createTransformImgTaskList(svg, tagName, propName, getUrlFn) {
    const imageList = svg.find(tagName)
    return imageList.map(async item => {
      const imgUlr = getUrlFn(item)
      // 已经是data:URL形式不用转换
      if (/^data:/.test(imgUlr) || imgUlr === 'none') {
        return
      }
      const imgData = await imgToDataUrl(imgUlr)
      item.attr(propName, imgData)
    })
  }

  //  获取svg数据
  async getSvgData(node) {
    let {
      exportPaddingX,
      exportPaddingY,
      errorHandler,
      resetCss,
      addContentToHeader,
      addContentToFooter,
      handleBeingExportSvg
    } = this.mindMap.opt
    let { svg, svgHTML, clipData } = this.mindMap.getSvgData({
      paddingX: exportPaddingX,
      paddingY: exportPaddingY,
      addContentToHeader,
      addContentToFooter,
      node
    })
    if (clipData) {
      clipData.paddingX = exportPaddingX
      clipData.paddingY = exportPaddingY
    }
    let svgIsChange = false
    // svg的image标签，把图片的url转换成data:url类型，否则导出会丢失图片
    const task1 = this.createTransformImgTaskList(
      svg,
      'image',
      'href',
      item => {
        return item.attr('href') || item.attr('xlink:href')
      }
    )
    // html的img标签
    const task2 = this.createTransformImgTaskList(svg, 'img', 'src', item => {
      return item.attr('src')
    })
    const taskList = [...task1, ...task2]
    try {
      await Promise.all(taskList)
    } catch (error) {
      errorHandler(ERROR_TYPES.EXPORT_LOAD_IMAGE_ERROR, error)
    }
    // 开启了节点富文本编辑，需要增加一些样式
    if (this.mindMap.richText) {
      const foreignObjectList = svg.find('foreignObject')
      if (foreignObjectList.length > 0) {
        foreignObjectList[0].add(SVG(`<style>${resetCss}</style>`))
        svgIsChange = true
      }
      // 如果还开启了数学公式，还要插入katex库的样式
      if (this.mindMap.formula) {
        const formulaList = svg.find('.ql-formula')
        if (formulaList.length > 0) {
          const styleText = this.mindMap.formula.getStyleText()
          if (styleText) {
            const styleEl = document.createElement('style')
            styleEl.innerHTML = styleText
            addXmlns(styleEl)
            foreignObjectList[0].add(styleEl)
            svgIsChange = true
          }
        }
      }
    }
    // 自定义处理svg的方法
    if (typeof handleBeingExportSvg === 'function') {
      svgIsChange = true
      svg = handleBeingExportSvg(svg)
    }
    // svg节点内容有变，需要重新获取html字符串
    if (taskList.length > 0 || svgIsChange) {
      svgHTML = svg.svg()
    }
    return {
      node: svg,
      str: svgHTML,
      clipData
    }
  }

  //   svg转png
  svgToPng(
    svgSrc,
    transparent,
    clipData = null,
    fitBg = false,
    format = 'image/png'
  ) {
    const { maxCanvasSize, minExportImgCanvasScale } = this.mindMap.opt
    return new Promise((resolve, reject) => {
      const img = new Image()
      // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas')
          const dpr = Math.max(window.devicePixelRatio, minExportImgCanvasScale)
          // 图片原始大小
          let imgWidth = img.width
          let imgHeight = img.height
          // 如果是裁减操作的话，那么需要手动添加内边距，及调整图片大小为实际的裁减区域的大小，不要忘了内边距哦
          let paddingX = 0
          let paddingY = 0
          if (clipData) {
            paddingX = clipData.paddingX
            paddingY = clipData.paddingY
            imgWidth = clipData.width + paddingX * 2
            imgHeight = clipData.height + paddingY * 2
          }
          // 适配背景图片的大小
          let fitBgImgWidth = 0
          let fitBgImgHeight = 0
          const { backgroundImage } = this.mindMap.themeConfig
          if (fitBg && backgroundImage && !transparent) {
            const bgImgSize = await new Promise(resolve => {
              const bgImg = new Image()
              bgImg.onload = () => {
                resolve([bgImg.width, bgImg.height])
              }
              bgImg.onerror = () => {
                resolve(null)
              }
              bgImg.src = backgroundImage
            })
            if (bgImgSize) {
              const imgRatio = imgWidth / imgHeight
              const bgRatio = bgImgSize[0] / bgImgSize[1]
              if (imgRatio > bgRatio) {
                fitBgImgWidth = imgWidth
                fitBgImgHeight = imgWidth / bgRatio
              } else {
                fitBgImgHeight = imgHeight
                fitBgImgWidth = imgHeight * bgRatio
              }
            }
          }
          // 检查是否超出canvas支持的像素上限
          // canvas大小需要乘以dpr
          let scaleX = 1
          let scaleY = 1
          let canvasWidth = (fitBgImgWidth || imgWidth) * dpr
          let canvasHeight = (fitBgImgHeight || imgHeight) * dpr
          if (canvasWidth > maxCanvasSize || canvasHeight > maxCanvasSize) {
            let newWidth = null
            let newHeight = null
            if (canvasWidth > maxCanvasSize) {
              // 如果宽度超出限制，那么调整为上限值
              newWidth = maxCanvasSize
            } else if (canvasHeight > maxCanvasSize) {
              // 高度同理
              newHeight = maxCanvasSize
            }
            // 计算缩放后的宽高
            const res = resizeImgSize(
              canvasWidth,
              canvasHeight,
              newWidth,
              newHeight
            )
            scaleX = res[0] / canvasWidth
            scaleY = res[1] / canvasHeight
            canvasWidth = res[0]
            canvasHeight = res[1]
          }
          canvas.width = canvasWidth
          canvas.height = canvasHeight
          const styleWidth = canvasWidth / dpr
          const styleHeight = canvasHeight / dpr
          // canvas元素实际上的大小
          canvas.style.width = styleWidth + 'px'
          canvas.style.height = styleHeight + 'px'
          const ctx = canvas.getContext('2d')
          ctx.scale(dpr, dpr)
          // 绘制背景
          if (!transparent) {
            await this.drawBackgroundToCanvas(ctx, styleWidth, styleHeight)
          }
          // 图片绘制到canvas里
          // 如果有裁减数据，那么需要进行裁减
          const fitBgLeft =
            (fitBgImgWidth > 0 ? (fitBgImgWidth - imgWidth) / 2 : 0) * scaleX
          const fitBgTop =
            (fitBgImgHeight > 0 ? (fitBgImgHeight - imgHeight) / 2 : 0) * scaleY
          if (clipData) {
            ctx.drawImage(
              img,
              clipData.left,
              clipData.top,
              clipData.width,
              clipData.height,
              paddingX * scaleX + fitBgLeft,
              paddingY * scaleY + fitBgTop,
              clipData.width * scaleX,
              clipData.height * scaleY
            )
          } else {
            ctx.drawImage(
              img,
              fitBgLeft,
              fitBgTop,
              imgWidth * scaleX,
              imgHeight * scaleY
            )
          }
          resolve(canvas.toDataURL(format))
        } catch (error) {
          reject(error)
        }
      }
      img.onerror = e => {
        reject(e)
      }
      img.src = svgSrc
    })
  }

  //  在canvas上绘制思维导图背景
  drawBackgroundToCanvas(ctx, width, height) {
    return new Promise((resolve, reject) => {
      const {
        backgroundColor = '#fff',
        backgroundImage,
        backgroundRepeat = 'no-repeat',
        backgroundPosition = 'center center',
        backgroundSize = 'cover'
      } = this.mindMap.themeConfig
      // 背景颜色
      ctx.save()
      ctx.rect(0, 0, width, height)
      ctx.fillStyle = backgroundColor
      ctx.fill()
      ctx.restore()
      // 背景图片
      if (backgroundImage && backgroundImage !== 'none') {
        ctx.save()
        drawBackgroundImageToCanvas(
          ctx,
          width,
          height,
          backgroundImage,
          {
            backgroundRepeat,
            backgroundPosition,
            backgroundSize
          },
          err => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
            ctx.restore()
          }
        )
      } else {
        resolve()
      }
    })
  }

  //  在svg上绘制思维导图背景
  drawBackgroundToSvg(svg) {
    return new Promise(async resolve => {
      const {
        backgroundColor = '#fff',
        backgroundImage,
        backgroundRepeat = 'repeat'
      } = this.mindMap.themeConfig
      // 背景颜色
      svg.css('background-color', backgroundColor)
      // 背景图片
      if (backgroundImage && backgroundImage !== 'none') {
        const imgDataUrl = await imgToDataUrl(backgroundImage)
        svg.css('background-image', `url(${imgDataUrl})`)
        svg.css('background-repeat', backgroundRepeat)
        resolve()
      } else {
        resolve()
      }
    })
  }

  // 导出为指定格式的图片
  async _image(format, name, transparent = false, node = null, fitBg = false) {
    this.mindMap.renderer.textEdit.hideEditTextBox()
    this.handleNodeExport(node)
    const { str, clipData } = await this.getSvgData(node)
    const svgUrl = await this.fixSvgStrAndToBlob(str)
    const res = await this.svgToPng(
      svgUrl,
      transparent,
      clipData,
      fitBg,
      format
    )
    return res
  }

  //  导出为png
  /**
   * 方法1.把svg的图片都转化成data:url格式，再转换
   * 方法2.把svg的图片提取出来再挨个绘制到canvas里，最后一起转换
   */
  async png(...args) {
    const res = await this._image('image/png', ...args)
    return res
  }

  // 导出为jpg
  async jpg(...args) {
    const res = await this._image('image/jpg', ...args)
    return res
  }

  // 导出指定节点，如果该节点是激活状态，那么取消激活和隐藏展开收起按钮
  handleNodeExport(node) {
    if (node && node.getData('isActive')) {
      node.deactivate()
      const { alwaysShowExpandBtn, notShowExpandBtn } = this.mindMap.opt
      if (!alwaysShowExpandBtn && !notShowExpandBtn && node.getData('expand')) {
        node.removeExpandBtn()
      }
    }
  }

  //  导出为pdf
  async pdf(name, transparent = false, fitBg = false) {
    if (!this.mindMap.doExportPDF) {
      throw new Error('请注册ExportPDF插件')
    }
    const img = await this.png(name, transparent, null, fitBg)
    // 使用jspdf库
    // await this.mindMap.doExportPDF.pdf(name, img)
    // 使用pdf-lib库
    const res = await this.mindMap.doExportPDF.pdf(img)
    return res
  }

  // 导出为xmind
  async xmind(name) {
    if (!this.mindMap.doExportXMind) {
      throw new Error('请注册ExportXMind插件')
    }
    const data = this.mindMap.getData()
    const blob = await this.mindMap.doExportXMind.xmind(data, name)
    const res = await readBlob(blob)
    return res
  }

  //  导出为svg
  async svg(name) {
    this.mindMap.renderer.textEdit.hideEditTextBox()
    const { node } = await this.getSvgData()
    node.first().before(SVG(`<title>${name}</title>`))
    await this.drawBackgroundToSvg(node)
    const str = node.svg()
    const res = await this.fixSvgStrAndToBlob(str)
    return res
  }

  // 修复svg字符串，并且转换为blob数据
  async fixSvgStrAndToBlob(str) {
    // 移除字符串中的html实体
    str = removeHTMLEntities(str)
    // 给html自闭合标签添加闭合状态
    str = handleSelfCloseTags(str)
    // 转换成blob数据
    const blob = new Blob([str], {
      type: 'image/svg+xml'
    })
    const res = await readBlob(blob)
    return res
  }

  //  导出为json
  async json(name, withConfig = true) {
    const data = this.mindMap.getData(withConfig)
    const str = JSON.stringify(data)
    const blob = new Blob([str])
    const res = await readBlob(blob)
    return res
  }

  //  专有文件，其实就是json文件
  async smm(name, withConfig) {
    const res = await this.json(name, withConfig)
    return res
  }

  // markdown文件
  async md() {
    const data = this.mindMap.getData()
    const content = transformToMarkdown(data)
    const blob = new Blob([content])
    const res = await readBlob(blob)
    return res
  }

  // txt文件
  async txt() {
    const data = this.mindMap.getData()
    const content = transformToTxt(data)
    const blob = new Blob([content])
    const res = await readBlob(blob)
    return res
  }
}

Export.instanceName = 'doExport'

export default Export
