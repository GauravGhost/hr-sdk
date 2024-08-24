"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletHandler = exports.TeleportHandler = exports.RoomUsersHandler = exports.ReactionHandler = exports.FloorHitHandler = exports.EmoteHandler = exports.ChatHandler = exports.ChannelHandler = exports.AnchorHitHandler = exports.RequestEventWithPromiseStrategy = void 0;
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils/utils");
const constant_1 = require("../../utils/constant");
class RequestEventStrategy {
    constructor(hr, strategy) {
        this.hr = hr;
        this.strategy = strategy;
    }
    execute(incomingPayload) {
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            const payload = this.strategy.createPayload(incomingPayload);
            this.hr.ws.send(JSON.stringify(payload));
        }
        else {
            throw new error_1.WebSocketError("WebSocket is not open. Message cannot be sent");
        }
    }
}
class RequestEventWithPromiseStrategy {
    constructor(hr, strategy) {
        this.hr = hr;
        this.strategy = strategy;
    }
    async execute(incomingPayload) {
        if (this.hr && this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            return new Promise((resolve, reject) => {
                const payload = this.strategy.createPayload(incomingPayload);
                const messageHandler = (event) => {
                    const messageObject = JSON.parse(event.data);
                    if (messageObject.rid === payload.rid) {
                        this.hr.ws.removeEventListener('message', messageHandler);
                        resolve(messageObject);
                    }
                };
                this.hr.ws.addEventListener('message', messageHandler);
                this.hr.ws.send(JSON.stringify(payload), (error) => {
                    if (error) {
                        reject(error);
                    }
                });
                this.hr.ws.onerror = (error) => {
                    reject(new error_1.WebSocketError("WebSocket encountered an error."));
                };
                this.hr.ws.onclose = () => {
                    reject(new error_1.WebSocketError("WebSocket connection closed."));
                };
            });
        }
        else {
            return Promise.reject(new error_1.WebSocketError("WebSocket is not open. Message cannot be sent."));
        }
    }
}
exports.RequestEventWithPromiseStrategy = RequestEventWithPromiseStrategy;
exports.default = RequestEventStrategy;
/**
 * =================== Request Event Handlers ==================
 */
class AnchorHitHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.AnchorHitRequest,
            anchor: { entity_id: data.entityId, anchor_ix: data.anchorIx },
            rid: null,
        };
        return payload;
    }
}
exports.AnchorHitHandler = AnchorHitHandler;
class ChannelHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.ChannelRequest,
            message: data.message,
            tags: data.tags,
            only_to: data.tags,
            rid: null,
        };
        return payload;
    }
}
exports.ChannelHandler = ChannelHandler;
class ChatHandler {
    createPayload(data) {
        if (data.whisper) {
            console.log(data);
            return {
                _type: constant_1.eventRequest.ChatRequest,
                message: data.message,
                whisper_target_id: data.whisperTargetId,
                rid: data.rid
            };
        }
        return {
            _type: constant_1.eventRequest.ChatRequest,
            message: data.message,
            rid: data.rid
        };
    }
}
exports.ChatHandler = ChatHandler;
class EmoteHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.EmoteRequest,
            emote_id: data.emoteId,
            target_user_id: data.targetUserId
        };
        return payload;
    }
}
exports.EmoteHandler = EmoteHandler;
class FloorHitHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.FloorHitRequest,
            destination: { x: data.x, y: data.y, z: data.z, faing: data.facing },
            rid: null,
        };
        return payload;
    }
}
exports.FloorHitHandler = FloorHitHandler;
class ReactionHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.ReactionRequest,
            reaction: data.reaction,
            target_user_id: data.targetUserId
        };
        return payload;
    }
}
exports.ReactionHandler = ReactionHandler;
class RoomUsersHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.GetRoomUsersRequest,
            rid: (0, utils_1.generateRid)()
        };
        return payload;
    }
}
exports.RoomUsersHandler = RoomUsersHandler;
class TeleportHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.TeleportRequest,
            user_id: data.userId,
            destination: data.destination
        };
        return payload;
    }
}
exports.TeleportHandler = TeleportHandler;
class WalletHandler {
    createPayload(data) {
        if (!data) {
            throw new error_1.PayloadError("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.GetWalletRequest,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.WalletHandler = WalletHandler;
