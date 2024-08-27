import { UserWithPosition, Wallet } from "../../types/types";
import { Highrise } from "../highrise";
declare class RequestEvent {
    private hr;
    constructor(hr: Highrise);
    message: (...args: any[]) => void | Promise<void>;
    whisper: (...args: any[]) => void | Promise<void>;
    emote: (...args: any[]) => void | Promise<void>;
    sit: (...args: any[]) => void | Promise<void>;
    wallet: (...args: any[]) => Promise<Wallet[]> | Promise<Promise<Wallet[]>>;
    gold: (...args: any[]) => Promise<Wallet> | Promise<Promise<Wallet>>;
    boostToken: (...args: any[]) => Promise<Wallet> | Promise<Promise<Wallet>>;
    voiceToken: (...args: any[]) => Promise<Wallet> | Promise<Promise<Wallet>>;
    walk: (...args: any[]) => Promise<void> | Promise<Promise<void>>;
    teleport: (...args: any[]) => void | Promise<void>;
    reaction: (...args: any[]) => void | Promise<void>;
    getRooomUsers: (...args: any[]) => Promise<UserWithPosition[]> | Promise<Promise<UserWithPosition[]>>;
    getRoomUserByUsername: (...args: any[]) => Promise<UserWithPosition> | Promise<Promise<UserWithPosition>>;
    getRoomUserByUserId: (...args: any[]) => Promise<UserWithPosition> | Promise<Promise<UserWithPosition>>;
    tipUser: (...args: any[]) => void | Promise<void>;
    modAction: (...args: any[]) => void | Promise<void>;
    getRoomPrivilege: (...args: any[]) => Promise<import("../../types/types").RoomPermission> | Promise<Promise<import("../../types/types").RoomPermission>>;
}
export default RequestEvent;
