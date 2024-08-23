import { EventEmitter } from "stream";
import { IMessageHandler } from "../ResponseEventFactory";
type room_info = {
    owner_id: string;
    room_name: string;
};
type data = {
    user_id: string;
    room_info: room_info;
    rate_limits: {};
    connection_id: string;
    sdk_version: string;
};
export declare class SessionMetadataHandler implements IMessageHandler {
    private emitter;
    private cache;
    constructor(emitter: EventEmitter);
    handle(data: data): void;
}
export {};
