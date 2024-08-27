import { AnchorHitPayload, ChangeRoomPrevilegePayload, EmotePayload, Facing, FloorHitPayload, GetBackpackResponse, GetRoomPrivilegePayload, GetRoomPrivilegeResponse, GoldBars, ModerateRoomPayload, ModerationAction, ReactionPayload, TeleportPayload, TipUserPayload, User, UserWithPosition, Wallet, WalletType, WhisperPayload } from "../../types/types";
import { PayloadError, RequestError, ResponseError } from "../../utils/error";
import { catchFn } from "../../utils/utils";
import { anchorSchema, changeRoomPrivilegesSchema, emoteSchema, floorHitSchema, getRoomPrivilegeSchema, moderationSchema, positionSchema, roomPermissionSchema, teleportSchema, tipUserSchema, userSchema, validate, validateAndThrow, validateEnum, whisperSchema } from "../../utils/validation";
import { Highrise } from "../highrise";
import RequestEventStrategy, { AnchorHitHandler, ChangeRoomPrevilegeHandler, ChatHandler, EmoteHandler, FloorHitHandler, GetBackPackHandler, GetRoomPrivilegeHandler, ModerationHandler, ReactionHandler, RequestEventWithPromiseStrategy, RoomUsersHandler, TeleportHandler, TipUserHandler, WalletHandler } from "./RequestEvent";



class RequestEvent {
    constructor(private hr: Highrise) {
    }
    message = catchFn((message: string) => {
        if (!message) {
            throw new PayloadError("Invalid message payload");
        }
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ message: message });
    })

    whisper = catchFn((data: WhisperPayload) => {
        // Validation Handling.
        validateAndThrow(validate(data, whisperSchema));
       
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ ...data, whisper: true });
    })

    emote = catchFn((data: EmotePayload) => {
        // Validation Handling.
        validateAndThrow(validate(data, emoteSchema));
        
        const emoteStrategy = new EmoteHandler();
        const handler = new RequestEventStrategy(this.hr, emoteStrategy);
        handler.execute(data);
    })

    sit = catchFn(({ entityId, anchorIx = 0 }: AnchorHitPayload) => {
        // Validation Handling.
        validateAndThrow(validate({ entityId, anchorIx }, anchorSchema));
       
        const anchorHitStrategy = new AnchorHitHandler();
        const handler = new RequestEventStrategy(this.hr, anchorHitStrategy);
        handler.execute({ entityId, anchorIx })
    })

    wallet = catchFn(async (): Promise<Array<Wallet>> => {
        const walletStrategy = new WalletHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, walletStrategy);
        const response = await handler.execute({});
        return response.content;
    })

    gold = catchFn(async (): Promise<Wallet> => {
        const wallet = await this.wallet();
        const gold = wallet.find((token) => token.type === WalletType.gold);
        if (!gold) {
            throw new ResponseError("Wallet not found");
        }
        return gold;
    })

    boostToken = catchFn(async (): Promise<Wallet> => {
        const wallet = await this.wallet();
        const boostToken = wallet.find((token) => token.type === WalletType.roomBoostTokens);
        if (!boostToken) {
            throw new ResponseError("Boost token not found");
        }
        return boostToken;
    })

    voiceToken = catchFn(async (): Promise<Wallet> => {
        const wallet = await this.wallet();
        const voiceToken = wallet.find((token) => token.type === WalletType.roomVoiceTokens);
        if (!voiceToken) {
            throw new ResponseError(`Voice token not found`);
        }
        return voiceToken;
    })

    walk = catchFn(async (data: FloorHitPayload) => {
       validateAndThrow(validate(data, floorHitSchema));
       
        const floorHitStrategy = new FloorHitHandler();
        const handler = new RequestEventStrategy(this.hr, floorHitStrategy);
        handler.execute(data);
    })

    teleport = catchFn((data: TeleportPayload) => {
        // Validation Handling.
        validateAndThrow(validate(data, teleportSchema));
        validateAndThrow(validate(data.destination, positionSchema));
        validateAndThrow(validateEnum(data.destination.facing, Facing));

        const teleportStrategy = new TeleportHandler();
        const handler = new RequestEventStrategy(this.hr, teleportStrategy);
        handler.execute(data);
    })

    reaction = catchFn((data: ReactionPayload) => {
        const reactionStrategy = new ReactionHandler();
        const handler = new RequestEventStrategy(this.hr, reactionStrategy);
        handler.execute(data);
    })

    getRooomUsers = catchFn(async (): Promise<Array<UserWithPosition>> => {
        const userStrategy = new RoomUsersHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, userStrategy);
        const response = await handler.execute({});
        return response.content;
    })

    getRoomUserByUsername = catchFn(async (username: string): Promise<UserWithPosition> => {
        if (!username) {
            throw new PayloadError("username cannot be empty");
        }
        const users = await this.getRooomUsers();
        const user = users.find((userData: UserWithPosition) => userData[0].username === username);
        if (!user) {
            throw new RequestError(`User with username "${username}" not found`);
        }
        return user;
    })

    getRoomUserByUserId = catchFn(async (userId: string): Promise<UserWithPosition> => {
        if (!userId) {
            throw new PayloadError("userId cannot be empty");
        }
        const users = await this.getRooomUsers();
        const user = users.find((userData: UserWithPosition) => userData[0].id === userId);
        if (!user) {
            throw new RequestError(`User with userId "${userId}" not found`);
        }
        return user;
    })

    tipUser = catchFn((data: TipUserPayload) => {
        // Validation Handling.
        validateAndThrow(validate(data, tipUserSchema));
        validateAndThrow(validateEnum(data.goldBar, GoldBars));

        const tipUserStrategy = new TipUserHandler();
        const handler = new RequestEventStrategy(this.hr, tipUserStrategy);
        handler.execute(data);
    })

    modAction = catchFn((data: ModerateRoomPayload) => {
        // Validation Handling.
        validateAndThrow(validate(data, moderationSchema));
        validateAndThrow(validateEnum(data.moderationAction, ModerationAction));

        const modStrategy = new ModerationHandler();
        const handler = new RequestEventStrategy(this.hr, modStrategy);
        handler.execute(data);
    })

    getRoomPrivilege = catchFn(async (data: GetRoomPrivilegePayload) => {
        validateAndThrow(validate(data, getRoomPrivilegeSchema));

        const roomPrivilegeStrategy = new GetRoomPrivilegeHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, roomPrivilegeStrategy);
        const response: GetRoomPrivilegeResponse = await handler.execute(data);
        return response.content;
    })

    changeRoomPrivileges = catchFn(async (data: ChangeRoomPrevilegePayload) => {
        validateAndThrow(validate(data, changeRoomPrivilegesSchema));
        validateAndThrow(validate(data.permission, roomPermissionSchema));

        const changeRoomPrivilegeStrategy = new ChangeRoomPrevilegeHandler();
        const handler = new RequestEventStrategy(this.hr, changeRoomPrivilegeStrategy);
        return handler.execute(data);
    })

    getBackpackByUserId = catchFn(async (data: {userId: string}) => {
        if(!data.userId){
            throw new PayloadError("userId is required");
        }

        const bakkpackStrategy = new GetBackPackHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, bakkpackStrategy);
        const response: GetBackpackResponse = await handler.execute(data);
        return response.backpack;
    })
}
export default RequestEvent;