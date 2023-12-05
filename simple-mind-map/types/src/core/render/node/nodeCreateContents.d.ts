declare namespace _default {
    export { createImgNode };
    export { getImgShowSize };
    export { createIconNode };
    export { createRichTextNode };
    export { createTextNode };
    export { createHyperlinkNode };
    export { createTagNode };
    export { createNoteNode };
    export { getNoteContentPosition };
    export { measureCustomNodeContentSize };
    export { isUseCustomNodeContent };
}
export default _default;
declare function createImgNode(): {
    node: any;
    width: any;
    height: any;
};
declare function getImgShowSize(): any;
declare function createIconNode(): any;
declare function createRichTextNode(): {
    node: any;
    width: any;
    height: any;
};
declare function createTextNode(): any;
declare function createHyperlinkNode(): {
    node: any;
    width: any;
    height: any;
};
declare function createTagNode(): any[];
declare function createNoteNode(): {
    node: any;
    width: any;
    height: any;
};
declare class createNoteNode {
    noteEl: HTMLDivElement;
}
declare function getNoteContentPosition(): {
    left: any;
    top: any;
};
declare function measureCustomNodeContentSize(content: any): {
    width: any;
    height: any;
};
declare function isUseCustomNodeContent(): boolean;
