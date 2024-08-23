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
const constant_1 = require("./utils/constant");
const RequestEvents_1 = __importDefault(require("./core/events/requestEvents/RequestEvents"));
class Highrise extends stream_1.EventEmitter {
    constructor(token, roomId) {
        super();
        _Highrise_instances.add(this);
        this.token = token;
        this.roomId = roomId;
        this.ws = null;
        this.keepaliveInterval = null;
        this.requestEvent = new RequestEvents_1.default(this);
    }
    connect(token, roomId) {
        if ((!token || token === "") && (!this.token || this.token === "")) {
            console.error("[Aborted] Please supply a bot token in your configuration file.");
            return;
        }
        if ((!roomId || roomId === "") && (!this.roomId || this.roomId === "")) {
            console.error("[Aborted] Please supply a room ID in your configuration file.");
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
        this.addEventListeners();
    }
    addEventListeners() {
        if (!this.ws)
            return;
        this.ws.addEventListener('open', () => {
            console.log(`Connected the bot to the highrise`);
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
        // console.log("data ", JSON.parse(message.data));
        const data = JSON.parse(message.data);
        console.log("event type: ", data._type);
        if (data._type === 'Error') {
            console.log("error event: ", data);
        }
        if ((data === null || data === void 0 ? void 0 : data._type) == constant_1.eventResponse.ChatEvent) {
            console.log("entering chat event");
            this.emit('chatCreate', data.user, data.message);
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
    sendMessage(message) {
        if (this.ws && this.ws.readyState === this.ws.OPEN) {
            let payload;
            if (message.whisper) {
                payload = {
                    _type: constant_1.eventRequest.ChatRequest,
                    message: message.message,
                    whisper_target_id: message.whisper_target_id,
                    rid: message.rid
                };
            }
            else {
                console.log("meesage enter");
                payload = {
                    _type: constant_1.eventRequest.ChatRequest,
                    message: message.message,
                    rid: message.rid
                };
            }
            this.ws.send(JSON.stringify(payload));
        }
        else {
            return console.error("WebSocket is not open. Message cannot be sent.");
        }
    }
}
exports.Highrise = Highrise;
_Highrise_instances = new WeakSet(), _Highrise_sendKeepalive = function _Highrise_sendKeepalive() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
        this.ws.send(JSON.stringify({ _type: constant_1.eventRequest.KeepaliveRequest, rid: null }));
    }
};
