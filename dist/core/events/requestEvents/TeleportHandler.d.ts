import { TeleportPayload } from "../../../types/types";
import { RequestStrategy } from "./RequestStrategy";
export declare class TeleportHandler implements RequestStrategy {
    createPayload(data: TeleportPayload): object;
}
