"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMovementHandler = exports.PlayerLeftHandler = exports.PlayerJoinHandler = exports.ChatEventHandler = exports.AnchorHitResponseHandler = exports.SessionMetadataHandler = exports.ErrorMessageHandler = exports.ResponseEventFactory = void 0;
const constant_1 = require("../../utils/constant");
const types_1 = require("../../types/types");
const cache_1 = __importDefault(require("../../utils/cache"));
const utils_1 = require("../../utils/utils");
class ResponseEventFactory {
    constructor(emitter) {
        this.handlers = {
            [constant_1.eventResponse.Error]: new ErrorMessageHandler(emitter),
            [constant_1.eventResponse.ChatEvent]: new ChatEventHandler(emitter),
            [constant_1.eventResponse.SessionMetadata]: new SessionMetadataHandler(emitter),
            [constant_1.eventResponse.UserJoinedEvent]: new PlayerJoinHandler(emitter),
            [constant_1.eventResponse.UserLeftEvent]: new PlayerLeftHandler(emitter),
            [constant_1.eventResponse.UserMovedEvent]: new PlayerMovementHandler(emitter),
            [constant_1.eventResponse.AnchorHitResponse]: new AnchorHitResponseHandler(emitter),
        };
    }
    getHandler(type) {
        return this.handlers[type] || null;
    }
}
exports.ResponseEventFactory = ResponseEventFactory;
/**
 * @class ErrorMessageHandler
 * @implements {IMessageHandler}
 * @description Handles error messages by emitting them through an EventEmitter.
 */
class ErrorMessageHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(types_1.EmitEvent.Error, data.message);
    }
}
exports.ErrorMessageHandler = ErrorMessageHandler;
/**
 * =============================== Event Handler ===============================
*/
class SessionMetadataHandler {
    constructor(emitter) {
        this.emitter = emitter;
        this.cache = cache_1.default;
    }
    handle(data) {
        data = (0, utils_1.convertKeysToCamelCase)(data);
        this.emitter.emit(types_1.EmitEvent.Ready, data);
        // Save Important detail to the local cache.
        this.cache.set(constant_1.cacheKeys.ownerId, data.roomInfo.ownerId);
        this.cache.set(constant_1.cacheKeys.botUserId, data.userId);
        this.cache.set(constant_1.cacheKeys.roomName, data.roomInfo.roomName);
    }
}
exports.SessionMetadataHandler = SessionMetadataHandler;
class AnchorHitResponseHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = (0, utils_1.convertKeysToCamelCase)(data);
        this.emitter.emit(types_1.EmitEvent.PlayerSit, data);
    }
}
exports.AnchorHitResponseHandler = AnchorHitResponseHandler;
class ChatEventHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = (0, utils_1.convertKeysToCamelCase)(data);
        this.emitter.emit(types_1.EmitEvent.Chat, data);
    }
}
exports.ChatEventHandler = ChatEventHandler;
class PlayerJoinHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = (0, utils_1.convertKeysToCamelCase)(data);
        this.emitter.emit(types_1.EmitEvent.PlayerJoin, data.user);
    }
}
exports.PlayerJoinHandler = PlayerJoinHandler;
class PlayerLeftHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = (0, utils_1.convertKeysToCamelCase)(data);
        this.emitter.emit(types_1.EmitEvent.PlayerLeft, { user: data.user });
    }
}
exports.PlayerLeftHandler = PlayerLeftHandler;
class PlayerMovementHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        data = (0, utils_1.convertKeysToCamelCase)(data);
        this.emitter.emit(types_1.EmitEvent.PlayerMovement, { user: data.user, position: data.position });
    }
}
exports.PlayerMovementHandler = PlayerMovementHandler;
