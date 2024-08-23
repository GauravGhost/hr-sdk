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
Object.defineProperty(exports, "__esModule", { value: true });
const AnchoHitHandler_1 = require("./AnchoHitHandler");
const ChatHandler_1 = require("./ChatHandler");
const EmoteHandler_1 = require("./EmoteHandler");
const RequestStrategy_1 = __importStar(require("./RequestStrategy"));
const WalletHandler_1 = require("./WalletHandler");
class RequestEvent {
    constructor(hr) {
        this.hr = hr;
    }
    message(message) {
        const chatStrategy = new ChatHandler_1.ChatHandler();
        const handler = new RequestStrategy_1.default(this.hr, chatStrategy);
        handler.execute({ message: message });
    }
    whisper(message, whisperTargetId) {
        const chatStrategy = new ChatHandler_1.ChatHandler();
        const handler = new RequestStrategy_1.default(this.hr, chatStrategy);
        handler.execute({ message, whisper: true, whisperTargetId });
    }
    emote(emoteId, targetUserId) {
        const emoteStrategy = new EmoteHandler_1.EmoteHandler();
        const handler = new RequestStrategy_1.default(this.hr, emoteStrategy);
        handler.execute({ emoteId, targetUserId });
    }
    sit(entityId, anchorIx = 0) {
        const anchorHitStrategy = new AnchoHitHandler_1.AnchoHitHandler();
        const handler = new RequestStrategy_1.default(this.hr, anchorHitStrategy);
        handler.execute({ entityId, anchorIx });
    }
    async wallet() {
        const walletStrategy = new WalletHandler_1.WalletHandler();
        const handler = new RequestStrategy_1.RequestEventWithPromiseStrategy(this.hr, walletStrategy);
        const response = await handler.execute({});
        return response.content;
    }
    async gold() {
        const wallet = await this.wallet();
        return wallet.find((token) => token.type === "gold");
    }
    async boostToken() {
        const wallet = await this.wallet();
        return wallet.find((token) => token.type === "room_boost_tokens");
    }
    async voiceToken() {
        const wallet = await this.wallet();
        return wallet.find((token) => token.type === "room_voice_tokens");
    }
}
exports.default = RequestEvent;
