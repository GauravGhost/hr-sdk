import { Wallet } from "../../../types/responseEventTypes";
import { Highrise } from "../../highrise";
import { AnchoHitHandler } from "./AnchoHitHandler";
import { ChatHandler } from "./ChatHandler";
import { EmoteHandler } from "./EmoteHandler";
import RequestEventStrategy, { RequestEventWithPromiseStrategy } from "./RequestStrategy";
import { WalletHandler } from "./WalletHandler";

class RequestEvent {
    constructor(private hr: Highrise) {
    }
    message(message: string) {
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ message: message });
    }

    whisper(message: string, whisperTargetId: string) {
        const chatStrategy = new ChatHandler();
        const handler = new RequestEventStrategy(this.hr, chatStrategy);
        handler.execute({ message, whisper: true, whisperTargetId});
    }

    emote(emoteId: string, targetUserId?: string) {
        const emoteStrategy = new EmoteHandler();
        const handler = new RequestEventStrategy(this.hr, emoteStrategy);
        handler.execute({emoteId, targetUserId});
    }

    sit(entityId: string, anchorIx: number = 0){
        const anchorHitStrategy = new AnchoHitHandler();
        const handler = new RequestEventStrategy(this.hr, anchorHitStrategy);
        handler.execute({entityId, anchorIx})
    }

    async wallet(): Promise<Array<Wallet>> {
        const walletStrategy = new WalletHandler();
        const handler = new RequestEventWithPromiseStrategy(this.hr, walletStrategy);
        const response = await handler.execute({});
        return response.content;
    }

    async gold(){
        const wallet = await this.wallet();
        return wallet.find((token) => token.type === "gold");
    }

    async boostToken(){
        const wallet = await this.wallet();
        return wallet.find((token) => token.type === "room_boost_tokens");
    }

    async voiceToken(){
        const wallet = await this.wallet();
        return wallet.find((token) => token.type === "room_voice_tokens");
    }
}
export default RequestEvent;