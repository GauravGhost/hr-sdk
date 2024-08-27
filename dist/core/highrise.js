"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Highrise_instances, _Highrise_sendKeepalive;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highrise = void 0;
const stream_1 = require("stream");
const ws_1 = __importDefault(require("ws"));
const constant_1 = require("../utils/constant");
const ResponseEvent_1 = require("./events/ResponseEvent");
const error_1 = require("../utils/error");
const RequestEventsHandler_1 = __importDefault(require("./events/RequestEventsHandler"));
class Highrise extends stream_1.EventEmitter {
    constructor(token, roomId, options) {
        super();
        _Highrise_instances.add(this);
        this.token = token;
        this.roomId = roomId;
        this.options = options;
        this.ws = null;
        this.options = {};
        this.keepaliveInterval = null;
        this.requestEvent = new RequestEventsHandler_1.default(this);
        this.responseEventFactory = new ResponseEvent_1.ResponseEventFactory(this);
    }
    connect(token, roomId, cb) {
        if ((!token || token === "") && (!this.token || this.token === "")) {
            this.emit(constant_1.eventResponse.Error, new error_1.HighriseError("[Aborted] Please supply a bot token in your configuration file."));
            return;
        }
        if ((!roomId || roomId === "") && (!this.roomId || this.roomId === "")) {
            this.emit(constant_1.eventResponse.Error, new error_1.HighriseError("[Aborted] Please supply a room ID in your configuration file."));
            return;
        }
        this.token = token || this.token;
        this.roomId = roomId || this.roomId;
        this.ws = new ws_1.default(constant_1.constant.WS_ENDPOINT, {
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
exports.Highrise = Highrise;
_Highrise_instances = new WeakSet(), _Highrise_sendKeepalive = function _Highrise_sendKeepalive() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
        this.ws.send(JSON.stringify({ _type: constant_1.eventRequest.KeepaliveRequest, rid: null }));
    }
};
