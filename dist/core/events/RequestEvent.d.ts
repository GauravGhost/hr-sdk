import { Highrise } from "../highrise";
import { AnchorHitPayload, ChannelPayload, EmotePayload, FloorHitPayload, ReactionPayload, TeleportPayload } from "../../types/types";
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
export declare class ChannelHandler implements RequestStrategy {
    createPayload(data: ChannelPayload): object;
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
