import {
  imgToDataUrl,
  downloadFile,
  readBlob,
  removeHTMLEntities,
  resizeImgSize,
  handleSelfCloseTags
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
      addContentToFooter
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
    let isAddResetCss
    if (this.mindMap.richText) {
      const foreignObjectList = svg.find('foreignObject')
      if (foreignObjectList.length > 0) {
        foreignObjectList[0].add(SVG(`<style>${resetCss}</style>`))
        isAddResetCss = true
      }
    }
    // svg节点内容有变，需要重新获取html字符串
    if (taskList.length > 0 || isAddResetCss) {
      svgHTML = svg.svg()
    }
    return {
      node: svg,
      str: svgHTML,
      clipData
    }
  }

  //   svg转png
  svgToPng(svgSrc, transparent, clipData = null) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas')
          const dpr = Math.max(
            window.devicePixelRatio,
            this.mindMap.opt.minExportImgCanvasScale
          )
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
          // 检查是否超出canvas支持的像素上限
          const maxSize = 16384 / dpr
          const maxArea = maxSize * maxSize
          if (imgWidth * imgHeight > maxArea) {
            let newWidth = null
            let newHeight = null
            if (imgWidth > maxSize) {
              newWidth = maxArea / imgHeight
            } else if (imgHeight > maxSize) {
              newHeight = maxArea / imgWidth
            }
            const res = resizeImgSize(imgWidth, imgHeight, newWidth, newHeight)
            imgWidth = res[0]
            imgHeight = res[1]
          }
          canvas.width = imgWidth * dpr
          canvas.height = imgHeight * dpr
          canvas.style.width = imgWidth + 'px'
          canvas.style.height = imgHeight + 'px'
          const ctx = canvas.getContext('2d')
          ctx.scale(dpr, dpr)
          // 绘制背景
          if (!transparent) {
            await this.drawBackgroundToCanvas(ctx, imgWidth, imgHeight)
          }
          // 图片绘制到canvas里
          // 如果有裁减数据，那么需要进行裁减
          if (clipData) {
            ctx.drawImage(
              img,
              clipData.left,
              clipData.top,
              clipData.width,
              clipData.height,
              paddingX,
              paddingY,
              clipData.width,
              clipData.height
            )
          } else {
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
          }
          resolve(canvas.toDataURL())
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

  //  导出为png
  /**
   * 方法1.把svg的图片都转化成data:url格式，再转换
   * 方法2.把svg的图片提取出来再挨个绘制到canvas里，最后一起转换
   */
  async png(name, transparent = false, node = null) {
    this.handleNodeExport(node)
    const { str, clipData } = await this.getSvgData(node)
    const svgUrl = await this.fixSvgStrAndToBlob(str)
    const res = await this.svgToPng(svgUrl, transparent, clipData)
    return res
  }

  // 导出指定节点，如果该节点是激活状态，那么取消激活和隐藏展开收起按钮
  handleNodeExport(node) {
    if (node && node.getData('isActive')) {
      node.deactivate()
      if (!this.mindMap.opt.alwaysShowExpandBtn && node.getData('expand')) {
        node.removeExpandBtn()
      }
    }
  }

  //  导出为pdf
  async pdf(name, transparent = false) {
    if (!this.mindMap.doExportPDF) {
      throw new Error('请注册ExportPDF插件')
    }
    const img = await this.png(name, transparent)
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
