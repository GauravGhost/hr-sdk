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
        this.sendBulkMessage = ((data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.sendBulkMessageSchema));
                (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.type, types_1.MessageType));
                const sendBulkMessageStrategy = new RequestEvent_1.SendBulkMessageHandler();
                const handler = new RequestEvent_1.default(this.hr, sendBulkMessageStrategy);
                handler.execute(data);
            }
            catch (error) {
                throw error;
            }
        });
        this.getMessage = (async (data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.getMessageSchema));
                const getMessageStrategy = new RequestEvent_1.GetMessageHandler();
                const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, getMessageStrategy);
                const response = await handler.execute(data);
                return response.messages;
            }
            catch (error) {
                throw error;
            }
        });
        this.leaveConveration = ((data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.leaveConverationSchema));
                const leaveConverationStrategy = new RequestEvent_1.LeaveConversationHandler();
                const handler = new RequestEvent_1.default(this.hr, leaveConverationStrategy);
                handler.execute(data);
            }
            catch (error) {
                throw error;
            }
        });
        this.buyVoice = (async (data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.buyVoiceTimeSchema));
                (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.paymentMethod, types_1.PaymentMethod));
                const buyVoiceStrategy = new RequestEvent_1.BuyVoiceTimeHandler();
                const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, buyVoiceStrategy);
                const response = await handler.execute(data);
                return response.result;
            }
            catch (error) {
                throw error;
            }
        });
        this.buyBoost = (async (data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.buyRoomBoostSchema));
                (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.paymentMethod, types_1.PaymentMethod));
                const buyRoomBoostStrategy = new RequestEvent_1.BuyRoomBoostHandler();
                const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, buyRoomBoostStrategy);
                const response = await handler.execute(data);
                return response.result;
            }
            catch (error) {
                throw error;
            }
        });
        this.buyItem = (async (data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.buyItemSchema));
                const buyItemStrategy = new RequestEvent_1.BuyItemHandler();
                const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, buyItemStrategy);
                const response = await handler.execute(data);
                return response.result;
            }
            catch (error) {
                throw error;
            }
        });
        this.channel = ((data) => {
            try {
                (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.channelSchema));
                const channelStrategy = new RequestEvent_1.ChannelHandler();
                const handler = new RequestEvent_1.default(this.hr, channelStrategy);
                handler.execute(data);
            }
            catch (error) {
                throw error;
            }
        });
        this.getInventory = (async () => {
            try {
                const getInventoryStrategy = new RequestEvent_1.GetInventoryHandler();
                const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, getInventoryStrategy);
                const response = await handler.execute({});
                return response.items;
            }
            catch (error) {
                throw error;
            }
        });
    }
    message(message) {
        try {
            if (!message) {
                throw new error_1.PayloadError("Invalid message payload");
            }
            const chatStrategy = new RequestEvent_1.ChatHandler();
            const handler = new RequestEvent_1.default(this.hr, chatStrategy);
            handler.execute({ message: message });
        }
        catch (error) {
            throw error;
        }
    }
    ;
    whisper(data) {
        try {
            // Validation Handling.
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.whisperSchema));
            const chatStrategy = new RequestEvent_1.ChatHandler();
            const handler = new RequestEvent_1.default(this.hr, chatStrategy);
            handler.execute({ ...data, whisper: true });
        }
        catch (error) {
            throw error;
        }
    }
    ;
    emote(data) {
        try {
            // Validation Handling.
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.emoteSchema));
            const emoteStrategy = new RequestEvent_1.EmoteHandler();
            const handler = new RequestEvent_1.default(this.hr, emoteStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    sit({ entityId, anchorIx = 0 }) {
        try {
            // Validation Handling.
            (0, validation_1.validateAndThrow)((0, validation_1.validate)({ entityId, anchorIx }, validation_1.anchorSchema));
            const anchorHitStrategy = new RequestEvent_1.AnchorHitHandler();
            const handler = new RequestEvent_1.default(this.hr, anchorHitStrategy);
            handler.execute({ entityId, anchorIx });
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getWallet() {
        try {
            const walletStrategy = new RequestEvent_1.WalletHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, walletStrategy);
            const response = await handler.execute({});
            return response.content;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getGold() {
        try {
            const wallet = await this.getWallet();
            const gold = wallet.find((token) => token.type === types_1.WalletType.gold);
            if (!gold) {
                throw new error_1.ResponseError("Wallet not found");
            }
            return gold;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getBoostToken() {
        try {
            const wallet = await this.getWallet();
            const boostToken = wallet.find((token) => token.type === types_1.WalletType.roomBoostTokens);
            if (!boostToken) {
                throw new error_1.ResponseError("Boost token not found");
            }
            return boostToken;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getVoiceToken() {
        try {
            const wallet = await this.getWallet();
            const voiceToken = wallet.find((token) => token.type === types_1.WalletType.roomVoiceTokens);
            if (!voiceToken) {
                throw new error_1.ResponseError(`Voice token not found`);
            }
            return voiceToken;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    /**
     * @param {FloorHitPayload} data
     */
    walk(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.floorHitSchema));
            const floorHitStrategy = new RequestEvent_1.FloorHitHandler();
            const handler = new RequestEvent_1.default(this.hr, floorHitStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    teleport(data) {
        try {
            // Validation Handling.
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.teleportSchema));
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data.destination, validation_1.positionSchema));
            (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.destination.facing, types_1.Facing));
            const teleportStrategy = new RequestEvent_1.TeleportHandler();
            const handler = new RequestEvent_1.default(this.hr, teleportStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    reaction(data) {
        try {
            const reactionStrategy = new RequestEvent_1.ReactionHandler();
            const handler = new RequestEvent_1.default(this.hr, reactionStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    async getRooomUsers() {
        try {
            const userStrategy = new RequestEvent_1.RoomUsersHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, userStrategy);
            const response = await handler.execute({});
            return response.content;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getRoomUserByUsername(username) {
        try {
            if (!username) {
                throw new error_1.PayloadError("username cannot be empty");
            }
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].username === username);
            if (!user) {
                throw new error_1.RequestError(`User with username "${username}" not found`);
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getRoomUserByUserId(userId) {
        try {
            if (!userId) {
                throw new error_1.PayloadError("userId cannot be empty");
            }
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].id === userId);
            if (!user) {
                throw new error_1.RequestError(`User with userId "${userId}" not found`);
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    tipUser(data) {
        try {
            // Validation Handling.
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.tipUserSchema));
            (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.goldBar, types_1.GoldBars));
            const tipUserStrategy = new RequestEvent_1.TipUserHandler();
            const handler = new RequestEvent_1.default(this.hr, tipUserStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    modAction(data) {
        try {
            // Validation Handling.
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.moderationSchema));
            (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.moderationAction, types_1.ModerationAction));
            const modStrategy = new RequestEvent_1.ModerationHandler();
            const handler = new RequestEvent_1.default(this.hr, modStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getRoomPrivilege(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.getRoomPrivilegeSchema));
            const roomPrivilegeStrategy = new RequestEvent_1.GetRoomPrivilegeHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, roomPrivilegeStrategy);
            const response = await handler.execute(data);
            return response.content;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    changeRoomPrivilege(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.changeRoomPrivilegesSchema));
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data.permission, validation_1.roomPermissionSchema));
            const changeRoomPrivilegeStrategy = new RequestEvent_1.ChangeRoomPrevilegeHandler();
            const handler = new RequestEvent_1.default(this.hr, changeRoomPrivilegeStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    moveUserToRoom(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.moveUserToRoomSchema));
            const moveUserToRoomStrategy = new RequestEvent_1.MoveUserToRoomHandler();
            const handler = new RequestEvent_1.default(this.hr, moveUserToRoomStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getBackpack(data) {
        try {
            if (!data.userId) {
                throw new error_1.PayloadError("userId is required");
            }
            const backpackStrategy = new RequestEvent_1.GetBackpackHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, backpackStrategy);
            const response = await handler.execute(data);
            return response.backpack;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    inviteSpeaker(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.inviteSpeakerSchema));
            const inviteSpeakerStrategy = new RequestEvent_1.InviteSpeakerHandler();
            const handler = new RequestEvent_1.default(this.hr, inviteSpeakerStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    removeSpeaker(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.removeSpeakerSchema));
            const removeSpeakerStrategy = new RequestEvent_1.RemoveSpeakerHandler();
            const handler = new RequestEvent_1.default(this.hr, removeSpeakerStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getOutfitasync(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.getOutfitSchema));
            const getOutfitStrategy = new RequestEvent_1.GetUserOutfitHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, getOutfitStrategy);
            const response = await handler.execute(data);
            return response.outfit;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    setOutfit(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.setOutfitSchema));
            const setOutfitStrategy = new RequestEvent_1.SetOutfitHandler();
            const handler = new RequestEvent_1.default(this.hr, setOutfitStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
    async getConveration(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.getConversationSchema));
            const getConverationStragety = new RequestEvent_1.GetConversationsHandler();
            const handler = new RequestEvent_1.RequestEventWithPromiseStrategy(this.hr, getConverationStragety);
            const response = await handler.execute(data);
            const newResponse = (0, utils_1.removeCustomKeys)(response);
            return newResponse;
        }
        catch (error) {
            throw error;
        }
    }
    ;
    sendMessage(data) {
        try {
            (0, validation_1.validateAndThrow)((0, validation_1.validate)(data, validation_1.sendMessageSchema));
            (0, validation_1.validateAndThrow)((0, validation_1.validateEnum)(data.type, types_1.MessageType));
            const sendMessageStrategy = new RequestEvent_1.SendMessageHandler();
            const handler = new RequestEvent_1.default(this.hr, sendMessageStrategy);
            handler.execute(data);
        }
        catch (error) {
            throw error;
        }
    }
    ;
}
exports.default = RequestEvent;
