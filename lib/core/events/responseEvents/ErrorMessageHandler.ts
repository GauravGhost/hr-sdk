import { error } from "console";
import { ResponseError } from "../../../utils/error";
import { IMessageHandler } from "../ResponseEventFactory";
import { EventEmitter } from "stream";

export class ErrorMessageHandler implements IMessageHandler {
    private emitter: EventEmitter;

    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }
    handle(data: any): void {
        this.emitter.emit(data.message);
    }
}