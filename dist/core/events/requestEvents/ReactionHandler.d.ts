import { ReactionPayload } from "../../../types/types";
import { RequestStrategy } from "./RequestStrategy";
export declare class ReactionHandler implements RequestStrategy {
    createPayload(data: ReactionPayload): object;
}
