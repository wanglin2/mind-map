export namespace defaultOpt {
    let readonly: boolean;
    let layout: string;
    let fishboneDeg: number;
    let theme: string;
    let themeConfig: {};
    let scaleRatio: number;
    let mouseScaleCenterUseMousePosition: boolean;
    let maxTag: number;
    let expandBtnSize: number;
    let imgTextMargin: number;
    let textContentMargin: number;
    let selectTranslateStep: number;
    let selectTranslateLimit: number;
    let customNoteContentShow: any;
    let enableFreeDrag: boolean;
    namespace watermarkConfig {
        let text: string;
        let lineSpacing: number;
        let textSpacing: number;
        let angle: number;
        namespace textStyle {
            let color: string;
            let opacity: number;
            let fontSize: number;
        }
    }
    let textAutoWrapWidth: number;
    let customHandleMousewheel: any;
    let mousewheelAction: string;
    let mousewheelMoveStep: number;
    let mousewheelZoomActionReverse: boolean;
    let defaultInsertSecondLevelNodeText: string;
    let defaultInsertBelowSecondLevelNodeText: string;
    namespace expandBtnStyle {
        let color_1: string;
        export { color_1 as color };
        export let fill: string;
        let fontSize_1: number;
        export { fontSize_1 as fontSize };
        export let strokeColor: string;
    }
    namespace expandBtnIcon {
        let open: string;
        let close: string;
    }
    function expandBtnNumHandler(num: any): any;
    let isShowExpandNum: boolean;
    let enableShortcutOnlyWhenMouseInSvg: boolean;
    let initRootNodePosition: any;
    let exportPaddingX: number;
    let exportPaddingY: number;
    let nodeTextEditZIndex: number;
    let nodeNoteTooltipZIndex: number;
    let isEndNodeTextEditOnClickOuter: boolean;
    let maxHistoryCount: number;
    let alwaysShowExpandBtn: boolean;
    let iconList: any[];
    let maxNodeCacheCount: number;
    let defaultAssociativeLineText: string;
    let fitPadding: number;
    let enableCtrlKeyNodeSelection: boolean;
    let useLeftKeySelectionRightKeyDrag: boolean;
    let beforeTextEdit: any;
    let isUseCustomNodeContent: boolean;
    let customCreateNodeContent: any;
    let customInnerElsAppendTo: any;
    let nodeDragPlaceholderMaxSize: number;
    let enableAutoEnterTextEditWhenKeydown: boolean;
    let richTextEditFakeInPlace: boolean;
    let customHandleClipboardText: any;
    let disableMouseWheelZoom: boolean;
    function errorHandler(code: any, error: any): void;
    let resetCss: string;
    let enableDblclickReset: boolean;
    let minExportImgCanvasScale: number;
    let hoverRectColor: string;
    let hoverRectPadding: number;
    let selectTextOnEnterEditText: boolean;
    let deleteNodeActive: boolean;
    let autoMoveWhenMouseInEdgeOnDrag: boolean;
    let fit: boolean;
    namespace dragMultiNodeRectConfig {
        export let width: number;
        export let height: number;
        let fill_1: string;
        export { fill_1 as fill };
    }
    let dragPlaceholderRectFill: string;
    namespace dragOpacityConfig {
        let cloneNodeOpacity: number;
        let beingDragNodeOpacity: number;
    }
    let tagsColorMap: {};
}
