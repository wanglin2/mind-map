export default Fishbone
declare class Fishbone extends Base {
  constructor(opt?: {})
  indent: number
  childIndent: number
  doLayout(callback: any): void
  computedBaseValue(): void
  computedLeftTopValue(): void
  adjustLeftTopValue(): void
  getNodeAreaHeight(node: any): number
  updateBrothersLeft(node: any): void
  updateBrothersTop(node: any, addHeight: any): void
  checkIsTop(node: any): boolean
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
