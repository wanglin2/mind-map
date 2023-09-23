export default Event;
declare class Event {
    constructor(opt?: {});
    opt: {};
    mindMap: any;
    isLeftMousedown: boolean;
    isRightMousedown: boolean;
    isMiddleMousedown: boolean;
    mousedownPos: {
        x: number;
        y: number;
    };
    mousemovePos: {
        x: number;
        y: number;
    };
    mousemoveOffset: {
        x: number;
        y: number;
    };
    bindFn(): void;
    onBodyClick(e: any): void;
    onDrawClick(e: any): void;
    onMousedown(e: any): void;
    onMousemove(e: any): void;
    onMouseup(e: any): void;
    onMousewheel(e: any): void;
    onContextmenu(e: any): void;
    onSvgMousedown(e: any): void;
    onKeyup(e: any): void;
    onMouseenter(e: any): void;
    onMouseleave(e: any): void;
    bind(): void;
    unbind(): void;
}
