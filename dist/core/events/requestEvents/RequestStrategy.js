"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEventWithPromiseStrategy = void 0;
const error_1 = require("../../../utils/error");
class RequestEventStrategy {
    constructor(hr, strategy) {
        this.hr = hr;
        this.strategy = strategy;
    }
    execute(incomingPayload) {
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            const payload = this.strategy.createPayload(incomingPayload);
            this.hr.ws.send(JSON.stringify(payload));
        }
        else {
            throw new error_1.WebSocketError("WebSocket is not open. Message cannot be sent");
        }
    }
}
class RequestEventWithPromiseStrategy {
    constructor(hr, strategy) {
        this.hr = hr;
        this.strategy = strategy;
    }
    async execute(incomingPayload) {
        if (this.hr && this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            return new Promise((resolve, reject) => {
                const payload = this.strategy.createPayload(incomingPayload);
                const messageHandler = (event) => {
                    const messageObject = JSON.parse(event.data);
                    if (messageObject.rid === payload.rid) {
                        this.hr.ws.removeEventListener('message', messageHandler);
                        resolve(messageObject);
                    }
                };
                this.hr.ws.addEventListener('message', messageHandler);
                this.hr.ws.send(JSON.stringify(payload), (error) => {
                    if (error) {
                        reject(error);
                    }
                });
                this.hr.ws.onerror = (error) => {
                    reject(new error_1.WebSocketError("WebSocket encountered an error."));
                };
                this.hr.ws.onclose = () => {
                    reject(new error_1.WebSocketError("WebSocket connection closed."));
                };
            });
        }
        else {
            return Promise.reject(new error_1.WebSocketError("WebSocket is not open. Message cannot be sent."));
        }
    }
}
exports.RequestEventWithPromiseStrategy = RequestEventWithPromiseStrategy;
exports.default = RequestEventStrategy;
