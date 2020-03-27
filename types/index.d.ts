interface QueuePipeOpts {
    enqueued: Function;
    dequeued: Function;
    running: Function;
    ran: Function;
    methods: any;
}
declare class BlueQueuePipe {
    options: QueuePipeOpts;
    queue: any[];
    data: any;
    constructor(opts: any);
    _init(opts: any): void;
    enqueue(obj: any): void;
    dequeue(): any;
    isEmpty(): boolean;
    clear(): void;
    first(): any;
    last(): any;
    run(...args: any[]): void;
    hook(context: any, cb: any, args?: any[]): any;
    useMethod(name: string, args: any[]): any;
}
export default BlueQueuePipe;
