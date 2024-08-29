import { cacheKeys, eventResponse } from "../../utils/constant";
import { EmitEvent } from "../../types/types";
import hrCache from "../../utils/cache";
import { convertKeysToCamelCase, removeCustomKeys } from "../../utils/utils";
export class ResponseEventFactory {
    constructor(emitter) {
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
    getHandler(type) {
        return this.handlers[type] || null;
    }
}
/**
 * @class ErrorMessageHandler
 * @implements {IMessageHandler}
 * @description Handles error messages by emitting them through an EventEmitter.
 */
export class ErrorMessageHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(EmitEvent.Error, data.message);
    }
}
/**
 * =============================== Event Handler ===============================
*/
export class SessionMetadataHandler {
    constructor(emitter) {
        this.emitter = emitter;
        this.cache = hrCache;
    }
    handle(data) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Ready, data);
        // Save Important detail to the local cache.
        this.cache.set(cacheKeys.ownerId, data.roomInfo.ownerId);
        this.cache.set(cacheKeys.botUserId, data.userId);
        this.cache.set(cacheKeys.roomName, data.roomInfo.roomName);
    }
}
export class AnchorHitResponseHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerSit, data);
    }
}
export class ChatEventHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.Chat, data);
    }
}
export class PlayerJoinHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerJoin, data);
    }
}
export class PlayerLeftHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerLeft, data);
    }
}
export class PlayerMovementHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = removeCustomKeys(data);
        data = convertKeysToCamelCase(data);
        this.emitter.emit(EmitEvent.PlayerMovement, { user: data.user, position: data.position });
    }
}
