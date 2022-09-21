import { imgToDataUrl, downloadFile } from './utils'
import JsPDF from 'jspdf'
import {
    SVG,
} from '@svgdotjs/svg.js'
const URL = window.URL || window.webkitURL || window

/** 
 * @Author: 王林 
 * @Date: 2021-07-01 22:05:16 
 * @Desc: 导出类 
 */
class Export {
    /** 
     * @Author: 王林 
     * @Date: 2021-07-01 22:05:42 
     * @Desc: 构造函数 
     */
    constructor(opt) {
        this.mindMap = opt.mindMap
        this.exportPadding = this.mindMap.opt.exportPadding
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-02 07:44:06 
     * @Desc: 导出 
     */
    async export(type, isDownload = true, name = '思维导图', ...args) {
        if (this[type]) {
            let result = await this[type](name, ...args)
            if (isDownload && type !== 'pdf') {
                downloadFile(result, name + '.' + type)
            }
            return result
        } else {
            return null
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 14:57:40 
     * @Desc: 获取svg数据 
     */
    async getSvgData() {
        const svg = this.mindMap.svg
        const draw = this.mindMap.draw
        // 保存原始信息
        const origWidth = svg.width()
        const origHeight = svg.height()
        const origTransform = draw.transform()
        const elRect = this.mindMap.el.getBoundingClientRect()
        // 去除放大缩小的变换效果
        draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY)
        // 获取变换后的位置尺寸信息，其实是getBoundingClientRect方法的包装方法
        const rect = draw.rbox()
        // 将svg设置为实际内容的宽高
        svg.size(rect.width, rect.height)
        // 把实际内容变换
        draw.translate(-rect.x + elRect.left, -rect.y + elRect.top)
        // 克隆一份数据
        const clone = svg.clone()
        // 恢复原先的大小和变换信息
        svg.size(origWidth, origHeight)
        draw.transform(origTransform)
        // 把图片的url转换成data:url类型，否则导出会丢失图片
        let imageList = clone.find('image')
        let task = imageList.map(async (item) => {
            let imgUlr = item.attr('href') || item.attr('xlink:href')
            let imgData = await imgToDataUrl(imgUlr)
            item.attr('href', imgData)
        })
        await Promise.all(task)
        return {
            node: clone,
            str: clone.svg()
        }
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 15:25:19 
     * @Desc:  svg转png
     */
    svgToPng(svgSrc) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片
            img.setAttribute('crossOrigin', 'anonymous')
            img.onload = async () => {
                try {
                    let canvas = document.createElement('canvas')
                    canvas.width = img.width + this.exportPadding * 2
                    canvas.height = img.height + this.exportPadding * 2
                    let ctx = canvas.getContext('2d')
                    // 绘制背景
                    await this.drawBackgroundToCanvas(ctx, canvas.width, canvas.height)
                    // 图片绘制到canvas里
                    ctx.drawImage(img, 0, 0, img.width, img.height, this.exportPadding, this.exportPadding, img.width, img.height)
                    resolve(canvas.toDataURL())
                } catch (error) {
                    reject(error)
                }
            }
            img.onerror = (e) => {
                reject(e)
            }
            img.src = svgSrc
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 15:32:07 
     * @Desc: 在canvas上绘制思维导图背景
     */
    drawBackgroundToCanvas(ctx, width, height) {
        return new Promise((resolve, rejct) => {
            let { backgroundColor = '#fff', backgroundImage, backgroundRepeat = "repeat" } = this.mindMap.themeConfig
            // 背景颜色
            ctx.save()
            ctx.rect(0, 0, width, height)
            ctx.fillStyle = backgroundColor
            ctx.fill()
            ctx.restore()
            // 背景图片
            if (backgroundImage && backgroundImage !== 'none') {
                ctx.save()
                let img = new Image()
                img.src = backgroundImage
                img.onload = () => {
                    let pat = ctx.createPattern(img, backgroundRepeat)
                    ctx.rect(0, 0, width, height)
                    ctx.fillStyle = pat
                    ctx.fill()
                    ctx.restore()
                    resolve()
                }
                img.onerror = (e) => {
                    rejct(e)
                }
            } else {
                resolve()
            }
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-01 22:09:51 
     * @Desc: 导出为png 
     * 方法1.把svg的图片都转化成data:url格式，再转换
     * 方法2.把svg的图片提取出来再挨个绘制到canvas里，最后一起转换
     */
    async png() {
        let { str } = await this.getSvgData()
        // 转换成blob数据
        let blob = new Blob([str], {
            type: 'image/svg+xml'
        })
        // 转换成data:url数据
        let svgUrl = URL.createObjectURL(blob)
        // 绘制到canvas上
        let imgDataUrl = await this.svgToPng(svgUrl)
        URL.revokeObjectURL(svgUrl)
        return imgDataUrl
    }

    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-08 19:23:08 
     * @Desc: 导出为pdf 
     */
    async pdf(name) {
        let img = await this.png()
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

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 15:32:07 
     * @Desc: 在svg上绘制思维导图背景
     */
    drawBackgroundToSvg(svg) {
        return new Promise(async (resolve, rejct) => {
            let { backgroundColor = '#fff', backgroundImage, backgroundRepeat = "repeat" } = this.mindMap.themeConfig
            // 背景颜色
            svg.css('background-color', backgroundColor)
            // 背景图片
            if (backgroundImage && backgroundImage !== 'none') {
                let imgDataUrl = await imgToDataUrl(backgroundImage)
                svg.css('background-image', `url(${imgDataUrl})`)
                svg.css('background-repeat', backgroundRepeat)
                resolve()
            } else {
                resolve()
            }
        })
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 14:54:07 
     * @Desc: 导出为svg 
     */
    async svg(name) {
        let { node } = await this.getSvgData()
        node.first().before(SVG(`<title>${name}</title>`))
        await this.drawBackgroundToSvg(node)
        let str = node.svg()
        // 转换成blob数据
        let blob = new Blob([str], {
            type: 'image/svg+xml'
        })
        return URL.createObjectURL(blob)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 22:19:17 
     * @Desc: 导出为json 
     */
    json (name, withConfig = true) {
        let nodeData = this.mindMap.command.getCopyData()
        let data = {}
        if (withConfig) {
            data = {
                layout: this.mindMap.getLayout(),
                root: nodeData,
                theme: {
                    template: this.mindMap.getTheme(),
                    config: this.mindMap.getCustomThemeConfig()
                },
                view: this.mindMap.view.getTransformData()
            }
        } else {
            data = nodeData
        }
        let str = JSON.stringify(data)
        let blob = new Blob([str])
        return URL.createObjectURL(blob)
    }

    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 22:24:24 
     * @Desc: 专有文件，其实就是json文件 
     */
    smm (name, withConfig) {
        return this.json(name, withConfig);
    }
}

export default Export
