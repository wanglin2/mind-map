export default View;
declare class View {
    constructor(opt?: {});
    opt: {};
    mindMap: any;
    scale: number;
    sx: number;
    sy: number;
    x: number;
    y: number;
    firstDrag: boolean;
    bind(): void;
    getTransformData(): {
        transform: any;
        state: {
            scale: number;
            x: number;
            y: number;
            sx: number;
            sy: number;
        };
    };
    setTransformData(viewData: any): void;
    translateXY(x: any, y: any): void;
    translateX(step: any): void;
    translateXTo(x: any): void;
    translateY(step: any): void;
    translateYTo(y: any): void;
    transform(): void;
    reset(): void;
    narrow(cx: any, cy: any, isTouchPad: any): void;
    enlarge(cx: any, cy: any, isTouchPad: any): void;
    scaleInCenter(scale: any, cx: any, cy: any): void;
    setScale(scale: any, cx: any, cy: any): void;
    fit(): void;
}
