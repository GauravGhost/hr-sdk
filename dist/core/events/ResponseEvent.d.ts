import { EventEmitter } from "stream";
import { AnchorHitPayload, ChatEvent, PlayerJoinedEvent, PlayerLeftEvent, SessionMetadataEvent, UserMovedEvent } from "../../types/types";
export interface IMessageHandler {
    handle(data: any): void;
}
export declare class ResponseEventFactory {
    private handlers;
    constructor(emitter: EventEmitter);
    getHandler(type: string): IMessageHandler | null;
}
/**
 * @class ErrorMessageHandler
 * @implements {IMessageHandler}
 * @description Handles error messages by emitting them through an EventEmitter.
 */
export declare class ErrorMessageHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: any): void;
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
    handle(data: AnchorHitPayload): void;
}
export declare class ChatEventHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: ChatEvent): void;
}
export declare class PlayerJoinHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: PlayerJoinedEvent): void;
}
export declare class PlayerLeftHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: PlayerLeftEvent): void;
}
export declare class PlayerMovementHandler implements IMessageHandler {
    private emitter;
    constructor(emitter: EventEmitter);
    handle(data: UserMovedEvent): void;
}
