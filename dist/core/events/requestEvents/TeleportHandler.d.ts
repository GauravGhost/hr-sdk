import { TeleportPayload } from "../../../types/requestEventTypes";
import { RequestStrategy } from "./RequestStrategy";
export declare class TeleportHandler implements RequestStrategy {
    createPayload(data: TeleportPayload): object;
}
