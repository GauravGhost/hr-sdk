import { FloorHitPayload } from "../../../types/requestEventTypes";
import { RequestStrategy } from "./RequestStrategy";
export declare class FloorHitHandler implements RequestStrategy {
    createPayload(data: FloorHitPayload): object;
}
