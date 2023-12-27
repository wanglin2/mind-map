// import JsPDF from '../utils/jspdf'

//  导出PDF插件，需要通过Export插件使用
let jsPDF = null
class ExportPDF {
  //  构造函数
  constructor(opt) {
    import('jspdf').then((res) => {
      jsPDF = res.jsPDF
      this.mindMap = opt.mindMap
    })
  }

  //  导出为pdf
  async pdf(name, img) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        const imageWidth = image.width
        const imageHeight = image.height
        const pdf = new jsPDF({
          unit: 'px',
          format: [imageWidth, imageHeight],
          compress: true,
          hotfixes: ['px_scaling'],
          orientation: imageWidth > imageHeight ? 'landscape' : 'portrait'
        })
        pdf.addImage(img, 'PNG', 0, 0, imageWidth, imageHeight)
        pdf.save(name)
        resolve()
      }
      image.onerror = e => {
        reject(e)
      }
      image.src = img
    })
  }
}

ExportPDF.instanceName = 'doExportPDF'

export default ExportPDF
