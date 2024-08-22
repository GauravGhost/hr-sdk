import { Highrise } from "../../highrise";
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

    walk(){}
}
export default RequestEvent;