import { Highrise } from "../../highrise";

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
            console.error("WebSocket is not open. Message cannot be sent.");
        }
    }
}
export default RequestEventStrategy;