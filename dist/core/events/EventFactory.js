"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandlerFactory = void 0;
const constant_1 = require("../../utils/constant");
const ChatEventHandler_1 = require("./responseEvents/ChatEventHandler");
const ErrorMessageHandler_1 = require("./ErrorMessageHandler");
const SessionMetadataHandler_1 = require("./responseEvents/SessionMetadataHandler");
const PlayerJoinHandler_1 = require("./responseEvents/PlayerJoinHandler");
const PlayerLeftHandler_1 = require("./responseEvents/PlayerLeftHandler");
const PlayerMovementHandler_1 = require("./responseEvents/PlayerMovementHandler");
const AnchorHitResponseHandler_1 = require("./responseEvents/AnchorHitResponseHandler");
class MessageHandlerFactory {
    constructor(emitter) {
        this.handlers = {
            'Error': new ErrorMessageHandler_1.ErrorMessageHandler(),
            [constant_1.eventResponse.ChatEvent]: new ChatEventHandler_1.ChatEventHandler(emitter),
            [constant_1.eventResponse.SessionMetadata]: new SessionMetadataHandler_1.SessionMetadataHandler(emitter),
            [constant_1.eventResponse.UserJoinedEvent]: new PlayerJoinHandler_1.PlayerJoinHandler(emitter),
            [constant_1.eventResponse.UserLeftEvent]: new PlayerLeftHandler_1.PlayerLeftHandler(emitter),
            [constant_1.eventResponse.UserMovedEvent]: new PlayerMovementHandler_1.PlayerMovementHandler(emitter),
            [constant_1.eventResponse.AnchorHitResponse]: new AnchorHitResponseHandler_1.AnchorHitResponseHandler(emitter),
        };
    }
    getHandler(type) {
        return this.handlers[type] || null;
    }
}
exports.MessageHandlerFactory = MessageHandlerFactory;
