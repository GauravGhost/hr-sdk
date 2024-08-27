import { AnchorHitPayload, EmotePayload, FloorHitPayload, GoldBars, ReactionPayload, TeleportPayload, TipUserPayload, Wallet, WalletType, WhisperPayload } from "../../types/types";
import { PayloadError, RequestError, ResponseError } from "../../utils/error";
import { catchFn } from "../../utils/utils";
import { tipUserSchema, validate, validateEnum, whisperSchema } from "../../utils/validation";
import { Highrise } from "../highrise";
import RequestEventStrategy, { AnchorHitHandler, ChatHandler, EmoteHandler, FloorHitHandler, ReactionHandler, RequestEventWithPromiseStrategy, RoomUsersHandler, TeleportHandler, TipUserHandler, WalletHandler } from "./RequestEvent";



class RequestEvent {
    constructor(private hr: Highrise) {
    }
    message = catchFn((message: string) => {
        if(!message){
            throw new PayloadError("Invalid message payload");
        }
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ message: message });
    })

    whisper = catchFn((data: WhisperPayload) => {
        const payloadError = validate(data, whisperSchema);
        if(payloadError) {
            throw new PayloadError(payloadError);
        }
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ ...data, whisper: true });
    })

    emote = catchFn((data: EmotePayload) => {
        const emoteStrategy = new EmoteHandler();
        const handler = new RequestEventStrategy(this.hr, emoteStrategy);
        handler.execute(data);
    })

    sit = catchFn(({ entityId, anchorIx = 0 }: AnchorHitPayload) => {
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
        if(!voiceToken) {
            throw new ResponseError(`Voice token not found`);
        }
        return voiceToken;  
    })

    // x: number, y: number, z: number, facing: Facing = Facing.FrontLeft
    walk = catchFn(async (data: FloorHitPayload) => {
        const floorHitStrategy = new FloorHitHandler();
        const handler = new RequestEventStrategy(this.hr, floorHitStrategy);
        handler.execute(data);
    })

    teleport = catchFn((data: TeleportPayload) => {
        const teleportStrategy = new TeleportHandler();
        const handler = new RequestEventStrategy(this.hr, teleportStrategy);
        handler.execute(data);
    })

    reaction = catchFn((data: ReactionPayload) => {
        const reactionStrategy = new ReactionHandler();
        const handler = new RequestEventStrategy(this.hr, reactionStrategy);
        handler.execute(data);
    })

    getRooomUsers = catchFn(async (): Promise<any> => {
        const userStrategy = new RoomUsersHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, userStrategy);
        const response = await handler.execute({});
        return response.content;
    })

    getRoomUserByUsername = catchFn(async (username: string) => {
        const users = await this.getRooomUsers();
        const user = users.find((userData: any) => userData[0].username === username);
        if (user) {
            return user;
        } else {
            throw new RequestError(`User with username "${username}" not found`);
        }
    })

    getRoomUserByUserId = catchFn(async (userId: string) => {
        const users = await this.getRooomUsers();
        const user = users.find((userData: any) => userData[0].id === userId);
        if (user) {
            return user;
        } else {
            throw new RequestError(`User with userId "${userId}" not found`);
        }

    })

    tipUser = catchFn((data: TipUserPayload) => {
        const error = validate(data, tipUserSchema);
        if (error) {
            throw new PayloadError(error);
        }
        const enumError = validateEnum(data.goldBar, GoldBars);
        if (enumError) {
            throw new PayloadError(enumError)
        }
        const tipUserStrategy = new TipUserHandler();
        const handler = new RequestEventStrategy(this.hr, tipUserStrategy);
        handler.execute(data);
    })
}
export default RequestEvent;