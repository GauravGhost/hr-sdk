import { AnchorHitPayload, ChangeRoomPrevilegePayload, EmotePayload, FloorHitPayload, GetRoomPrivilegePayload, ModerateRoomPayload, ReactionPayload, TeleportPayload, TipUserPayload, UserWithPosition, MoveUserToRoomPayload, Wallet, WhisperPayload, InviteSpeakerPayload, RemoveSpeakerPayload, GetUserOutfitPayload, GetConversationsPayload, GetConversationsResponse, SendMessagePayload, SendBulkMessagePayload, GetMessagePayload, Message, LeaveConversationPayload, Item, RoomPermission, BuyVoiceTimePayload, PaymentResult, BuyRoomBoostPayload, BuyItemPayload, ChannelPayload, SetOutfitPayload } from "../../types/types";
import { Highrise } from "../highrise";
declare class RequestEvent {
    private hr;
    constructor(hr: Highrise);
    message(message: string): void;
    whisper(data: WhisperPayload): void;
    emote(data: EmotePayload): void;
    sit({ entityId, anchorIx }: AnchorHitPayload): void;
    getWallet(): Promise<Array<Wallet>>;
    getGold(): Promise<Wallet>;
    getBoostToken(): Promise<Wallet>;
    getVoiceToken(): Promise<Wallet>;
    /**
     * @param {FloorHitPayload} data
     */
    walk(data: FloorHitPayload): void;
    teleport(data: TeleportPayload): void;
    reaction(data: ReactionPayload): void;
    getRooomUsers(): Promise<Array<UserWithPosition>>;
    getRoomUserByUsername(username: string): Promise<UserWithPosition>;
    getRoomUserByUserId(userId: string): Promise<UserWithPosition>;
    tipUser(data: TipUserPayload): void;
    modAction(data: ModerateRoomPayload): void;
    getRoomPrivilege(data: GetRoomPrivilegePayload): Promise<RoomPermission>;
    changeRoomPrivilege(data: ChangeRoomPrevilegePayload): void;
    moveUserToRoom(data: MoveUserToRoomPayload): void;
    getBackpack(data: {
        userId: string;
    }): Promise<{
        [key: string]: number;
    }>;
    inviteSpeaker(data: InviteSpeakerPayload): void;
    removeSpeaker(data: RemoveSpeakerPayload): void;
    getOutfitasync(data: GetUserOutfitPayload): Promise<Array<Item>>;
    setOutfit(data: SetOutfitPayload): void;
    getConveration(data: GetConversationsPayload): Promise<GetConversationsResponse>;
    sendMessage(data: SendMessagePayload): void;
    sendBulkMessage: (data: SendBulkMessagePayload) => void;
    getMessage: (data: GetMessagePayload) => Promise<Message>;
    leaveConveration: (data: LeaveConversationPayload) => void;
    buyVoice: (data: BuyVoiceTimePayload) => Promise<PaymentResult>;
    buyBoost: (data: BuyRoomBoostPayload) => Promise<PaymentResult>;
    buyItem: (data: BuyItemPayload) => Promise<PaymentResult>;
    channel: (data: ChannelPayload) => void;
    getInventory: () => Promise<Array<Item>>;
}
export default RequestEvent;
