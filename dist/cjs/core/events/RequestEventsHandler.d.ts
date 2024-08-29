import { UserWithPosition, Wallet, GetConversationsResponse, Message, Item, RoomPermission, PaymentResult } from "../../types/types";
import { Highrise } from "../highrise";
declare class RequestEvent {
    private hr;
    constructor(hr: Highrise);
    message: (...args: any[]) => void | Promise<void>;
    whisper: (...args: any[]) => void | Promise<void>;
    emote: (...args: any[]) => void | Promise<void>;
    sit: (...args: any[]) => void | Promise<void>;
    getWallet: (...args: any[]) => Promise<Wallet[]> | Promise<Promise<Wallet[]>>;
    getGold: (...args: any[]) => Promise<Wallet> | Promise<Promise<Wallet>>;
    getBoostToken: (...args: any[]) => Promise<Wallet> | Promise<Promise<Wallet>>;
    getVoiceToken: (...args: any[]) => Promise<Wallet> | Promise<Promise<Wallet>>;
    walk: (...args: any[]) => void | Promise<void>;
    teleport: (...args: any[]) => void | Promise<void>;
    reaction: (...args: any[]) => void | Promise<void>;
    getRooomUsers: (...args: any[]) => Promise<UserWithPosition[]> | Promise<Promise<UserWithPosition[]>>;
    getRoomUserByUsername: (...args: any[]) => Promise<UserWithPosition> | Promise<Promise<UserWithPosition>>;
    getRoomUserByUserId: (...args: any[]) => Promise<UserWithPosition> | Promise<Promise<UserWithPosition>>;
    tipUser: (...args: any[]) => void | Promise<void>;
    modAction: (...args: any[]) => void | Promise<void>;
    getRoomPrivilege: (...args: any[]) => Promise<RoomPermission> | Promise<Promise<RoomPermission>>;
    changeRoomPrivilege: (...args: any[]) => void | Promise<void>;
    moveUserToRoom: (...args: any[]) => void | Promise<void>;
    getBackpack: (...args: any[]) => Promise<{
        [key: string]: number;
    }> | Promise<Promise<{
        [key: string]: number;
    }>>;
    inviteSpeaker: (...args: any[]) => void | Promise<void>;
    removeSpeaker: (...args: any[]) => void | Promise<void>;
    getOutfit: (...args: any[]) => Promise<Item[]> | Promise<Promise<Item[]>>;
    setOutfit: (...args: any[]) => void | Promise<void>;
    getConveration: (...args: any[]) => Promise<GetConversationsResponse> | Promise<Promise<GetConversationsResponse>>;
    sendMessage: (...args: any[]) => void | Promise<void>;
    sendBulkMessage: (...args: any[]) => void | Promise<void>;
    getMessage: (...args: any[]) => Promise<Message> | Promise<Promise<Message>>;
    leaveConveration: (...args: any[]) => void | Promise<void>;
    buyVoice: (...args: any[]) => Promise<PaymentResult> | Promise<Promise<PaymentResult>>;
    buyBoost: (...args: any[]) => Promise<PaymentResult> | Promise<Promise<PaymentResult>>;
    buyItem: (...args: any[]) => Promise<PaymentResult> | Promise<Promise<PaymentResult>>;
    channel: (...args: any[]) => void | Promise<void>;
    getInventory: (...args: any[]) => Promise<Item[]> | Promise<Promise<Item[]>>;
}
export default RequestEvent;
