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
const error_1 = require("../../utils/error");
const RequestEvent_1 = __importStar(require("./RequestEvent"));
class RequestEvent {
    constructor(hr) {
        this.hr = hr;
    }
    message(message) {
        const chatStrategy = new RequestEvent_1.ChatHandler();
        const handler = new RequestEvent_1.default(this.hr, chatStrategy);
        handler.execute({ message: message });
    }
    whisper(data) {
        const chatStrategy = new RequestEvent_1.ChatHandler();
        const handler = new RequestEvent_1.default(this.hr, chatStrategy);
        handler.execute({ ...data, whisper: true });
    }
    emote(data) {
        const emoteStrategy = new RequestEvent_1.EmoteHandler();
        const handler = new RequestEvent_1.default(this.hr, emoteStrategy);
        handler.execute(data);
    }
    sit({ entityId, anchorIx = 0 }) {
        const anchorHitStrategy = new RequestEvent_1.AnchorHitHandler();
        const handler = new RequestEvent_1.default(this.hr, anchorHitStrategy);
        handler.execute({ entityId, anchorIx });
    }
    async wallet() {
        const walletStrategy = new RequestEvent_1.WalletHandler();
        const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, walletStrategy);
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
    // x: number, y: number, z: number, facing: Facing = Facing.FrontLeft
    async walk(data) {
        const floorHitStrategy = new RequestEvent_1.FloorHitHandler();
        const handler = new RequestEvent_1.default(this.hr, floorHitStrategy);
        handler.execute(data);
    }
    async teleport(data) {
        const teleportStrategy = new RequestEvent_1.TeleportHandler();
        const handler = new RequestEvent_1.default(this.hr, teleportStrategy);
        handler.execute(data);
    }
    async reaction(data) {
        const reactionStrategy = new RequestEvent_1.ReactionHandler();
        const handler = new RequestEvent_1.default(this.hr, reactionStrategy);
        handler.execute(data);
    }
    async getRooomUsers() {
        const userStrategy = new RequestEvent_1.RoomUsersHandler();
        const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, userStrategy);
        const response = await handler.execute({});
        return response.content;
    }
    async getRoomUserByUsername(username) {
        try {
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].username === username);
            if (user) {
                return user;
            }
            else {
                throw new error_1.RequestError(`User with username "${username}" not found`);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getRoomUserByUserId(userId) {
        try {
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].id === userId);
            if (user) {
                return user;
            }
            else {
                throw new error_1.RequestError(`User with userId "${userId}" not found`);
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = RequestEvent;
