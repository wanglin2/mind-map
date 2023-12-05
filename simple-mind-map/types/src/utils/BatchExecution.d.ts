export default BatchExecution;
declare class BatchExecution {
    has: {};
    queue: any[];
    nextTick: any;
    push(name: any, fn: any): void;
    replaceTask(name: any, fn: any): void;
    flush(): void;
}
