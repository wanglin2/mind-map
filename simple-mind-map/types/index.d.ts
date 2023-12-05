export default MindMap;
declare class MindMap {
    /**
     *
     * @param {defaultOpt} opt
     */
    constructor(opt?: {
        readonly: boolean;
        layout: string;
        fishboneDeg: number;
        theme: string;
        themeConfig: {};
        scaleRatio: number;
        mouseScaleCenterUseMousePosition: boolean;
        maxTag: number;
        expandBtnSize: number;
        imgTextMargin: number;
        textContentMargin: number;
        selectTranslateStep: number;
        selectTranslateLimit: number;
        customNoteContentShow: any;
        enableFreeDrag: boolean;
        watermarkConfig: {
            text: string;
            lineSpacing: number;
            textSpacing: number;
            angle: number;
            textStyle: {
                color: string;
                opacity: number;
                fontSize: number;
            };
        };
        textAutoWrapWidth: number;
        customHandleMousewheel: any;
        mousewheelAction: string;
        mousewheelMoveStep: number;
        mousewheelZoomActionReverse: boolean;
        defaultInsertSecondLevelNodeText: string;
        defaultInsertBelowSecondLevelNodeText: string;
        expandBtnStyle: {
            color: string;
            fill: string;
            fontSize: number;
            strokeColor: string;
        };
        expandBtnIcon: {
            open: string;
            close: string;
        };
        expandBtnNumHandler: (num: any) => any;
        isShowExpandNum: boolean;
        enableShortcutOnlyWhenMouseInSvg: boolean;
        initRootNodePosition: any;
        exportPaddingX: number;
        exportPaddingY: number;
        nodeTextEditZIndex: number;
        nodeNoteTooltipZIndex: number;
        isEndNodeTextEditOnClickOuter: boolean;
        maxHistoryCount: number;
        alwaysShowExpandBtn: boolean;
        iconList: any[];
        maxNodeCacheCount: number;
        defaultAssociativeLineText: string;
        fitPadding: number;
        enableCtrlKeyNodeSelection: boolean;
        useLeftKeySelectionRightKeyDrag: boolean;
        beforeTextEdit: any;
        isUseCustomNodeContent: boolean;
        customCreateNodeContent: any;
        customInnerElsAppendTo: any;
        nodeDragPlaceholderMaxSize: number;
        enableAutoEnterTextEditWhenKeydown: boolean;
        richTextEditFakeInPlace: boolean;
        customHandleClipboardText: any;
        disableMouseWheelZoom: boolean;
        disableTouchZoom: boolean;
        errorHandler: (code: any, error: any) => void;
        resetCss: string;
        enableDblclickBackToRootNode: boolean;
        minExportImgCanvasScale: number;
        hoverRectColor: string;
        hoverRectPadding: number;
        selectTextOnEnterEditText: boolean;
        deleteNodeActive: boolean;
        autoMoveWhenMouseInEdgeOnDrag: boolean;
        fit: boolean;
        dragMultiNodeRectConfig: {
            width: number;
            height: number;
            fill: string;
        };
        dragPlaceholderRectFill: string;
        dragOpacityConfig: {
            cloneNodeOpacity: number;
            beingDragNodeOpacity: number;
        };
        tagsColorMap: {};
        cooperateStyle: {
            avatarSize: number;
            fontSize: number;
        };
        associativeLineIsAlwaysAboveNode: boolean;
        defaultGeneralizationText: string;
        handleIsSplitByWrapOnPasteCreateNewNode: any;
        addHistoryTime: number;
        isDisableDrag: boolean;
        highlightNodeBoxStyle: {
            stroke: string;
            fill: string;
        };
        createNewNodeBehavior: string;
    });
    opt: any;
    el: any;
    cssEl: HTMLStyleElement;
    event: Event;
    keyCommand: KeyCommand;
    command: Command;
    renderer: Render;
    view: View;
    batchExecution: BatchExecution;
    handleOpt(opt: any): any;
    initContainer(): void;
    associativeLineDraw: any;
    svg: any;
    draw: any;
    lineDraw: any;
    nodeDraw: any;
    otherDraw: any;
    clearDraw(): void;
    addCss(): void;
    removeCss(): void;
    render(callback: any, source?: string): void;
    reRender(callback: any, source?: string): void;
    getElRectInfo(): void;
    elRect: any;
    width: any;
    height: any;
    resize(): void;
    on(event: any, fn: any): void;
    emit(event: any, ...args: any[]): void;
    off(event: any, fn: any): void;
    initCache(): void;
    initTheme(): void;
    themeConfig: any;
    setTheme(theme: any, notRender?: boolean): void;
    getTheme(): any;
    setThemeConfig(config: any, notRender?: boolean): void;
    getCustomThemeConfig(): any;
    getThemeConfig(prop: any): any;
    getConfig(prop: any): any;
    updateConfig(opt?: {}): void;
    getLayout(): any;
    setLayout(layout: any, notRender?: boolean): void;
    execCommand(...args: any[]): void;
    setData(data: any): void;
    setFullData(data: any): void;
    getData(withConfig: any): any;
    export(...args: any[]): Promise<any>;
    toPos(x: any, y: any): {
        x: number;
        y: number;
    };
    setMode(mode: any): void;
    getSvgData({ paddingX, paddingY, ignoreWatermark }?: {
        paddingX?: number;
        paddingY?: number;
        ignoreWatermark?: boolean;
    }): {
        svg: any;
        svgHTML: any;
        rect: any;
        origWidth: any;
        origHeight: any;
        scaleX: any;
        scaleY: any;
    };
    addPlugin(plugin: any, opt: any): void;
    removePlugin(plugin: any): void;
    initPlugin(plugin: any): void;
    destroy(): void;
}
declare namespace MindMap {
    const pluginList: any[];
    function usePlugin(plugin: any, opt?: {}): typeof MindMap;
    function hasPlugin(plugin: any): number;
    function defineTheme(name: any, config?: {}): Error;
}
import Event from "./src/core/event/Event";
import KeyCommand from "./src/core/command/KeyCommand";
import Command from "./src/core/command/Command";
import Render from "./src/core/render/Render";
import View from "./src/core/view/View";
import BatchExecution from "./src/utils/BatchExecution";
