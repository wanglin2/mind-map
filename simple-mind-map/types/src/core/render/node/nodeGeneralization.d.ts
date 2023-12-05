declare namespace _default {
    export { formatGetGeneralization };
    export { checkHasGeneralization };
    export { checkHasSelfGeneralization };
    export { getGeneralizationNodeIndex };
    export { createGeneralizationNode };
    export { updateGeneralization };
    export { updateGeneralizationData };
    export { renderGeneralization };
    export { removeGeneralization };
    export { hideGeneralization };
    export { showGeneralization };
    export { setGeneralizationOpacity };
    export { handleGeneralizationMouseenter };
    export { handleGeneralizationMouseleave };
}
export default _default;
declare function formatGetGeneralization(): any[];
declare function checkHasGeneralization(): boolean;
declare function checkHasSelfGeneralization(): boolean;
declare function getGeneralizationNodeIndex(node: any): any;
declare function createGeneralizationNode(): void;
declare class createGeneralizationNode {
    _generalizationNodeWidth: number;
    _generalizationNodeHeight: number;
}
declare function updateGeneralization(): void;
declare function updateGeneralizationData(): void;
declare function renderGeneralization(): void;
declare function removeGeneralization(): void;
declare class removeGeneralization {
    _generalizationList: any[];
}
declare function hideGeneralization(): void;
declare function showGeneralization(): void;
declare function setGeneralizationOpacity(val: any): void;
declare function handleGeneralizationMouseenter(): void;
declare function handleGeneralizationMouseleave(): void;
