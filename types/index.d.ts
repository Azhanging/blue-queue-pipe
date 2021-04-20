interface TConstructorFn {
    (this: BlueQueuePipe, ...args: any[]): any;
}
interface QueuePipeOpts {
    data?: any;
    enqueued?: TConstructorFn;
    dequeued?: TConstructorFn;
    running?: TConstructorFn;
    ran?: TConstructorFn;
    methods?: {
        [methodName: string]: TConstructorFn;
    };
}
declare class BlueQueuePipe {
    options?: QueuePipeOpts;
    queue: any[];
    data?: any;
    constructor(opts?: QueuePipeOpts);
    enqueue(obj: any): void;
    dequeue(): any;
    isEmpty(): boolean;
    clear(): void;
    first(): any;
    last(): any;
    run(...args: any[]): void;
    hook(context: any, cb: any, args?: any[]): any;
    useMethod(name: string, args?: any[]): any;
}
export default BlueQueuePipe;
