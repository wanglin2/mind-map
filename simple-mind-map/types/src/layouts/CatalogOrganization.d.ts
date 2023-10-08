export default CatalogOrganization;
declare class CatalogOrganization extends Base {
    constructor(opt?: {});
    computedBaseValue(): void;
    computedLeftTopValue(): void;
    adjustLeftTopValue(): void;
    updateBrothersLeft(node: any, addWidth: any): void;
    updateBrothersTop(node: any, addHeight: any): void;
    renderExpandBtnRect(rect: any, expandBtnSize: any, width: any, height: any, node: any): void;
}
import Base from "./Base";
