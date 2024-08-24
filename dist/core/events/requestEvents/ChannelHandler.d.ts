import { ChannelPayload } from "../../../types/types";
import { RequestStrategy } from "./RequestStrategy";
export declare class ChannelHandler implements RequestStrategy {
    createPayload(data: ChannelPayload): object;
}
