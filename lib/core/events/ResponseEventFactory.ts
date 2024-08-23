import { EventEmitter } from "stream";
import { emitEvent, eventResponse } from "../../utils/constant";
import { ChatEventHandler } from "./responseEvents/ChatEventHandler";
import { ErrorMessageHandler } from "./responseEvents/ErrorMessageHandler";
import { SessionMetadataHandler } from "./responseEvents/SessionMetadataHandler";
import { PlayerJoinHandler } from "./responseEvents/PlayerJoinHandler";
import { PlayerLeftHandler } from "./responseEvents/PlayerLeftHandler";
import { PlayerMovementHandler } from "./responseEvents/PlayerMovementHandler";
import { AnchorHitResponseHandler } from "./responseEvents/AnchorHitResponseHandler";


export interface IMessageHandler {
    handle(data: any): void;
}

export class ResponseEventFactory {
    private handlers: { [key: string]: IMessageHandler };

    constructor(emitter: EventEmitter) {
        this.handlers = {
            [emitEvent.Error]: new ErrorMessageHandler(emitter),
            [eventResponse.ChatEvent]: new ChatEventHandler(emitter),
            [eventResponse.SessionMetadata]: new SessionMetadataHandler(emitter),
            [eventResponse.UserJoinedEvent]: new PlayerJoinHandler(emitter),
            [eventResponse.UserLeftEvent]: new PlayerLeftHandler(emitter),
            [eventResponse.UserMovedEvent]: new PlayerMovementHandler(emitter),
            [eventResponse.AnchorHitResponse]: new AnchorHitResponseHandler(emitter),
        };
    }

    getHandler(type: string): IMessageHandler | null {
        return this.handlers[type] || null;
    }
}