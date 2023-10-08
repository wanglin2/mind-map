export default MindMap;
declare class MindMap extends Base {
    constructor(opt?: {});
    computedBaseValue(): void;
    computedTopValue(): void;
    adjustTopValue(): void;
    updateBrothers(node: any, leftAddHeight: any, rightAddHeight: any): void;
    renderLineStraight(node: any, lines: any, style: any): any[];
    renderLineDirect(node: any, lines: any, style: any): any[];
    renderLineCurve(node: any, lines: any, style: any): any[];
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from "./Base";
