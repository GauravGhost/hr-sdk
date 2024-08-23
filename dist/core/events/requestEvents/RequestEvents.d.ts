import { Wallet } from "../../../types/responseEventTypes";
import { Highrise } from "../../highrise";
declare class RequestEvent {
    private hr;
    constructor(hr: Highrise);
    message(message: string): void;
    whisper(message: string, whisperTargetId: string): void;
    emote(emoteId: string, targetUserId?: string): void;
    sit(entityId: string, anchorIx?: number): void;
    wallet(): Promise<Array<Wallet>>;
    gold(): Promise<Wallet | undefined>;
    boostToken(): Promise<Wallet | undefined>;
    voiceToken(): Promise<Wallet | undefined>;
}
export default RequestEvent;
