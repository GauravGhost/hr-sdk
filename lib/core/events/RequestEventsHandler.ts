import { AnchorHitPayload, ChangeRoomPrevilegePayload, EmotePayload, Facing, FloorHitPayload, GetBackpackResponse, GetRoomPrivilegePayload, GetRoomPrivilegeResponse, GoldBars, ModerateRoomPayload, ModerationAction, ReactionPayload, TeleportPayload, TipUserPayload, UserWithPosition, MoveUserToRoomPayload, Wallet, WalletType, WhisperPayload, InviteSpeakerPayload, RemoveSpeakerPayload, GetUserOutfitPayload, GetUserOutfitResponse, GetConversationsPayload, GetConversationsResponse, SendMessagePayload, MessageType, SendBulkMessagePayload, GetMessagePayload, GetMessageResponse, Message, LeaveConversationPayload, Item, RoomPermission, BuyVoiceTimePayload, PaymentMethod, BuyVoiceTimeResponse, PaymentResult, BuyRoomBoostPayload, BuyRoomBoostResponse, BuyItemPayload, BuyItemResponse, ChannelPayload, SetOutfitPayload, GetInventoryPayload, GetInventoryResponse, WalkFunction } from "../../types/types";
import { PayloadError, RequestError, ResponseError } from "../../utils/error";
import { catchFn, removeCustomKeys } from "../../utils/utils";
import { anchorSchema, buyItemSchema, buyRoomBoostSchema, buyVoiceTimeSchema, changeRoomPrivilegesSchema, channelSchema, emoteSchema, floorHitSchema, getConversationSchema, getMessageSchema, getOutfitSchema, getRoomPrivilegeSchema, inviteSpeakerSchema, leaveConverationSchema, moderationSchema, moveUserToRoomSchema, positionSchema, removeSpeakerSchema, roomPermissionSchema, sendBulkMessageSchema, sendMessageSchema, setOutfitSchema, teleportSchema, tipUserSchema, userSchema, validate, validateAndThrow, validateEnum, whisperSchema } from "../../utils/validation";
import { Highrise } from "../highrise";
import RequestEventStrategy, { AnchorHitHandler, BuyItemHandler, BuyRoomBoostHandler, BuyVoiceTimeHandler, ChangeRoomPrevilegeHandler, ChannelHandler, ChatHandler, EmoteHandler, FloorHitHandler, GetBackpackHandler, GetConversationsHandler, GetInventoryHandler, GetMessageHandler, GetRoomPrivilegeHandler, GetUserOutfitHandler, InviteSpeakerHandler, LeaveConversationHandler, ModerationHandler, MoveUserToRoomHandler, ReactionHandler, RemoveSpeakerHandler, RequestEventWithPromiseStrategy, RoomUsersHandler, SendBulkMessageHandler, SendMessageHandler, SetOutfitHandler, TeleportHandler, TipUserHandler, WalletHandler } from "./RequestEvent";



class RequestEvent {
    constructor(private hr: Highrise) {
    }
    broadcastMessage(message: string): void {
        try {
            if (!message) {
                throw new PayloadError("Invalid message payload");
            }
            const chatStrategy = new ChatHandler();
            const handler = new RequestEventStrategy(this.hr, chatStrategy);
            handler.execute({ message: message });

        } catch (error) {
            throw error;
        }
    };

    whisper(data: WhisperPayload): void {
        try {
            // Validation Handling.
            validateAndThrow(validate(data, whisperSchema));

            const chatStrategy = new ChatHandler();
            const handler = new RequestEventStrategy(this.hr, chatStrategy);
            handler.execute({ ...data, whisper: true });

        } catch (error) {
            throw error;
        }
    };

