import JsPDF from '../utils/jspdf'
import { a4Size } from '../constants/constant'

//  导出PDF插件，需要通过Export插件使用
class ExportPDF {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
  }

  //  导出为pdf
  async pdf(name, img, useMultiPageExport = false) {
    if (useMultiPageExport) {
      await this.multiPageExport(name, img)
    } else {
      await this.onePageExport(name, img)
    }
  }

  // 单页导出
  onePageExport(name, img) {
    return new Promise((resolve, reject) => {
      let pdf = new JsPDF('', 'pt', 'a4')
      let a4Ratio = a4Size.width / a4Size.height
      let image = new Image()
      image.onload = () => {
        let imageWidth = image.width
        let imageHeight = image.height
        let imageRatio = imageWidth / imageHeight
        let w, h
        if (imageWidth <= a4Size.width && imageHeight <= a4Size.height) {
          // 使用图片原始宽高
          w = imageWidth
          h = imageHeight
        } else if (a4Ratio > imageRatio) {
          // 以a4Height为高度，缩放图片宽度
          w = imageRatio * a4Size.height
          h = a4Size.height
        } else {
          // 以a4Width为宽度，缩放图片高度
          w = a4Size.width
          h = a4Size.width / imageRatio
        }
        pdf.addImage(
          img,
          'PNG',
          (a4Size.width - w) / 2,
          (a4Size.height - h) / 2,
          w,
          h
        )
        pdf.save(name)
        resolve()
      }
      image.onerror = e => {
        reject(e)
      }
      image.src = img
    })
  }

  // 多页导出
  multiPageExport(name, img) {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = () => {
        let imageWidth = image.width
        let imageHeight = image.height
        // 一页pdf显示高度
        let pageHeight = (imageWidth / a4Size.width) * a4Size.height
        // 未生成pdf的高度
        let leftHeight = imageHeight
        // 偏移
        let position = 0
        // a4纸的尺寸[595.28,841.89]，图片在pdf中图片的宽高
        let imgWidth = a4Size.width
        let imgHeight = (a4Size.width / imageWidth) * imageHeight
        let pdf = new JsPDF('', 'pt', 'a4')
        // 有两个高度需要区分，一个是图片的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(
            img,
            'PNG',
            (a4Size.width - imgWidth) / 2,
            (a4Size.height - imgHeight) / 2,
            imgWidth,
            imgHeight
          )
        } else {
          // 分页
          while (leftHeight > 0) {
            pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= a4Size.height
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(name)
        resolve()
      }
      image.onerror = (e) => {
        reject(e)
      }
      image.src = img
    })
  }
}

ExportPDF.instanceName = 'doExportPDF'

export default ExportPDF
