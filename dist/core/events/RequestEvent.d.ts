import { Highrise } from "../highrise";
import { AnchorHitPayload, BuyItemPayload, BuyRoomBoostPayload, BuyVoiceTimePayload, ChangeRoomPrevilegePayload, ChannelPayload, CheckVoiceChatPayload, EmotePayload, FloorHitPayload, GetBackpackPayload, GetConversationsPayload, GetInventoryPayload, GetMessagePayload, GetRoomPrivilegePayload, InviteSpeakerPayload, LeaveConversationPayload, ModerateRoomPayload, MoveUserToRoomPayload, ReactionPayload, RemoveSpeakerPayload, SendBulkMessagePayload, SendMessagePayload, SetOutfitPayload, TeleportPayload, TipUserPayload } from "../../types/types";
export interface RequestStrategy {
    createPayload(message: any): object;
}
declare class RequestEventStrategy {
    private hr;
    private strategy;
    constructor(hr: Highrise, strategy: RequestStrategy);
    execute(incomingPayload: any): void;
}
export declare class RequestEventWithPromiseStrategy {
    private hr;
    private strategy;
    constructor(hr: Highrise, strategy: RequestStrategy);
    execute(incomingPayload: any): Promise<any>;
}
export default RequestEventStrategy;
/**
 * =================== Request Event Handlers ==================
 */
export declare class AnchorHitHandler implements RequestStrategy {
    createPayload(data: AnchorHitPayload): object;
}
export declare class ChatHandler implements RequestStrategy {
    createPayload(data: any): object;
}
export declare class EmoteHandler implements RequestStrategy {
    createPayload(data: EmotePayload): object;
}
export declare class FloorHitHandler implements RequestStrategy {
    createPayload(data: FloorHitPayload): object;
}
export declare class ReactionHandler implements RequestStrategy {
    createPayload(data: ReactionPayload): object;
}
export declare class RoomUsersHandler implements RequestStrategy {
    createPayload(data: any): object;
}
export declare class TeleportHandler implements RequestStrategy {
    createPayload(data: TeleportPayload): object;
}
export declare class WalletHandler implements RequestStrategy {
    createPayload(data?: any): object;
}
export declare class ChannelHandler implements RequestStrategy {
    createPayload(data: ChannelPayload): object;
}
export declare class ModerateRoomHandler implements RequestStrategy {
    createPayload(data: ModerateRoomPayload): object;
}
export declare class GetRoomPrivilegeHandler implements RequestStrategy {
    createPayload(data: GetRoomPrivilegePayload): object;
}
export declare class ChangeRoomPrevilegeHandler implements RequestStrategy {
    createPayload(data: ChangeRoomPrevilegePayload): object;
}
export declare class MoveUserToRoomHandler implements RequestStrategy {
    createPayload(data: MoveUserToRoomPayload): object;
}
export declare class GetBackPackHandler implements RequestStrategy {
    createPayload(data: GetBackpackPayload): object;
}
export declare class CheckVoideChatHandler implements RequestStrategy {
    createPayload(data: CheckVoiceChatPayload): object;
}
export declare class InviteSpeakerHandler implements RequestStrategy {
    createPayload(data: InviteSpeakerPayload): object;
}
export declare class RemoveSpeakerHandler implements RequestStrategy {
    createPayload(data: RemoveSpeakerPayload): object;
}
export declare class GetUserOutfitHandler implements RequestStrategy {
    createPayload(data: RemoveSpeakerPayload): object;
}
export declare class GetConversationsHandler implements RequestStrategy {
    createPayload(data: GetConversationsPayload): object;
}
export declare class SendMessageHandler implements RequestStrategy {
    createPayload(data: SendMessagePayload): object;
}
export declare class SendBulkMessageHandler implements RequestStrategy {
    createPayload(data: SendBulkMessagePayload): object;
}
export declare class GetMessageHandler implements RequestStrategy {
    createPayload(data: GetMessagePayload): object;
}
export declare class LeaveConversationHandler implements RequestStrategy {
    createPayload(data: LeaveConversationPayload): object;
}
export declare class BuyVoiceTimeHandler implements RequestStrategy {
    createPayload(data: BuyVoiceTimePayload): object;
}
export declare class BuyRoomBoostHandler implements RequestStrategy {
    createPayload(data: BuyRoomBoostPayload): object;
}
export declare class TipUserHandler implements RequestStrategy {
    createPayload(data: TipUserPayload): object;
}
export declare class GetInventoryHandler implements RequestStrategy {
    createPayload(data: GetInventoryPayload): object;
}
export declare class SetOutfitHandler implements RequestStrategy {
    createPayload(data: SetOutfitPayload): object;
}
export declare class BuyItemHandler implements RequestStrategy {
    createPayload(data: BuyItemPayload): object;
}
