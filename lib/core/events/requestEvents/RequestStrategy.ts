import { error } from "console";
import { WebSocketError } from "../../../utils/error";
import { Highrise } from "../../highrise";
import { generateRid } from "../../../utils/utils";

export interface RequestStrategy {
    createPayload(message: any): object;
}

class RequestEventStrategy {
    constructor(private hr: Highrise, private strategy: RequestStrategy) {}

    execute(incomingPayload: any) {
        if (this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            const payload = this.strategy.createPayload(incomingPayload);
            this.hr.ws.send(JSON.stringify(payload));
        } else {
            throw new WebSocketError("WebSocket is not open. Message cannot be sent");
        }
    }
}

export class RequestEventWithPromiseStrategy {
    constructor(private hr: Highrise, private strategy: RequestStrategy) {}

    async execute(incomingPayload: any): Promise<any> {
        if (this.hr && this.hr.ws && this.hr.ws.readyState === this.hr.ws.OPEN) {
            return new Promise((resolve, reject) => {
                const payload: any = this.strategy.createPayload(incomingPayload)
                
                const messageHandler = (event: any) => {
                    const messageObject = JSON.parse(event.data);

                    if (messageObject.rid === payload.rid) {
                        this.hr!.ws!.removeEventListener('message', messageHandler);
                        resolve(messageObject);
                    }
                };

                this.hr!.ws!.addEventListener('message', messageHandler);

                this.hr!.ws!.send(JSON.stringify(payload), (error) => {
                    if (error) {
                        reject(error);
                    }
                });

                this.hr!.ws!.onerror = (error: any) => {
                    reject(new WebSocketError("WebSocket encountered an error."));
                };

                this.hr!.ws!.onclose = () => {
                    reject(new WebSocketError("WebSocket connection closed."));
                };
            });
        } else {
            return Promise.reject(new WebSocketError("WebSocket is not open. Message cannot be sent."));
        }
    }
}

export default RequestEventStrategy;