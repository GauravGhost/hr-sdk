import { EventEmitter } from "stream";
import { IMessageHandler } from "../ResponseEventFactory";
export declare class PlayerJoinHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
}
