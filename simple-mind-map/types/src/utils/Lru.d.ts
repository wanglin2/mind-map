export default class Lru {
    constructor(max: any);
    max: any;
    size: number;
    pool: Map<any, any>;
    add(key: any, value: any): void;
    delete(key: any): void;
    has(key: any): boolean;
    get(key: any): any;
}
