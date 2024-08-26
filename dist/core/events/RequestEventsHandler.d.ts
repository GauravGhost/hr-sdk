import { Wallet } from "../../types/types";
import { Highrise } from "../highrise";
declare class RequestEvent {
    private hr;
    constructor(hr: Highrise);
    message: (...args: any[]) => void | Promise<void>;
    whisper: (...args: any[]) => void | Promise<void>;
    emote: (...args: any[]) => void | Promise<void>;
    sit: (...args: any[]) => void | Promise<void>;
    wallet: (...args: any[]) => Promise<Wallet[]> | Promise<Promise<Wallet[]>>;
    gold: (...args: any[]) => Promise<Wallet | undefined> | Promise<Promise<Wallet | undefined> | undefined> | undefined;
    boostToken: (...args: any[]) => Promise<Wallet | undefined> | Promise<Promise<Wallet | undefined> | undefined> | undefined;
    voiceToken: (...args: any[]) => Promise<Wallet | undefined> | Promise<Promise<Wallet | undefined> | undefined> | undefined;
    walk: (...args: any[]) => Promise<void> | Promise<Promise<void>>;
    teleport: (...args: any[]) => void | Promise<void>;
    reaction: (...args: any[]) => void | Promise<void>;
    getRooomUsers: (...args: any[]) => any;
    getRoomUserByUsername: (...args: any[]) => any;
    getRoomUserByUserId: (...args: any[]) => any;
    tipUser: (...args: any[]) => void | Promise<void>;
}
export default RequestEvent;
