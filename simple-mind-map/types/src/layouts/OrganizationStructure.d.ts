export default OrganizationStructure;
declare class OrganizationStructure extends Base {
    constructor(opt?: {});
    computedBaseValue(): void;
    computedLeftValue(): void;
    adjustLeftValue(): void;
    updateBrothers(node: any, addWidth: any): void;
    renderLineDirect(node: any, lines: any, style: any): any[];
    renderLineStraight(node: any, lines: any, style: any): any[];
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from "./Base";
