export const themeList: {
    name: string;
    value: string;
    dark: boolean;
}[];
export namespace CONSTANTS {
    let CHANGE_THEME: string;
    let CHANGE_LAYOUT: string;
    let SET_DATA: string;
    let TRANSFORM_TO_NORMAL_NODE: string;
    namespace MODE {
        let READONLY: string;
        let EDIT: string;
    }
    namespace LAYOUT {
        let LOGICAL_STRUCTURE: string;
        let MIND_MAP: string;
        let ORGANIZATION_STRUCTURE: string;
        let CATALOG_ORGANIZATION: string;
        let TIMELINE: string;
        let TIMELINE2: string;
        let FISHBONE: string;
        let VERTICAL_TIMELINE: string;
    }
    namespace DIR {
        let UP: string;
        let LEFT: string;
        let DOWN: string;
        let RIGHT: string;
    }
    namespace KEY_DIR {
        let LEFT_1: string;
        export { LEFT_1 as LEFT };
        let UP_1: string;
        export { UP_1 as UP };
        let RIGHT_1: string;
        export { RIGHT_1 as RIGHT };
        let DOWN_1: string;
        export { DOWN_1 as DOWN };
    }
    namespace SHAPE {
        let RECTANGLE: string;
        let DIAMOND: string;
        let PARALLELOGRAM: string;
        let ROUNDED_RECTANGLE: string;
        let OCTAGONAL_RECTANGLE: string;
        let OUTER_TRIANGULAR_RECTANGLE: string;
        let INNER_TRIANGULAR_RECTANGLE: string;
        let ELLIPSE: string;
        let CIRCLE: string;
    }
    namespace MOUSE_WHEEL_ACTION {
        let ZOOM: string;
        let MOVE: string;
    }
    namespace INIT_ROOT_NODE_POSITION {
        let LEFT_2: string;
        export { LEFT_2 as LEFT };
        export let TOP: string;
        let RIGHT_2: string;
        export { RIGHT_2 as RIGHT };
        export let BOTTOM: string;
        export let CENTER: string;
    }
    namespace LAYOUT_GROW_DIR {
        let LEFT_3: string;
        export { LEFT_3 as LEFT };
        let TOP_1: string;
        export { TOP_1 as TOP };
        let RIGHT_3: string;
        export { RIGHT_3 as RIGHT };
        let BOTTOM_1: string;
        export { BOTTOM_1 as BOTTOM };
    }
    namespace PASTE_TYPE {
        let CLIP_BOARD: string;
        let CANVAS: string;
    }
    namespace SCROLL_BAR_DIR {
        let VERTICAL: string;
        let HORIZONTAL: string;
    }
}
export const initRootNodePositionMap: {
    [x: string]: number;
};
export const layoutList: {
    name: string;
    value: string;
}[];
export const layoutValueList: string[];
export const nodeDataNoStylePropList: string[];
export namespace commonCaches {
    let measureCustomNodeContentSizeEl: any;
    let measureRichtextNodeTextSizeEl: any;
}
export namespace ERROR_TYPES {
    let READ_CLIPBOARD_ERROR: string;
    let PARSE_PASTE_DATA_ERROR: string;
    let CUSTOM_HANDLE_CLIPBOARD_TEXT_ERROR: string;
    let LOAD_CLIPBOARD_IMAGE_ERROR: string;
    let BEFORE_TEXT_EDIT_ERROR: string;
    let EXPORT_ERROR: string;
}
export namespace a4Size {
    let width: number;
    let height: number;
}
export const cssContent: "\n  /* 鼠标hover和激活时渲染的矩形 */\n  .smm-hover-node{\n    display: none;\n    opacity: 0.6;\n    stroke-width: 1;\n  }\n\n  .smm-node:not(.smm-node-dragging):hover .smm-hover-node{\n    display: block;\n  }\n\n  .smm-node.active .smm-hover-node{\n    display: block;\n    opacity: 1;\n    stroke-width: 2;\n  }\n";
