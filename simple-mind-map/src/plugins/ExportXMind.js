import xmind from '../parse/xmind'

//  导出XMind类，需要通过Export插件使用
class ExportXMind {
  //  构造函数
  constructor(opt) {
    this.mindMap = opt.mindMap
  }

  // 导出xmind
  async xmind(data, name) {
    const zipData = await xmind.transformToXmind(data, name)
    return zipData
  }
}

ExportXMind.instanceName = 'doExportXMind'

export default ExportXMind
