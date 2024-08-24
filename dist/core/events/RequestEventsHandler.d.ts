import { AnchorHitPayload, EmotePayload, FloorHitPayload, ReactionPayload, TeleportPayload, Wallet, WhisperPayload } from "../../types/types";
import { Highrise } from "../highrise";
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
    reaction(data: ReactionPayload): Promise<void>;
    getRooomUsers(): Promise<any>;
    getRoomUserByUsername(username: string): Promise<any>;
    getRoomUserByUserId(userId: string): Promise<any>;
}
export default RequestEvent;
