"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.PaymentMethod = exports.ModerationAction = exports.PaymentResult = exports.MessageType = exports.GoldBars = exports.Facing = exports.Reaction = exports.webApi = exports.event = exports.HR = void 0;
const Client_1 = __importDefault(require("./core/Client"));
exports.HR = Client_1.default;
const WebApiImpl_1 = require("./core/apis/WebApiImpl");
Object.defineProperty(exports, "webApi", { enumerable: true, get: function () { return WebApiImpl_1.webApiImpl; } });
const types = __importStar(require("./types/types"));
exports.types = types;
const types_1 = require("./types/types");
Object.defineProperty(exports, "event", { enumerable: true, get: function () { return types_1.EmitEvent; } });
Object.defineProperty(exports, "Reaction", { enumerable: true, get: function () { return types_1.Reaction; } });
Object.defineProperty(exports, "Facing", { enumerable: true, get: function () { return types_1.Facing; } });
Object.defineProperty(exports, "GoldBars", { enumerable: true, get: function () { return types_1.GoldBars; } });
Object.defineProperty(exports, "MessageType", { enumerable: true, get: function () { return types_1.MessageType; } });
Object.defineProperty(exports, "PaymentResult", { enumerable: true, get: function () { return types_1.PaymentResult; } });
Object.defineProperty(exports, "ModerationAction", { enumerable: true, get: function () { return types_1.ModerationAction; } });
Object.defineProperty(exports, "PaymentMethod", { enumerable: true, get: function () { return types_1.PaymentMethod; } });
exports.default = Client_1.default;
