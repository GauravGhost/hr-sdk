import { Highrise } from "../../highrise";
import { AnchoHitHandler } from "./AnchoHitHandler";
import { ChatHandler } from "./ChatHandler";
import { EmoteHandler } from "./EmoteHandler";
import RequestEventStrategy from "./RequestStrategy";

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
}
export default RequestEvent;