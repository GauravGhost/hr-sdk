import { EventEmitter } from "stream";
import { IMessageHandler } from "../ResponseEventFactory";
import { emitEvent } from "../../../utils/constant";


export class AnchorHitResponseHandler implements IMessageHandler {
    private emitter: EventEmitter;

    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: any): void {
        this.emitter.emit(emitEvent.PlayerSit, data);
    }
}