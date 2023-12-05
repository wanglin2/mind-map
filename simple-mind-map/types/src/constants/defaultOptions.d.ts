export namespace defaultOpt {
    const readonly: boolean;
    const layout: string;
    const fishboneDeg: number;
    const theme: string;
    const themeConfig: {};
    const scaleRatio: number;
    const mouseScaleCenterUseMousePosition: boolean;
    const maxTag: number;
    const expandBtnSize: number;
    const imgTextMargin: number;
    const textContentMargin: number;
    const selectTranslateStep: number;
    const selectTranslateLimit: number;
    const customNoteContentShow: any;
    const enableFreeDrag: boolean;
    namespace watermarkConfig {
        const text: string;
        const lineSpacing: number;
        const textSpacing: number;
        const angle: number;
        namespace textStyle {
            const color: string;
            const opacity: number;
            const fontSize: number;
        }
    }
    const textAutoWrapWidth: number;
    const customHandleMousewheel: any;
    const mousewheelAction: string;
    const mousewheelMoveStep: number;
    const mousewheelZoomActionReverse: boolean;
    const defaultInsertSecondLevelNodeText: string;
    const defaultInsertBelowSecondLevelNodeText: string;
    namespace expandBtnStyle {
        const color_1: string;
        export { color_1 as color };
        export const fill: string;
        const fontSize_1: number;
        export { fontSize_1 as fontSize };
        export const strokeColor: string;
    }
    namespace expandBtnIcon {
        const open: string;
        const close: string;
    }
    function expandBtnNumHandler(num: any): any;
    const isShowExpandNum: boolean;
    const enableShortcutOnlyWhenMouseInSvg: boolean;
    const initRootNodePosition: any;
    const exportPaddingX: number;
    const exportPaddingY: number;
    const nodeTextEditZIndex: number;
    const nodeNoteTooltipZIndex: number;
    const isEndNodeTextEditOnClickOuter: boolean;
    const maxHistoryCount: number;
    const alwaysShowExpandBtn: boolean;
    const iconList: any[];
    const maxNodeCacheCount: number;
    const defaultAssociativeLineText: string;
    const fitPadding: number;
    const enableCtrlKeyNodeSelection: boolean;
    const useLeftKeySelectionRightKeyDrag: boolean;
    const beforeTextEdit: any;
    const isUseCustomNodeContent: boolean;
    const customCreateNodeContent: any;
    const customInnerElsAppendTo: any;
    const nodeDragPlaceholderMaxSize: number;
    const enableAutoEnterTextEditWhenKeydown: boolean;
    const richTextEditFakeInPlace: boolean;
    const customHandleClipboardText: any;
    const disableMouseWheelZoom: boolean;
    const disableTouchZoom: boolean;
    function errorHandler(code: any, error: any): void;
    const resetCss: string;
    const enableDblclickBackToRootNode: boolean;
    const minExportImgCanvasScale: number;
    const hoverRectColor: string;
    const hoverRectPadding: number;
    const selectTextOnEnterEditText: boolean;
    const deleteNodeActive: boolean;
    const autoMoveWhenMouseInEdgeOnDrag: boolean;
    const fit: boolean;
    namespace dragMultiNodeRectConfig {
        export const width: number;
        export const height: number;
        const fill_1: string;
        export { fill_1 as fill };
    }
    const dragPlaceholderRectFill: string;
    namespace dragOpacityConfig {
        const cloneNodeOpacity: number;
        const beingDragNodeOpacity: number;
    }
    const tagsColorMap: {};
    namespace cooperateStyle {
        export const avatarSize: number;
        const fontSize_2: number;
        export { fontSize_2 as fontSize };
    }
    const associativeLineIsAlwaysAboveNode: boolean;
    const defaultGeneralizationText: string;
    const handleIsSplitByWrapOnPasteCreateNewNode: any;
    const addHistoryTime: number;
    const isDisableDrag: boolean;
    namespace highlightNodeBoxStyle {
        export const stroke: string;
        const fill_2: string;
        export { fill_2 as fill };
    }
    const createNewNodeBehavior: string;
}
