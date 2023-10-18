export default Fishbone;
declare class Fishbone extends Base {
    constructor(opt?: {});
    indent: number;
    childIndent: number;
    computedBaseValue(): void;
    computedLeftTopValue(): void;
    adjustLeftTopValue(): void;
    getNodeAreaHeight(node: any): number;
    updateBrothersLeft(node: any): void;
    updateBrothersTop(node: any, addHeight: any): void;
    checkIsTop(node: any): boolean;
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from "./Base";
