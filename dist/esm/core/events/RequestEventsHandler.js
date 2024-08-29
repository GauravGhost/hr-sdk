import { Facing, GoldBars, ModerationAction, WalletType, MessageType, PaymentMethod } from "../../types/types";
import { PayloadError, RequestError, ResponseError } from "../../utils/error";
import { catchFn, removeCustomKeys } from "../../utils/utils";
import { anchorSchema, buyItemSchema, buyRoomBoostSchema, buyVoiceTimeSchema, changeRoomPrivilegesSchema, channelSchema, emoteSchema, floorHitSchema, getConversationSchema, getMessageSchema, getOutfitSchema, getRoomPrivilegeSchema, inviteSpeakerSchema, leaveConverationSchema, moderationSchema, moveUserToRoomSchema, positionSchema, removeSpeakerSchema, roomPermissionSchema, sendBulkMessageSchema, sendMessageSchema, setOutfitSchema, teleportSchema, tipUserSchema, validate, validateAndThrow, validateEnum, whisperSchema } from "../../utils/validation";
import RequestEventStrategy, { AnchorHitHandler, BuyItemHandler, BuyRoomBoostHandler, BuyVoiceTimeHandler, ChangeRoomPrevilegeHandler, ChannelHandler, ChatHandler, EmoteHandler, FloorHitHandler, GetBackpackHandler, GetConversationsHandler, GetInventoryHandler, GetMessageHandler, GetRoomPrivilegeHandler, GetUserOutfitHandler, InviteSpeakerHandler, LeaveConversationHandler, ModerationHandler, MoveUserToRoomHandler, ReactionHandler, RemoveSpeakerHandler, RequestEventWithPromiseStrategy, RoomUsersHandler, SendBulkMessageHandler, SendMessageHandler, SetOutfitHandler, TeleportHandler, TipUserHandler, WalletHandler } from "./RequestEvent";
class RequestEvent {
    constructor(hr) {
        this.hr = hr;
        this.message = catchFn((message) => {
            if (!message) {
                throw new PayloadError("Invalid message payload");
            }
            const chatStrategy = new ChatHandler();
            const handler = new RequestEventStrategy(this.hr, chatStrategy);
            handler.execute({ message: message });
        });
        this.whisper = catchFn((data) => {
            // Validation Handling.
            validateAndThrow(validate(data, whisperSchema));
            const chatStrategy = new ChatHandler();
            const handler = new RequestEventStrategy(this.hr, chatStrategy);
            handler.execute({ ...data, whisper: true });
        });
        this.emote = catchFn((data) => {
            // Validation Handling.
            validateAndThrow(validate(data, emoteSchema));
            const emoteStrategy = new EmoteHandler();
            const handler = new RequestEventStrategy(this.hr, emoteStrategy);
            handler.execute(data);
        });
        this.sit = catchFn(({ entityId, anchorIx = 0 }) => {
            // Validation Handling.
            validateAndThrow(validate({ entityId, anchorIx }, anchorSchema));
            const anchorHitStrategy = new AnchorHitHandler();
            const handler = new RequestEventStrategy(this.hr, anchorHitStrategy);
            handler.execute({ entityId, anchorIx });
        });
        this.getWallet = catchFn(async () => {
            const walletStrategy = new WalletHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, walletStrategy);
            const response = await handler.execute({});
            return response.content;
        });
        this.getGold = catchFn(async () => {
            const wallet = await this.getWallet();
            const gold = wallet.find((token) => token.type === WalletType.gold);
            if (!gold) {
                throw new ResponseError("Wallet not found");
            }
            return gold;
        });
        this.getBoostToken = catchFn(async () => {
            const wallet = await this.getWallet();
            const boostToken = wallet.find((token) => token.type === WalletType.roomBoostTokens);
            if (!boostToken) {
                throw new ResponseError("Boost token not found");
            }
            return boostToken;
        });
        this.getVoiceToken = catchFn(async () => {
            const wallet = await this.getWallet();
            const voiceToken = wallet.find((token) => token.type === WalletType.roomVoiceTokens);
            if (!voiceToken) {
                throw new ResponseError(`Voice token not found`);
            }
            return voiceToken;
        });
        this.walk = catchFn((data) => {
            validateAndThrow(validate(data, floorHitSchema));
            const floorHitStrategy = new FloorHitHandler();
            const handler = new RequestEventStrategy(this.hr, floorHitStrategy);
            handler.execute(data);
        });
        this.teleport = catchFn((data) => {
            // Validation Handling.
            validateAndThrow(validate(data, teleportSchema));
            validateAndThrow(validate(data.destination, positionSchema));
            validateAndThrow(validateEnum(data.destination.facing, Facing));
            const teleportStrategy = new TeleportHandler();
            const handler = new RequestEventStrategy(this.hr, teleportStrategy);
            handler.execute(data);
        });
        this.reaction = catchFn((data) => {
            const reactionStrategy = new ReactionHandler();
            const handler = new RequestEventStrategy(this.hr, reactionStrategy);
            handler.execute(data);
        });
        this.getRooomUsers = catchFn(async () => {
            const userStrategy = new RoomUsersHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, userStrategy);
            const response = await handler.execute({});
            return response.content;
        });
        this.getRoomUserByUsername = catchFn(async (username) => {
            if (!username) {
                throw new PayloadError("username cannot be empty");
            }
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].username === username);
            if (!user) {
                throw new RequestError(`User with username "${username}" not found`);
            }
            return user;
        });
        this.getRoomUserByUserId = catchFn(async (userId) => {
            if (!userId) {
                throw new PayloadError("userId cannot be empty");
            }
            const users = await this.getRooomUsers();
            const user = users.find((userData) => userData[0].id === userId);
            if (!user) {
                throw new RequestError(`User with userId "${userId}" not found`);
            }
            return user;
        });
        this.tipUser = catchFn((data) => {
            // Validation Handling.
            validateAndThrow(validate(data, tipUserSchema));
            validateAndThrow(validateEnum(data.goldBar, GoldBars));
            const tipUserStrategy = new TipUserHandler();
            const handler = new RequestEventStrategy(this.hr, tipUserStrategy);
            handler.execute(data);
        });
        this.modAction = catchFn((data) => {
            // Validation Handling.
            validateAndThrow(validate(data, moderationSchema));
            validateAndThrow(validateEnum(data.moderationAction, ModerationAction));
            const modStrategy = new ModerationHandler();
            const handler = new RequestEventStrategy(this.hr, modStrategy);
            handler.execute(data);
        });
        this.getRoomPrivilege = catchFn(async (data) => {
            validateAndThrow(validate(data, getRoomPrivilegeSchema));
            const roomPrivilegeStrategy = new GetRoomPrivilegeHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, roomPrivilegeStrategy);
            const response = await handler.execute(data);
            return response.content;
        });
        this.changeRoomPrivilege = catchFn((data) => {
            validateAndThrow(validate(data, changeRoomPrivilegesSchema));
            validateAndThrow(validate(data.permission, roomPermissionSchema));
            const changeRoomPrivilegeStrategy = new ChangeRoomPrevilegeHandler();
            const handler = new RequestEventStrategy(this.hr, changeRoomPrivilegeStrategy);
            handler.execute(data);
        });
        this.moveUserToRoom = catchFn((data) => {
            validateAndThrow(validate(data, moveUserToRoomSchema));
            const moveUserToRoomStrategy = new MoveUserToRoomHandler();
            const handler = new RequestEventStrategy(this.hr, moveUserToRoomStrategy);
            handler.execute(data);
        });
        this.getBackpack = catchFn(async (data) => {
            if (!data.userId) {
                throw new PayloadError("userId is required");
            }
            const backpackStrategy = new GetBackpackHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, backpackStrategy);
            const response = await handler.execute(data);
            return response.backpack;
        });
        this.inviteSpeaker = catchFn((data) => {
            validateAndThrow(validate(data, inviteSpeakerSchema));
            const inviteSpeakerStrategy = new InviteSpeakerHandler();
            const handler = new RequestEventStrategy(this.hr, inviteSpeakerStrategy);
            handler.execute(data);
        });
        this.removeSpeaker = catchFn((data) => {
            validateAndThrow(validate(data, removeSpeakerSchema));
            const removeSpeakerStrategy = new RemoveSpeakerHandler();
            const handler = new RequestEventStrategy(this.hr, removeSpeakerStrategy);
            handler.execute(data);
        });
        this.getOutfit = catchFn(async (data) => {
            validateAndThrow(validate(data, getOutfitSchema));
            const getOutfitStrategy = new GetUserOutfitHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getOutfitStrategy);
            const response = await handler.execute(data);
            return response.outfit;
        });
        this.setOutfit = catchFn((data) => {
            validateAndThrow(validate(data, setOutfitSchema));
            const setOutfitStrategy = new SetOutfitHandler();
            const handler = new RequestEventStrategy(this.hr, setOutfitStrategy);
            handler.execute(data);
        });
        this.getConveration = catchFn(async (data) => {
            validateAndThrow(validate(data, getConversationSchema));
            const getConverationStragety = new GetConversationsHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getConverationStragety);
            const response = await handler.execute(data);
            const newResponse = removeCustomKeys(response);
            return newResponse;
        });
        this.sendMessage = catchFn((data) => {
            validateAndThrow(validate(data, sendMessageSchema));
            validateAndThrow(validateEnum(data.type, MessageType));
            const sendMessageStrategy = new SendMessageHandler();
            const handler = new RequestEventStrategy(this.hr, sendMessageStrategy);
            handler.execute(data);
        });
        this.sendBulkMessage = catchFn((data) => {
            validateAndThrow(validate(data, sendBulkMessageSchema));
            validateAndThrow(validateEnum(data.type, MessageType));
            const sendBulkMessageStrategy = new SendBulkMessageHandler();
            const handler = new RequestEventStrategy(this.hr, sendBulkMessageStrategy);
            handler.execute(data);
        });
        this.getMessage = catchFn(async (data) => {
            validateAndThrow(validate(data, getMessageSchema));
            const getMessageStrategy = new GetMessageHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getMessageStrategy);
            const response = await handler.execute(data);
            return response.messages;
        });
        this.leaveConveration = catchFn((data) => {
            validateAndThrow(validate(data, leaveConverationSchema));
            const leaveConverationStrategy = new LeaveConversationHandler();
            const handler = new RequestEventStrategy(this.hr, leaveConverationStrategy);
            handler.execute(data);
        });
        this.buyVoice = catchFn(async (data) => {
            validateAndThrow(validate(data, buyVoiceTimeSchema));
            validateAndThrow(validateEnum(data.paymentMethod, PaymentMethod));
            const buyVoiceStrategy = new BuyVoiceTimeHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, buyVoiceStrategy);
            const response = await handler.execute(data);
            return response.result;
        });
        this.buyBoost = catchFn(async (data) => {
            validateAndThrow(validate(data, buyRoomBoostSchema));
            validateAndThrow(validateEnum(data.paymentMethod, PaymentMethod));
            const buyRoomBoostStrategy = new BuyRoomBoostHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, buyRoomBoostStrategy);
            const response = await handler.execute(data);
            return response.result;
        });
        this.buyItem = catchFn(async (data) => {
            validateAndThrow(validate(data, buyItemSchema));
            const buyItemStrategy = new BuyItemHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, buyItemStrategy);
            const response = await handler.execute(data);
            return response.result;
        });
        this.channel = catchFn((data) => {
            validateAndThrow(validate(data, channelSchema));
            const channelStrategy = new ChannelHandler();
            const handler = new RequestEventStrategy(this.hr, channelStrategy);
            handler.execute(data);
        });
        this.getInventory = catchFn(async () => {
            const getInventoryStrategy = new GetInventoryHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getInventoryStrategy);
            const response = await handler.execute({});
            return response.items;
        });
    }
}
export default RequestEvent;
