export default class KeyCommand {
    constructor(opt: any);
    opt: any;
    mindMap: any;
    shortcutMap: {};
    shortcutMapCache: {};
    isPause: boolean;
    isInSvg: boolean;
    pause(): void;
    recovery(): void;
    save(): void;
    restore(): void;
    bindEvent(): void;
    onKeydown(e: any): void;
    unBindEvent(): void;
    checkKey(e: any, key: any): boolean;
    getOriginEventCodeArr(e: any): any[];
    hasCombinationKey(e: any): any;
    getKeyCodeArr(key: any): any[];
    /**
     * Enter
     * Tab | Insert
     * Shift + a
     */
    addShortcut(key: any, fn: any): void;
    removeShortcut(key: any, fn: any): void;
    getShortcutFn(key: any): any[];
}
