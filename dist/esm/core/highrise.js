var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Highrise_instances, _Highrise_sendKeepalive;
import { EventEmitter } from "stream";
import WebSocket from 'ws';
import { constant, eventRequest, eventResponse } from '../utils/constant';
import { ResponseEventFactory } from "./events/ResponseEvent";
import { HighriseError } from "../utils/error";
import RequestEvent from "./events/RequestEventsHandler";
export class Highrise extends EventEmitter {
    constructor(token, roomId, options) {
        super();
        _Highrise_instances.add(this);
        this.token = token;
        this.roomId = roomId;
        this.options = options;
        this.ws = null;
        this.options = {};
        this.keepaliveInterval = null;
        this.action = new RequestEvent(this);
        this.responseEventFactory = new ResponseEventFactory(this);
    }
    connect(token, roomId, cb) {
        if ((!token || token === "") && (!this.token || this.token === "")) {
            this.emit(eventResponse.Error, new HighriseError("[Aborted] Please supply a bot token in your configuration file."));
            return;
        }
        if ((!roomId || roomId === "") && (!this.roomId || this.roomId === "")) {
            this.emit(eventResponse.Error, new HighriseError("[Aborted] Please supply a room ID in your configuration file."));
            return;
        }
        this.token = token || this.token;
        this.roomId = roomId || this.roomId;
        this.ws = new WebSocket(constant.WS_ENDPOINT, {
            headers: {
                'room-id': this.roomId,
                'api-token': this.token,
            },
        });
        this.addEventListeners(cb);
    }
    addEventListeners(cb) {
        if (!this.ws)
            return;
        this.ws.addEventListener('open', () => {
            if (typeof cb == 'function')
                cb();
            __classPrivateFieldGet(this, _Highrise_instances, "m", _Highrise_sendKeepalive).call(this);
            if (this.keepaliveInterval) {
                clearInterval(this.keepaliveInterval);
            }
            this.keepaliveInterval = setInterval(() => __classPrivateFieldGet(this, _Highrise_instances, "m", _Highrise_sendKeepalive).call(this), 15000);
        });
        this.ws.addEventListener('message', (message) => this.handleMessage(message));
        this.ws.addEventListener('close', this.close.bind(this));
        this.ws.addEventListener('error', (error) => this.errorHandler(error));
    }
    handleMessage(message) {
        const data = JSON.parse(message.data);
        if (data._type === 'KeepaliveResponse') {
            return;
        }
        const handler = this.responseEventFactory.getHandler(data._type);
        if (handler) {
            handler.handle(data);
        }
        else {
            console.log("No handler for event type: ", data._type);
        }
    }
    close() {
        if (this.keepaliveInterval) {
            clearInterval(this.keepaliveInterval);
            this.keepaliveInterval = null;
        }
    }
    errorHandler(error) {
        console.log("error", error.message);
    }
}
_Highrise_instances = new WeakSet(), _Highrise_sendKeepalive = function _Highrise_sendKeepalive() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
        this.ws.send(JSON.stringify({ _type: eventRequest.KeepaliveRequest, rid: null }));
    }
};
