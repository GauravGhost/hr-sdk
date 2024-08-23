import { AnchorHitPayload } from "../../../types/requestEventTypes";
import { RequestStrategy } from "./RequestStrategy";
export declare class AnchoHitHandler implements RequestStrategy {
    createPayload(data: AnchorHitPayload): object;
}
