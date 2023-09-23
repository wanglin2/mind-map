declare namespace _default {
    export { createExpandNodeContent };
    export { updateExpandBtnNode };
    export { updateExpandBtnPos };
    export { renderExpandBtn };
    export { removeExpandBtn };
    export { showExpandBtn };
    export { hideExpandBtn };
    export { sumNode };
}
export default _default;
declare function createExpandNodeContent(): void;
declare class createExpandNodeContent {
    _openExpandNode: any;
    _closeExpandNode: any;
    _fillExpandNode: any;
}
declare function updateExpandBtnNode(): void;
declare class updateExpandBtnNode {
    _lastExpandBtnType: boolean;
}
declare function updateExpandBtnPos(): void;
declare function renderExpandBtn(): void;
declare class renderExpandBtn {
    _expandBtn: any;
    _showExpandBtn: boolean;
}
declare function removeExpandBtn(): void;
declare class removeExpandBtn {
    _showExpandBtn: boolean;
}
declare function showExpandBtn(): void;
declare function hideExpandBtn(): void;
declare function sumNode(data?: any[]): any;
