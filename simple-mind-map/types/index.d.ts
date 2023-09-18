export default MindMap
declare class MindMap {
  /**
   *
   * @param {defaultOpt} opt
   */
  constructor(opt?: {
    readonly: boolean
    layout: string
    fishboneDeg: number
    theme: string
    themeConfig: {}
    scaleRatio: number
    mouseScaleCenterUseMousePosition: boolean
    maxTag: number
    expandBtnSize: number
    imgTextMargin: number
    textContentMargin: number
    selectTranslateStep: number
    selectTranslateLimit: number
    customNoteContentShow: any
    enableFreeDrag: boolean
    watermarkConfig: {
      text: string
      lineSpacing: number
      textSpacing: number
      angle: number
      textStyle: {
        color: string
        opacity: number
        fontSize: number
      }
    }
    textAutoWrapWidth: number
    customHandleMousewheel: any
    mousewheelAction: string
    mousewheelMoveStep: number
    mousewheelZoomActionReverse: boolean
    defaultInsertSecondLevelNodeText: string
    defaultInsertBelowSecondLevelNodeText: string
    expandBtnStyle: {
      color: string
      fill: string
      fontSize: number
      strokeColor: string
    }
    expandBtnIcon: {
      open: string
      close: string
    }
    expandBtnNumHandler: (num: any) => any
    isShowExpandNum: boolean
    enableShortcutOnlyWhenMouseInSvg: boolean
    initRootNodePosition: any
    exportPaddingX: number
    exportPaddingY: number
    nodeTextEditZIndex: number
    nodeNoteTooltipZIndex: number
    isEndNodeTextEditOnClickOuter: boolean
    maxHistoryCount: number
    alwaysShowExpandBtn: boolean
    iconList: any[]
    maxNodeCacheCount: number
    defaultAssociativeLineText: string
    fitPadding: number
    enableCtrlKeyNodeSelection: boolean
    useLeftKeySelectionRightKeyDrag: boolean
    beforeTextEdit: any
    isUseCustomNodeContent: boolean
    customCreateNodeContent: any
    customInnerElsAppendTo: any
    nodeDragPlaceholderMaxSize: number
    enableAutoEnterTextEditWhenKeydown: boolean
    richTextEditFakeInPlace: boolean
    customHandleClipboardText: any
    disableMouseWheelZoom: boolean
    errorHandler: (code: any, error: any) => void
    resetCss: string
    enableDblclickReset: boolean
    minExportImgCanvasScale: number
    hoverRectColor: string
    hoverRectPadding: number
    selectTextOnEnterEditText: boolean
    deleteNodeActive: boolean
    autoMoveWhenMouseInEdgeOnDrag: boolean
  })
  opt: any
  el: any
  elRect: any
  width: any
  height: any
  cssEl: HTMLStyleElement
  svg: any
  draw: any
  event: Event
  keyCommand: KeyCommand
  command: Command
  renderer: Render
  view: View
  batchExecution: BatchExecution
  handleOpt(opt: any): any
  addCss(): void
  removeCss(): void
  render(callback: any, source?: string): void
  reRender(callback: any, source?: string): void
  resize(): void
  on(event: any, fn: any): void
  emit(event: any, ...args: any[]): void
  off(event: any, fn: any): void
  initCache(): void
  initTheme(): void
  themeConfig: any
  setTheme(theme: any): void
  getTheme(): any
  setThemeConfig(config: any): void
  getCustomThemeConfig(): any
  getThemeConfig(prop: any): any
  getConfig(prop: any): any
  updateConfig(opt?: {}): void
  getLayout(): any
  setLayout(layout: any): void
  execCommand(...args: any[]): void
  setData(data: any): void
  setFullData(data: any): void
  getData(withConfig: any): any
  export(...args: any[]): Promise<any>
  toPos(
    x: any,
    y: any
  ): {
    x: number
    y: number
  }
  setMode(mode: any): void
  getSvgData({
    paddingX,
    paddingY
  }?: {
    paddingX?: number
    paddingY?: number
  }): {
    svg: any
    svgHTML: any
    rect: any
    origWidth: any
    origHeight: any
    scaleX: any
    scaleY: any
  }
  addPlugin(plugin: any, opt: any): void
  removePlugin(plugin: any): void
  initPlugin(plugin: any): void
  destroy(): void
}
declare namespace MindMap {
  let pluginList: any[]
  function usePlugin(plugin: any, opt?: {}): typeof MindMap
  function hasPlugin(plugin: any): number
  function defineTheme(name: any, config?: {}): Error
}
import Event from './src/core/event/Event'
import KeyCommand from './src/core/command/KeyCommand'
import Command from './src/core/command/Command'
import Render from './src/core/render/Render'
import View from './src/core/view/View'
import BatchExecution from './src/utils/BatchExecution'
