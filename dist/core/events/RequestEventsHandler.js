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
const types_1 = require("../../types/types");
const error_1 = require("../../utils/error");
const utils_1 = require("../../utils/utils");
const validation_1 = require("../../utils/validation");
const RequestEvent_1 = __importStar(require("./RequestEvent"));
class RequestEvent {
    constructor(hr) {
        this.hr = hr;
        this.message = (0, utils_1.catchFn)((message) => {
            const chatStrategy = new RequestEvent_1.ChatHandler();
            const handler = new RequestEvent_1.default(this.hr, chatStrategy);
            handler.execute({ message: message });
        });
        this.whisper = (0, utils_1.catchFn)((data) => {
            const chatStrategy = new RequestEvent_1.ChatHandler();
            const handler = new RequestEvent_1.default(this.hr, chatStrategy);
            handler.execute({ ...data, whisper: true });
        });
        this.emote = (0, utils_1.catchFn)((data) => {
            const emoteStrategy = new RequestEvent_1.EmoteHandler();
            const handler = new RequestEvent_1.default(this.hr, emoteStrategy);
            handler.execute(data);
        });
        this.sit = (0, utils_1.catchFn)(({ entityId, anchorIx = 0 }) => {
            const anchorHitStrategy = new RequestEvent_1.AnchorHitHandler();
            const handler = new RequestEvent_1.default(this.hr, anchorHitStrategy);
            handler.execute({ entityId, anchorIx });
        });
        this.wallet = (0, utils_1.catchFn)(async () => {
            const walletStrategy = new RequestEvent_1.WalletHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, walletStrategy);
            const response = await handler.execute({});
            return response.content;
        });
        this.gold = (0, utils_1.catchFn)(async () => {
            const wallet = await this.wallet();
            return wallet.find((token) => token.type === types_1.WalletType.gold);
        });
        this.boostToken = (0, utils_1.catchFn)(async () => {
            const wallet = await this.wallet();
            return wallet.find((token) => token.type === types_1.WalletType.roomBoostTokens);
        });
        this.voiceToken = (0, utils_1.catchFn)(async () => {
            const wallet = await this.wallet();
            return wallet.find((token) => token.type === types_1.WalletType.roomVoiceTokens);
        });
        // x: number, y: number, z: number, facing: Facing = Facing.FrontLeft
        this.walk = (0, utils_1.catchFn)(async (data) => {
            const floorHitStrategy = new RequestEvent_1.FloorHitHandler();
            const handler = new RequestEvent_1.default(this.hr, floorHitStrategy);
            handler.execute(data);
        });
        this.teleport = (0, utils_1.catchFn)((data) => {
            const teleportStrategy = new RequestEvent_1.TeleportHandler();
            const handler = new RequestEvent_1.default(this.hr, teleportStrategy);
            handler.execute(data);
        });
        this.reaction = (0, utils_1.catchFn)((data) => {
            const reactionStrategy = new RequestEvent_1.ReactionHandler();
            const handler = new RequestEvent_1.default(this.hr, reactionStrategy);
            handler.execute(data);
        });
        this.getRooomUsers = (0, utils_1.catchFn)(async () => {
            const userStrategy = new RequestEvent_1.RoomUsersHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, userStrategy);
            const response = await handler.execute({});
            return response.content;
        });
        this.getRoomUserByUsername = (0, utils_1.catchFn)(async (username) => {
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].username === username);
            if (user) {
                return user;
            }
            else {
                throw new error_1.RequestError(`User with username "${username}" not found`);
            }
        });
        this.getRoomUserByUserId = (0, utils_1.catchFn)(async (userId) => {
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].id === userId);
            if (user) {
                return user;
            }
            else {
                throw new error_1.RequestError(`User with userId "${userId}" not found`);
            }
        });
        this.tipUser = (0, utils_1.catchFn)((data) => {
            const error = (0, validation_1.validate)(data, validation_1.tipUserSchema);
            if (error) {
                throw new error_1.PayloadError(error);
            }
            const enumError = (0, validation_1.validateEnum)(data.goldBar, types_1.GoldBars);
            if (enumError) {
                throw new error_1.PayloadError(enumError);
            }
            const tipUserStrategy = new RequestEvent_1.TipUserHandler();
            const handler = new RequestEvent_1.default(this.hr, tipUserStrategy);
            handler.execute(data);
        });
    }
}
exports.default = RequestEvent;
