export default CatalogOrganization
declare class CatalogOrganization extends Base {
  constructor(opt?: {})
  doLayout(callback: any): void
  computedBaseValue(): void
  computedLeftTopValue(): void
  adjustLeftTopValue(): void
  updateBrothersLeft(node: any, addWidth: any): void
  updateBrothersTop(node: any, addHeight: any): void
  renderLine(node: any, lines: any, style: any): any[]
  renderExpandBtn(node: any, btn: any): void
  renderGeneralization(node: any, gLine: any, gNode: any): void
  renderExpandBtnRect(
    rect: any,
    expandBtnSize: any,
    width: any,
    height: any,
    node: any
  ): void
}
import Base from './Base'
