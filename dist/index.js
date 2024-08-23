"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApi = exports.event = exports.HR = void 0;
const Client_1 = __importDefault(require("./core/Client"));
exports.HR = Client_1.default;
const constant_1 = require("./utils/constant");
Object.defineProperty(exports, "event", { enumerable: true, get: function () { return constant_1.emitEvent; } });
const WebApiImpl_1 = require("./core/apis/WebApiImpl");
Object.defineProperty(exports, "webApi", { enumerable: true, get: function () { return WebApiImpl_1.webApiImpl; } });
exports.default = Client_1.default;