    emote(data: EmotePayload): void {
        try {
            // Validation Handling.
            validateAndThrow(validate(data, emoteSchema));

            const emoteStrategy = new EmoteHandler();
            const handler = new RequestEventStrategy(this.hr, emoteStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    sit({ entityId, anchorIx = 0 }: AnchorHitPayload): void {
        try {
            // Validation Handling.
            validateAndThrow(validate({ entityId, anchorIx }, anchorSchema));

            const anchorHitStrategy = new AnchorHitHandler();
            const handler = new RequestEventStrategy(this.hr, anchorHitStrategy);
            handler.execute({ entityId, anchorIx })

        } catch (error) {
            throw error;
        }
    };

    async getWallet(): Promise<Array<Wallet>> {
        try {
            const walletStrategy = new WalletHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, walletStrategy);
            const response = await handler.execute({});
            return response.content;

        } catch (error) {
            throw error;
        }
    };

    async getGold(): Promise<Wallet> {
        try {
            const wallet = await this.getWallet();
            const gold = wallet.find((token) => token.type === WalletType.gold);
            if (!gold) {
                throw new ResponseError("Wallet not found");
            }
            return gold;

        } catch (error) {
            throw error;
        }
    };

    async getBoostToken(): Promise<Wallet> {
        try {
            const wallet = await this.getWallet();
            const boostToken = wallet.find((token) => token.type === WalletType.roomBoostTokens);
            if (!boostToken) {
                throw new ResponseError("Boost token not found");
            }
            return boostToken;

        } catch (error) {
            throw error;
        }
    };

    async getVoiceToken(): Promise<Wallet> {
        try {
            const wallet = await this.getWallet();
            const voiceToken = wallet.find((token) => token.type === WalletType.roomVoiceTokens);
            if (!voiceToken) {
                throw new ResponseError(`Voice token not found`);
            }
            return voiceToken;

        } catch (error) {
            throw error;
        }
    };

    /**
     * @param {FloorHitPayload} data
     */

    walk(data: FloorHitPayload): void {
        try {
            validateAndThrow(validate(data, floorHitSchema));

            const floorHitStrategy = new FloorHitHandler();
            const handler = new RequestEventStrategy(this.hr, floorHitStrategy);
            handler.execute(data);
        } catch (error) {
            throw error;
        }
    };

    teleport(data: TeleportPayload): void {
        try {

            // Validation Handling.
            validateAndThrow(validate(data, teleportSchema));
            validateAndThrow(validate(data.destination, positionSchema));
            validateAndThrow(validateEnum(data.destination.facing, Facing));

            const teleportStrategy = new TeleportHandler();
            const handler = new RequestEventStrategy(this.hr, teleportStrategy);
            handler.execute(data);
        } catch (error) {
            throw error;
        }
    };

    reaction(data: ReactionPayload): void {
        try {
            const reactionStrategy = new ReactionHandler();
            const handler = new RequestEventStrategy(this.hr, reactionStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    }

    async getRooomUsers(): Promise<Array<UserWithPosition>> {
        try {
            const userStrategy = new RoomUsersHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, userStrategy);
            const response = await handler.execute({});
            return response.content;

        } catch (error) {
            throw error;
        }
    };

    async getRoomUserByUsername(username: string): Promise<UserWithPosition> {
        try {
            if (!username) {
                throw new PayloadError("username cannot be empty");
            }
            const users = await this.getRooomUsers();
            const user = users.find((userData: UserWithPosition) => userData[0].username === username);
            if (!user) {
                throw new RequestError(`User with username "${username}" not found`);
            }
            return user;

        } catch (error) {
            throw error;
        }
    };

    async getRoomUserByUserId(userId: string): Promise<UserWithPosition> {
        try {
            if (!userId) {
                throw new PayloadError("userId cannot be empty");
            }
            const users = await this.getRooomUsers();
            const user = users.find((userData: UserWithPosition) => userData[0].id === userId);
            if (!user) {
                throw new RequestError(`User with userId "${userId}" not found`);
            }
            return user;

        } catch (error) {
            throw error;
        }
    };

    tipUser(data: TipUserPayload): void {
        try {
            // Validation Handling.
            validateAndThrow(validate(data, tipUserSchema));
            validateAndThrow(validateEnum(data.goldBar, GoldBars));

            const tipUserStrategy = new TipUserHandler();
            const handler = new RequestEventStrategy(this.hr, tipUserStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    modAction(data: ModerateRoomPayload) {
        try {
            // Validation Handling.
            validateAndThrow(validate(data, moderationSchema));
            validateAndThrow(validateEnum(data.moderationAction, ModerationAction));

            const modStrategy = new ModerationHandler();
            const handler = new RequestEventStrategy(this.hr, modStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    async getRoomPrivilege(data: GetRoomPrivilegePayload): Promise<RoomPermission> {
        try {
            validateAndThrow(validate(data, getRoomPrivilegeSchema));

            const roomPrivilegeStrategy = new GetRoomPrivilegeHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, roomPrivilegeStrategy);
            const response: GetRoomPrivilegeResponse = await handler.execute(data);
            return response.content;

        } catch (error) {
            throw error;
        }
    };

    changeRoomPrivilege(data: ChangeRoomPrevilegePayload): void {
        try {
            validateAndThrow(validate(data, changeRoomPrivilegesSchema));
            validateAndThrow(validate(data.permission, roomPermissionSchema));

            const changeRoomPrivilegeStrategy = new ChangeRoomPrevilegeHandler();
            const handler = new RequestEventStrategy(this.hr, changeRoomPrivilegeStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    moveUserToRoom(data: MoveUserToRoomPayload): void {
        try {
            validateAndThrow(validate(data, moveUserToRoomSchema));

            const moveUserToRoomStrategy = new MoveUserToRoomHandler();
            const handler = new RequestEventStrategy(this.hr, moveUserToRoomStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    async getBackpack(data: { userId: string }): Promise<{ [key: string]: number }> {
        try {
            if (!data.userId) {
                throw new PayloadError("userId is required");
            }

            const backpackStrategy = new GetBackpackHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, backpackStrategy);
            const response: GetBackpackResponse = await handler.execute(data);
            return response.backpack;

        } catch (error) {
            throw error;
        }
    };

    inviteSpeaker(data: InviteSpeakerPayload): void {
        try {
            validateAndThrow(validate(data, inviteSpeakerSchema));

            const inviteSpeakerStrategy = new InviteSpeakerHandler();
            const handler = new RequestEventStrategy(this.hr, inviteSpeakerStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    removeSpeaker(data: RemoveSpeakerPayload): void {
        try {
            validateAndThrow(validate(data, removeSpeakerSchema));

            const removeSpeakerStrategy = new RemoveSpeakerHandler();
            const handler = new RequestEventStrategy(this.hr, removeSpeakerStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    async getOutfitasync(data: GetUserOutfitPayload): Promise<Array<Item>> {
        try {
            validateAndThrow(validate(data, getOutfitSchema));

            const getOutfitStrategy = new GetUserOutfitHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getOutfitStrategy);
            const response: GetUserOutfitResponse = await handler.execute(data);
            return response.outfit;

        } catch (error) {
            throw error;
        }
    };

    setOutfit(data: SetOutfitPayload): void {
        try {
            validateAndThrow(validate(data, setOutfitSchema))

            const setOutfitStrategy = new SetOutfitHandler();
            const handler = new RequestEventStrategy(this.hr, setOutfitStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    async getConveration(data: GetConversationsPayload) {
        try {
            validateAndThrow(validate(data, getConversationSchema));

            const getConverationStragety = new GetConversationsHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getConverationStragety);
            const response = await handler.execute(data);
            const newResponse: GetConversationsResponse = removeCustomKeys(response);
            return newResponse;

        } catch (error) {
            throw error;
        }
    };

    sendMessageToUser(data: SendMessagePayload): void {
        try {
            validateAndThrow(validate(data, sendMessageSchema));
            validateAndThrow(validateEnum(data.type, MessageType));

            const sendMessageStrategy = new SendMessageHandler();
            const handler = new RequestEventStrategy(this.hr, sendMessageStrategy)
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    };

    sendBulkMessageToUser = ((data: SendBulkMessagePayload): void => {
        try {
            validateAndThrow(validate(data, sendBulkMessageSchema));
            validateAndThrow(validateEnum(data.type, MessageType));

            const sendBulkMessageStrategy = new SendBulkMessageHandler();
            const handler = new RequestEventStrategy(this.hr, sendBulkMessageStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    });

    getMessage = (async (data: GetMessagePayload): Promise<Message> => {
        try {
            validateAndThrow(validate(data, getMessageSchema));

            const getMessageStrategy = new GetMessageHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getMessageStrategy);
            const response: GetMessageResponse = await handler.execute(data);
            return response.messages;

        } catch (error) {
            throw error;
        }
    });

    leaveConveration = ((data: LeaveConversationPayload): void => {
        try {
            validateAndThrow(validate(data, leaveConverationSchema));

            const leaveConverationStrategy = new LeaveConversationHandler();
            const handler = new RequestEventStrategy(this.hr, leaveConverationStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    });

    buyVoice = (async (data: BuyVoiceTimePayload): Promise<PaymentResult> => {
        try {
            validateAndThrow(validate(data, buyVoiceTimeSchema));
            validateAndThrow(validateEnum(data.paymentMethod, PaymentMethod));

            const buyVoiceStrategy = new BuyVoiceTimeHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, buyVoiceStrategy);
            const response: BuyVoiceTimeResponse = await handler.execute(data);
            return response.result;

        } catch (error) {
            throw error;
        }
    });

    buyBoost = (async (data: BuyRoomBoostPayload): Promise<PaymentResult> => {
        try {
            validateAndThrow(validate(data, buyRoomBoostSchema));
            validateAndThrow(validateEnum(data.paymentMethod, PaymentMethod));

            const buyRoomBoostStrategy = new BuyRoomBoostHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, buyRoomBoostStrategy);
            const response: BuyRoomBoostResponse = await handler.execute(data);
            return response.result;

        } catch (error) {
            throw error;
        }
    });

    buyItem = (async (data: BuyItemPayload): Promise<PaymentResult> => {
        try {
            validateAndThrow(validate(data, buyItemSchema));

            const buyItemStrategy = new BuyItemHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, buyItemStrategy);
            const response: BuyItemResponse = await handler.execute(data);
            return response.result;

        } catch (error) {
            throw error;
        }
    });

    channel = ((data: ChannelPayload): void => {
        try {
            validateAndThrow(validate(data, channelSchema));

            const channelStrategy = new ChannelHandler();
            const handler = new RequestEventStrategy(this.hr, channelStrategy);
            handler.execute(data);

        } catch (error) {
            throw error;
        }
    });

    getInventory = (async (): Promise<Array<Item>> => {
        try {
            const getInventoryStrategy = new GetInventoryHandler();
            const handler = new RequestEventWithPromiseStrategy(this.hr, getInventoryStrategy);
            const response: GetInventoryResponse = await handler.execute({})
            return response.items;

        } catch (error) {
            throw error;
        }
    })

}
export default RequestEvent;