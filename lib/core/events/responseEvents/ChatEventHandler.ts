import { EventEmitter } from "stream";
import { IMessageHandler } from "../EventFactory";


export class ChatEventHandler implements IMessageHandler {
    private emitter: EventEmitter;

    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: any): void {
        this.emitter.emit('chatCreate', data.user, data.message);
    }
}