export const themeList: {
    name: string;
    value: string;
    dark: boolean;
}[];
export namespace CONSTANTS {
    const CHANGE_THEME: string;
    const CHANGE_LAYOUT: string;
    const SET_DATA: string;
    const TRANSFORM_TO_NORMAL_NODE: string;
    namespace MODE {
        const READONLY: string;
        const EDIT: string;
    }
    namespace LAYOUT {
        const LOGICAL_STRUCTURE: string;
        const MIND_MAP: string;
        const ORGANIZATION_STRUCTURE: string;
        const CATALOG_ORGANIZATION: string;
        const TIMELINE: string;
        const TIMELINE2: string;
        const FISHBONE: string;
        const VERTICAL_TIMELINE: string;
    }
    namespace DIR {
        const UP: string;
        const LEFT: string;
        const DOWN: string;
        const RIGHT: string;
    }
    namespace KEY_DIR {
        const LEFT_1: string;
        export { LEFT_1 as LEFT };
        const UP_1: string;
        export { UP_1 as UP };
        const RIGHT_1: string;
        export { RIGHT_1 as RIGHT };
        const DOWN_1: string;
        export { DOWN_1 as DOWN };
    }
    namespace SHAPE {
        const RECTANGLE: string;
        const DIAMOND: string;
        const PARALLELOGRAM: string;
        const ROUNDED_RECTANGLE: string;
        const OCTAGONAL_RECTANGLE: string;
        const OUTER_TRIANGULAR_RECTANGLE: string;
        const INNER_TRIANGULAR_RECTANGLE: string;
        const ELLIPSE: string;
        const CIRCLE: string;
    }
    namespace MOUSE_WHEEL_ACTION {
        const ZOOM: string;
        const MOVE: string;
    }
    namespace INIT_ROOT_NODE_POSITION {
        const LEFT_2: string;
        export { LEFT_2 as LEFT };
        export const TOP: string;
        const RIGHT_2: string;
        export { RIGHT_2 as RIGHT };
        export const BOTTOM: string;
        export const CENTER: string;
    }
    namespace LAYOUT_GROW_DIR {
        const LEFT_3: string;
        export { LEFT_3 as LEFT };
        const TOP_1: string;
        export { TOP_1 as TOP };
        const RIGHT_3: string;
        export { RIGHT_3 as RIGHT };
        const BOTTOM_1: string;
        export { BOTTOM_1 as BOTTOM };
    }
    namespace PASTE_TYPE {
        const CLIP_BOARD: string;
        const CANVAS: string;
    }
    namespace SCROLL_BAR_DIR {
        const VERTICAL: string;
        const HORIZONTAL: string;
    }
    namespace CREATE_NEW_NODE_BEHAVIOR {
        const DEFAULT: string;
        const NOT_ACTIVE: string;
        const ACTIVE_ONLY: string;
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
    const measureCustomNodeContentSizeEl: any;
    const measureRichtextNodeTextSizeEl: any;
}
export namespace ERROR_TYPES {
    const READ_CLIPBOARD_ERROR: string;
    const PARSE_PASTE_DATA_ERROR: string;
    const CUSTOM_HANDLE_CLIPBOARD_TEXT_ERROR: string;
    const LOAD_CLIPBOARD_IMAGE_ERROR: string;
    const BEFORE_TEXT_EDIT_ERROR: string;
    const EXPORT_ERROR: string;
}
export namespace a4Size {
    const width: number;
    const height: number;
}
export const cssContent: "\n  /* 鼠标hover和激活时渲染的矩形 */\n  .smm-hover-node{\n    display: none;\n    opacity: 0.6;\n    stroke-width: 1;\n  }\n\n  .smm-node:not(.smm-node-dragging):hover .smm-hover-node{\n    display: block;\n  }\n\n  .smm-node.active .smm-hover-node{\n    display: block;\n    opacity: 1;\n    stroke-width: 2;\n  }\n";
export const selfCloseTagList: string[];
