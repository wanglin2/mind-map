export default class TextEdit {
    constructor(renderer: any);
    renderer: any;
    mindMap: any;
    currentNode: any;
    textEditNode: HTMLDivElement;
    showTextEdit: boolean;
    cacheEditingText: string;
    bindEvent(): void;
    show({ node, isInserting, isFromKeyDown, isFromScale }: {
        node: any;
        isInserting?: boolean;
        isFromKeyDown?: boolean;
        isFromScale?: boolean;
    }): Promise<void>;
    onScale(): void;
    onKeydown(e: any): void;
    unBindEvent(): void;
    checkIsAutoEnterTextEditKey(e: any): boolean;
    registerTmpShortcut(): void;
    showEditTextBox({ node, rect, isInserting, isFromKeyDown, isFromScale }: {
        node: any;
        rect: any;
        isInserting: any;
        isFromKeyDown: any;
        isFromScale: any;
    }): void;
    getEditText(): any;
    hideEditTextBox(): any;
}
