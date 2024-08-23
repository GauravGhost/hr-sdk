"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMetadataHandler = void 0;
const constant_1 = require("../../../utils/constant");
const cache_1 = __importDefault(require("../../../utils/cache"));
class SessionMetadataHandler {
    constructor(emitter) {
        this.emitter = emitter;
        this.cache = cache_1.default;
    }
    handle(data) {
        this.emitter.emit(constant_1.emitEvent.Ready, {
            user_id: data.user_id,
            room_info: data.room_info,
            rate_limits: data.rate_limits,
            connection_id: data.connection_id,
        });
        this.cache.set(constant_1.cacheKeys.owner_id, data.room_info.owner_id);
        this.cache.set(constant_1.cacheKeys.bot_user_id, data.user_id);
        this.cache.set(constant_1.cacheKeys.room_name, data.room_info.room_name);
    }
}
exports.SessionMetadataHandler = SessionMetadataHandler;
