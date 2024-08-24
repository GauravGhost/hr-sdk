import { FloorHitPayload } from "../../../types/types";
import { RequestStrategy } from "./RequestStrategy";
export declare class FloorHitHandler implements RequestStrategy {
    createPayload(data: FloorHitPayload): object;
}
