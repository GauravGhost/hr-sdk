import { AnchorHitPayload, EmotePayload, FloorHitPayload, TeleportPayload, WhisperPayload } from "../../../types/requestEventTypes";
import { Wallet } from "../../../types/responseEventTypes";
import { Highrise } from "../../highrise";
declare class RequestEvent {
    private hr;
    constructor(hr: Highrise);
    message(message: string): void;
    whisper(data: WhisperPayload): void;
    emote(data: EmotePayload): void;
    sit({ entityId, anchorIx }: AnchorHitPayload): void;
    wallet(): Promise<Array<Wallet>>;
    gold(): Promise<Wallet | undefined>;
    boostToken(): Promise<Wallet | undefined>;
    voiceToken(): Promise<Wallet | undefined>;
    walk(data: FloorHitPayload): Promise<void>;
    teleport(data: TeleportPayload): Promise<void>;
    roomUsers(): Promise<any>;
    roomUser(username: string): Promise<any>;
}
export default RequestEvent;
