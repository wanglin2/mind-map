export default MindMap
declare class MindMap extends Base {
  constructor(opt?: {})
  doLayout(callback: any): void
  computedBaseValue(): void
  computedTopValue(): void
  adjustTopValue(): void
  updateBrothers(node: any, leftAddHeight: any, rightAddHeight: any): void
  renderLine(node: any, lines: any, style: any, lineStyle: any): void
  renderLineStraight(node: any, lines: any, style: any): any[]
  renderLineDirect(node: any, lines: any, style: any): any[]
  renderLineCurve(node: any, lines: any, style: any): any[]
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
