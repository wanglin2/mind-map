export default VerticalTimeline;
declare class VerticalTimeline extends Base {
    constructor(opt: {}, layout: any);
    layout: any;
    computedBaseValue(): void;
    computedTopValue(): void;
    adjustLeftTopValue(): void;
    updateBrothers(node: any, addHeight: any): void;
    updateBrothersTop(node: any, addHeight: any): void;
    renderLineStraight(node: any, lines: any, style: any): any[];
    renderLineDirect(node: any, lines: any, style: any): any[];
    renderLineCurve(node: any, lines: any, style: any): any[];
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from "./Base";
