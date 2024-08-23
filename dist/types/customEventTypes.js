"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CustomTypedEventEmitter.ts
const events_1 = require("events");
class CustomTypedEventEmitter extends events_1.EventEmitter {
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
}
exports.default = CustomTypedEventEmitter;
