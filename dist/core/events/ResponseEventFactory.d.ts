import { EventEmitter } from "stream";
export interface IMessageHandler {
    handle(data: any): void;
}
export declare class ResponseEventFactory {
    private handlers;
    constructor(emitter: EventEmitter);
    getHandler(type: string): IMessageHandler | null;
}
