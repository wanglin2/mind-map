import JsPDF from 'jspdf'

//  导出PDF类，需要通过Export插件使用
class ExportPDF {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
  }

  //  导出为pdf
  pdf(name, img) {
    let pdf = new JsPDF('', 'pt', 'a4')
    let a4Width = 595
    let a4Height = 841
    let a4Ratio = a4Width / a4Height
    let image = new Image()
    image.onload = () => {
      let imageWidth = image.width
      let imageHeight = image.height
      let imageRatio = imageWidth / imageHeight
      let w, h
      if (imageWidth <= a4Width && imageHeight <= a4Height) {
        // 使用图片原始宽高
        w = imageWidth
        h = imageHeight
      } else if (a4Ratio > imageRatio) {
        // 以a4Height为高度，缩放图片宽度
        w = imageRatio * a4Height
        h = a4Height
      } else {
        // 以a4Width为宽度，缩放图片高度
        w = a4Width
        h = a4Width / imageRatio
      }
      pdf.addImage(img, 'PNG', (a4Width - w) / 2, (a4Height - h) / 2, w, h)
      pdf.save(name)
    }
    image.src = img
  }
}

ExportPDF.instanceName = 'doExportPDF'

export default ExportPDF
