export default Command;
declare class Command {
    constructor(opt?: {});
    opt: {};
    mindMap: any;
    commands: {};
    history: any[];
    activeHistoryIndex: number;
    addHistory(): void;
    clearHistory(): void;
    registerShortcutKeys(): void;
    exec(name: any, ...args: any[]): void;
    add(name: any, fn: any): void;
    remove(name: any, fn: any): void;
    back(step?: number): any;
    forward(step?: number): any;
    getCopyData(): any;
    removeDataUid(data: any): any;
}
