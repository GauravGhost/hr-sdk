import { EventEmitter } from "stream";
import { cacheKeys, eventResponse } from "../../utils/constant";
import { AnchorHitPayload, ChatEvent, EmitEvent, PlayerJoinedEvent, PlayerLeftEvent, SessionMetadataEvent, UserMovedEvent } from "../../types/types";
import hrCache, { HRCache } from "../../utils/cache";
import { convertKeysToCamelCase } from "../../utils/utils";


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
        };
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
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerJoin, data.user);
    }
}

export class PlayerLeftHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: PlayerLeftEvent): void {
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerLeft, {user: data.user});
    }
}

export class PlayerMovementHandler implements IMessageHandler {
    private emitter: EventEmitter;
    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    handle(data: UserMovedEvent): void {
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerMovement, {user: data.user, position: data.position});
    }
}