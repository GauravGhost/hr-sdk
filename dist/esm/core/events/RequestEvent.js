import { PayloadError, WebSocketError } from "../../utils/error";
import { generateRid } from "../../utils/utils";
import { eventRequest } from "../../utils/constant";
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
            throw new WebSocketError("WebSocket is not open. Message cannot be sent");
        }
    }
}
export class RequestEventWithPromiseStrategy {
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
                    reject(new WebSocketError("WebSocket encountered an error."));
                };
                this.hr.ws.onclose = () => {
                    reject(new WebSocketError("WebSocket connection closed."));
                };
            });
        }
        else {
            return Promise.reject(new WebSocketError("WebSocket is not open. Message cannot be sent."));
        }
    }
}
export default RequestEventStrategy;
/**
 * =================== Request Event Handlers ==================
 */
export class AnchorHitHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.AnchorHitRequest,
            anchor: { entity_id: data.entityId, anchor_ix: data.anchorIx },
            rid: null,
        };
        return payload;
    }
}
export class ChatHandler {
    createPayload(data) {
        if (data.whisper) {
            return {
                _type: eventRequest.ChatRequest,
                message: data.message,
                whisper_target_id: data.whisperTargetId,
                rid: data.rid
            };
        }
        return {
            _type: eventRequest.ChatRequest,
            message: data.message,
            rid: data.rid
        };
    }
}
export class EmoteHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.EmoteRequest,
            emote_id: data.emoteId,
            target_user_id: data.targetUserId
        };
        return payload;
    }
}
export class FloorHitHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.FloorHitRequest,
            destination: { x: data.x, y: data.y, z: data.z, faing: data.facing },
            rid: null,
        };
        return payload;
    }
}
export class ReactionHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.ReactionRequest,
            reaction: data.reaction,
            target_user_id: data.targetUserId
        };
        return payload;
    }
}
export class RoomUsersHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetRoomUsersRequest,
            rid: generateRid()
        };
        return payload;
    }
}
export class TeleportHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.TeleportRequest,
            user_id: data.userId,
            destination: data.destination
        };
        return payload;
    }
}
export class WalletHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetWalletRequest,
            rid: generateRid(),
        };
        return payload;
    }
}
export class ChannelHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.ChannelRequest,
            message: data.message,
            tags: data.tags,
            only_to: data.onlyTo,
            rid: null,
        };
        return payload;
    }
}
export class ModerateRoomHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.ModerateRoomRequest,
            user_id: data.userId,
            moderation_action: data.moderationAction,
            action_length: data.actionLength,
            rid: null,
        };
        return payload;
    }
}
export class GetRoomPrivilegeHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetRoomPrivilegeRequest,
            user_id: data.userId,
            rid: generateRid(),
        };
        return payload;
    }
}
export class ChangeRoomPrevilegeHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.ChangeRoomPrivilegeRequest,
            user_id: data.userId,
            permission: data.permission,
            rid: null,
        };
        return payload;
    }
}
export class MoveUserToRoomHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.MoveUserToRoomRequest,
            user_id: data.userId,
            room_id: data.roomId,
            rid: null,
        };
        return payload;
    }
}
export class GetBackpackHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetBackpackRequest,
            user_id: data.userId,
            rid: generateRid(),
        };
        return payload;
    }
}
export class CheckVoiceChatHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.CheckVoiceChatRequest,
            rid: generateRid(),
        };
        return payload;
    }
}
export class InviteSpeakerHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.InviteSpeakerRequest,
            user_id: data.userId,
            rid: null,
        };
        return payload;
    }
}
export class RemoveSpeakerHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.RemoveSpeakerRequest,
            user_id: data.userId,
            rid: null,
        };
        return payload;
    }
}
export class GetUserOutfitHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetUserOutfitRequest,
            user_id: data.userId,
            rid: generateRid(),
        };
        return payload;
    }
}
export class GetConversationsHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetConversationsRequest,
            not_joined: data.notJoined,
            last_id: data.lastId,
            rid: generateRid(),
        };
        return payload;
    }
}
export class SendMessageHandler {
    createPayload(data) {
        if (data.roomId && data.worldId) {
            throw new PayloadError("One of [roomId, worldId] is required!");
        }
        const payload = {
            _type: eventRequest.SendMessageRequest,
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
export class SendBulkMessageHandler {
    createPayload(data) {
        if (data.roomId && data.worldId) {
            throw new PayloadError("One of [roomId, worldId] is required!");
        }
        const payload = {
            _type: eventRequest.SendMessageRequest,
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
export class GetMessageHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetMessagesRequest,
            conversation_id: data.conversationId,
            last_message_id: data.lastMessageId,
            rid: generateRid(),
        };
        return payload;
    }
}
export class LeaveConversationHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.LeaveConversationRequest,
            conversation_id: data.conversationId,
            rid: null,
        };
        return payload;
    }
}
export class BuyVoiceTimeHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.BuyVoiceTimeRequest,
            payment_method: data.paymentMethod,
            rid: generateRid(),
        };
        return payload;
    }
}
export class BuyRoomBoostHandler {
    createPayload(data) {
        data.amount = data.amount ? data.amount : 1;
        const payload = {
            _type: eventRequest.BuyRoomBoostRequest,
            payment_method: data.paymentMethod,
            amount: data.amount,
            rid: generateRid(),
        };
        return payload;
    }
}
export class TipUserHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.TipUserRequest,
            user_id: data.userId,
            gold_bar: data.goldBar,
            rid: generateRid(),
        };
        return payload;
    }
}
export class GetInventoryHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.GetInventoryRequest,
            rid: generateRid(),
        };
        return payload;
    }
}
export class SetOutfitHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.SetOutfitRequest,
            outfit: data.outfit,
            rid: null,
        };
        return payload;
    }
}
export class BuyItemHandler {
    createPayload(data) {
        const payload = {
            _type: eventRequest.BuyItemRequest,
            item_id: data.itemId,
            rid: generateRid(),
        };
        return payload;
    }
}
export class ModerationHandler {
    createPayload(data) {
        return {
            _type: eventRequest.ModerateRoomRequest,
            user_id: data.userId,
            moderation_action: data.moderationAction,
            action_length: data.actionLength,
            rid: null,
        };
    }
}
