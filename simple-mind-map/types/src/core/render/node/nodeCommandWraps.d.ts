declare namespace _default {
    export { setData };
    export { setText };
    export { setImage };
    export { setIcon };
    export { setHyperlink };
    export { setNote };
    export { setTag };
    export { setShape };
    export { setStyle };
    export { setStyles };
}
export default _default;
declare function setData(data?: {}): void;
declare function setText(text: any, richText: any, resetRichText: any): void;
declare function setImage(imgData: any): void;
declare function setIcon(icons: any): void;
declare function setHyperlink(link: any, title: any): void;
declare function setNote(note: any): void;
declare function setTag(tag: any): void;
declare function setShape(shape: any): void;
declare function setStyle(prop: any, value: any): void;
declare function setStyles(style: any): void;
