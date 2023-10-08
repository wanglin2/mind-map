declare namespace _default {
    export { checkHasGeneralization };
    export { createGeneralizationNode };
    export { updateGeneralization };
    export { renderGeneralization };
    export { removeGeneralization };
    export { hideGeneralization };
    export { showGeneralization };
}
export default _default;
declare function checkHasGeneralization(): boolean;
declare function createGeneralizationNode(): void;
declare class createGeneralizationNode {
    _generalizationLine: any;
    _generalizationNode: Node;
    _generalizationNodeWidth: any;
    _generalizationNodeHeight: any;
}
declare function updateGeneralization(): void;
declare function renderGeneralization(): void;
declare class renderGeneralization {
    _generalizationNodeWidth: number;
    _generalizationNodeHeight: number;
}
declare function removeGeneralization(): void;
declare class removeGeneralization {
    _generalizationLine: any;
    _generalizationNode: any;
}
declare function hideGeneralization(): void;
declare function showGeneralization(): void;
import Node from "./Node";
