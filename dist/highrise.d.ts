import { EventEmitter } from "stream";
import WebSocket from 'ws';
import RequestEvent from "./core/events/requestEvents/RequestEvents";
export declare class Highrise extends EventEmitter {
    #private;
    private token;
    private roomId;
    ws: WebSocket | null;
    private keepaliveInterval;
    requestEvent: RequestEvent;
    constructor(token: string, roomId: string);
    connect(token: string, roomId: string): void;
    addEventListeners(): void;
    handleMessage(message: MessageEvent<any>): void;
    close(): void;
    errorHandler(error: ErrorEvent): void;
    sendMessage(message: any): void;
}
