import { PayloadError, WebSocketError } from "../../utils/error";
import { Highrise } from "../highrise";
import { generateRid } from "../../utils/utils";
import { eventRequest } from "../../utils/constant";
import {
    AnchorHitPayload,
    BuyItemPayload,
    BuyRoomBoostPayload,
    BuyVoiceTimePayload,
    ChangeRoomPrevilegePayload,
    ChannelPayload,
    CheckVoiceChatPayload,
    EmotePayload,
    FloorHitPayload,
    GetBackpackPayload,
    GetConversationsPayload,
    GetInventoryPayload,
    GetMessagePayload,
    GetRoomPrivilegePayload,
    InviteSpeakerPayload,
    LeaveConversationPayload,
    ModerateRoomPayload,
    MoveUserToRoomPayload,
    ReactionPayload,
    RemoveSpeakerPayload,
    SendBulkMessagePayload,
    SendMessagePayload,
    SetOutfitPayload,
    TeleportPayload,
    TipUserPayload
} from "../../types/types";

export interface RequestStrategy {
    createPayload(message: any): object;
}

class RequestEventStrategy {
    constructor(private hr: Highrise, private strategy: RequestStrategy) { }

    execute(incomingPayload: any) {
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            const payload = this.strategy.createPayload(incomingPayload);
            this.hr.ws.send(JSON.stringify(payload));
        } else {
            throw new WebSocketError("WebSocket is not open. Message cannot be sent");
        }
    }
}

export class RequestEventWithPromiseStrategy {
    constructor(private hr: Highrise, private strategy: RequestStrategy) { }

    async execute(incomingPayload: any): Promise<any> {
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            return new Promise((resolve, reject) => {
                const payload: any = this.strategy.createPayload(incomingPayload)

                const messageHandler = (event: any) => {
                    const messageObject = JSON.parse(event.data);

                    if (messageObject.rid === payload.rid) {
                        this.hr.ws!.removeEventListener('message', messageHandler);
                        resolve(messageObject);
                    }
                };

                this.hr.ws!.addEventListener('message', messageHandler);

                this.hr.ws!.send(JSON.stringify(payload), (error) => {
                    if (error) {
                        reject(error);
                    }
                });

                this.hr.ws!.onerror = (error: any) => {
                    reject(new WebSocketError("WebSocket encountered an error."));
                };

                this.hr.ws!.onclose = () => {
                    reject(new WebSocketError("WebSocket connection closed."));
                };
            });
        } else {
            return Promise.reject(new WebSocketError("WebSocket is not open. Message cannot be sent."));
        }
    }
}

export default RequestEventStrategy;

/**
 * =================== Request Event Handlers ==================
 */

export class AnchorHitHandler implements RequestStrategy {
    createPayload(data: AnchorHitPayload): object {
        const payload = {
            _type: eventRequest.AnchorHitRequest,
            anchor: { entity_id: data.entityId, anchor_ix: data.anchorIx },
            rid: null,
        }
        return payload;
    }
}

