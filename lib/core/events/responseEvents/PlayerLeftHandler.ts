import { EventEmitter } from "stream";
import { IMessageHandler } from "../EventFactory";
import { emitEvent } from "../../../utils/constant";


export class PlayerLeftHandler implements IMessageHandler {
    private emitter: EventEmitter;

    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: any): void {
        this.emitter.emit(emitEvent.PlayerLeft, data.user);
    }
}