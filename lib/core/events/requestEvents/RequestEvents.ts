import { Highrise } from "../../highrise";
import { eventRequest } from "../../../utils/constant";

class RequestEvent {
    constructor(private hr: Highrise) {
    }

    sendMessage(message: any) {
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            console.log("comingdf")
            let payload;
            if (message.whisper) {
                payload = {
                    _type: eventRequest.ChatRequest,
                    message: message.message,
                    whisper_target_id: message.whisper_target_id,
                    rid: message.rid
                };
            } else {
                console.log("meesage enter");
                payload = {
                    _type: eventRequest.ChatRequest,
                    message: message.message,
                    rid: message.rid
                };
            }

            this.hr.ws.send(JSON.stringify(payload));
        } else {
            return console.error("WebSocket is not open. Message cannot be sent.");
        }
    }
}
export default RequestEvent;