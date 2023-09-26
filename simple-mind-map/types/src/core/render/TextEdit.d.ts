export default class TextEdit {
    constructor(renderer: any);
    renderer: any;
    mindMap: any;
    currentNode: any;
    textEditNode: HTMLDivElement;
    showTextEdit: boolean;
    cacheEditingText: string;
    bindEvent(): void;
    show(node: any, e: any, isInserting?: boolean, isFromKeyDown?: boolean): Promise<void>;
    onScale(): void;
    checkIsAutoEnterTextEditKey(e: any): boolean;
    registerTmpShortcut(): void;
    showEditTextBox(node: any, rect: any, isInserting: any, isFromKeyDown: any): void;
    getEditText(): any;
    hideEditTextBox(): any;
}
