export default Style;
declare class Style {
    static setBackgroundStyle(el: any, themeConfig: any): void;
    static removeBackgroundStyle(el: any): void;
    constructor(ctx: any);
    ctx: any;
    merge(prop: any, root: any): any;
    getStyle(prop: any, root: any): any;
    getSelfStyle(prop: any): any;
    rect(node: any): void;
    shape(node: any): void;
    text(node: any): void;
    createStyleText(): string;
    getTextFontStyle(): {
        italic: boolean;
        bold: any;
        fontSize: any;
        fontFamily: any;
    };
    domText(node: any, fontSizeScale: number, isMultiLine: any): void;
    tagText(node: any): void;
    tagRect(node: any, text: any, color: any): void;
    iconNode(node: any): void;
    line(node: any, { width, color, dasharray }?: {
        width: any;
        color: any;
        dasharray: any;
    }): void;
    generalizationLine(node: any): void;
    iconBtn(node: any, node2: any, fillNode: any): void;
    hasCustomStyle(): boolean;
    hoverNode(node: any): void;
}
declare namespace Style {
    const cacheStyle: any;
}
