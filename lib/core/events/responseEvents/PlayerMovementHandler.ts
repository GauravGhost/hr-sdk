import { EventEmitter } from "stream";
import { IMessageHandler } from "../ResponseEventFactory";
import hrCache, {HRCache} from '../../../utils/cache';
import { emitEvent } from "../../../utils/constant";

export class PlayerMovementHandler implements IMessageHandler {
    private emitter: EventEmitter;


    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: any): void {
        this.emitter.emit(emitEvent.PlayerMovement, data.user, data.position);
    }
}