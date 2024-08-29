"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationHandler = exports.BuyItemHandler = exports.SetOutfitHandler = exports.GetInventoryHandler = exports.TipUserHandler = exports.BuyRoomBoostHandler = exports.BuyVoiceTimeHandler = exports.LeaveConversationHandler = exports.GetMessageHandler = exports.SendBulkMessageHandler = exports.SendMessageHandler = exports.GetConversationsHandler = exports.GetUserOutfitHandler = exports.RemoveSpeakerHandler = exports.InviteSpeakerHandler = exports.CheckVoiceChatHandler = exports.GetBackpackHandler = exports.MoveUserToRoomHandler = exports.ChangeRoomPrevilegeHandler = exports.GetRoomPrivilegeHandler = exports.ModerateRoomHandler = exports.ChannelHandler = exports.WalletHandler = exports.TeleportHandler = exports.RoomUsersHandler = exports.ReactionHandler = exports.FloorHitHandler = exports.EmoteHandler = exports.ChatHandler = exports.AnchorHitHandler = exports.RequestEventWithPromiseStrategy = void 0;
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
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
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
        const payload = {
            _type: constant_1.eventRequest.AnchorHitRequest,
            anchor: { entity_id: data.entityId, anchor_ix: data.anchorIx },
            rid: null,
        };
        return payload;
    }
}
exports.AnchorHitHandler = AnchorHitHandler;
class ChatHandler {
    createPayload(data) {
        if (data.whisper) {
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
        const payload = {
            _type: constant_1.eventRequest.GetWalletRequest,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.WalletHandler = WalletHandler;
class ChannelHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.ChannelRequest,
            message: data.message,
            tags: data.tags,
            only_to: data.onlyTo,
            rid: null,
        };
        return payload;
    }
}
exports.ChannelHandler = ChannelHandler;
class ModerateRoomHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.ModerateRoomRequest,
            user_id: data.userId,
            moderation_action: data.moderationAction,
            action_length: data.actionLength,
            rid: null,
        };
        return payload;
    }
}
exports.ModerateRoomHandler = ModerateRoomHandler;
class GetRoomPrivilegeHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.GetRoomPrivilegeRequest,
            user_id: data.userId,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.GetRoomPrivilegeHandler = GetRoomPrivilegeHandler;
class ChangeRoomPrevilegeHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.ChangeRoomPrivilegeRequest,
            user_id: data.userId,
            permission: data.permission,
            rid: null,
        };
        return payload;
    }
}
exports.ChangeRoomPrevilegeHandler = ChangeRoomPrevilegeHandler;
class MoveUserToRoomHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.MoveUserToRoomRequest,
            user_id: data.userId,
            room_id: data.roomId,
            rid: null,
        };
        return payload;
    }
}
exports.MoveUserToRoomHandler = MoveUserToRoomHandler;
class GetBackpackHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.GetBackpackRequest,
            user_id: data.userId,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.GetBackpackHandler = GetBackpackHandler;
class CheckVoiceChatHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.CheckVoiceChatRequest,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.CheckVoiceChatHandler = CheckVoiceChatHandler;
class InviteSpeakerHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.InviteSpeakerRequest,
            user_id: data.userId,
            rid: null,
        };
        return payload;
    }
}
exports.InviteSpeakerHandler = InviteSpeakerHandler;
class RemoveSpeakerHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.RemoveSpeakerRequest,
            user_id: data.userId,
            rid: null,
        };
        return payload;
    }
}
exports.RemoveSpeakerHandler = RemoveSpeakerHandler;
class GetUserOutfitHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.GetUserOutfitRequest,
            user_id: data.userId,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.GetUserOutfitHandler = GetUserOutfitHandler;
class GetConversationsHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.GetConversationsRequest,
            not_joined: data.notJoined,
            last_id: data.lastId,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.GetConversationsHandler = GetConversationsHandler;
class SendMessageHandler {
    createPayload(data) {
        if (data.roomId && data.worldId) {
            throw new error_1.PayloadError("One of [roomId, worldId] is required!");
        }
        const payload = {
            _type: constant_1.eventRequest.SendMessageRequest,
            conversation_id: data.conversationId,
            content: data.content,
            type: data.type,
            room_id: data.roomId,
            world_id: data.worldId,
            rid: null,
        };
        return payload;
    }
}
exports.SendMessageHandler = SendMessageHandler;
class SendBulkMessageHandler {
    createPayload(data) {
        if (data.roomId && data.worldId) {
            throw new error_1.PayloadError("One of [roomId, worldId] is required!");
        }
        const payload = {
            _type: constant_1.eventRequest.SendMessageRequest,
            user_ids: data.userIds,
            content: data.content,
            type: data.type,
            room_id: data.roomId,
            world_id: data.worldId,
            rid: null,
        };
        return payload;
    }
}
exports.SendBulkMessageHandler = SendBulkMessageHandler;
class GetMessageHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.GetMessagesRequest,
            conversation_id: data.conversationId,
            last_message_id: data.lastMessageId,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.GetMessageHandler = GetMessageHandler;
class LeaveConversationHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.LeaveConversationRequest,
            conversation_id: data.conversationId,
            rid: null,
        };
        return payload;
    }
}
exports.LeaveConversationHandler = LeaveConversationHandler;
class BuyVoiceTimeHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.BuyVoiceTimeRequest,
            payment_method: data.paymentMethod,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.BuyVoiceTimeHandler = BuyVoiceTimeHandler;
class BuyRoomBoostHandler {
    createPayload(data) {
        data.amount = data.amount ? data.amount : 1;
        const payload = {
            _type: constant_1.eventRequest.BuyRoomBoostRequest,
            payment_method: data.paymentMethod,
            amount: data.amount,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.BuyRoomBoostHandler = BuyRoomBoostHandler;
class TipUserHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.TipUserRequest,
            user_id: data.userId,
            gold_bar: data.goldBar,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.TipUserHandler = TipUserHandler;
class GetInventoryHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.GetInventoryRequest,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.GetInventoryHandler = GetInventoryHandler;
class SetOutfitHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.SetOutfitRequest,
            outfit: data.outfit,
            rid: null,
        };
        return payload;
    }
}
exports.SetOutfitHandler = SetOutfitHandler;
class BuyItemHandler {
    createPayload(data) {
        const payload = {
            _type: constant_1.eventRequest.BuyItemRequest,
            item_id: data.itemId,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.BuyItemHandler = BuyItemHandler;
class ModerationHandler {
    createPayload(data) {
        return {
            _type: constant_1.eventRequest.ModerateRoomRequest,
            user_id: data.userId,
            moderation_action: data.moderationAction,
            action_length: data.actionLength,
            rid: null,
        };
    }
}
exports.ModerationHandler = ModerationHandler;
