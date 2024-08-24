import { AnchorHitPayload } from "../../../types/requestEventTypes";
import { RequestStrategy } from "./RequestStrategy";
export declare class AnchorHitHandler implements RequestStrategy {
    createPayload(data: AnchorHitPayload): object;
}