export class ChatHandler implements RequestStrategy {
    createPayload(data: any): object {
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

export class EmoteHandler implements RequestStrategy {
    createPayload(data: EmotePayload): object {
        const payload = {
            _type: eventRequest.EmoteRequest,
            emote_id: data.emoteId,
            target_user_id: data.targetUserId
        }
        return payload;
    }
}

export class FloorHitHandler implements RequestStrategy {
    createPayload(data: FloorHitPayload): object {
        const payload = {
            _type: eventRequest.FloorHitRequest,
            destination: { x: data.x, y: data.y, z: data.z, faing: data.facing },
            rid: null,
        }
        return payload;
    }
}

export class ReactionHandler implements RequestStrategy {
    createPayload(data: ReactionPayload): object {
        const payload = {
            _type: eventRequest.ReactionRequest,
            reaction: data.reaction,
            target_user_id: data.targetUserId
        }
        return payload;
    }
}

export class RoomUsersHandler implements RequestStrategy {
    createPayload(data: any): object {
        const payload = {
            _type: eventRequest.GetRoomUsersRequest,
            rid: generateRid()
        }
        return payload;
    }
}

export class TeleportHandler implements RequestStrategy {
    createPayload(data: TeleportPayload): object {
        const payload = {
            _type: eventRequest.TeleportRequest,
            user_id: data.userId,
            destination: data.destination
        }
        return payload;
    }
}

export class WalletHandler implements RequestStrategy {
    createPayload(data?: any): object {
        const payload = {
            _type: eventRequest.GetWalletRequest,
            rid: generateRid(),
        }
        return payload;
    }
}

export class ChannelHandler implements RequestStrategy {
    createPayload(data: ChannelPayload): object {
        const payload = {
            _type: eventRequest.ChannelRequest,
            message: data.message,
            tags: data.tags,
            only_to: data.onlyTo,
            rid: null,
        }
        return payload;
    }
}

export class ModerateRoomHandler implements RequestStrategy {
    createPayload(data: ModerateRoomPayload): object {
        const payload = {
            _type: eventRequest.ModerateRoomRequest,
            user_id: data.userId,
            moderation_action: data.moderationAction,
            action_length: data.actionLength,
            rid: null,
        }
        return payload;
    }
}

export class GetRoomPrivilegeHandler implements RequestStrategy {
    createPayload(data: GetRoomPrivilegePayload): object {
        const payload = {
            _type: eventRequest.GetRoomPrivilegeRequest,
            user_id: data.userId,
            rid: generateRid(),
        }
        return payload;
    }
}

export class ChangeRoomPrevilegeHandler implements RequestStrategy {
    createPayload(data: ChangeRoomPrevilegePayload): object {
        const payload = {
            _type: eventRequest.ChangeRoomPrivilegeRequest,
            user_id: data.userId,
            permission: data.permission,
            rid: null,
        }
        return payload;
    }
}

export class MoveUserToRoomHandler implements RequestStrategy {
    createPayload(data: MoveUserToRoomPayload): object {
        const payload = {
            _type: eventRequest.MoveUserToRoomRequest,
            user_id: data.userId,
            room_id: data.roomId,
            rid: null,
        }
        return payload;
    }
}

export class GetBackpackHandler implements RequestStrategy {
    createPayload(data: GetBackpackPayload): object {
        const payload = {
            _type: eventRequest.GetBackpackRequest,
            user_id: data.userId,
            rid: generateRid(),
        }
        return payload;
    }
}

export class CheckVoiceChatHandler implements RequestStrategy {
    createPayload(data: CheckVoiceChatPayload): object {
        const payload = {
            _type: eventRequest.CheckVoiceChatRequest,
            rid: generateRid(),
        }
        return payload;
    }
}

export class InviteSpeakerHandler implements RequestStrategy {
    createPayload(data: InviteSpeakerPayload): object {
        const payload = {
            _type: eventRequest.InviteSpeakerRequest,
            user_id: data.userId,
            rid: null,
        }
        return payload;
    }
}

export class RemoveSpeakerHandler implements RequestStrategy {
    createPayload(data: RemoveSpeakerPayload): object {
        const payload = {
            _type: eventRequest.RemoveSpeakerRequest,
            user_id: data.userId,
            rid: null,
        }
        return payload;
    }
}

export class GetUserOutfitHandler implements RequestStrategy {
    createPayload(data: RemoveSpeakerPayload): object {
        const payload = {
            _type: eventRequest.GetUserOutfitRequest,
            user_id: data.userId,
            rid: generateRid(),
        }
        return payload;
    }
}

export class GetConversationsHandler implements RequestStrategy {
    createPayload(data: GetConversationsPayload): object {
        const payload = {
            _type: eventRequest.GetConversationsRequest,
            not_joined: data.notJoined,
            last_id: data.lastId,
            rid: generateRid(),
        }
        return payload;
    }
}

export class SendMessageHandler implements RequestStrategy {
    createPayload(data: SendMessagePayload): object {
        if (data.roomId && data.worldId) {
            throw new PayloadError("One of [roomId, worldId] is required!")
        }
        const payload = {
            _type: eventRequest.SendMessageRequest,
            conversation_id: data.conversationId,
            content: data.content,
            type: data.type,
            room_id: data.roomId,
            world_id: data.worldId,
            rid: null,
        }
        return payload;
    }
}

export class SendBulkMessageHandler implements RequestStrategy {
    createPayload(data: SendBulkMessagePayload): object {
        if (data.roomId && data.worldId) {
            throw new PayloadError("One of [roomId, worldId] is required!")
        }
        const payload = {
            _type: eventRequest.SendMessageRequest,
            user_ids: data.userIds,
            content: data.content,
            type: data.type,
            room_id: data.roomId,
            world_id: data.worldId,
            rid: null,
        }
        return payload;
    }
}

export class GetMessageHandler implements RequestStrategy {
    createPayload(data: GetMessagePayload): object {
        const payload = {
            _type: eventRequest.GetMessagesRequest,
            conversation_id: data.conversationId,
            last_message_id: data.lastMessageId,
            rid: generateRid(),
        }
        return payload;
    }
}

export class LeaveConversationHandler implements RequestStrategy {
    createPayload(data: LeaveConversationPayload): object {
        const payload = {
            _type: eventRequest.LeaveConversationRequest,
            conversation_id: data.conversationId,
            rid: null,
        }
        return payload;
    }
}

export class BuyVoiceTimeHandler implements RequestStrategy {
    createPayload(data: BuyVoiceTimePayload): object {
        const payload = {
            _type: eventRequest.BuyVoiceTimeRequest,
            payment_method: data.paymentMethod,
            rid: generateRid(),
        }
        return payload;
    }
}

export class BuyRoomBoostHandler implements RequestStrategy {
    createPayload(data: BuyRoomBoostPayload): object {
        data.amount = data.amount ? data.amount : 1;
        const payload = {
            _type: eventRequest.BuyRoomBoostRequest,
            payment_method: data.paymentMethod,
            amount: data.amount,
            rid: generateRid(),
        }
        return payload;
    }
}

export class TipUserHandler implements RequestStrategy {
    createPayload(data: TipUserPayload): object {
        const payload = {
            _type: eventRequest.TipUserRequest,
            user_id: data.userId,
            gold_bar: data.goldBar,
            rid: generateRid(),
        }
        return payload;
    }
}

export class GetInventoryHandler implements RequestStrategy {
    createPayload(data: GetInventoryPayload): object {
        const payload = {
            _type: eventRequest.GetInventoryRequest,
            rid: generateRid(),
        }
        return payload;
    }
}

export class SetOutfitHandler implements RequestStrategy {
    createPayload(data: SetOutfitPayload): object {
        const payload = {
            _type: eventRequest.SetOutfitRequest,
            outfit: data.outfit,
            rid: null,
        }
        return payload;
    }
}

export class BuyItemHandler implements RequestStrategy {
    createPayload(data: BuyItemPayload): object {
        const payload = {
            _type: eventRequest.BuyItemRequest,
            item_id: data.itemId,
            rid: generateRid(),
        }
        return payload;
    }
}

export class ModerationHandler implements RequestStrategy {
    createPayload(data: ModerateRoomPayload): object {
        return {
            _type: eventRequest.ModerateRoomRequest,
            user_id: data.userId,
            moderation_action: data.moderationAction,
            action_length: data.actionLength,
            rid: null,
        }
    }
}