import { EventEmitter } from "stream";
import { eventResponse } from "../../utils/constant";
import { ChatEventHandler } from "./responseEvents/ChatEventHandler";
import { ErrorMessageHandler } from "./ErrorMessageHandler";


export interface IMessageHandler {
    handle(data: any): void;
}

export class MessageHandlerFactory {
    private handlers: { [key: string]: IMessageHandler };

    constructor(emitter: EventEmitter) {
        this.handlers = {
            'Error': new ErrorMessageHandler(),
            [eventResponse.ChatEvent]: new ChatEventHandler(emitter)
        };
    }

    getHandler(type: string): IMessageHandler | null {
        return this.handlers[type] || null;
    }
}