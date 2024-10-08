import { EventEmitter } from "stream";
import { cacheKeys, eventResponse } from "../../utils/constant";
import { AnchorHitPayload, ChatEvent, EmitEvent, PlayerJoinedEvent, PlayerLeftEvent, SessionMetadataEvent, PlayerMovedEvent, RoomModeratedEvent, MessageEvent, TipReactionEvent, ChannelEvent, ReactionEvent } from "../../types/types";
import hrCache, { HRCache } from "../../utils/cache";
import { convertKeysToCamelCase, removeCustomKeys } from "../../utils/utils";


export interface IMessageHandler {
    handle(data: any): void;
}

export class ResponseEventFactory {
    private handlers: { [key: string]: IMessageHandler };

    constructor(emitter: EventEmitter) {
        this.handlers = {
            [eventResponse.Error]: new ErrorMessageHandler(emitter),
            [eventResponse.ChatEvent]: new ChatEventHandler(emitter),
            [eventResponse.SessionMetadata]: new SessionMetadataHandler(emitter),
            [eventResponse.UserJoinedEvent]: new PlayerJoinHandler(emitter),
            [eventResponse.UserLeftEvent]: new PlayerLeftHandler(emitter),
            [eventResponse.UserMovedEvent]: new PlayerMovementHandler(emitter),
            [eventResponse.AnchorHitResponse]: new AnchorHitResponseHandler(emitter),
            [eventResponse.ModerateRoomResponse]: new RoomModeraterHander(emitter),
            [eventResponse.TipReactionEvent]: new TipReactionHandler(emitter),
            [eventResponse.ChannelEvent]: new ChannelHandler(emitter),
            [eventResponse.MessageEvent]: new MessageHandler(emitter),
            [eventResponse.ReactionEvent]: new ReactionHandler(emitter),
        } as { [key: string]: IMessageHandler };
    }
    getHandler(type: string): IMessageHandler | null {
        return this.handlers[type] || null;
    }
}

/**
 * @class ErrorMessageHandler
 * @implements {IMessageHandler}
 * @description Handles error messages by emitting them through an EventEmitter.
 */

export class ErrorMessageHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }
    handle(data: any): void {
        this.emitter.emit(EmitEvent.Error, data.message);
    }
}

/**
 * =============================== Event Handler ===============================
*/

export class SessionMetadataHandler implements IMessageHandler {
    private emitter: EventEmitter;
    private cache: HRCache
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
        this.cache = hrCache;
    }

    handle(data: SessionMetadataEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Ready, data);

        // Save Important detail to the local cache.
        this.cache.set(cacheKeys.ownerId, data.roomInfo.ownerId);
        this.cache.set(cacheKeys.botUserId, data.userId);
        this.cache.set(cacheKeys.roomName, data.roomInfo.roomName);
    }
}

export class AnchorHitResponseHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: AnchorHitPayload): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerSit, data);
    }
}

export class ChatEventHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: ChatEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Chat, data);
    }
}

export class PlayerJoinHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: PlayerJoinedEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerJoin, data);
    }
}

export class PlayerLeftHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: PlayerLeftEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerLeft, data);
    }
}

export class PlayerMovementHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: PlayerMovedEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerMovement, data);
    }
}

export class RoomModeraterHander {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: RoomModeratedEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Moderate, data);
    }
}

export class MessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: MessageEvent): void {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Message, data);
    }
}

export class TipReactionHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handler(data: TipReactionEvent) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Tip, data);
    }
}

export class ChannelHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handler(data: ChannelEvent) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Channel, data);
    }
}

export class ReactionHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handler(data: ReactionEvent) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Reaction, data);
    }
}