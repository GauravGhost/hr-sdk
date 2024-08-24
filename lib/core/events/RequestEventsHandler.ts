import { AnchorHitPayload, EmotePayload, FloorHitPayload, ReactionPayload, TeleportPayload, Wallet, WhisperPayload } from "../../types/types";
import { RequestError } from "../../utils/error";
import { Highrise } from "../highrise";
import RequestEventStrategy, { AnchorHitHandler, ChatHandler, EmoteHandler, FloorHitHandler, ReactionHandler, RequestEventWithPromiseStrategy, RoomUsersHandler, TeleportHandler, WalletHandler } from "./RequestEvent";



class RequestEvent {
    constructor(private hr: Highrise) {
    }
    message(message: string) {
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ message: message });
    }

    whisper(data: WhisperPayload) {
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({...data, whisper: true});
    }

    emote(data: EmotePayload) {
        const emoteStrategy = new EmoteHandler();
        const handler = new RequestEventStrategy(this.hr, emoteStrategy);
        handler.execute(data);
    }

    sit({entityId, anchorIx = 0}: AnchorHitPayload) {
        const anchorHitStrategy = new AnchorHitHandler();
        const handler = new RequestEventStrategy(this.hr, anchorHitStrategy);
        handler.execute({entityId, anchorIx})
    }

    async wallet(): Promise<Array<Wallet>> {
        const walletStrategy = new WalletHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, walletStrategy);
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
    async walk(data: FloorHitPayload) {
        const floorHitStrategy = new FloorHitHandler();
        const handler = new RequestEventStrategy(this.hr, floorHitStrategy);
        handler.execute(data);
    }

    async teleport(data: TeleportPayload) {
        const teleportStrategy = new TeleportHandler();
        const handler = new RequestEventStrategy(this.hr, teleportStrategy);
        handler.execute(data);
    }

    async reaction(data: ReactionPayload){
        const reactionStrategy = new ReactionHandler();
        const handler = new RequestEventStrategy(this.hr, reactionStrategy);
        handler.execute(data);
    }
    
    async getRooomUsers(): Promise<any> {
        const userStrategy = new RoomUsersHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, userStrategy);
        const response = await handler.execute({});
        return response.content;
    }

    async getRoomUserByUsername(username: string) {
        try {
            const users = await this.getRooomUsers();
            const user = users.find((userData: any) => userData[0].username === username);
            if (user) {
                return user;
            } else {
                throw new RequestError(`User with username "${username}" not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async getRoomUserByUserId(userId: string) {
        try {
            const users = await this.getRooomUsers();
            const user = users.find((userData: any) => userData[0].id === userId);
            if (user) {
                return user;
            } else {
                throw new RequestError(`User with userId "${userId}" not found`);
            }
        } catch (error) {
            throw error;
        }
    }

}
export default RequestEvent;