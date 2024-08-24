import { EventEmitter } from "stream";
import WebSocket from 'ws';
import RequestEvent from "./events/RequestEventsHandler";
export declare class Highrise extends EventEmitter {
    #private;
    private token;
    private roomId;
    options?: any;
    ws: WebSocket | null;
    private keepaliveInterval;
    requestEvent: RequestEvent;
    private responseEventFactory;
    constructor(token: string, roomId: string, options?: any);
    connect(token: string, roomId: string, cb: () => void): void;
    addEventListeners(cb: () => void): void;
    handleMessage(message: MessageEvent<any>): void;
    close(): void;
    errorHandler(error: ErrorEvent): void;
}
