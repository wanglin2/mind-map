export default Timeline;
declare class Timeline extends Base {
    constructor(opt: {}, layout: any);
    layout: any;
    computedBaseValue(): void;
    computedLeftTopValue(): void;
    adjustLeftTopValue(): void;
    getNodeAreaHeight(node: any): number;
    updateBrothersLeft(node: any): void;
    updateBrothersTop(node: any, addHeight: any): void;
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from "./Base";
