import { IMessageHandler } from "../ResponseEventFactory";
import { EventEmitter } from "stream";
export declare class ErrorMessageHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
}
