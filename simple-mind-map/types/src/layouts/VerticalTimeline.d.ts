export default VerticalTimeline;
declare class VerticalTimeline extends Base {
    constructor(opt: {}, layout: any);
    layout: any;
    doLayout(callback: any): void;
    computedBaseValue(): void;
    computedTopValue(): void;
    adjustLeftTopValue(): void;
    updateBrothers(node: any, addHeight: any): void;
    updateBrothersTop(node: any, addHeight: any): void;
    renderLine(node: any, lines: any, style: any, lineStyle: any): void;
    renderLineStraight(node: any, lines: any, style: any): any[];
    renderLineDirect(node: any, lines: any, style: any): any[];
    renderLineCurve(node: any, lines: any, style: any): any[];
    renderExpandBtn(node: any, btn: any): void;
    renderGeneralization(node: any, gLine: any, gNode: any): void;
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from './Base';
