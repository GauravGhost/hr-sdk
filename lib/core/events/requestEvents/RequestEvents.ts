import { AnchorHitPayload, EmotePayload, Facing, FloorHitPayload, TeleportPayload, WhisperPayload } from "../../../types/requestEventTypes";
import { Wallet } from "../../../types/responseEventTypes";
import { RequestError } from "../../../utils/error";
import { Highrise } from "../../highrise";
import { AnchorHitHandler } from "./AnchorHitHandler";
import { ChatHandler } from "./ChatHandler";
import { EmoteHandler } from "./EmoteHandler";
import { FloorHitHandler } from "./FloorHitHandler";
import RequestEventStrategy, { RequestEventWithPromiseStrategy } from "./RequestStrategy";
import { RoomUsersHandler } from "./RoomUsersHandler";
import { TeleportHandler } from "./TeleportHandler";
import { WalletHandler } from "./WalletHandler";

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

    async roomUsers(): Promise<any> {
        const userStrategy = new RoomUsersHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, userStrategy);
        const response = await handler.execute({});
        return response.content;
    }

    async roomUser(username: string) {
        try {
            const users = await this.roomUsers();
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
}
export default RequestEvent;