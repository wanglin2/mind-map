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
import { a4Size } from '../constants/constant'

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
      if (isDownload && type !== 'pdf') {
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
  async getSvgData() {
    let { exportPaddingX, exportPaddingY } = this.mindMap.opt
    let { svg, svgHTML } = this.mindMap.getSvgData({
      paddingX: exportPaddingX,
      paddingY: exportPaddingY
    })
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
    await Promise.all(taskList)
    // 开启了节点富文本编辑，需要增加一些样式
    let isAddResetCss
    if (this.mindMap.richText) {
      const foreignObjectList = svg.find('foreignObject')
      if (foreignObjectList.length > 0) {
        foreignObjectList[0].add(
          SVG(`<style>${this.mindMap.opt.resetCss}</style>`)
        )
        isAddResetCss = true
      }
    }
    // svg节点内容有变，需要重新获取html字符串
    if (taskList.length > 0 || isAddResetCss) {
      svgHTML = svg.svg()
    }
    return {
      node: svg,
      str: svgHTML
    }
  }

  //   svg转png
  svgToPng(
    svgSrc,
    transparent,
    checkRotate = () => {
      return false
    },
    compress
  ) {
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
          // 压缩图片
          if (compress) {
            const compressedSize = resizeImgSize(
              imgWidth,
              imgHeight,
              compress.width,
              compress.height
            )
            imgWidth = compressedSize[0]
            imgHeight = compressedSize[1]
          }
          // 如果宽比高长，那么旋转90度
          const needRotate = checkRotate(imgWidth, imgHeight)
          if (needRotate) {
            canvas.width = imgHeight * dpr
            canvas.height = imgWidth * dpr
            canvas.style.width = imgHeight + 'px'
            canvas.style.height = imgWidth + 'px'
          } else {
            canvas.width = imgWidth * dpr
            canvas.height = imgHeight * dpr
            canvas.style.width = imgWidth + 'px'
            canvas.style.height = imgHeight + 'px'
          }
          const ctx = canvas.getContext('2d')
          ctx.scale(dpr, dpr)
          if (needRotate) {
            ctx.rotate(0.5 * Math.PI)
            ctx.translate(0, -imgHeight)
          }
          // 绘制背景
          if (!transparent) {
            await this.drawBackgroundToCanvas(ctx, imgWidth, imgHeight)
          }
          // 图片绘制到canvas里
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
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
  async png(name, transparent = false, checkRotate, compress) {
    const { str } = await this.getSvgData()
    const svgUrl = await this.fixSvgStrAndToBlob(str)
    // 绘制到canvas上
    const res = await this.svgToPng(svgUrl, transparent, checkRotate, compress)
    return res
  }

  //  导出为pdf
  async pdf(name, useMultiPageExport, maxImageWidth) {
    if (!this.mindMap.doExportPDF) {
      throw new Error('请注册ExportPDF插件')
    }
    const img = await this.png(
      '',
      false,
      (width, height) => {
        if (width <= a4Size.width && height && a4Size.height) return false
        return width / height > 1
      },
      {
        width: maxImageWidth || a4Size.width * 2
      }
    )
    await this.mindMap.doExportPDF.pdf(name, img, useMultiPageExport)
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
}

Export.instanceName = 'doExport'

export default Export
