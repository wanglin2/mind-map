export default Base;
declare class Base {
    constructor(renderer: any);
    renderer: any;
    mindMap: any;
    draw: any;
    lineDraw: any;
    root: any;
    lru: Lru;
    doLayout(): void;
    renderLine(): void;
    renderExpandBtn(): void;
    renderGeneralization(): void;
    cacheNode(uid: any, node: any): void;
    checkIsNeedResizeSources(): boolean;
    checkIsLayerTypeChange(oldIndex: any, newIndex: any): boolean;
    checkIsLayoutChangeRerenderExpandBtnPlaceholderRect(node: any): void;
    createNode(data: any, parent: any, isRoot: any, layerIndex: any): any;
    formatPosition(value: any, size: any, nodeSize: any): number;
    setNodeCenter(node: any): void;
    updateChildren(children: any, prop: any, offset: any): void;
    updateChildrenPro(children: any, props: any): void;
    getNodeAreaWidth(node: any, withGeneralization?: boolean): number;
    quadraticCurvePath(x1: any, y1: any, x2: any, y2: any): string;
    cubicBezierPath(x1: any, y1: any, x2: any, y2: any): string;
    getMarginX(layerIndex: any): any;
    getMarginY(layerIndex: any): any;
    getNodeWidthWithGeneralization(node: any): number;
    getNodeHeightWithGeneralization(node: any): number;
    /**
     * dir：生长方向，h（水平）、v（垂直）
     * isLeft：是否向左生长
     */
    getNodeBoundaries(node: any, dir: any): {
        left: any;
        right: any;
        top: any;
        bottom: any;
        generalizationLineMargin: any;
        generalizationNodeMargin: any;
    };
    getChildrenBoundaries(node: any, dir: any, startIndex: number, endIndex: any): {
        left: number;
        right: number;
        top: number;
        bottom: number;
        generalizationLineMargin: any;
        generalizationNodeMargin: any;
    };
    getNodeGeneralizationRenderBoundaries(item: any, dir: any): {
        left: any;
        right: any;
        top: any;
        bottom: any;
        generalizationLineMargin: any;
        generalizationNodeMargin: any;
    };
    getNodeActChildrenLength(node: any): any;
}
import Lru from "../utils/Lru";
