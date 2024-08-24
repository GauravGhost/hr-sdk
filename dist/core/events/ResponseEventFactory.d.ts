import { EventEmitter } from "stream";
import { ChatEvent, SessionMetadataEvent, UserMovedEvent } from "../../types/types";
export interface IMessageHandler {
    handle(data: any): void;
}
export declare class ResponseEventFactory {
    private handlers;
    constructor(emitter: EventEmitter);
    getHandler(type: string): IMessageHandler | null;
}
/**
 * =============================== Event Handler ===============================
 */
export declare class SessionMetadataHandler implements IMessageHandler {
    private emitter;
    private cache;
    constructor(emitter: EventEmitter);
    handle(data: SessionMetadataEvent): void;
}
export declare class AnchorHitResponseHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
}
export declare class ChatEventHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: ChatEvent): void;
}
export declare class ErrorMessageHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
}
export declare class PlayerJoinHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
}
export declare class PlayerLeftHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
}
export declare class PlayerMovementHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: UserMovedEvent): void;
}
