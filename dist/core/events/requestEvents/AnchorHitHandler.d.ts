import { AnchorHitPayload } from "../../../types/types";
import { RequestStrategy } from "./RequestStrategy";
export declare class AnchorHitHandler implements RequestStrategy {
    createPayload(data: AnchorHitPayload): object;
}
